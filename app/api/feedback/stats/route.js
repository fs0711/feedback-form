import { connectToDatabase } from '@/lib/mongodb';
import { validateEmail } from '@/lib/utils';
import { ObjectId } from 'mongodb';
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, jobTitle, companyName, topic, reason } = body;

    // Validation
    if (!name || !email || !jobTitle || !companyName || !topic) {
      return Response.json(
        { error: 'Missing required fields: name, email, jobTitle, companyName, topic' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return Response.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate topic enum
    const validTopics = ['AI in HR', 'People intelligence', 'Skill Based Organization', 'All of the above'];
    if (!validTopics.includes(topic)) {
      return Response.json(
        { error: 'Invalid topic' },
        { status: 400 }
      );
    }

    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-client-ip') || 
                     'unknown';

    const feedbackData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      jobTitle: jobTitle.trim(),
      companyName: companyName.trim(),
      topic,
      reason: reason?.trim() || null,
      submittedAt: new Date(),
      ipAddress,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const { db } = await connectToDatabase();
    const result = await db.collection('feedback').insertOne(feedbackData);

    return Response.json(
      {
        message: 'Feedback submitted successfully',
        id: result.insertedId
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}




export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const topic = searchParams.get('topic') || '';
    const sortBy = searchParams.get('sortBy') || 'submittedAt';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;

    const { db } = await connectToDatabase();
    const skip = (page - 1) * limit;

    // Build filter query
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } }
      ];
    }
    if (topic) {
      filter.topic = topic;
    }

    // Get total count
    const total = await db.collection('feedback').countDocuments(filter);

    // Get paginated results
    const feedback = await db.collection('feedback')
      .find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .toArray();

        //   const topicStats = await Feedback.aggregate([
        //   {
        //     $group: {
        //       _id: '$topic',
        //       count: { $sum: 1 }
        //     }
        //   }
        // ]);
    const topicStats = await db.collection('feedback').aggregate([
      {
        $group: {
          _id: '$topic',
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    return Response.json({
      recent: feedback,
      topicBreakdown: topicStats,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json(
        { error: 'Feedback ID is required' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const result = await db.collection('feedback').deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return Response.json(
        { error: 'Feedback not found' },
        { status: 404 }
      );
    }

    return Response.json({
      message: 'Feedback deleted successfully',
      id
    });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    if (!id) {
      return Response.json(
        { error: 'Feedback ID is required' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const result = await db.collection('feedback').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...body,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return Response.json(
        { error: 'Feedback not found' },
        { status: 404 }
      );
    }

    return Response.json({
      message: 'Feedback updated successfully',
      id
    });
  } catch (error) {
    console.error('Error updating feedback:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
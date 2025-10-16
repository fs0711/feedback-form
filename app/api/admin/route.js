import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET all feedback or stats
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const { db } = await connectToDatabase();

    // Get stats
    if (action === 'stats') {
      const totalFeedback = await db.collection('feedback').countDocuments();

      const topicStats = await db.collection('feedback').aggregate([
        {
          $group: {
            _id: '$topic',
            count: { $sum: 1 }
          }
        }
      ]).toArray();

      const recentFeedback = await db.collection('feedback')
        .find({})
        .sort({ submittedAt: -1 })
        .limit(5)
        .project({ name: 1, email: 1, topic: 1, submittedAt: 1 })
        .toArray();

      return Response.json({
        total: totalFeedback,
        topicBreakdown: topicStats,
        recent: recentFeedback
      });
    }

    // Get all feedback
    const feedback = await db.collection('feedback')
      .find({})
      .sort({ submittedAt: -1 })
      .toArray();

    return Response.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE feedback
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
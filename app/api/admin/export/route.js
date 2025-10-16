import { connectToDatabase } from '@/lib/mongodb';
import XLSX from 'xlsx';

export async function GET(request) {
  try {
    const { db } = await connectToDatabase();

    const feedback = await db.collection('feedback')
      .find({})
      .sort({ submittedAt: -1 })
      .toArray();

    // Prepare data for Excel
    const excelData = feedback.map(item => ({
      'Name': item.name,
      'Email': item.email,
      'Phone': item.phone || 'N/A',
      'Job Title': item.jobTitle,
      'Company Name': item.companyName,
      'Topic of Interest': item.topic,
      'Reason for Contact': item.reason || 'N/A',
      'Submitted At': new Date(item.submittedAt).toLocaleString(),
      'IP Address': item.ipAddress || 'N/A'
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Feedback Data');

    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Set headers for file download
    const filename = `feedback-export-${new Date().toISOString().split('T')[0]}.xlsx`;
    const response = new Response(excelBuffer);
    response.headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.headers.set('Content-Disposition', `attachment; filename="${filename}"`);

    return response;
  } catch (error) {
    console.error('Error exporting feedback:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
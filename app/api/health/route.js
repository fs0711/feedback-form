export async function GET(request) {
  return Response.json({
    status: 'OK',
    message: 'Server is running'
  });
}
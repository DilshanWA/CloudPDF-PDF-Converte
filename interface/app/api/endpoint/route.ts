import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const operationType = formData.get('operationType');
  const backendRes = await fetch(`http://127.0.0.1:5000/${operationType}`, {
    method: "POST",
    body: formData,  
  });

  if (!backendRes.ok) {
    const text = await backendRes.text();
    return new Response(text, { status: backendRes.status });
  }

  const data = await backendRes.json();

  return NextResponse.json({
    data: data,
    message: data.message,
    pdfUrl: data.pdf_url, 
    zipUrl: data.zip_url, 
    files_count: data.files_count,
    pdfName: data.pdf_file || data.zip_file,
  });
}

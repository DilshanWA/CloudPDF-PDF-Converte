import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const operationType = formData.get('operationType');
  console.log("Operation Type:", operationType);
  const backendRes = await fetch(`${process.env.BACKEND_URL}/${operationType}`, {
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

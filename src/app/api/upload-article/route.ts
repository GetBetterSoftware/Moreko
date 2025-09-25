
import { uploadArticle } from "@/lib/DatabaseOperations";
import { NextResponse, NextRequest } from "next/server";



export async function POST(request: NextRequest) {
  const data = await request.json();

  try{
  await uploadArticle("student-articles", data, data.id);  

  return NextResponse.json({message: "Article uploaded successfully"}, {status: 200});
  }
  catch(err) {
    return NextResponse.json({error: err}, {status: 400});
  }
  
}

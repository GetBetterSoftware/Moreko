import { getArticle, uploadArticle } from "@/lib/DatabaseOperations";
import { NextResponse, NextRequest } from "next/server";


export async function GET() {

  try{
  const article = await getArticle( "posts");  

  return NextResponse.json(article, {status: 200});
  }
  catch(err) {
    return NextResponse.json({error: err}, {status: 400});
  }
  
}

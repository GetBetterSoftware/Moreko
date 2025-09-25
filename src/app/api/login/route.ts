import { getParent } from "@/lib/DatabaseOperations";
import { signJwtAccessToken } from "@/lib/jwt";
import { NextResponse, NextRequest } from "next/server";
const bcrypt = require("bcrypt");


export async function POST(request: NextRequest) {
  const data = await request.json();

  const { email, password } = data;

  const user = await getParent("parent", password, email);

  if (user) {
    const {...result } = user;
    const accessToken = signJwtAccessToken(result)

    const userResult = { ...result, accessToken };
    console.log(userResult);
    return NextResponse.json(userResult);
  }

  return NextResponse.json({error: "User does not exist"}, {status: 404});
  
}

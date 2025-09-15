import { getUser } from "@/lib/DatabaseOperations";
import { signJwtAccessToken } from "@/lib/jwt";
import { NextResponse, NextRequest } from "next/server";
const bcrypt = require("bcrypt");


export async function POST(request: NextRequest) {
  const data = await request.json();

  const { email, password } = data;

  const user = await getUser("user", email);

  if (user && user.email === email && (await bcrypt.compare(password, user.password))) {
    const { password, token,  ...result } = user;
    const accessToken = signJwtAccessToken(result)

    const userResult = { ...result, accessToken };
    return NextResponse.json(userResult);
  }

  return NextResponse.json({error: "User does not exist"}, {status: 404});
  
}

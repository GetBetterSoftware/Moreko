import { NextRequest, NextResponse } from "next/server";
import { addData } from "@/lib/DatabaseOperations";
const bcrypt = require('bcrypt');

export async function POST(request: NextRequest) {
    const data = await request.json();

    data.password = await bcrypt.hash(data.password, 10);
    const {confirmPassword, ...user} = data
    const res = await addData("user", user, user.id);

    const {password, ...result} = user;
    return NextResponse.json(result);
}
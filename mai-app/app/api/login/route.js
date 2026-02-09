import { NextResponse } from "next/server";
import { AuthService } from "@/lib/authService";

export async function POST(req) {
  try {
    const { email, senha } = await req.json();
    const res = await AuthService.login(email, senha);
    return NextResponse.json(res);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 401 }
    );
  }
}
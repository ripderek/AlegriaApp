import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
//import Cookies from "universal-cookie";

export async function middleware(request) {
  const jwt = request.cookies.get("Token");
  console.log(jwt);
  if (!jwt) return NextResponse.redirect(new URL("/", request.url));

  try {
    const { payload } = await jwtVerify(
      jwt.value,
      new TextEncoder().encode("secret")
    );
    console.log({ payload });
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
//http://localhost:3000/dashboard/
export const config = {
  matcher: ["/dashboard/:path*", "/FormulariosOP/:path*"],
};

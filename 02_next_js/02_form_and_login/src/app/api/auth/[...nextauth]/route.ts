import { authConfig } from "@/auth";
import NextAuth from "next-auth";

// export named handler for each HTTP method (GET, POST, etc.)
export const GET = NextAuth(authConfig);
export const POST = NextAuth(authConfig);

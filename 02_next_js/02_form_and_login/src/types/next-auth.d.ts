import "next-auth";
import "@auth/core/jwt";

declare module "next-auth" {
  interface Session {
    accessToken: string;
  }

  interface User {
    accessToken: string;
    email: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken: string;
  }
}

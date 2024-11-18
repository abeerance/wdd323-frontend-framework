import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// here we need to defined it as a NextRequest, so taht we can access the request body
export async function POST(request: NextRequest) {
  // route schützen
  if (request.method !== "POST") {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  }

  // get the session to retrieve the user's accessToken
  const session = await getServerSession(authConfig);

  // if there is no session, return unauthorized
  if (!session || !session.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // retrieve the request body
  const formData = await request.formData();

  // now we try to communicate with the backend
  try {
    // send the request to the backend
    const response = await fetch(`${process.env.BACKEND_URL}/api/uploads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Image upload failed: ", error);
    return NextResponse.json({ message: "Image upload failed" }, { status: 500 });
  }
}

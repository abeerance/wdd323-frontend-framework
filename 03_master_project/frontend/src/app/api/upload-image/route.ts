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

  console.log("formData: ", formData);

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

    // (optional) handle errors
    // if the response from the server is not ok, in some cases the response of the
    // next.js server can be a 200, if you're not conditionally checking if the
    // !response.ok,
    // that's why we did an additional check here
    if (!response.ok) {
      return NextResponse.json({ message: data.message }, { status: response.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Image upload failed: ", error);
    return NextResponse.json(
      { message: "There was an error in the upload. Please ensure that the image is max. 8MB." },
      { status: 400 }
    );
  }
}

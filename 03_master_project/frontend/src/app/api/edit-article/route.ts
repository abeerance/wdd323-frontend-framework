import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  if (request.method !== "PATCH") {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  }

  // get the session to retrieve the user's accessToken
  const session = await getServerSession(authConfig);

  // if there is no session, return unauthorized
  if (!session || !session.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // retrieve the request body
  const body = await request.json();

  // now we try to communicate with the backend
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/articles`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(body),
      /* here, the stringify converts the json object into a string, in saves it like this in the backend
      "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"asdasdasdasdad\"}]}]}"
      */
    });

    const data = await response.json();

    // if the response is not ok from the server, we can handle the error
    // in the next.js server
    if (!response.ok) {
      console.error("Article edit failed: ", data.message);
      return NextResponse.json({ message: data.message }, { status: response.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Article edit failed: ", error);
    return NextResponse.json({ message: "Article edit failed" }, { status: 500 });
  }
}

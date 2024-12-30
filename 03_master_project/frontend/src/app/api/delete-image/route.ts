export async function DELETE(request: Request) {
  if (request.method !== "DELETE") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Get the session from the request
  const session = await getServerSession(authConfig);

  // If there is no session, return unauthorized
  if (!session || !session.accessToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Retrieve the request body
  const body = await request.json();

  // Now we try to communicate with the backend
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/uploads/${body.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const data = await response.json();

    // If the response is not ok from the server, we can handle the error
    // in the next.js server
    if (!response.ok) {
      console.error("Image delete failed: ", data.message);
      return new Response(data.message, { status: response.status });
    }

    return new Response(data, { status: 200 });
  } catch (error) {
    console.error("Image delete failed: ", error);
    return new Response("Image delete failed", { status: 500 });
  }
}

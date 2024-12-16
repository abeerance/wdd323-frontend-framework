import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authConfig);

  if (!session || !session.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  console.log("body: ", body.id);

  try {
    // Retrieve form data
    // Send data to the backend
    const response = await fetch(`${process.env.BACKEND_URL}/api/uploads/${body.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error during PATCH:", error);
    return NextResponse.json({ message: "Failed to process image update" }, { status: 500 });
  }
}

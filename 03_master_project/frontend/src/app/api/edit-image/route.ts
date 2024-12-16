import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authConfig);

  if (!session || !session.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Retrieve form data
    const formData = await request.formData();

    // Send data to the backend
    const response = await fetch(`${process.env.BACKEND_URL}/api/uploads`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: formData,
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

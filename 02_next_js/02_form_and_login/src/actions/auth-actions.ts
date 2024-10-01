"use server"; // tells the server that this is a server-side action and runs on the server

interface ResponseReturn {
  message?: string;
  status: number;
}

interface SignUpResponse extends ResponseReturn {
  email?: string;
  updated_at?: string;
  created_at?: string;
  id?: number;
  errors?: string[];
}

export async function handleSignup(email: string, password: string): Promise<SignUpResponse> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    return {
      ...data,
      status: response.status, // include the response status code in the response
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
        status: 400,
      };
    }

    return {
      message: "An error occurred",
      status: 400,
    };
  }
}

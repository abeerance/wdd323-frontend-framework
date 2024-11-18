// this is a helper function to fetch data from the backend
// we will refactor it and make it reusable, so that
// we don't need to write try/catch blocks everywhere

async function dataFetch(endpoint: string) {
  try {
    const response = await fetch(endpoint);

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export default dataFetch;

export async function dataFetchWithToken(endpoint: string, token: string) {
  // it is just a GET request
  try {
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

// Beispiel für einen wiederverwendbaren fetch mit einem body und der Method
// export async function dataFetchWithTokenTest(
//   endpoint: string,
//   token: string,
//   method = "GET",
//   body: JSON,
//   contentType = "application/json"
// ) {
//   // it is just a GET request
//   try {
//     const response = await fetch(endpoint, {
//       method: method,
//       headers: {
//         "Content-Type": contentType,
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(body),
//     });

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// }

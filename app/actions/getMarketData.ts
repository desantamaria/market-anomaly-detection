"use server";

export async function getMarketData() {
  try {
    const url =
      process.env.NODE_ENV === "development"
        ? new URL(
            "/api/py/getMarketData",
            process.env.NEXT_PUBLIC_API_URL
          ).toString()
        : "/api/py/getMarketData";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      throw new Error(`HTTP error with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Market Data Error:", error);
    throw error;
  }
}

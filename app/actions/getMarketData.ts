"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function getMarketData() {
  try {
    const response = await fetch(`${API_URL}/api/py/getMarketData`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error with status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Server Error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetching market data",
    };
  }
}

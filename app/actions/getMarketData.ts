"use server";
import { PredictionData } from "../page";

// Use relative URL in production
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

const RENDER_URL = process.env.NEXT_PUBLIC_RENDER_URL || "";

export async function getPrediction(financialData: PredictionData) {
  try {
    const response = await fetch(RENDER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(financialData),
    });

    if (!response.ok) {
      console.error(
        `Prediction API Error: ${response.status} - ${response.statusText}`
      );
      throw new Error(`HTTP error with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Prediction Error:", error);
    throw error;
  }
}

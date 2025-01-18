"use server";

import { PredictionData } from "../types/financialData";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
export async function GenerateResponse(
  yFinanceData: PredictionData,
  selectedDate: string,
  predictionResults: PredictionData
): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        yFinanceData,
        selectedDate,
        predictionResults,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Generate API error:", {
        status: response.status,
        statusText: response.statusText,
        errorText,
      });
      throw new Error(
        `HTTP error with status: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    if (!data.result) {
      console.error("Generate API returned no result:", data);
      throw new Error("No result in response");
    }

    return data;
  } catch (error) {
    console.error("Generate Response error:", error);
    throw error;
  }
}

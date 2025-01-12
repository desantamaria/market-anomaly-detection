"use server";

import { FinancialData, PredictionData } from "../page";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
export async function GenerateResponse(
  yFinanceData: FinancialData,
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
      throw new Error(`HTTP error with status: ${response.status}`);
    }
    const data = await response.json();
    return data;

    return;
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to generate response",
    };
  }
}

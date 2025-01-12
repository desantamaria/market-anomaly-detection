"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const RENDER_URL = process.env.NEXT_PUBLIC_RENDER_URL || "";

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

export type FinancialData = {
  Date: string;
  DXY: number;
  GBP: number;
  JPY: number;
  MXCN: number;
  MXEU: number;
  VIX: number;
  VIX_MA: number;
  DXY_MA: number;
  JPY_MA: number;
  GBP_MA: number;
  MXEU_MA: number;
  MXCN_MA: number;
};

export async function getPrediction(financialData: FinancialData) {
  try {
    const response = await fetch(`${RENDER_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(financialData),
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
        error instanceof Error ? error.message : "Failed to fetch prediction",
    };
  }
}

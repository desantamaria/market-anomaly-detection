export interface Ticker {
  date: string;
  price: number;
  MA: number;
}

export interface FinancialData {
  DXY: Ticker[];
  GBP: Ticker[];
  JPY: Ticker[];
  MXCN: Ticker[];
  MXEU: Ticker[];
  VIX: Ticker[];
  dates: string[];
}

export interface PredictionData {
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
}

export interface PredictionResult {
  prediction: {
    XGBoost: number;
    "Logistic Regression": number;
    "Isolation Forest": number;
  };
  probability: { XGBoost: number };
}

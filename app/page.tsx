"use client";

import { useEffect, useState } from "react";
import { getMarketData, getPrediction } from "./actions/getMarketData";
import { DateSelector } from "@/components/date-selector";
import { InfoCards } from "@/components/info-cards";
import { Button } from "@/components/ui/button";
import { GenerateResponse } from "./actions/generate";
import Markdown from "react-markdown";
import { PredictionResults } from "@/components/prediction-results";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Ticker {
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

export default function Home() {
  const [yFinanceData, setYFinanceData] = useState<FinancialData | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [stocksInfo, setStocksInfo] = useState<PredictionData | null>(null);
  const [predictionResults, setPredictionResults] = useState(null);
  const [predictionAnalysis, setPredictionAnalysis] = useState("");

  const [loading, setLoading] = useState(false);

  async function fetchMarketData() {
    const result = await getMarketData();
    setYFinanceData(result);
  }

  useEffect(() => {
    fetchMarketData();
  }, []);

  const handleDateSelect = (date: string) => {
    if (!yFinanceData) return;
    const newStocksInfo: PredictionData = {
      Date: date,
      DXY: yFinanceData.DXY.find((ticker) => ticker.date === date)?.price || 0,
      GBP: yFinanceData.GBP.find((ticker) => ticker.date === date)?.price || 0,
      JPY: yFinanceData.JPY.find((ticker) => ticker.date === date)?.price || 0,
      MXCN:
        yFinanceData.MXCN.find((ticker) => ticker.date === date)?.price || 0,
      MXEU:
        yFinanceData.MXEU.find((ticker) => ticker.date === date)?.price || 0,
      VIX: yFinanceData.VIX.find((ticker) => ticker.date === date)?.price || 0,
      VIX_MA: yFinanceData.VIX.find((ticker) => ticker.date === date)?.MA || 0,
      DXY_MA: yFinanceData.DXY.find((ticker) => ticker.date === date)?.MA || 0,
      JPY_MA: yFinanceData.JPY.find((ticker) => ticker.date === date)?.MA || 0,
      GBP_MA: yFinanceData.GBP.find((ticker) => ticker.date === date)?.MA || 0,
      MXEU_MA:
        yFinanceData.MXEU.find((ticker) => ticker.date === date)?.MA || 0,
      MXCN_MA:
        yFinanceData.MXCN.find((ticker) => ticker.date === date)?.MA || 0,
    };
    setStocksInfo(newStocksInfo);
    setSelectedDate(date);
    setPredictionResults(null);
    setPredictionAnalysis("");
  };

  const handlePredict = async () => {
    if (!stocksInfo || !yFinanceData || !selectedDate) return;

    setLoading(true);

    const result = await getPrediction(stocksInfo);
    setPredictionResults(result);
    console.log(result);

    const analysis = await GenerateResponse(yFinanceData, selectedDate, result);

    setPredictionAnalysis(analysis.result);

    setLoading(false);
  };

  if (!yFinanceData) return <></>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-2 z-10 w-full max-w-5xl items-center justify-between text-sm">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Financial Anomaly Detection
        </h1>
        <div className="container mx-auto p-4">
          <DateSelector
            dates={yFinanceData.dates}
            onSelect={handleDateSelect}
          />
          {selectedDate && stocksInfo && (
            <>
              <InfoCards stockInfo={stocksInfo} />
              <Button onClick={handlePredict} className="flex-1 w-full">
                Predict Anomaly
              </Button>
            </>
          )}

          {loading ? (
            <>
              <div role="status" className="flex justify-center mt-10 my-10">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-6 mt-5">
              {predictionResults && (
                <PredictionResults results={predictionResults} />
              )}
              {predictionAnalysis && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Prediction Analysis
                      </h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Markdown>{predictionAnalysis}</Markdown>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

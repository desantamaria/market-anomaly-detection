"use client";

import { useEffect, useState } from "react";
import { getMarketData, getPrediction } from "./actions/getMarketData";
import { DateSelector } from "@/components/date-selector";
import { InfoCards } from "@/components/info-cards";
import { Button } from "@/components/ui/button";
import { GenerateResponse } from "./actions/generate";
import Markdown from "react-markdown";

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

    const result = await getPrediction(stocksInfo);
    setPredictionResults(result);
    console.log(result);

    const analysis = await GenerateResponse(yFinanceData, selectedDate, result);

    setPredictionAnalysis(analysis.result);
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
              <Button onClick={handlePredict} className="col-span-full">
                Predict Anomaly
              </Button>
            </>
          )}

          {predictionResults && <></>}
          {predictionAnalysis && (
            <>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Prediction Analysis
              </h3>
              <Markdown>{predictionAnalysis}</Markdown>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

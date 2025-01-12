"use client";

import { useEffect, useState } from "react";
import { getMarketData, getPrediction } from "./actions/getMarketData";
import { DateSelector } from "@/components/date-selector";
import { InfoCards } from "@/components/info-cards";
import { Button } from "@/components/ui/button";

interface Ticker {
  date: string;
  price: number;
  MA: number;
}

interface FinancialData {
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

export default function Home() {
  const [yFinanceData, setYFinanceData] = useState<FinancialData | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [predictionResults, setPredictionResults] = useState(null);
  const [predictionAnalysis, setPredictionAnalysis] = useState("");

  async function fetchMarketData() {
    const result = await getMarketData();
    console.log(result);
    setYFinanceData(result);
  }

  useEffect(() => {
    fetchMarketData();
  }, []);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setPredictionResults(null);
    setPredictionAnalysis("");
  };

  const handlePredict = async () => {
    if (!selectedDate || !yFinanceData) return;

    const formattedPrediction: PredictionData = {
      Date: selectedDate,
      DXY:
        yFinanceData.DXY.find((ticker) => ticker.date === selectedDate)
          ?.price || 0,
      GBP:
        yFinanceData.GBP.find((ticker) => ticker.date === selectedDate)
          ?.price || 0,
      JPY:
        yFinanceData.JPY.find((ticker) => ticker.date === selectedDate)
          ?.price || 0,
      MXCN:
        yFinanceData.MXCN.find((ticker) => ticker.date === selectedDate)
          ?.price || 0,
      MXEU:
        yFinanceData.MXEU.find((ticker) => ticker.date === selectedDate)
          ?.price || 0,
      VIX:
        yFinanceData.VIX.find((ticker) => ticker.date === selectedDate)
          ?.price || 0,
      VIX_MA:
        yFinanceData.VIX.find((ticker) => ticker.date === selectedDate)?.MA ||
        0,
      DXY_MA:
        yFinanceData.DXY.find((ticker) => ticker.date === selectedDate)?.MA ||
        0,
      JPY_MA:
        yFinanceData.JPY.find((ticker) => ticker.date === selectedDate)?.MA ||
        0,
      GBP_MA:
        yFinanceData.GBP.find((ticker) => ticker.date === selectedDate)?.MA ||
        0,
      MXEU_MA:
        yFinanceData.MXEU.find((ticker) => ticker.date === selectedDate)?.MA ||
        0,
      MXCN_MA:
        yFinanceData.MXCN.find((ticker) => ticker.date === selectedDate)?.MA ||
        0,
    };

    console.log(formattedPrediction);

    const result = await getPrediction(formattedPrediction);
    console.log(result);

    // TODO: Implement API call to analysis service
    // setPredictionResults();
    // TODO: Implement API call to insight generation service
    // setPredictionAnalysis();
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
          {selectedDate && (
            <>
              <InfoCards date={selectedDate} />
              <Button onClick={() => handlePredict()} className="col-span-full">
                Predict Anomaly
              </Button>
            </>
          )}

          {predictionResults && <></>}
          {predictionAnalysis && <></>}
        </div>
      </div>
    </main>
  );
}

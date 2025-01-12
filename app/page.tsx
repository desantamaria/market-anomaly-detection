"use client";

import { useEffect, useState } from "react";
import { FinancialData, getMarketData } from "./actions/getMarketData";

export default function Home() {
  const [yFinanceData, setYFinanceData] = useState(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [predictionResults, setPredictionResults] = useState(null);
  const [predictionAnalysis, setPredictionAnalysis] = useState("");

  async function fetchMarketData() {
    const result = await getMarketData();
    setYFinanceData(result);
    console.log(result);
  }

  useEffect(() => {
    fetchMarketData();
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setPredictionResults(null);
    setPredictionAnalysis("");
  };

  const handleAnalysisSubmit = async (formData: FinancialData) => {
    // TODO: Implement API call to analysis service
    // setPredictionResults();
    // TODO: Implement API call to insight generation service
    // setPredictionAnalysis();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-2 z-10 w-full max-w-5xl items-center justify-between text-sm">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Financial Anomaly Detection
        </h1>
        <div className="container mx-auto p-4">
          {/* Date Selection */}
          {selectedDate && <></>}
          {predictionResults && <></>}
          {predictionAnalysis && <></>}
        </div>
      </div>
    </main>
  );
}

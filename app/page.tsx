"use client";

import { useEffect, useState } from "react";
import { getMarketData } from "./actions/getMarketData";

export default function Home() {
  const [marketData, setMarketData] = useState(null);

  async function fetchMarketData() {
    const result = await getMarketData();
    console.log(result);
  }

  useEffect(() => {
    fetchMarketData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Financial Anomaly Detection
        </h1>
      </div>
    </main>
  );
}

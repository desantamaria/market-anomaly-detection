"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface IndicatorData {
  date: string;
  price: number;
  MA: number;
}

interface FinancialData {
  DXY: IndicatorData[];
  GBP: IndicatorData[];
  JPY: IndicatorData[];
  MXCN: IndicatorData[];
  MXEU: IndicatorData[];
  VIX: IndicatorData[];
}

export function InfoCards({ date }: { date: string }) {
  const [data, setData] = useState<FinancialData | null>(null);

  if (!data) return <></>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      {Object.entries(data).map(([indicator, values]) => (
        <Card key={indicator}>
          <CardHeader>
            <CardTitle>{indicator}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Date: {new Date(values[0].date).toLocaleDateString()}</p>
            <p>Price: {values[0].price.toFixed(4)}</p>
            <p>MA: {values[0].MA.toFixed(4)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

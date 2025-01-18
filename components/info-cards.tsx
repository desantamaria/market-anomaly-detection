"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function InfoCards({ stockInfo }: { stockInfo: Record<string, any> }) {
  const date = stockInfo.Date;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      {Object.entries(stockInfo)
        .filter(([key]) => !key.includes("MA") && key !== "Date")
        .map(([ticker, price]) => {
          const maKey = `${ticker}_MA`;
          const maValue = stockInfo[maKey];

          return (
            <Card key={ticker}>
              <CardHeader>
                <CardTitle>{ticker}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Date: {new Date(date).toLocaleDateString()}</p>
                <p>Price: {price.toFixed(4)}</p>
                <p>MA: {maValue.toFixed(4)}</p>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
}

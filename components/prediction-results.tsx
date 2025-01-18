import { PredictionResult } from "@/app/types/financialData";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function PredictionResults({ results }: { results: PredictionResult }) {
  const { prediction, probability } = results;

  return (
    <div className="mb-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-xl font-semibold mb-2">Analysis Results</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-1">Predictions</h3>
              {Object.entries(prediction).map(([model, pred]) => (
                <p key={model}>
                  {model}: {pred}
                </p>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-medium mb-1">Confidence</h3>
              {Object.entries(probability).map(([model, conf]) => (
                <p key={model}>
                  {model}: {(conf * 100).toFixed(2)}%
                </p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DateSelector({
  dates,
  onSelect,
}: {
  dates: string[];
  onSelect: (dates: string) => void;
}) {
  return (
    <div className="mb-4">
      <Select onValueChange={onSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a date" />
        </SelectTrigger>
        <SelectContent>
          {dates
            .slice()
            .reverse()
            .map((date) => (
              <SelectItem key={date} value={date}>
                {new Date(date).toLocaleDateString()}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}

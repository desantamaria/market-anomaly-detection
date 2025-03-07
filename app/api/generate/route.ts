import { Message, PerformGroq } from "@/app/utils/chat";
import { systemPrompt } from "@/app/utils/prompt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { yFinanceData, selectedDate, predictionResults } =
      await request.json();

    const userPrompt = `
        <SELECTED_DATE>${selectedDate}</SELECTED_DATE>
        <LLM_PREDICTION>${JSON.stringify(predictionResults)}</LLM_PREDICTION>
        <FINANCE_DATA> ${JSON.stringify(yFinanceData)}</FINANCE_DATA> 
    `;

    console.log(userPrompt);

    // Prepare for GROQ
    const messages: Message[] = [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ];

    // Output: Actual output generated from groq
    const output = await PerformGroq("llama-3.3-70b-versatile", messages);

    return NextResponse.json({
      success: true,
      result: output,
    });
  } catch (error) {
    console.error(`Failed to process request: ${error}`);
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}

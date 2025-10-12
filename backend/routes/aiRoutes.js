import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { getOpenAiCompletion } from "../openrouter.js";

const router = express.Router();

router.post("/finance-analyze", async (req, res) => {
  try {
    const { salary, expenses } = req.body;
    const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + Number(val || 0), 0);
    const savingsPotential = salary - totalExpenses;

    const savingsRate = salary > 0 ? Math.round(((savingsPotential) / salary) * 100) : 0;
    const userPrompt = `
      You are Mama Pesa, a creative Kenyan financial advisor.
      The user earns KES ${salary} per month.
      Their expenses are as follows:
      ${Object.entries(expenses).map(([key, value]) => `${key}: KES ${value}`).join("\n")}
      Total expenses: KES ${totalExpenses}.
      Savings rate: ${savingsRate}%.

      Summarize their current budget and savings rate in one sentence (e.g., "You're saving 43% of your income — great job!").
      Then, give one actionable insight for growing their savings, such as investing part of their savings in a regulated MMF like CIC or Britam.
      Also provide 2-3 practical cost-cutting suggestions and personalized advice based on their biggest expenses.
      Make your advice creative, practical, and relevant for a Kenyan student or young professional.
    `;

    // Use OpenRouter backend helper
    const data = await getOpenAiCompletion(userPrompt, "mistralai/mistral-7b-instruct");
    if (data.error) throw new Error(data.error);

    res.json({
      aiResponse: data.choices[0].message.content,
      totalExpenses,
      savingsPotential,
    });
  } catch (error) {
    console.error("Finance AI error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

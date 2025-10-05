import React, { useState } from "react";

export default function Budgeting() {
  const [incomeType, setIncomeType] = useState("Salary");
  const [income, setIncome] = useState(0);
  const [currency, setCurrency] = useState("KES");

  const currencies = ["KES", "USD", "EUR", "GBP"];
  const [expenses, setExpenses] = useState({
    Food: 0,
    Transport: 0,
    Entertainment: 0,
    Rent: 0,
    Other: 0,
  });

  const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);
  const savings = income - totalExpenses;
  const recommendedSavings = income * 0.2;
  const period = incomeType === "Salary" ? "Monthly" : "Weekly";

  const handleExpenseChange = (key, value) => {
    setExpenses((prev) => ({
      ...prev,
      [key]: parseFloat(value) || 0,
    }));
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-pink-600">
          💰 Smart Budget Tracker
        </h1>

        {/* Income Card */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-2">Income</h2>
          <hr className="mb-4" />

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <select
              value={incomeType}
              onChange={(e) => setIncomeType(e.target.value)}
              className="border rounded-xl p-2 w-full"
            >
              <option value="Salary">Salary</option>
              <option value="Allowance">Allowance</option>
            </select>

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border rounded-xl p-2 w-full"
            >
              {currencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <input
            type="number"
            value={income || ""}
            onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
            placeholder={`Enter ${period} Income`}
            className="border rounded-xl p-2 w-full"
          />
        </div>

        {/* Expenses Card */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-2">{period} Expenses</h2>
          <hr className="mb-4" />

          <div className="space-y-3">
            {Object.keys(expenses).map((key) => (
              <div key={key}>
                <label className="block font-medium mb-1">
                  {key} ({currency})
                </label>
                <input
                  type="number"
                  value={expenses[key] || ""}
                  onChange={(e) => handleExpenseChange(key, e.target.value)}
                  placeholder={key}
                  className="border rounded-xl p-2 w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <hr className="mb-4" />

          <p>
            <strong>Income ({incomeType} - {period}):</strong> {currency}{" "}
            {income.toFixed(0)}
          </p>
          <p>
            <strong>Total Expenses:</strong> {currency}{" "}
            {totalExpenses.toFixed(0)}
          </p>
          <p
            className={`font-bold ${
              savings < 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            Savings: {currency} {savings.toFixed(0)}
          </p>

          <div className="w-full bg-gray-200 rounded-full h-3 my-4">
            <div
              className={`h-3 rounded-full ${
                savings < 0 ? "bg-red-400" : "bg-pink-500"
              }`}
              style={{
                width: `${Math.min((totalExpenses / (income || 1)) * 100, 100)}%`,
              }}
            ></div>
          </div>

          <p className="font-medium">
            {savings < 0
              ? `⚠️ Overspending by ${currency} ${Math.abs(savings).toFixed(
                  0
                )} this ${period}.`
              : savings < recommendedSavings
              ? `💡 Try to save at least ${currency} ${recommendedSavings.toFixed(
                  0
                )} this ${period}.`
              : `✅ Great! You're saving enough for this ${period}.`}
          </p>
        </div>
      </div>
    </div>
  );
}

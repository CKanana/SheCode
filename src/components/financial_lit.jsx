import React from "react";
import { BookOpen, DollarSign, TrendingUp, CreditCard, BarChart, Users } from "lucide-react";

export default function FinancialLiteracy() {
  const topics = [
    {
      icon: <DollarSign className="text-pink-500" size={30} />,
      title: "Informed Borrowing",
      desc: "Understand loan terms, interest rates, and repayment schedules to make smart borrowing decisions.",
    },
    {
      icon: <CreditCard className="text-pink-500" size={30} />,
      title: "Debt Management",
      desc: "Learn repayment strategies and debt consolidation to take control of your finances.",
    },
    {
      icon: <BarChart className="text-pink-500" size={30} />,
      title: "Building Credit",
      desc: "Build a strong credit score and unlock better financial opportunities.",
    },
    {
      icon: <TrendingUp className="text-pink-500" size={30} />,
      title: "Investment Planning",
      desc: "Discover stocks, bonds, real estate, and mutual funds for a diverse investment portfolio.",
    },
    {
      icon: <BookOpen className="text-pink-500" size={30} />,
      title: "Budgeting Skills",
      desc: "Gain control over expenses and maximise savings to reach your financial goals.",
    },
    {
      icon: <Users className="text-pink-500" size={30} />,
      title: "Inter-generational Impact",
      desc: "Pass on financial knowledge to your children to build a cycle of empowerment.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 flex flex-col items-center py-12 px-6 text-gray-800">
      <h1 className="text-4xl font-bold text-pink-600 mb-6">Financial Literacy for Beginners</h1>
      <p className="max-w-2xl text-center text-gray-600 mb-12">
        Learn the essentials of money management and take control of your financial future.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {topics.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-[0_0_20px_rgba(255,20,147,0.2)] hover:shadow-[0_0_25px_rgba(255,20,147,0.4)] border border-pink-100 transition-all p-6 text-center hover:scale-105"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      <p className="mt-12 text-gray-500 text-sm">
        © 2025 SheFund. Empowering women with financial knowledge.
      </p>
    </div>
  );
}

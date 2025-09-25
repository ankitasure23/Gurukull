import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import '../css/PopulationGame.css'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
} from "chart.js";

// Register chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

export default function Population() {
  const [initialN, setInitialN] = useState(50);
  const [r, setR] = useState(0.1);
  const [K, setK] = useState(500);
  const [timeSteps, setTimeSteps] = useState(50);

  // Generate exponential & logistic data
  const generateData = () => {
    const labels = [];
    const exponential = [];
    const logistic = [];

    for (let t = 0; t <= timeSteps; t++) {
      labels.push(t);
      exponential.push(Math.round(initialN * Math.exp(r * t)));
      logistic.push(Math.round(K / (1 + ((K - initialN) / initialN) * Math.exp(-r * t))));
    }

    return { labels, exponential, logistic };
  };

  const { labels, exponential, logistic } = generateData();

  const chartData = {
    labels,
    datasets: [
      {
        label: "Exponential Growth",
        data: exponential,
        borderColor: "#f87171",
        fill: false,
        tension: 0.3
      },
      {
        label: "Logistic Growth",
        data: logistic,
        borderColor: "#34d399",
        fill: false,
        tension: 0.3
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false }
    },
    scales: {
      x: { title: { display: true, text: "Time" } },
      y: { title: { display: true, text: "Population Size" } }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-gray-200 to-pink-300 flex flex-col items-center p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">
        🌱 Population Growth Simulator
      </h1>

      {/* Controls */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 mb-6 grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-bold text-purple-800">
            👥 Initial Population (N₀): {initialN}
          </label>
          <input
            type="range"
            min="10"
            max="200"
            value={initialN}
            onChange={(e) => setInitialN(Number(e.target.value))}
            className="w-full"
          />

          <label className="block font-bold text-purple-800 mt-4">
            📈 Growth Rate (r): {r}
          </label>
          <input
            type="range"
            min="0.01"
            max="0.5"
            step="0.01"
            value={r}
            onChange={(e) => setR(Number(e.target.value))}
            className="w-full"
          />

          <label className="block font-bold text-purple-800 mt-4">
            ⛰ Carrying Capacity (K): {K}
          </label>
          <input
            type="range"
            min="100"
            max="1000"
            step="50"
            value={K}
            onChange={(e) => setK(Number(e.target.value))}
            className="w-full"
          />

          <label className="block font-bold text-purple-800 mt-4">
            ⏱ Time Steps: {timeSteps}
          </label>
          <input
            type="range"
            min="20"
            max="100"
            value={timeSteps}
            onChange={(e) => setTimeSteps(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Instructions */}
        <div className="instructions flex flex-col justify-center text-purple-800 text-sm md:text-base font-bold w-3">
          <p>🎯 <b>Objective:</b> Observe how population grows based on parameters.</p>
          <p>📈 Exponential Growth → J-shaped curve, unlimited growth.</p>
          <p>🌍 Logistic Growth → S-shaped curve, stabilizes at carrying capacity (K).</p>
          <p>👉 Adjust values and see the effect!</p>
        </div>
      </div>

      {/* Formulas */}
      <div className="formulas w-full max-w-4xl rounded-2xl shadow-lg p-6 bg-white mb-6">
        <h2>📐 Formulas</h2>
        <p><b>Exponential Growth:</b> N(t) = N₀ × e<sup>r × t</sup></p>
        <p><b>Logistic Growth:</b> N(t) = K / (1 + ((K - N₀)/N₀) × e<sup>-r × t</sup>)</p>
      </div>

      {/* Chart */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-4 md:p-6">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

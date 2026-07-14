import { useEffect, useState } from "react";
import axios from "axios";
import "./Analytics.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  useEffect(() => {

  axios
  .get("https://onrender.com")
  .then((res) => {
    setAnalytics(res.data);
    setLoading(false);
  })

    .catch((err) => {
      console.log(err);
      setLoading(false);
    });

  axios
    .get("http://127.0.0.1:5000/history")
    .then((res) => {
      setHistory(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

}, []);

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        Loading Analytics...
      </h2>
    );
  }

  const featureData = {
    labels: analytics.feature_importance.map(item => item.name),

    datasets: [
      {
        label: "Feature Importance (%)",

        data: analytics.feature_importance.map(item => item.weight),

        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#06b6d4"
        ]
      }
    ]
  };

  const predictionData = {
    labels: ["Fake", "Real"],

    datasets: [
      {
        data: [
          analytics.dataset_distribution.fake,
          analytics.dataset_distribution.real
        ],

        backgroundColor: [
          "#ef4444",
          "#22c55e"
        ]
      }
    ]
  };
const riskData = {

  labels: history.map((item, index) => `P${index + 1}`),

  datasets: [
    {
      label: "Risk Score",

      data: history.map(item => item.risk_score),

      borderColor: "#2563eb",

      backgroundColor: "#3b82f6",

      fill: false,

      tension: 0.3
    }
  ]

};
 

  const performanceData = {

    labels: [
      "Accuracy",
      "Precision",
      "Recall",
      "F1 Score"
    ],

    datasets: [
      {
        data: [
          analytics.model_performance.accuracy,
          analytics.model_performance.precision,
          analytics.model_performance.recall,
          analytics.model_performance.f1
        ],

        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444"
        ]
      }
    ]
  };

  const datasetData = {

    labels: [
      "Fake Accounts",
      "Real Accounts"
    ],

    datasets: [
      {
        data: [
          analytics.dataset_distribution.fake,
          analytics.dataset_distribution.real
        ],

        backgroundColor: [
          "#ef4444",
          "#22c55e"
        ]
      }
    ]
  };

  return (

  <div className="analytics-container">

    <h1 className="analytics-title">
      📊 Analytics Dashboard
    </h1>

    <div className="analytics-grid">

      <div className="chart-card">
        <h3>Feature Importance</h3>
        <div className="chart-box">
          <Bar
            data={featureData}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>

      <div className="chart-card">
        <h3>Dataset Distribution</h3>
        <div className="chart-box">
          <Pie
            data={datasetData}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>

      <div className="chart-card">
        <h3>Risk Trend</h3>
        <div className="chart-box">
          <Line
            data={riskData}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>

      <div className="chart-card">
        <h3>Model Performance</h3>
        <div className="chart-box">
          <Doughnut
            data={performanceData}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>

    </div>

  </div>

);
}

export default Analytics;
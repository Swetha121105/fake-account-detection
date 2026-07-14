import React, { useContext } from "react";
import { PredictionContext } from "../context/PredictionContext";
import "./Dashboard.css";

function Dashboard() {

  const { predictionData } = useContext(PredictionContext);

  if (!predictionData) {
    return (
      <div className="dashboard-container">

        <h1>📊 AI Dashboard</h1>

        <div className="empty-card">

          <h2>No Prediction Available</h2>

          <p>
            Go to the Detect page and analyze a social media account.
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="dashboard-container">

      <h1 className="dashboard-title">

        📊 DeepScan AI Dashboard

      </h1>

      {/* Summary Cards */}

      <div className="cards">

        <div className="card blue">

          <h3>Prediction</h3>

          <h2>

            {predictionData.prediction === "Fake"
              ? "❌ Fake"
              : "✅ Real"}

          </h2>

        </div>

        <div className="card green">

          <h3>Confidence</h3>

          <h2>{predictionData.confidence}%</h2>

        </div>

        <div className="card orange">

          <h3>Risk Score</h3>

          <h2>{predictionData.risk_score}/100</h2>

        </div>

      </div>

      {/* Main Content */}

      <div className="dashboard-grid">

        {/* Reasons */}

        <div className="panel">

          <h2>🔍 Prediction Reasons</h2>

          <ul className="reason-list">

            {predictionData.reasons.map((reason, index) => (

              <li key={index}>{reason}</li>

            ))}

          </ul>

        </div>

        {/* Feature Importance */}

        <div className="panel">

          <h2>📈 Feature Importance</h2>

          {predictionData.feature_weights.map((feature, index) => (

            <div
              key={index}
              className="progress-box"
            >

              <div className="progress-header">

                <span>{feature.name}</span>

                <span>{feature.weight}%</span>

              </div>

              <div className="progress-track">

                <div
                  className="progress-fill"
                  style={{
                    width: `${feature.weight}%`
                  }}
                ></div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Dashboard;
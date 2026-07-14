import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../App.css';
import { PredictionContext } from "../context/PredictionContext";

function Detect() {

  const { setPredictionData } = useContext(PredictionContext);

  const [formData, setFormData] = useState({
    profilePic: 1,
    follows: '',
    followers: '',
    posts: '',
    privateAccount: 0,
    usernameLengthRatio: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: parseFloat(value) || 0
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setResult(null);
    setError(null);

    const payload = {
      profile_pic: formData.profilePic,
      follows: formData.follows,
      followers: formData.followers,
      posts: formData.posts,
      private: formData.privateAccount,
      username_ratio: formData.usernameLengthRatio
    };

    try {

      const response = await axios.post(
  "https://onrender.com",
  payload
);

setResult(response.data);


      // ✅ Save prediction globally
      setPredictionData(response.data);

    } catch (err) {

      setError(
        err.response?.data?.error ||
        "Failed to reach your ML API engine."
      );

    } finally {

      setLoading(false);

    }
  };

  const getRiskDetails = (score) => {
    if (score < 35)
      return {
        color: "#10b981",
        bg: "#ecfdf5",
        border: "#a7f3d0",
        text: "LOW RISK",
        badge: "🟢"
      };

    if (score < 70)
      return {
        color: "#f59e0b",
        bg: "#fffbe6",
        border: "#fef3c7",
        text: "MEDIUM RISK",
        badge: "🟡"
      };

    return {
      color: "#ef4444",
      bg: "#fef2f2",
      border: "#fecaca",
      text: "HIGH RISK",
      badge: "🔴"
    };
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">

        {/* HEADER */}

        <header className="main-header">
          <h1>🛡️ DeepScan AI</h1>
          <p>
            Enterprise Explainable Social Media Risk &
            Account Fraud Classifier
          </p>
        </header>

        <div className="dashboard-grid">

          {/* LEFT PANEL */}

          <div className="input-panel">

            <h2 className="panel-title">
              Account Metadata Input
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="form-group-row">

                <div className="form-field">
                  <label>Profile Picture</label>

                  <select
                    name="profilePic"
                    value={formData.profilePic}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value={1}>Present</option>
                    <option value={0}>Missing</option>
                  </select>

                </div>

                <div className="form-field">

                  <label>Privacy Status</label>

                  <select
                    name="privateAccount"
                    value={formData.privateAccount}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value={1}>Private</option>
                    <option value={0}>Public</option>
                  </select>

                </div>

              </div>

              <div className="form-field">

                <label>Following Count</label>

                <input
                  type="number"
                  name="follows"
                  value={formData.follows}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="e.g. 450"
                />

              </div>

              <div className="form-field">

                <label>Followers Count</label>

                <input
                  type="number"
                  name="followers"
                  value={formData.followers}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="e.g. 1200"
                />

              </div>

              <div className="form-field">

                <label>Total Feed Posts</label>

                <input
                  type="number"
                  name="posts"
                  value={formData.posts}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="e.g. 84"
                />

              </div>

              <div className="form-field">

                <label>Username Digits-to-Length Ratio</label>

                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  name="usernameLengthRatio"
                  value={formData.usernameLengthRatio}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="0.00 to 1.00"
                />

              </div>

              <button
                type="submit"
                disabled={loading}
                className="submit-btn"
              >
                {loading
                  ? "Evaluating AI Weights..."
                  : "Run Diagnostics"}
              </button>

            </form>

          </div>

          {/* RIGHT PANEL */}

          <div className="output-display">

            {error && (
              <div className="error-banner">
                ⚠️ Connection Fault: {error}
              </div>
            )}

            {!result && !error && (

              <div className="empty-state">

                <span>📊</span>

                <h3>Awaiting Input Vectors</h3>

                <p>
                  Fill out the target configuration schema
                  and deploy the model pipeline to view
                  deep-metric analytics.
                </p>

              </div>

            )}

            {result && (

              <div className="results-card">

                <div className="status-header">

                  <div>

                    <span className="status-label">
                      PREDICTION TARGET
                    </span>

                    <span
                      className={`prediction-text ${
                        result.prediction === "Fake"
                          ? "prediction-fake"
                          : "prediction-real"
                      }`}
                    >
                      {result.prediction === "Fake"
                        ? "❌ Fake Profile"
                        : "✅ Real Profile"}
                    </span>

                  </div>

                  <div
                    className="risk-badge"
                    style={{
                      background:
                        getRiskDetails(result.risk_score).bg,
                      border: `1px solid ${
                        getRiskDetails(result.risk_score).border
                      }`,
                      color:
                        getRiskDetails(result.risk_score).color
                    }}
                  >
                    {getRiskDetails(result.risk_score).badge}{" "}
                    {getRiskDetails(result.risk_score).text}
                  </div>

                </div>

                <div className="meters-row">

                  <div className="meter-card">

                    <div className="meter-label">
                      INFERENCE CONFIDENCE
                    </div>

                    <div className="meter-value">
                      {result.confidence}<span>%</span>
                    </div>

                  </div>

                  <div className="meter-card">

                    <div className="meter-label">
                      RISK COEFFICIENT
                    </div>

                    <div className="meter-value">
                      {result.risk_score}<span>/100</span>
                    </div>

                  </div>

                </div>

                <div>

                  <h4 className="section-title">
                    🔎 Algorithmic Vector Diagnostics
                  </h4>

                  <div className="reasons-list">

                    {result.reasons.map((reason, idx) => (

                      <div
                        key={idx}
                        className="reason-item"
                        style={{
                          borderLeft: `4px solid ${
                            result.prediction === "Fake"
                              ? "#ef4444"
                              : "#10b981"
                          }`
                        }}
                      >
                        • {reason}
                      </div>

                    ))}

                  </div>

                </div>

                <div>

                  <h4 className="section-title">
                    📊 Model Weights / Feature Attribution
                  </h4>

                  <div className="chart-container">

                    {result.feature_weights.map((feature, idx) => (

                      <div
                        key={idx}
                        className="chart-row"
                      >

                        <div className="chart-info">

                          <span>{feature.name}</span>

                          <span className="chart-info-value">
                            {feature.weight}%
                          </span>

                        </div>

                        <div className="progress-track">

                          <div
                            className="progress-fill"
                            style={{
                              width: `${feature.weight}%`,
                              background:
                                result.prediction === "Fake"
                                  ? "#3b82f6"
                                  : "#10b981"
                            }}
                          />

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default Detect;
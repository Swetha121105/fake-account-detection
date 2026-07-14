import "./Home.css";
import { Link } from "react-router-dom";
import { FaRobot, FaChartBar, FaShieldAlt, FaBrain } from "react-icons/fa";

function Home() {
  return (
    <div className="home">

      <section className="hero">

        <div className="hero-left">

          <h1>
            AI Powered <span>Fake Social Media</span> Detection
          </h1>

          <p>
            Detect fake accounts using Artificial Intelligence,
            Machine Learning.
            Get instant predictions with confidence score,
            risk analysis and feature importance.
          </p>

          <div className="hero-buttons">

            <Link to="/detect">
              <button className="btn-primary">
                Start Detection
              </button>
            </Link>

            

          </div>

        </div>

        <div className="hero-right">

          <div className="ai-box">

            🤖

          </div>

        </div>

      </section>

      <section className="stats">

        <div className="stat-card">
          <h2>97%</h2>
          <p>Model Accuracy</p>
        </div>

       

        <div className="stat-card">
          <h2>Real Time</h2>
          <p>Instant Detection</p>
        </div>

        <div className="stat-card">
          <h2>ML</h2>
          <p>Random Forest Model</p>
        </div>

      </section>

      <section className="features">

        <h2>Project Features</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <FaShieldAlt size={45}/>
            <h3>Fake Account Detection</h3>
            <p>Predict fake and genuine accounts using ML.</p>
          </div>

          

          <div className="feature-card">
            <FaChartBar size={45}/>
            <h3>Analytics</h3>
            <p>Visualize model performance and insights.</p>
          </div>

          <div className="feature-card">
            <FaRobot size={45}/>
            <h3>Risk Analysis</h3>
            <p>Confidence score and risk coefficient.</p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;
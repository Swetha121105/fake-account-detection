import { useEffect, useState } from "react";
import axios from "axios";

function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    axios
      .get("http://127.0.0.1:5000/history")
      .then((res) => {
        setHistory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (

    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,.1)"
      }}
    >

      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#2563eb"
        }}
      >
        Prediction History
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px"
        }}
      >

        <thead>

          <tr
            style={{
              background: "#2563eb",
              color: "white"
            }}
          >
            <th style={{ padding: "10px" }}>Time</th>
            <th>Prediction</th>
            <th>Confidence</th>
            <th>Risk</th>
            <th>Followers</th>
            <th>Following</th>
          </tr>

        </thead>

        <tbody>

          {history.length === 0 ? (

            <tr>
              <td
                colSpan="6"
                style={{
                  padding: "20px",
                  textAlign: "center"
                }}
              >
                No Prediction History
              </td>
            </tr>

          ) : (

            history.map((item, index) => (

              <tr
                key={index}
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid #eee"
                }}
              >

                <td style={{ padding: "10px" }}>
                  {item.time}
                </td>

                <td
                  style={{
                    color:
                      item.prediction === "Fake"
                        ? "red"
                        : "green",
                    fontWeight: "bold"
                  }}
                >
                  {item.prediction}
                </td>

                <td>{item.confidence}%</td>

                <td>{item.risk_score}%</td>

                <td>{item.followers}</td>

                <td>{item.following}</td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

}

export default History;
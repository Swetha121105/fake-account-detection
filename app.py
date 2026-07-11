from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
from datetime import datetime
app = Flask(__name__)
CORS(app)
model = joblib.load("model/fake_detector.pkl")
metrics = joblib.load("model/model_metrics.pkl")
df = pd.read_csv("dataset/train.csv")
prediction_history = []
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        profile_pic = float(data.get("profile_pic", 1))
        follows = float(data.get("follows", 0))
        followers = float(data.get("followers", 0))
        posts = float(data.get("posts", 0))
        private = float(data.get("private", 0))
        username_ratio = float(data.get("username_ratio", 0))
        X = pd.DataFrame([{
            "profile pic": profile_pic,
            "#follows": follows,
            "#followers": followers,
            "#posts": posts,
            "private": private,
            "nums/length username": username_ratio
        }])
        prediction = int(model.predict(X)[0])
        probability = model.predict_proba(X)[0]
        confidence = round(float(probability[prediction]) * 100, 2)
        risk_score = round(float(probability[1]) * 100, 2)
        prediction_label = "Fake" if prediction == 1 else "Real"
        reasons = []
        if profile_pic == 0:
            reasons.append("Profile picture is missing.")
        if followers < 30:
            reasons.append("Very low follower count.")
        if follows > 1500:
            reasons.append("Very high following count.")
        if posts == 0:
            reasons.append("No posts available.")
        if username_ratio > 0.30:
            reasons.append("Username contains many digits.")
        if private == 0:
            reasons.append("Public account.")
        if len(reasons) == 0:
            reasons.append("Account behaviour appears normal.")
        feature_names = [
            "Profile Picture",
            "Following",
            "Followers",
            "Posts",
            "Private Account",
            "Username Ratio"
        ]
        importance = model.feature_importances_
        feature_weights = []
        for name, weight in zip(feature_names, importance):
            feature_weights.append({
                "name": name,
                "weight": round(float(weight * 100), 2)
            })
        feature_weights = sorted(
            feature_weights,
            key=lambda x: x["weight"],
            reverse=True
        )
        prediction_history.append({

            "time": datetime.now().strftime("%d-%m-%Y %H:%M:%S"),

            "prediction": prediction_label,

            "confidence": confidence,

            "risk_score": risk_score,

            "followers": int(followers),

            "following": int(follows)

        })

        # ===========================
        # Return Response
        # ===========================

        return jsonify({

            "prediction": prediction_label,

            "confidence": confidence,

            "risk_score": risk_score,

            "reasons": reasons,

            "feature_weights": feature_weights

        })

    except Exception as e:

        return jsonify({

            "error": str(e)

        }), 500


# ===========================
# Analytics API
# ===========================

@app.route("/analytics", methods=["GET"])
def analytics():

    feature_names = [

        "Profile Picture",
        "Following",
        "Followers",
        "Posts",
        "Private Account",
        "Username Ratio"

    ]

    importance = model.feature_importances_

    feature_importance = []

    for name, weight in zip(feature_names, importance):

        feature_importance.append({

            "name": name,

            "weight": round(float(weight * 100), 2)

        })

    feature_importance = sorted(
        feature_importance,
        key=lambda x: x["weight"],
        reverse=True
    )

    fake_accounts = int(df["fake"].sum())

    real_accounts = len(df) - fake_accounts

    return jsonify({

        "feature_importance": feature_importance,

        "dataset_distribution": {

            "fake": fake_accounts,

            "real": real_accounts

        },

       "model_performance": metrics

    })


# ===========================
# Prediction History API
# ===========================

@app.route("/history", methods=["GET"])
def history():

    return jsonify(prediction_history[::-1])


# ===========================
# Home Route
# ===========================

@app.route("/")
def home():

    return jsonify({

        "message": "DeepScan AI Backend Running Successfully"

    })


# ===========================
# Run Flask
# ===========================

if __name__ == "__main__":
    app.run(debug=True, port=5000)
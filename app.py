from flask import Flask, request, jsonify
import pandas as pd
import base64
from io import BytesIO

app = Flask(__name__)

def run_analysis(dataframe):
    # Example analysis function
    results = {
        "summary": "Analysis summary",
        "data": dataframe.describe().to_dict()
    }
    return results

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    file = base64.b64decode(data['file'])
    df = pd.read_csv(BytesIO(file))
    results = run_analysis(df)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
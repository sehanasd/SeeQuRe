from flask import Flask, request, jsonify
from model import get_prediction_from_url, main


app = Flask(__name__)

@app.route('/model_prediction', methods=['POST'])
def model_prediction():
    data = request.get_json()
    url = data['url']

    features = main(url)

    prediction = get_prediction_from_url(url)

    return jsonify({'prediction': prediction})
    


if __name__ == '__main__':
    app.run(debug=True)
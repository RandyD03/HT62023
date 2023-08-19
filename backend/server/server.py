from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from cv.imageProcessing import processAllImages

BOXES = []

app = Flask(__name__)
CORS(
    app,
    resources={
        r"/*/": {"origins": ["https://localhost:3000", "http://localhost:3000"]}
    },
)

# Members API Route

name = ""


@app.route("/useradd", methods=["POST"])
def useradd():
    name = request.json[""]

    return name


@app.route("/listusers", methods=["GET"])
def listusers():
    return name


@app.route("/processImages", methods=["POST"])
def processImages():
    request_data = request.json

    imageDimensions = processAllImages(request_data)
    return response


if __name__ == "__main__":
    app.run(debug=True)

"""
JSON SCHEMAS

POST:
{
    "boxes": [{
        "name": ''
        "width": 
        "length":
        "height":
    }],
    "images": [{
        "front": '',    // base64 string
        "side": ''      // base64 string
        }]
    
}

GET:
{

}
"""

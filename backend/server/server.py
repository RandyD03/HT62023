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
    imageList = request.json["images"]

    return name


@app.route("/listusers", methods=["GET"])
def listusers():
    return name


@app.route("/processImages", methods=["POST"])
def processImages():
    request_data = request.json

    imageDimensions = processAllImages(request_data)
    print(imageDimensions)
    return []


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
        "unique_id": 
        }]
    
}

GET:
{
    "boxes": [{
        transparent: true,
        position: [0, 0, 0],
        size: [5, 5, 5],
        color: "grey",
    },
    {
        transparent: false,
        position: [0, 0, 0],
        size: [1, 1, 1],
        color: "red",
    }]
}

"""

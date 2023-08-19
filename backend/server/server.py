from flask import Flask, jsonify, request
from flask_cors import CORS

import "../cv/imageProcessing" as imageProcessing

app = Flask(__name__)
CORS(app)

# Members API Route

name = ""


@app.route("/useradd", methods=["POST"])
def useradd():
    imageList = request.json["images"]
    

    return name


@app.route("/listusers", methods=["GET"])
def listusers():
    return name


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

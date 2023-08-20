from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import boto3
from decouple import config

S3_BUCKET = config('S3_BUCKET')
S3_KEY = config('S3_KEY')
S3_SECRET = config('S3_SECRET')


s3 = boto3.client(
    's3',
    aws_access_key_id=S3_KEY,
    aws_secret_access_key=S3_SECRET,
    region_name='us-east-2')

from cv.imageProcessing import processAllImages
import packer
import json

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
    
    # #Upload to s3
    front_image = "imgStore/" + imageDimensions['frontImg']
    side_image = "imgStore/" +  imageDimensions['sideImg']
    
    s3.upload_file(front_image, str(S3_BUCKET), imageDimensions['frontImg'])
    s3.upload_file(side_image, str(S3_BUCKET), imageDimensions['sideImg'])
    imageDimensions['frontImg'] = f"https://{S3_BUCKET}.s3.amazonaws.com/{imageDimensions['frontImg']}"
    imageDimensions['sideImg'] = f"https://{S3_BUCKET}.s3.amazonaws.com/{imageDimensions['sideImg']}"
    
    return imageDimensions


@app.route("/computeResult", methods=["POST"])
def computeResult():
    request_data = request.json

    boxes = [{
        "width": 2,
        "height": 2,
        "length": 2,
        "name": "small",
        "id": 0
        },
    {
        "width": 4,
        "height": 4,
        "length": 4,
        "name": "medium",
        "id": 1
    }    
    ]

    items = [
        {
        "width":  1,
        "height": 1,
        "length": 1,
        "name": "doritos",
        "id": 0
        },
    {
        "width": 1,
        "height": 1,
        "length": 1,
        "name": "chipmunk",
        "id": 1
    }    
    ]

    result = packer.packItems(items, boxes)

    return json.dumps(result)




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

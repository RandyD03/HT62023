from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Members API Route

name = ""


@app.route("/useradd", methods=["POST"])
def useradd():
    name = request.json[""]
    
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
        }]
    
}

GET:
{

}
"""

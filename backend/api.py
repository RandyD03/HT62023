from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

#Struct to return
objects = {}

class OptimizeBox(Resource):
     
    '''Get Request'''
    def get(self, object_id):
        return {object_id: objects[object_id]}
    
    '''Post Request'''
    def put(self, object_id):
        objects[object_id] = request.form['data']
        return {object_id: objects[object_id]}

        
    
api.add_resource(OptimizeBox, '/<string:object_id>')



if __name__ == '__main__':
    app.run()
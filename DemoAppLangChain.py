from crypt import methods
from flask import Flask, request
from flask_restful import Api
from flask_cors import CORS, cross_origin
import logging as log
from semantic_search_test import process_question_test
from flask import jsonify
app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})
api = Api(app)
log.basicConfig(format="%(asctime)s %(message)s", level=log.DEBUG)


# @app.route('/process_question_commect', methods=['POST'])
# @cross_origin()
# def ChatModelTestCommect():
#     question_asked1 = request.json['question_asked1'] 
#     question_asked2 = request.json['question_asked2'] 
#     question_asked3 = request.json['question_asked3'] 
#     answer1 = request.json['answer1']
#     answer2 = request.json['answer2']
#     dict = process_question_test_commect(question_asked1, question_asked2,question_asked3, answer1, answer2)
#     return jsonify(dict)

@app.route('/process_question_test', methods=['POST'])
@cross_origin()
def ChatModelTest():
    print("usao ovde")
    question_asked1 = request.json['question_asked1'] 
    question_asked2 = request.json['question_asked2'] 
    question_asked3 = request.json['question_asked3'] 
    answer1 = request.json['answer1']
    answer2 = request.json['answer2']
    dict = process_question_test(question_asked1, question_asked2,question_asked3, answer1, answer2)
    return jsonify(dict)


# @app.route('/process_question', methods=['POST'])
# @cross_origin()
# def ChatModel():
#     question_asked1 = request.json['question_asked1'] 
#     question_asked2 = request.json['question_asked2'] 
#     question_asked3 = request.json['question_asked3'] 
#     dict = process_question(question_asked1, question_asked2,question_asked3)
#     return jsonify(dict)

@app.route('/test', methods=['GET'])
@cross_origin()
def test():
    
    return str("Test ok")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=14511)
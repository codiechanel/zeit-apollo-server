from flask import Flask, request, jsonify
from flask_cors import CORS
from newspaper import Article
import json

# moduleName = input('Enter module name:')
# from api._util.cool import runme

# importlib.import_module('cool')

# from .cool import runme
# from .cool import runme
# from _cool import runme
# from src._cool import runme
# from cool import runme
# from cool import runme
# from util.cool import runme

app = Flask(__name__)
CORS(app)

@app.route('/', defaults={'path': ''})
# @app.route('/parse')
@app.route('/<path:path>')
# def hello_world(path):
def catch_all(path):
    # here we want to get the value of user (i.e. ?user=some-value)
    urlString = request.args.get('url')
    print('the url' + urlString)
    article = Article(urlString)

    article.download()


    # print(article.html)
    article.parse()

    print('the path', path)

    response = {"article": article.text}

    return jsonify(response)
    # return Response("<h1>Flask</h1><p>You nice visited: /%s</p>" % (path), mimetype="text/html")


if __name__ == "__main__":
    app.run(debug=True)

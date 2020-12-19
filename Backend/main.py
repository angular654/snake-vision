# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import os
from flask import Flask, request, redirect, url_for
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'files'
ALLOWED_EXTENSIONS = set(
    ['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', '.jpg', '.png', '.mp4', '.avi'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    return file.filename + " загружен!"


@app.route('/download', methods=['GET'])
def download_file():
    filename = "OUT_VID.mp4"
    return filename + " скачан!"


if __name__ == "__main__":
    app.run(debug=True, port=8000)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/

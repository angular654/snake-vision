import os
from flask import Flask, request, redirect, url_for, Response, stream_with_context
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'files'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'mp4', 'avi', 'ogg', 'MOV','WMV','FLV','AVI'])
from flask_cors import CORS
from flask import jsonify

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return jsonify(file.filename + " uploaded!")

### SEND CHUNKS
CHUNK_SIZE = 8192
def read_file_chunks(path):
    with open(path, 'rb') as fd:
        while 1:
            buf = fd.read(CHUNK_SIZE)
            if buf:
                yield buf
            else:
                break
@app.route('/download/<name>')
def sending_file(name):
    fp = os.path.join(app.config['UPLOAD_FOLDER'], name)
    return Response(
        stream_with_context(read_file_chunks(fp)),
        headers={
                'Content-Disposition': f'attachment; filename={name}'
        }
    )

if __name__ == "__main__":
    app.run(debug=True, port=8000)

import os
from flask import Flask, request, redirect, url_for, Response, stream_with_context, render_template
from werkzeug.utils import secure_filename
import cv2
from flask_cors import CORS
from flask import jsonify

UPLOAD_FOLDER = 'files'
ALLOWED_EXTENSIONS = set(
    ['png', 'jpg', 'jpeg', 'mp4', 'avi', 'ogg', 'MOV', 'WMV', 'FLV', 'AVI'])

camera = cv2.VideoCapture(0)
'''
for ip camera use - rtsp://username:password@ip_address:554/user=username_password='password'_channel=channel_number_stream=0.sdp' 
for local webcam use cv2.VideoCapture(0)
'''


def gen_frames():
    while True:
        success, frame = camera.read()  # read the camera frame
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result


app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/live')
def live():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


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


# SEND CHUNKS
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

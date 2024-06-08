from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import openai
import os
from pydub import AudioSegment
import math

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///swag.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

openai.api_key = os.getenv("OPENAI_API_KEY")

class Meeting(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    transcript = db.Column(db.Text, nullable=False)
    summary = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)

@app.before_request
def create_tables():
    if not os.path.exists('swag.db'):
        db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/schedule')
def schedule():
    return render_template('schedule.html')

@app.route('/checkin')
def checkin():
    return render_template('checkin.html')

@app.route('/summarize', methods=['GET', 'POST'])
def summarize():
    if request.method == 'POST':
        if 'audio' not in request.files:
            return "No audio file part", 400
        audio_file = request.files['audio']
        if audio_file.filename == '':
            return "No selected file", 400
        audio_path = os.path.join('uploads', audio_file.filename)
        audio_file.save(audio_path)

        audio = AudioSegment.from_file(audio_path)
        chunk_length_ms = 5 * 60 * 1000  # 5 minutes per chunk
        chunks = make_chunks(audio, chunk_length_ms)
        transcript = ""

        for i, chunk in enumerate(chunks):
            chunk_path = f"chunk{i}.wav"
            chunk.export(chunk_path, format="wav")
            with open(chunk_path, "rb") as audio_chunk:
                response = openai.Audio.transcribe("whisper-1", audio_chunk)
                transcript += response['text'] + " "
            os.remove(chunk_path)

        response = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Summarize the following transcript, also detail feedback given if any, and provide actionable items for the company (things to do based on what was discussed or the feedback provided), also provide each person in the meetings feedback, opion and status as different sub-headings for each person in depth(general statements and declarations etc) that would be essential or needed for a company in their meeting notes and per person database, do so in a clear and organized: {transcript}"}
            ]
        )

        summary = response.choices[0].message['content'].strip()
        meeting = Meeting(transcript=transcript, summary=summary, user_id=1)  # Replace with actual user_id
        db.session.add(meeting)
        db.session.commit()

        return jsonify({'transcript': transcript, 'summary': summary})
    return render_template('summarize.html')

def make_chunks(audio_segment, chunk_length_ms):
    num_chunks = math.ceil(len(audio_segment) / chunk_length_ms)
    return [audio_segment[i * chunk_length_ms:(i + 1) * chunk_length_ms] for i in range(num_chunks)]

if __name__ == '__main__':
    app.run(debug=True)

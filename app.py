from flask import Flask, request, jsonify, render_template, session
from extensions import db
from datetime import datetime
import re

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'  # For simplicity, using SQLite
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# CHANGE SECRET KEY
app.config['SECRET_KEY'] = 'your_secret_key_here'
db.init_app(app)

from models import User, Preferences, Event_History
from services.database_operations import add_user as db_add_user, add_event as db_add_event, add_preferences as db_add_preferences

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signUp')
def signUp():
    return render_template('signUp.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    return render_template('getReady.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/event_history')
def event_history():
    return render_template('eventHistory.html')

@app.route('/edit_event_history')
def edit_event_history():
    return render_template('editEventHistory.html')

@app.route('/preferences')
def preferences():
    return render_template('preferences.html')

@app.route('/login-request', methods=['POST'])
def loginRequest():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and Password are required'}), 400

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        # Login successful, set up user session
        session['user_id'] = user.user_id
        return jsonify({'message': 'Logged in successfully'}), 200
    else:
        # Invalid credentials
        return jsonify({'error': 'Invalid username or password'}), 401


@app.route('/event_history/user/<int:user_id>', methods=['GET'])
def get_posts_by_user(user_id):
    events = Event_History.query.filter_by(user_id=user_id).all()
    events_data = [event.to_dict() for event in events]
    return jsonify(events_data)

@app.route('/add_preferences', methods=['POST'])
def add_preferences():
    data = request.get_json()
    user_id = int(data['user_id'])
    prep = int(data['prep'])
    shower = int(data['shower'])
    get_ready = int(data['get_ready'])
    fluff = int(data['fluff'])
    date_created = datetime.strptime(data['date_created'], '%Y-%m-%d').date()

    preferences = db_add_preferences(user_id=user_id, prep=prep, shower=shower, get_ready=get_ready, fluff=fluff, date_created=date_created)
    return jsonify(preferences.to_dict()), 201

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')
    
    # Validation
    if not re.match(r'^[^@]+@[^@]+\.[^@]+$', email):
        return jsonify({"error": "Invalid email format"}), 400
    
    if len(username) < 8:
        return jsonify({"error": "Username must be more than 8 characters long"}), 400

    if not re.match(r'^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$', password):
        return jsonify({"error": "Password must be at least 8 characters long and include at least one number, one uppercase, and one lowercase letter."}), 400

    user = db_add_user(f_name=data['f_name'], l_name=data['l_name'], email=data['email'], username=data['username'], password=data['password'])
    return jsonify(user.to_dict()), 201

# TO DO: I broke everything and have no idea what the FUCK i changed :(
    # NOT NO MORE LETS FUCKING GOOOO
@app.route('/add_event', methods=['POST'])
def add_event():
    data = request.get_json()

    # Validation

    # Store in database
    user_id = data['user_id']
    name = data['name']
    date = datetime.strptime(data['date'], '%Y-%m-%d').date()
    # 24-hour format
    i_arrival = datetime.strptime(data['i_arrival'], '%H:%M').time()
    i_drive = int(data['i_drive'])
    # 12-hour format with AM/PM
    o_prep = datetime.strptime(data['o_prep'], '%I:%M %p').time()
    o_shower = datetime.strptime(data['o_shower'], '%I:%M %p').time() if 'o_shower' in data else None
    o_get_ready = datetime.strptime(data['o_get_ready'], '%I:%M %p').time() if 'o_get_ready' in data else None
    o_leave = datetime.strptime(data['o_leave'], '%I:%M %p').time()
    event = db_add_event(user_id=user_id, name=name, date=date, i_arrival=i_arrival, i_drive=i_drive, o_prep=o_prep, o_shower=o_shower, o_get_ready=o_get_ready, o_leave=o_leave)
    return jsonify(event.to_dict()), 201

@app.route('/tasks')
def show_tasks():
    users = User.query.all()
    prefs = Preferences.query.all()
    events = Event_History.query.all()

    users_result = '<br>'.join([f'{user.user_id} | {user.f_name} {user.l_name} | {user.username} | {user.password}' for user in users])
    prefs_result = '<br>'.join([f'{pref.pref_id} | {pref.user_id} | {pref.prep} | {pref.shower} | {pref.get_ready} | {pref.fluff} | {pref.active}' for pref in prefs])
    events_result = '<br>'.join([f'{event.event_id} | {event.user_id} | {event.name} | {event.date} | {event.i_arrival} | {event.i_drive} | {event.o_prep} | {event.o_leave}' for event in events])

    combined_result = f"{users_result}<br>{prefs_result}<br>{events_result}"
    
    return combined_result

if __name__ == "__main__":
    app.run(debug=True)
from flask import Flask, request, jsonify, render_template, session
from extensions import db
from datetime import datetime
import re

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'  # For simplicity, using SQLite
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = b'\xfd\xba\x14\x9b\x80\x91\xbeO\xbdo\xa5\xfa\xf5\x1a\x8eJ\x99\xde\xd7\x0b\xf9\xa6\xbb\x05'
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

@app.route('/preferences')
def preferences():
    return render_template('preferences.html')

@app.route('/get_events_by_date/<int:user_id>', methods=['GET'])
def get_events_by_date(user_id):
    query_date = request.args.get('date')  # Date should be passed as a query parameter
    if query_date:
        query_date = datetime.strptime(query_date, '%Y-%m-%d').date()
        events = Event_History.query.filter_by(user_id=user_id, date=query_date).all()
        return jsonify([event.to_dict() for event in events]), 200
    return jsonify({'error': 'Missing date parameter'}), 400

@app.route('/update_preferences/<int:user_id>', methods=['POST'])
def update_preferences(user_id):
    data = request.get_json()
    preferences = Preferences.query.filter_by(user_id=user_id).first()
    if preferences:
        preferences.prep = data.get('prep', preferences.prep)
        preferences.shower = data.get('shower', preferences.shower)
        preferences.get_ready = data.get('get_ready', preferences.get_ready)
        preferences.fluff = data.get('fluff', preferences.fluff)
        db.session.commit()
        return jsonify(preferences.to_dict()), 200
    else:
        return jsonify({'error': 'Preferences not found'}), 404

@app.route('/get_user_id', methods=['GET'])
def get_user_id():
    if 'user_id' in session:
        user_id = session['user_id']
        if user_id:
            return jsonify(user_id)
        else:
            return jsonify({'error': 'User ID not found'}), 404
    return jsonify({'message': 'User not authenticated'}), 401

@app.route('/get_preferences', methods=['GET'])
def get_preferences():
    if 'user_id' in session:
        user_id = session['user_id']
        preferences = Preferences.query.filter_by(user_id=user_id).first()
        if preferences:
            return jsonify(preferences.to_dict())
        else:
            return jsonify({'error': 'Preferences not found'}), 404
    return jsonify({'message': 'User not authenticated'}), 401

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
    
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "Logged out successfully"})

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

if __name__ == "__main__":
    app.run(debug=True)
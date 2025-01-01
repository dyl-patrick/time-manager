from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import date
from datetime import time

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'  # For simplicity, using SQLite
db = SQLAlchemy(app)

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    f_name = db.Column(db.String(20), nullable=False)
    l_name = db.Column(db.String(21), nullable=False)
    username = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(50))
    preferences = db.relationship('Preferences', back_populates='user', uselist=False, cascade='all, delete-orphan')
    event_history = db.relationship('Event_History', backref='user', lazy=True)

class Preferences(db.Model):
    pref_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), unique=True)
    prep = db.Column(db.Integer, nullable=False)
    shower = db.Column(db.Integer, nullable=False)
    get_ready = db.Column(db.Integer, nullable=False)
    fluff = db.Column(db.Integer, nullable=False)
    date_created = db.Column(db.Date)
    active = db.Column(db.Boolean, nullable=False)
    user = db.relationship('User', back_populates='preferences')

class Event_History(db.Model):
    event_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    name = db.Column(db.String(20), nullable=False)
    date = db.Column(db.Date, nullable=False)
    i_arrival = db.Column(db.Time, nullable=False)
    i_drive = db.Column(db.Integer, nullable=False)
    o_prep = db.Column(db.Time, nullable=False)
    o_shower = db.Column(db.Time)
    o_get_ready = db.Column(db.Time)
    o_leave = db.Column(db.Time, nullable=False)
    result = db.Column(db.Boolean)
    notes = db.Column(db.Text)

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return "Hello, World!"

@app.route('/add')
def add_entry():
    new_user = User(f_name="hello", l_name="hello", username="hello", password="hello", email="hello")
    new_pref = Preferences(prep=2, shower=2, get_ready=2, fluff=2, active=True)
    new_event = Event_History(user_id=1, name="hello", date=date.today(), i_arrival=time(14, 30), i_drive=20, o_prep=time(14, 30), o_leave=time(14, 30))
    db.session.add(new_user)
    db.session.add(new_pref)
    db.session.add(new_event)
    db.session.commit()
    return 'Entries added!'

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
from extensions import db

class User(db.Model):
    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True)
    f_name = db.Column(db.String(20), nullable=False)
    l_name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(50))
    username = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(20), nullable=False)
    preferences = db.relationship('Preferences', back_populates='user', uselist=False, cascade='all, delete-orphan')
    event_history = db.relationship('Event_History', backref='user', lazy=True)

    def __init__(self, f_name, l_name, username, password, email):
        self.f_name = f_name
        self.l_name = l_name
        self.username = username
        self.password = password
        self.email = email
    
    def __repr__(self):
        return f"<User {self.user_id} {self.username}"
    
    def to_dict(self):
        return {
        'user_id': self.user_id,
        'f_name': self.f_name,
        'l_name': self.l_name,
        'username': self.username,
        'password': self.password,
        'email': self.email
        }

class Preferences(db.Model):
    __tablename__ = "preferences"
    
    pref_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), unique=True)
    prep = db.Column(db.Integer, nullable=False)
    shower = db.Column(db.Integer, nullable=False)
    get_ready = db.Column(db.Integer, nullable=False)
    fluff = db.Column(db.Integer, nullable=False)
    date_created = db.Column(db.Date, nullable=False)
    user = db.relationship('User', back_populates='preferences')

    def __init__(self, user_id, prep, shower, get_ready, fluff, date_created):
        self.user_id = user_id
        self.prep = prep
        self.shower = shower
        self.get_ready = get_ready
        self.fluff = fluff
        self.date_created = date_created
    
    def __repr__(self):
        return f"<Preference {self.pref_id} {self.user_id}"
    
    def to_dict(self):
        return {
        'pref_id': self.pref_id,
        'user_id': self.user_id,
        'prep': self.prep,
        'shower': self.shower,
        'get_ready': self.get_ready,
        'fluff': self.fluff,
        'date_created': self.date_created
        }

class Event_History(db.Model):
    __tablename__ = "event_history"

    event_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
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

    def __init__(self, user_id, name, date, i_arrival, i_drive, o_prep, o_shower, o_get_ready, o_leave):
        self.user_id = user_id
        self.name = name
        self.date = date
        self.i_arrival = i_arrival
        self.i_drive = i_drive
        self.o_prep = o_prep
        self.o_shower = o_shower
        self.o_get_ready = o_get_ready
        self.o_leave = o_leave
        self.result = None
        self.notes = ""
    
    def __repr__(self):
        return f"<Event History {self.event_id} {self.user_id}"
    
    def to_dict(self):
        return {
        'event_id': self.event_id,
        'user_id': self.user_id,
        'name': self.name,
        'date': self.date.isoformat() if self.date else None,
        'i_arrival': self.i_arrival.strftime('%H:%M') if self.i_arrival else None,
        'i_drive': self.i_drive,
        'o_prep': self.o_prep.strftime('%I:%M %p') if self.o_prep else None,
        'o_shower': self.o_shower.strftime('%I:%M %p') if self.o_shower else None,
        'o_get_ready': self.o_get_ready.strftime('%I:%M %p') if self.o_get_ready else None,
        'o_leave': self.o_leave.strftime('%I:%M %p') if self.o_leave else None,
        'result': self.result,
        'notes': self.notes
        }


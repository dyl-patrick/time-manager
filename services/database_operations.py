from models import User, Preferences, Event_History
from extensions import db

# Create
def add_user(f_name, l_name, username, password, email):
    new_user = User(f_name=f_name, l_name=l_name, email=email, username=username, password=password)
    db.session.add(new_user)
    db.session.commit()
    return new_user

def add_event(user_id, name, date, i_arrival, i_drive, o_prep, o_shower, o_get_ready, o_leave):
    new_event = Event_History(user_id=user_id, name=name, date=date, i_arrival=i_arrival, i_drive=i_drive, o_prep=o_prep, o_shower=o_shower, o_get_ready=o_get_ready, o_leave=o_leave)
    db.session.add(new_event)
    db.session.commit()
    return new_event

def add_preferences(user_id, prep, shower, get_ready, fluff, date_created):
    new_preferences = Preferences(user_id=user_id, prep=prep, shower=shower, get_ready=get_ready, fluff=fluff, date_created=date_created)
    db.session.add(new_preferences)
    db.session.commit()
    return new_preferences

# Read
    # Login
    # Event History

# Update
    # Edit Event History
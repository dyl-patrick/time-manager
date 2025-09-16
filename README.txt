# Time Manager

Personalized pre-departure scheduling. Enter an event (date, arrival time, drive time) and get the exact times to leave, shower, get ready, wake up, and sleep—based on your own prep durations.

## Features
- User preferences for each prep step (durations)
- One-click step toggles (include/exclude) with instant calculation
- Event history with search + post-event reflections (success/late + why)
- Clear, incremental timeline of what to do and when

## How it works (logic)
- `leave_time = arrival_time - arrival_buffer - drive_time`
- `ready_start = leave_time - sum(enabled_step_durations)`
- `wake_time = ready_start - wake_buffer`
- `sleep_time = wake_time - user_sleep_need`

## Tech
- Backend: Python (Flask), SQLAlchemy
- Frontend: JavaScript, Tailwind CSS

## Local Setup
1) `python -m venv .venv && source .venv/bin/activate`  
2) `pip install -r requirements.txt`
5) `python3 app.py` and open the app
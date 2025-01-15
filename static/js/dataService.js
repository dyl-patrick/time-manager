import { displayValue, amPmConversion } from "/static/js/utilities.js";

export async function login(username, password) {
    return fetch('/login-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            console.log('Login successful:', data.message);
            window.location.href = '/dashboard';
        } else if (data.error) {
            console.error('Login failed:', data.error);
            alert('Login failed: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
        // UI Error Handling
    });
};

export async function addPreferences(user_id, prep, shower, get_ready, fluff, date_created) {
    fetch('/add_preferences', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: user_id,
            prep: prep,
            shower: shower,
            get_ready: get_ready,
            fluff: fluff,
            date_created: date_created
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Preferences created successfully!');
        console.log(data);
        window.location.href = '/login';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error creating preferences');
    });
};

export async function addUser(f_name, l_name, email, username, password) {
    try {
        const response = await fetch('/add_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                f_name: f_name,
                l_name: l_name,
                email: email,
                username: username,
                password: password
            })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to create user');
        }
        alert('User created successfully!');
        console.log(data);
        return { valid: true, user_id: data.user_id };
    } catch (error) {
        console.error('Error:', error);
        alert('Error creating user');
        return { valid: false, user_id: null };
        // UI Error Handling
    };
};

export function wakeUpPOST(user_id, name, date, i_arrival, i_drive, o_prep, o_shower, o_get_ready, o_leave) {
    fetch('/add_event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: user_id,
            name: name,
            date: date,
            i_arrival: i_arrival,
            i_drive: i_drive,
            o_prep: o_prep,
            o_shower: o_shower,
            o_get_ready: o_get_ready,
            o_leave: o_leave,
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Event created successfully!');
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error creating event');
    });
};

export function getReadyPOST(user_id, name, date, i_arrival, i_drive, o_prep, o_get_ready, o_leave) {
    fetch('/add_event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: user_id,
            name: name,
            date: date,
            i_arrival: i_arrival,
            i_drive: i_drive,
            o_prep: o_prep,
            o_get_ready: o_get_ready,
            o_leave: o_leave,
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Event created successfully!');
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error creating post');
    });
};

export function drivePOST(user_id, name, date, i_arrival, i_drive, o_prep, o_leave) {
    fetch('/add_event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: user_id,
            name: name,
            date: date,
            i_arrival: i_arrival,
            i_drive: i_drive,
            o_prep: o_prep,
            o_leave: o_leave,
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Post created successfully!');
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error creating post');
    });
};

export async function getEventHistory(userId) {
    const eventsContainer = document.getElementById('eventsContainer');
    eventsContainer.innerHTML = '';

    try {
        const response = await fetch(`/event_history/user/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        const events = await response.json();

        events.forEach(event => {
            const row = document.createElement('div');
            row.innerHTML = `
                <button class="collapsible">${event.name} on ${event.date}</button>
                <div class="content">
                    <div>
                        <p>Prep At: ${event.o_prep}</p>
                    </div>
                    <div>
                        <p>Shower At: ${displayValue(event.o_shower)}</p>
                    </div>
                    <div>
                        <p>Get Ready At: ${displayValue(event.o_get_ready)}</p>
                    </div>
                    <div>
                        <p>Leave At: ${event.o_leave}</p>
                    </div>
                    <div>
                        <p>Drive Time: ${event.i_drive}</p>
                    </div>
                    <div>
                        <p>Arrive At: ${amPmConversion(event.i_arrival)}</p>
                    </div>
                    <div>
                        <p>Outcome: ${displayValue(event.result)}</p>
                    </div>
                    <div>
                        <p>Notes: ${displayValue(event.notes)}</p>
                    </div>
                </div>
            `;
            eventsContainer.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        // UI Error Handling
    }
};

export async function getUserPreferences() {
    try {
        const response = await fetch('/get_preferences')
        if (!response.ok) {
            throw new Error('Failed to fetch preferences');
        }
        const data = await response.json();
        const { fluff, prep, shower, get_ready: getReady } = data;
        console.log("Preferences retrieved:", { fluff, prep, shower, getReady });

        return { fluff, prep, shower, getReady };

    } catch (error) {
        console.error('Error fetching preferences:', error);
        // UI Error Handling
        return { error: error.message };
    }
};

export async function logout() {
    const response = await fetch('/logout', {
        method: 'POST',
        credentials: 'include',
    });
    const data = await response.json();
    console.log(data);
    window.location.href = '/';
}

export async function getUserID() {
    try {
        const response = await fetch('/get_user_id')
        if (!response.ok) {
            throw new Error('Failed to fetch User ID');
        }
        const data = await response.json();;
        console.log(data, typeof(data));

        return data;

    } catch (error) {
        console.error('Error fetching preferences:', error);
        // UI Error Handling
        return { error: error.message };
    }
};

export async function updatePreferences(userId, prep, shower, getReady, fluff) {
    try {
        const response = await fetch(`/update_preferences/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prep: prep,
                shower: shower,
                get_ready: getReady,
                fluff: fluff
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error('Failed to update preferences. Status: ' + response.status);
            // UI Error Handling
        }

        console.log('Preferences updated successfully:', data);
    } catch (error) {
        console.error('Error updating preferences:', error);
        // UI Error Handling
    }
};

export async function eventsByDate(userId, date) {
    const eventEntries = document.getElementById('eventEntries');
    eventEntries.innerHTML = '';

    try {
        const response = await fetch(`/get_events_by_date/${userId}?date=${date}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const events = await response.json();
        console.log('Events fetched successfully:', events);

        events.forEach(event => {
            const row = document.createElement('div');
            row.innerHTML = `
                <h3>${event.name}</h3>
                <button class="collapsible">${event.name} on ${event.date}</button>
                <div class="content">
                    <div>
                        <p>Prep At: ${event.o_prep}</p>
                    </div>
                    <div>
                        <p>Shower At: ${displayValue(event.o_shower)}</p>
                    </div>
                    <div>
                        <p>Get Ready At: ${displayValue(event.o_get_ready)}</p>
                    </div>
                    <div>
                        <p>Leave At: ${event.o_leave}</p>
                    </div>
                    <div>
                        <p>Drive Time: ${event.i_drive}</p>
                    </div>
                    <div>
                        <p>Arrive At: ${amPmConversion(event.i_arrival)}</p>
                    </div>
                    <div>
                        <p>Outcome: ${displayValue(event.result)}</p>
                    </div>
                    <div>
                        <p>Notes: ${displayValue(event.notes)}</p>
                    </div>
                </div>
                            
                <div>
                    <p>Result</p>
                    <input type="radio" id="successful" name="outcome" value="true">
                    <label for="successful">Successful</label><br>
                    <input type="radio" id="unsuccessful" name="outcome" value="false">
                    <label for="unsuccessful">Unsuccessful</label><br>
                </div><br>
            
                <div>
                    <label for="editNotes">Add Notes</label>
                    <input type="text" id="editNotes" name="editNotes" placeholder=" ">
                </div><br>
            
                <button type="button" id="submitChanges">Submit Changes</button>
                <button type="button" id="deleteEvent">Delete Event</button>
            `;
            eventEntries.appendChild(row);
        });
        // Handle events data, e.g., display it on the page
        console.log(events);
        return events;
    } catch (error) {
        console.error('Error fetching events:', error);
        // Optionally handle the error by updating the UI to show an error message
    }
};

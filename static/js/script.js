import { login, addUser, addPreferences, getUserID } from "/static/js/dataService.js"
import { signUpValidation, getDate, defaultButton } from "/static/js/utilities.js";
import { userActions } from "/static/js/userActions.js";

document.addEventListener('DOMContentLoaded', function() {    
    var loginButton = document.getElementById('login');
    var defaultLengthButton = document.getElementById('defaultLength');
    var signUpButton = document.getElementById('signUp');
    var createPreferencesButton = document.getElementById('createPreferences');
    var todayDate = getDate();

    if (loginButton) {
        loginButton.addEventListener('click', async function(event) {
            event.preventDefault();

            let username = document.getElementById('username').value;
            let password = document.getElementById('password').value;

            login(username, password);
        });
    };

    // defaultLengthButton function must be above signUpButton function
    if (defaultLengthButton) {
        defaultButton();
    };

    if (signUpButton) {
        signUpButton.addEventListener('click', async function(event) {
            let valid = true;
            let f_name = document.getElementById('f_name').value;
            let l_name = document.getElementById('l_name').value;
            let email = document.getElementById('email').value;
            let username = document.getElementById('username').value;
            let password = document.getElementById('password').value;
            
            valid = signUpValidation(email, username, password, valid);
            
            if (!valid) {
                event.preventDefault();
            };

            if (valid) {
                const { user_id } = await addUser(f_name, l_name, email, username, password);
                console.log('Add user valid:', valid, 'User ID:', user_id);
            };

            console.log({user_id});
        });
    };

    if (createPreferencesButton) {
        createPreferencesButton.addEventListener('click', async function(event) {
            event.preventDefault();

            const user_id = await getUserID();
            console.log(user_id);
            
            let windDown = document.getElementById('windDownLength').value;
            let sleep = document.getElementById('sleepLength').value;
            let prep = document.getElementById('prepLength').value;
            let shower = document.getElementById('showerLength').value;
            let get_ready = document.getElementById('getReadyLength').value;
            let fluff = document.getElementById('fluffLength').value;
            let date_created = todayDate;

            addPreferences(user_id, windDown, sleep, prep, shower, get_ready, fluff, date_created);
        });
    }

    if (window.location.pathname === '/dashboard' || '/profile' || '/eventHistory' || '/preferences') {
        userActions();
    };
});
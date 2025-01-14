import { login, addUser, addPreferences } from "/static/js/dataService.js"
import { signUpValidation, getDate, defaultButton } from "/static/js/utilities.js";
import { userActions } from "/static/js/userActions.js";

/*
const pref = loadPreferences(user_id);
var fluff = pref.fluff;
var prep = pref.prep;
var shower = pref.shower;
var getReady = pref.getReady;
*/

// console.log("DOMContentLoaded")

// console.log('User Preferences:', fluff, prep, shower, getReady);

const prepLength0 = 45;
const showerLength0 = 30;
const getReadyLength0 = 30;
const fluff0 = 15;



document.addEventListener('DOMContentLoaded', function() {    
    var loginButton = document.getElementById('login');
    var defaultLengthButton = document.getElementById('defaultLength');
    var signUpButton = document.getElementById('signUp');
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
            let l_name = document.getElementById('l_name').value
            let email = document.getElementById('email').value
            let username = document.getElementById('username').value
            let password = document.getElementById('password').value

            let prep = document.getElementById('prepLength').value;
            let shower = document.getElementById('showerLength').value;
            let get_ready = document.getElementById('getReadyLength').value;
            let fluff = document.getElementById('fluffLength').value;
            let date_created = todayDate;
            
            valid = signUpValidation(email, username, password, valid);
            
            if (!valid) {
                event.preventDefault();
            };

            if (valid) {
                const { valid, user_id } = await addUser(f_name, l_name, email, username, password);
                console.log('Add user valid:', valid, 'User ID:', user_id);
                if (valid) {
                    addPreferences(user_id, prep, shower, get_ready, fluff, date_created);
                }
            };

            console.log({user_id});
        });
    };

    if (window.location.pathname === '/dashboard' || '/profile' || '/eventHistory' || '/editEventHistory' || '/preferences') {

        // Move to User Actions? V V
        // Create Async function to access preferences then read after for other functions calculations. V V

        /*
        const pref = await getUserPreferences();
        var fluff = pref.fluff;
        var prep = pref.prep;
        var shower = pref.shower;
        var getReady = pref.getReady;
        console.log('User Preferences:', fluff, prep, shower, getReady);
        */
        userActions();
    }
});

/*
async function loadPreferences(user_id) {
    try {
        const pref = await getUserPreferences(user_id);
        var fluff = pref.fluff;
        var prep = pref.prep;
        var shower = pref.shower;
        var getReady = pref.getReady;

        // console.log("loadPreferences")

        return { fluff, prep, shower, getReady }
    } catch (error) {
        console.error('Error handling preferences:', error);
    }
};
*/
// Import Firebase modules as ES modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getDatabase, ref as databaseRef, set as databaseSet, update as databaseUpdate } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDb0KYKVgluaOWv8tSSJeUUnBIRZQKjcJg",
  authDomain: "login-with-firebase-data-40018.firebaseapp.com",
  databaseURL: "https://login-with-firebase-data-40018-default-rtdb.firebaseio.com",
  projectId: "login-with-firebase-data-40018",
  storageBucket: "login-with-firebase-data-40018.appspot.com",
  messagingSenderId: "587999574468",
  appId: "1:587999574468:web:cf74470778682c34aa0c91",
  measurementId: "G-ER0PTRJPMY"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

// Set up our register function
function register() {
  // Get all our input fields
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let full_name = document.getElementById('full_name').value;
  let con_pass = document.getElementById('con_pass').value;
  let city = document.getElementById('city').value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!');
    return;
    // Don't continue running the code
  }
  if (validate_field(full_name) == false || validate_field(con_pass) == false) {
    alert('One or More Extra Fields is Outta Line!!');
    return;
  }

  // Move on with Auth
  createUserWithEmailAndPassword(auth, email, password)
    .then(function () {
      // Declare user variable
      let user = auth.currentUser;

      // Add this user to Firebase Database
      // let database_ref = databaseRef(database);

      // Create User data
      let user_data = {
        email: email,
        full_name: full_name,
        con_pass: con_pass,
        city: city,
        last_login: Date.now()
      };

      // Push to Firebase Database
      databaseSet(databaseRef(database, 'users/' + user.uid), user_data);

      // Done
      alert('User Created!!');
    })
    .catch(function (error) {

      let error_message = error.message;

      alert(error_message);
    });
}

document.getElementById('register').addEventListener('click', register);

// Set up our login function
function login() {
  // Get all our input fields
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!');
    return;
    // Don't continue running the code
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(function () {
      // Declare user variable
      let user = auth.currentUser;

      // Create User data
      let user_data = {
        last_login: Date.now()
      };

      // Push to Firebase Database
      databaseUpdate(databaseRef(database, 'users/' + user.uid), user_data);
      window.location.href = ("Fullstack task1 new.html");

      // Done
      alert('User Logged In!!');
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      // let error_code = error.code
      let error_message = error.message;

      alert(error_message);
    });
}

document.getElementById('login').addEventListener('click', login);

// Validate Functions
function validate_email(email) {
  let expression = /^[^@]+@\w+(\.\w+)+$/;
  if (expression.test(email) == true) {
    // Email is good
    return true;
  }
  // Email is not good
  console.log("Email is not good");
  return false;
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password.length < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }
  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

function getCookie(name) {
  console.log("getCookie called with " + name);
  let cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    if (name == cookiePair[0].trim()) {
      console.log("found cookie " + cookiePair[1] + " for " + name);
      return decodeURIComponent(cookiePair[1]);
    }
  }
  console.log("no cookie found for " + name);
  return null;
}

function checkCookie() {
  let UserName = getCookie("full_name");
  console.log("UserName: ", UserName);
  if (UserName != "") {
    alert("Welcome again, " + UserName);
  } else {
    let firstName = prompt("Please enter your UserName:");
    if (firstName != "" && firstName != null) {
      setCookie("full_name", firstName, 30);
    }
  }
}
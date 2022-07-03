const firebaseConfig = {
    apiKey: "AIzaSyCf7V9yh1ldttFwXbgTbrb_PqGP4eT2PAc",
    authDomain: "fb-login-ac.firebaseapp.com",
    projectId: "fb-login-ac",
    storageBucket: "fb-login-ac.appspot.com",
    messagingSenderId: "441044041212",
    appId: "1:441044041212:web:3945be8eb0afb566448679"
  };
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()
const message = document.getElementById("message")


  function register () {
    email = document.getElementById("email").value
    password = document.getElementById("password").value
    username = document.getElementById("username").value
    cfmPassword = document.getElementById("cfm-password").value
  
    if (validate_password(password) == false) {
        message.innerText = "please select password with 6 digits or more"
        return
      }
    if (validate_email(email) == false) {
        message.innerText = "invalid email"
        return
      }
    if (validate_field(username) == false) {
        message.innerText = "username missing"
      return
    }
    if (validate_field(cfmPassword) == false) {
        message.innerText = "confirm password missing"
      return
    }

    if(password !== cfmPassword){
        message.innerText = "password mismatch"
      return
    }

    auth.createUserWithEmailAndPassword( email, password)
    .then(function() {
      const user = auth.currentUser
      const database_ref = database.ref()
      const user_data = {
        email : email,
       username : username
      }
      database_ref.child('users/' + user.uid).set(user_data)
      message.style.color = "black"
      message.innerText = "user created.  Return to homepage after 5 secords"
      setTimeout(()=>window.location="../",5000)
    })
    
    .catch(function(error) {
      var error_code = error.code
      var error_message = error.message
      message.innerText = error_message
    })
  }
  
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      return true
    } else {
      return false
    }
  }
  
  function validate_password(password) {
    if (password.length < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (!field) {
      return false
    }
  }
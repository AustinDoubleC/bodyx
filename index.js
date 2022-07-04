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

const btnTabMuscle = document.getElementById("btn-tab-muscle")
const btnTabLoss = document.getElementById("btn-tab-loss")
const btnTabCali = document.getElementById("btn-tab-cali")
const tabMuscle = document.getElementById("tab-muscle")
const tabLoss = document.getElementById("tab-loss")
const tabCali = document.getElementById("tab-cali")
const modalResult = document.getElementById("modal-result")
const btnModalClose = document.getElementById("btn-modal-close")
const btnModalOpen = document.getElementById("btn-modal-open")
const btnLogin = document.getElementById("btn-login")
const errorMsg = document.getElementById("error-message")
const btnMenuOpen = document.getElementById("btn-menu-open")
const btnMenuClose = document.getElementById("btn-menu-close")
const menuDOM = document.getElementById("menu")
const btnMenuResult = document.getElementById("btn-Menu-Result")

btnLogin.addEventListener("click",()=>{
  login()
})

btnMenuOpen.addEventListener("click",()=>{
  btnMenuOpen.style.display="none"
  btnMenuClose.style.display="block"
  menuDOM.style.display="block"
  setTimeout(()=>{
    menuDOM.style.opacity=1},100)
})
btnMenuClose.addEventListener("click",()=>{
  menuDOM.style.opacity=0
  btnMenuClose.style.display="none"
  btnMenuOpen.style.display="block"
  setTimeout(()=>{
    menuDOM.style.display="none"},300)
})

btnModalClose.addEventListener("click",()=>{
  modalResult.style.opacity=0
  modalResult.style.top="-500px"
  setTimeout(()=>modalResult.style.display="none",100)
})
btnModalOpen.addEventListener("click",()=>{
  modalResult.style.display="block"
  setTimeout(()=>{
    modalResult.style.opacity=1
    modalResult.style.top="80px"
  },100)
})

btnMenuResult.addEventListener("click",()=>{
  modalResult.style.display="block"
  btnMenuOpen.style.display="block"
  btnMenuClose.style.display="none"
  menuDOM.style.display="none"
  menuDOM.style.opacity=0
  setTimeout(()=>{
    modalResult.style.opacity=1
    modalResult.style.top="80px"
  },100)
})

btnTabMuscle.addEventListener("click",()=>{
  tabMuscle.classList.add("show")
  tabLoss.classList.remove("show")
  tabCali.classList.remove("show")
  tabLoss.style.opacity=0
  tabCali.style.opacity=0
  btnTabMuscle.classList.add("active")
  btnTabLoss.classList.remove("active")
  btnTabCali.classList.remove("active")
  setTimeout(()=>{
    tabMuscle.style.opacity=1
  },100)
})
btnTabLoss.addEventListener("click",()=>{
  tabLoss.classList.add("show")
  tabMuscle.classList.remove("show")
  tabCali.classList.remove("show")
  tabMuscle.style.opacity=0
  tabCali.style.opacity=0
  btnTabLoss.classList.add("active")
  btnTabMuscle.classList.remove("active")
  btnTabCali.classList.remove("active")
  setTimeout(()=>{
    tabLoss.style.opacity=1
  },100)
})
btnTabCali.addEventListener("click",()=>{
  tabCali.classList.add("show")
  tabMuscle.classList.remove("show")
  tabLoss.classList.remove("show")
  tabLoss.style.opacity=0
  tabMuscle.style.opacity=0
  btnTabCali.classList.add("active")
  btnTabMuscle.classList.remove("active")
  btnTabLoss.classList.remove("active")
  setTimeout(()=>{
    tabCali.style.opacity=1
  },100)
})

function login () {
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  if (validate_password(password) == false) {
    errorMsg.innerText = "please enter password with 6 digits or more"
    return
  }
  if (validate_email(email) == false) {
    errorMsg.innerText = "invalid email"
    return
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    const user = auth.currentUser
    const database_ref = database.ref()
    database_ref.child('users/' + user.uid)
    sessionStorage.setItem("username",user.uid)
    console.log(user)
    window.location = "./portal";
    
  })
  .catch(function(error) {
    if (error.code === "auth/wrong-password"){
      errorMsg.innerText="incorrect password"
    }else if(error.code === "auth/user-not-found"){
      errorMsg.innerText="no registered user with this email address"
    }else{
      errorMsg.innerText=error.message
    }}
  )
  
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

function register(){
  window.location = "./register/"
}
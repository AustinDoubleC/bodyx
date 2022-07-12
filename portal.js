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
const username = sessionStorage.getItem("username")
const selectedPlan = document.getElementById("selectedPlan")
const paymentDOM = document.getElementById("payment-container")
const btnPaymentClose = document.getElementById("btn-payment-close")
const subscribeDOM = document.getElementById("subscribe")
const enrollDOM = document.getElementById("enroll")
const btnProgramSubmit = document.getElementById("btn-submit-program")
const dashboardDOM = document.getElementById("dashboard")

let paymentValue = 0

const getUserData=()=>{
    database.ref(`/users/${username}/`).once('value')
    .then(result=>{
    document.getElementById("greeting").innerText = "Hello, "+result.val().username
    if (!result.val().plan) {
        document.getElementById("plan").innerText = "Plan: No plans subscribed"
        subscribeDOM.style.display="flex"
        subscribeDOM.style.opacity=1
    }else {
        document.getElementById("plan").innerText = "Plan: "+result.val().plan
    }
    if (!result.val().program) {
        document.getElementById("program").innerText = "Program: No programs enrolled"
        if (result.val().plan){
            enrollDOM.style.display="block"
            setTimeout(()=>enrollDOM.style.opacity=1,200) 
        }
    }else {
        document.getElementById("program").style.display="none"
        document.getElementById("dashboard-program").innerText = result.val().program
        dashboardDOM.style.display = "block"
    }
})}
getUserData()


const payment = ()=>{
    paymentDOM.style.display="block" 
    subscribeDOM.style.display="none"
    subscribeDOM.style.opacity=0
    document.getElementById("payment-total").innerText = "Amount: $" +getPaymentValue()
    setTimeout(()=>paymentDOM.style.opacity=1,200)
}

const getPaymentValue=()=>{
    if (selectedPlan.value ==="beginner"){
        return 10.99
    }else if (selectedPlan.value ==="amateur"){
        return 15.99
    }else if (selectedPlan.value ==="pro"){
        return 24.99
    }
}
btnPaymentClose.addEventListener("click",()=>{
    paymentDOM.style.display="none"
    paymentDOM.style.opacity=0
    subscribeDOM.style.display="flex"
    setTimeout(()=>subscribeDOM.style.opacity=1,200)
})
const handleForm=()=> { 
    const paymentAlert = document.getElementById("payment-alert")
    paymentAlert.innerText=""
    if (nameCheck()&&emailCheck()&&creditCardCheck()&&expiryCheck()&&cvvCheck()){
        paymentAlert.style.fontWeight = "bold"
        paymentAlert.style.fontSize = "20px"
        paymentAlert.innerText = "PAYMENT SUCCESS. Reload page after 2 seconds"
        database.ref(`/users/${username}/`).update({plan:selectedPlan.value})
        setTimeout(()=>location.reload(),2000);
    }else {
        paymentAlert.innerText = paymentError
    }
        
    } 
    const paymentName = document.getElementById("payment-name")
    const paymentEmail = document.getElementById("payment-email")
    const paymentCard = document.getElementById("payment-card")
    const paymentMonth = document.getElementById("payment-month")
    const paymentYear = document.getElementById("payment-year")
    const paymentCvv = document.getElementById("payment-cvv")
    
    const nameCheck=()=>{
        if (paymentName.value){
            if (!/[^a-zA-Z]/.test(paymentName.value)){
                return true
            }else{
                paymentError="#Name can only contains characters"
            }
        }else paymentError ="#Enter your name"
    }
    const emailCheck=()=>{
        if (paymentEmail.value){
            if (paymentEmail.value.includes("@")){
                let tempEmail = paymentEmail.value.split("@")
                if (tempEmail[0] && tempEmail[1]){
                return true
                }else paymentError = "Invalid email"
            }else paymentError ="#Email should contains @"
        }else paymentError ="#Enter your email"
    }
    
    const creditCardCheck = ()=>{
        if (paymentCard.value){
            if (validateCardNumber(paymentCard.value)){
            return true
            }else{
                paymentError = "#Invalid card number"    
            }
        }else {
            paymentError = "Enter your card number"
        }
    }
    
    const validateCardNumber = number => {
        const regex = new RegExp("^[0-9]{13,19}$");
        if (!regex.test(number)){
            return false;
        }
        return luhnCheck(number);
    }
    
    const luhnCheck = val => {
        let checksum = 0; 
        let j = 1;
        for (let i = val.length - 1; i >= 0; i--) {
          let calc = 0;
          calc = Number(val.charAt(i)) * j;
          if (calc > 9) {
            checksum = checksum + 1;
            calc = calc - 10;
          }
          checksum = checksum + calc;
          if (j == 1) {
            j = 2;
          } else {
            j = 1;
          }
        }
        return (checksum % 10) == 0;
    }
    
    const expiryCheck = ()=>{
        if (paymentMonth.value && paymentYear.value){
            if (/^\d+$/.test(paymentMonth.value) && /^\d+$/.test(paymentYear.value)){
                if (paymentMonth.value >=1 && paymentMonth.value <=12 && paymentMonth.value.length ===2){
                    if (paymentYear.value >=0 && paymentYear.value <=99 && paymentYear.value.length ===2){
                        return true
                    }else paymentError = "Year value should between 00-99"
                }else paymentError = "Month value should between 1-12"
            }else paymentError = "Expiry date should only contains numbers"
        }else paymentError = "Enter expiry date"
    }
    
    const cvvCheck = ()=>{
        if (paymentCvv.value && paymentCvv.value){
            if (/^\d+$/.test(paymentCvv.value) && /^\d+$/.test(paymentCvv.value)){
                if (paymentCvv.value >=1 && paymentCvv.value <=999 && paymentCvv.value.length ===3){
                    return true
                }else paymentError = "CVV value should between 000-999"
            }else paymentError = "CVV should only contains numbers"
        }else paymentError = "Enter CVV"
    }

const submitProgram = ()=>{
    database.ref(`/users/${username}/`).update({program:document.querySelector('input[name="program"]:checked').value})
    
    enrollDOM.style.opacity=0
    setTimeout(()=>{
        enrollDOM.style.display="none"
        location.reload()
    },500)
    
}

const logout=()=>{
    auth.signOut().then(()=>{
        localStorage.clear()
        window.location.href="../"
    })
    //localStorage.clear()
    //window.location.href="../"
}

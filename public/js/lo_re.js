const x = document.getElementById("login")
const y = document.getElementById("register")
const z = document.getElementById("btn")
let principalId = "";

$('#connect').click(async (e) => {
    let connection = await window.ic?.plug?.requestConnect();
    principalId = await window.ic.plug.principalId;
})

function register() {
    x.style.left = "-400px"
    y.style.left = "50px"
    z.style.left = "110px"
}

function login() {
    x.style.left = "50px"
    y.style.left = "450px"
    z.style.left = "0"
}
document.getElementById("submit").disabled=true;
document.getElementById("submit-reg").disabled=true;

function daoNutDN_1() {
    const u = document.getElementById("user").value;
    const p = document.getElementById("pass").value;
    if ( (u.length>0 && p.length>0)) {
        document.getElementById("submit").disabled=false;

    } else {
        document.getElementById("submit").disabled=true;
    }
}

function daoNutDN_2(){
    const u = document.getElementById("user1").value;
    const p = document.getElementById("pass1").value;
    if  (u.length>0 && p.length>0 && principalId.length > 0) {
        document.getElementById("submit-reg").disabled=false;
    } else {
        document.getElementById("submit-reg").disabled=true;
    }
}

daoNutDN_1();
daoNutDN_2();
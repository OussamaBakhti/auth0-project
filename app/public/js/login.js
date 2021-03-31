const email = document.getElementsByClassName("email")[0];
const password = document.getElementsByClassName("password")[0];

async function login() {

    var params = new URLSearchParams();
    params.append('email', email.value);
    params.append('password', password.value);
    var data = null;
    await axios({
        method: 'post',
        url: 'http://localhost:5000/api/users/login',
        data: params,
    })
    .then(response => {
        //console.log(response);
        data = response.data;
    })
    .catch(error => {
        //console.log(error.response.data);
        data = error.response.data;
    });
    return data;
}

var loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async function() {
    var res = await login();
    showErrors(res.error);
    showAlerts(res.alert);
    // Set token in local storage
    if (res.data[0] !== undefined) {
        console.log(res.data[0])
        if (res.data[0].token !== undefined) {
            token = res.data[0].token;
            setToken(token);
            window.location.replace("http://localhost:5000/users/home");
        }
    }
});

function oauth() {
    window.location.href="http://localhost:5000/api/users/oauth"
    
}
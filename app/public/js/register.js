var password = document.getElementsByClassName("password")[0];
var email = document.getElementsByClassName("email")[0];
var username = document.getElementsByClassName("uname")[0];

async function register() {
    var params = new URLSearchParams();
    params.append('email', email.value);
    params.append('password', password.value);
    params.append('username', username.value);
    var data = null;
    await axios({
            method: 'post',
            url: 'http://localhost:5000/api/users/register',
            data: params
        })
        .then(response => {
            //console.log(response);
            data = response.data;
            console.log(data);
        })
        .catch(error => {
            //console.log(error.response.data);
            data = error.response.data;
        });
    return data;
}

var registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", async function() {
    var res = await register();
    showErrors(res.error);
    showAlerts(res.alert);
});
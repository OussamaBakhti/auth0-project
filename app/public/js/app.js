var user = document.getElementById("user");

user.innerText = parseJwt(localStorage.getItem('token')).email;

var res = document.getElementsByClassName("res")[0];

function showAlert(value) {
    res.innerHTML = "<div class='alert alert-info show' role='alert'>" + value + "</div>";
}

function showError(value) {
    res.innerHTML = "<div class='alert alert-danger show' role='alert'>" + value + "</div>";
}

function showWarning(value) {
    res.innerHTML = "<div class='alert alert-warning show' role='alert'>" + value + "</div>";
}

function showAlerts(alert) {
    if (alert !== undefined) {
        if (alert.length) {
            var alerts = "";
            for (var i = 0; i < alert.length; i++) {
                alerts += alert[i] + "<br>";
            }
            showAlert(alerts);
        }
    }
}

function showErrors(error) {
    if (error !== undefined) {
        if (error.length) {
            var errors = "";
            for (var i = 0; i < error.length; i++) {
                errors += error[i] + "<br>";
            }
            showError(errors);
        }
    }
}

function setToken(value) {
    localStorage.setItem('token', value);
}

function getToken() {
    return localStorage.getItem('token');
}

function parseJwt(token) {
    if (token !== undefined && token) {
        var base64Url = token.split('.')[1];
        if (base64Url !== undefined) {
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        }
        return null;
    } else {
        return null;
    }
};

function logout() {
    localStorage.setItem('token', "");
    localStorage.removeItem('token');
    window.location.href="/users/login"
}
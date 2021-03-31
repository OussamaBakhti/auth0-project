function redirectIfNotAuth() {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === "") {
        window.location.href = "/users/login";
    }
}

redirectIfNotAuth();
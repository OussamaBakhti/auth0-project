var url_string = window.location.href;
var url = new URL(url_string);
var token = url.searchParams.get("token");

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


if (token !== null && token !== "") {
    if (parseJwt(token).email !== undefined) {
        email = parseJwt(token).email;
        setToken(token);
        window.location.href = "/users/home";
    }
}

async function userValidator(user) {
    var user = null;
    var email = null;
    if (typeof profile.emails !== "undefined" && typeof profile.emails[0] !== "undefined") {
        email = profile.emails[0].value;
    } else {
        user = { "token": "", "message": "Email is not public !" };
        return user;
    }
}


module.exports = {
    userValidator
}
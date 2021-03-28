const databaseConfig = require('./config');

async function countEmail(email) {
    return await databaseHelper.selectQuery("SELECT COUNT(*) AS `COUNT` FROM `user` WHERE LOWER(`email`) = LOWER(?)", [email]);
}

async function registerUserByOauth(firstname, lastname, username, password, email, facebook, google) {
    return await databaseHelper.executeQuery("INSERT INTO `user` (`firstname`, `lastname`, `username`, `password`, `email`, `facebook`, `google`) VALUES (?,?,?,?,?,?,?)", [firstname, lastname, username, password, email, facebook, google]);
}


module.exports = {
    registerUserByOauth,
    countEmail
}
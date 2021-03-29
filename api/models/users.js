const databaseConfig = require('./config');

async function countEmail(email) {
    return await databaseConfig.selectQuery("SELECT COUNT(*) AS `COUNT` FROM `user` WHERE LOWER(`email`) = LOWER(?)", [email]);
}

async function registerUserByOauth(firstname, lastname, username, password, email, facebook, google) {
    try {
        return await databaseConfig.executeQuery("INSERT INTO `user` (`firstname`, `lastname`, `username`, `password`, `email`, `facebook`, `google`) VALUES (?,?,?,?,?,?,?)", [firstname, lastname, username, password, email, facebook, google]);
    } catch (error) {
        console.log(err)
    }
    
}


module.exports = {
    registerUserByOauth,
    countEmail
}
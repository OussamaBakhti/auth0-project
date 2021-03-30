const databaseConfig = require('./config');

async function countEmail(email) {
    return await databaseConfig.selectQuery("SELECT COUNT(*) AS `COUNT` FROM `user` WHERE LOWER(`email`) = LOWER(?)", [email]);
}

async function registerUserByOauth(username, password, email, firstname, lastname, picture, facebook, google) {
    try {
        return await databaseConfig.executeQuery("INSERT INTO `user` (`username`, `password`, `email`, `firstname`, `lastname`, `picture`, `facebook`, `google`) VALUES (?, ?,?,?,?,?,?,?)", [username, password, email, firstname, lastname, picture, facebook, google]);
    } catch (error) {
        console.log(err)
    }
    
}




module.exports = {
    registerUserByOauth,
    countEmail
}
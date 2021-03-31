const databaseConfig = require('./config');

async function countEmail(email) {
    return await databaseConfig.selectQuery("SELECT COUNT(*) AS `COUNT` FROM `user` WHERE LOWER(`email`) = LOWER(?)", [email]);
}

async function registerUserByOauth(email, firstname, lastname) {
    try {
        return await databaseConfig.executeQuery("INSERT INTO `user` (`email`, `firstname`, `lastname`) VALUES (?,?,?)", [email, firstname, lastname]);
    } catch (error) {
        console.log(err)
    }
    
}

async function register(email, username, password) {
    console.log(email, username, password)
    try {
        return await databaseConfig.executeQuery("INSERT INTO `user` (`email`, `username`, `password`) VALUES (?,?,?)", [email, username, password]);
    } catch (error) {
        console.log(err)
    }
    
}

async function countUser(email, password) {
    try {
        return await databaseConfig.selectQuery("SELECT COUNT(*) AS `COUNT` FROM `user` WHERE LOWER(`email`) = LOWER(?) AND LOWER(`password`) = LOWER(?)", [email, password]);
    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    registerUserByOauth,
    countEmail,
    countUser,
    register
}
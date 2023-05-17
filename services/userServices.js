const dbQueries = require('../dbqueries/userQueries');
class UserServices {
    getUserData = (name)=>{
        let result = dbQueries.getUser(name)
        return result;
    }
}
module.exports = new UserServices();
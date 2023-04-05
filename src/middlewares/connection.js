const db = require('../db/postresql')

const checkConnection = async(req,res,next) => {
    try {
        await db.authenticate()
        next()
    } catch(e) {
        res.render('404/dbError')
    }
}

module.exports = checkConnection
const jwt = require("jsonwebtoken")

module.exports = async function(req, res, next){ 
    const token = req.header("x-auth-token");
    if(!token){
        return res.status(401).send("Token mavjud emas")
    }
    try{
        const decoded = await jwt.verify(token, 'izzatillo');
        res.user = decoded;
        next()
    }catch(err){
        return res.status(400).send("token yaroqli emas")
    }
}   
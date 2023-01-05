module.exports  = async function(req,res,next){
    const { isAdmin } = await req.res.user
    if(isAdmin ===  false){
        console.log("salom")
        return res.status(403).send("Bu route taqiqlangan")
    }
    next()
}
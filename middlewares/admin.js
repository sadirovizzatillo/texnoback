module.exports  = async function(req,res,next){
    console.log(req.res.user)
    const { isAdmin } = await req.res.user
    if(isAdmin ===  false){
        console.log("salom")
        return res.status(403).send("Bu route taqiqlangan")
    }
    next()
}
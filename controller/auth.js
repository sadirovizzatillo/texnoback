const { Auth } = require("../model/auth")
const { AuthStatistics } = require("../model/authStatistic")



module.exports.register = async (req, res) => {
    try {
        const user = await new Auth({
            name: req.body.name,
            password: req.body.password,
            username:req.body.username,
            email:req.body.email,
            age:req.body.age,
            isAdmin:req.body.isAdmin
        })
        await user.save()
        
        var realQuantity = 1
        const authStatistic = await AuthStatistics.findOneAndUpdate(
            { 
                currentDate: new Date().getDate()
            }, 
            { 
                $inc: 
                { 
                    quantity: realQuantity 
                },
            });
            if(!authStatistic){
                const authStatistics = await new AuthStatistics({
                    quantity: realQuantity,
                    currentDate: new Date().getDate()
                })
                await authStatistics.save()
            }
            await res.json({ success: true, user: user })
        } catch (err) {
            res.status(404).send(err)
        }
    }
    
    module.exports.login = async (req, res, next) => {
        try {
            const user = await Auth.findOne({ email: req.body.email })
            
            if(!user){
                res.status(404).send("Mavjud bo'lmagan foydalanuvchi");
                return
            }
            
            if(req.body.password !== user.password){
                res.status(404).send("Parol no'tog'ri");
                return
            }
            const token = await user.generateAuthToken()
            await res.header('x-auth-token', token).json({ success: true, user: user, token:token })
        } catch (err) {
            res.status(404).send(err)
        }
    }
    
    module.exports.me = async (req, res, next) => {
        try {
            const user = await Auth.findById(req.params.id)
            .select("_id, name, age, username");
            res.json({ success: true, user: user })
        } catch (err) {
            res.status(404).send(err)
        }
    }
    
    
    module.exports.users = async (req, res, next) => {
        try {
            const pageNumber = req.query.page ?? 1
            const pageSize = req.query.limit ?? 6
            const user = await Auth.find()
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            const allPage = (await Auth.find()).length
            await res.json({ success: true, user: user, allPage:allPage })
        } catch (err) {
            res.status(404).send(err)
        }
    }
    
    
    module.exports.getAdminStatiksUser = async (req, res, next) => {
        try {
            const users = (await Auth.find({ isAdmin: { $ne: true } })).length
            await res.json({ success: true, user: users })
        } catch (err) {
            res.status(404).send(err)
        }
    }

    module.exports.getAdminStatiksChartUser = async (req, res, next) => {
        try {
            const users = await AuthStatistics.find()
            await res.json({ success: true, user: users })
        } catch (err) {
            res.status(404).send(err)
        }
    }
    
    module.exports.updateUser = async (req, res, next) => {
        try {
            const user = await Auth.findOneAndUpdate({ _id:req.params.id }, {
                name:req.body.name,
                username:req.body.username,
                email: req.body.email,
                isAdmin: req.body.isAdmin,
                password: req.body.password
            })
            if(!user){
                res.status(403).send("Bunday User topilmadi1");
                return
            } 
            res.status(200).json({ success: true, user: user })
        } catch (err) {
            res.status(404).send(err)
        }
    }
    
    module.exports.deleteUser = async (req, res, next) => {
        try {
            const user = await Auth.findOneAndDelete({ _id: req.params.id})
            res.status(200).json({ success: true, user: user })
        } catch (err) {
            res.status(404).send(err)
        }
    }
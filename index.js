const express = require("express")
const app = express()
var cors = require("cors")

const { auth, product, review, brand, purchase, category, subcategory, subminicategory } = require("./routes")
app.use(cors())
const mongoose  = require("mongoose")
mongoose.set('strictQuery', true);
const url = "mongodb+srv://Izzatillo:a-z123456789@cluster0.x3i3lpc.mongodb.net/texnomart?retryWrites=true&w=majority"

mongoose.connect(url, { useNewUrlParser: true,
useUnifiedTopology: true }).then(() => {
    console.log("mongo db ga ulandi")
}).catch((err) => {
    console.error("mongoDb ga ulanish xato", err)
})
app.use('/uploads', express.static('uploads'))
app.use(express.json())

app.use("/api/auth", auth);
app.use("/api/products", product);
app.use("/api/reviews", review);
app.use("/api/brands", brand);
app.use("/api/categories", category);
app.use("/api/purchase", purchase);
app.use("/api/subcategories", subcategory);
app.use("/api/subminicategories", subminicategory);



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`${port} portga ulandi`)
})


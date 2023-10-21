const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()


app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 8080

//SCHEMA
const schemaData = mongoose.Schema({
    name: String,
    address: String,
}, {
    timestamps: true
})

const userModel = mongoose.model("user", schemaData)

//READ
app.get("/", async (req, res) => {
    const data = await userModel.find({})
    res.json({ success: true, data: data })
})


//Save data in MongoDB
app.post("/create", async (req, res) => {
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({ success: true, Message: "data save successfully" })
})







mongoose.connect("mongodb+srv://rohitshinde4331:1234@cluster0.eyj9hql.mongodb.net/gp")
    .then(() => {
        console.log("CONNECTED");
        app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
    })
    .catch((err) => console.log(err))



import express from "express";
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Ayo👋! Hello World")
})

app.listen(PORT, () => console.log(`XProfile Server running on port: ${PORT} `))
import express from "express";
import 'dotenv/config'
import routes from './routes/index.js'

const app = express()
const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Ayo👋! Hello World")
})

// Route File
app.use(routes)

app.listen(PORT, () => console.log(`XProfile Server running on port: ${PORT} `))
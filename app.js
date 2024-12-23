const express = require("express")
const bodyparser = require("body-parser")
const cors = require("cors")
const PORT = 3000
const app = express()
const routes = require("./routes/routes")
app.use(bodyparser.json())

app.use(cors())

app.use("/", routes)

app.listen(PORT, (req, res) => {
  console.log(`Servidor escuchando en puerto ${PORT}`)
})

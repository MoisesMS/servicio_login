const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const router = express.Router()
const users = []

router.post("/login", async (req, res) => {
  const {username, password} = req.body
  const user = users.find(u => u.username === username)

  if(user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({username}, "secret_key", {expiresIn : "1h"})

    res.json({token})
  } else {
    res.status(401).send("Credenciales inválidos")
  }
})

router.post("/register", async (req, res) => {
  const {username, password} = req.body
  
  const userInList = users.find(u => u.username === username)
  console.log(users)
  const hashedPassword = await bcrypt.hash(password, 10)

  if(userInList) {
    return res.status(409).json({ "result" : "El usuario ya existe" })
  }
  users.push({username, password: hashedPassword})

  res.status(201).json({ "result" : "Usuario registrado"})
})

router.post("/verifyToken", (req, res) => {
  const { token } = req.body

  jwt.verify(token, "secret_key", (err, decoded) => {
    if(err) {
      res.json({valid: false})
    } else {
      res.json({valid: true, username: decoded.username})
    }
  })

})

router.get("/users", (req, res) => {
  res.send(users)
})

module.exports = router

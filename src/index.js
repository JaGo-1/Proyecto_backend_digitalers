const app = require("./app.js");
const { connectDB } = require("./db.js");
const dtenv = require("dotenv").config();

const PORT = process.env.PORT;

connectDB();
app.listen(PORT || 3000);
console.log("Servidor escuchando en el puerto", PORT || 3000);

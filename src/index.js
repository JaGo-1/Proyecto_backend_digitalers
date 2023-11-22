const app = require("./app.js");
//const { connectDB } = require("./db.js");
const dtenv = require("dotenv").config();

const PORT = process.env.PORT;
require("./db.js");
//connectDB();
app.listen(PORT || 3000);
console.log("Server on port", PORT || 3000);

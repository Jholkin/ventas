const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require("./config/database");

app.use(morgan("tiny"));
app.use(cors());
app.set('port', process.env.PORT || 4000);

app.use(express.json());


// Routes
const ventasRoute = require("./routes/ventasRoute");

// Functions
app.use("/api/ventas", ventasRoute);
app.get('/', (req,res)=>{
    res.send("hello");
});

app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
})
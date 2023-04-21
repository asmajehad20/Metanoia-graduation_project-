const express = require("express");
const app = express();
const PORT = 3000;
// const cors = require('cors');

//start the server
app.listen(PORT, (err)=> {
    if (err){ console.log(err)}
    else {console.log("on port 3000")}
})

// app.use(cors({
//     origin: '*'
// }));

var cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: false}));
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);

const schedualRoutes = require('./routes/SceduleRoutes');
app.use(schedualRoutes);


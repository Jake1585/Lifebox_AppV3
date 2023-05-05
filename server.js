const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const uRoute = require("./routes/uRoute");
const aRoute = require('./routes/aRoute')
const path = require("path");

app.use('/api/user', uRoute)
app.use('/api/AdminInfo', aRoute)

if(process.env.NODE_ENV === 'production')
{
    app.use( '/', express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
    }
    );
}

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

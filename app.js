const express = require('express');
const app = express();
var port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('WagonGO está vivo!!!'));
app.listen (port, () => console.log("Server is running on port " + port));
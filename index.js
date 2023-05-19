const express = require('express');
const cors = require('cors');
const app = express();
// require('dotenv').config()
const port = process.env.PORT || 5000;

// middlewware 
app.use(express.json())
app.use(cors())






app.get('/', (req, res) => {
    res.send('car doctor is running')
})
app.listen(port, () => {
    console.log(`car doctor is  running on port ${port}`);
})

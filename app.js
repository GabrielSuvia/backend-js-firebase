const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const cors = require("cors");

app.use(cors({origin:true}))

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const port=3000;
app.listen(port,()=>{console.log(`Connected server to ${port}`)})

module.exports = app;
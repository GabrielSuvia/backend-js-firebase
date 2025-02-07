const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
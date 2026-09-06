require("dotenv").config();
const express = require('express');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');
const restroRoutes = require('./routes/restroRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const statsRoutes = require('./routes/statsRoutes');
const db = require('./config/db');
const cookieParser = require('cookie-parser');

const app = express();

//***************Middleware Functions***************
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
  })
}

const delaySimulator = async(req,res,next) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  next();
}

//***************Middlewares***************
app.use(cors());
app.use(delaySimulator);
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);
app.use('/order', orderRoutes);
app.use('/restro', restroRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/stats', statsRoutes);


//***************Server***************
app.listen(process.env.PORT, () => {
  console.log('Server started on port ' + process.env.PORT + ' Time: ' + new Date().toLocaleString())
})

app.get('/', (req, res) => {
  res.send('server is running')
})

app.get('/health', (req, res) => {
  res.send('server is healthy')
})


//***************Database Connection***************
db.one('SELECT NOW() AS current_time')
  .then(data => {
    console.log('Database connected');
    console.log(data);
  })
  .catch(error => {
    console.error('Database connection failed');
    console.error(error);
  });


//***************Error Handler***************
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});
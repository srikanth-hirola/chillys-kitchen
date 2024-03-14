const express = require('express');
const ErrorHandler = require('./middleware/error');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const Event = require('./model/event');
const compression = require('compression')

app.use(compression())

const allowedOrigins = [
  'https://ecom-hirola.netlify.app',
  'https://playful-begonia-9ec628.netlify.app',
  'https://64c4f83342477c5ec56722ac--playful-begonia-9ec628.netlify.app',
  'https://ecom-client.onrender.com',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'https://airbee.co.in',
  'https://www.airbee.co.in',
  'https://air-bee.netlify.app',
];


app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the origin is in the allowedOrigins array
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// app.use(cors());

// app.use(express.json());
app.use(cookieParser());
app.use('/test', (req, res) => {
  res.send('Hello world!');
});

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));

app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));

// config
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({
    path: 'config/.env',
  });
}

// import routes
const user = require('./controller/user');
const shop = require('./controller/shop');
const product = require('./controller/product');
const event = require('./controller/event');
const coupon = require('./controller/coupounCode');
const payment = require('./controller/payment');
const order = require('./controller/order');
const conversation = require('./controller/conversation');
const message = require('./controller/message');
const withdraw = require('./controller/withdraw');
const category = require('./controller/category');
const shipping = require('./controller/shipping');
const siteConfig = require('./controller/siteConfig');
const newsletter = require('./controller/newsletter');
const form = require('./controller/Form');
const blogs = require('./controller/blogs');
const path = require('path');

app.use('/api/v2/user', user);
app.use('/api/v2/conversation', conversation);
app.use('/api/v2/message', message);
app.use('/api/v2/order', order);
app.use('/api/v2/shop', shop);
app.use('/api/v2/product', product);
app.use('/api/v2/event', event);
app.use('/api/v2/coupon', coupon);
app.use('/api/v2/payment', payment);
app.use('/api/v2/withdraw', withdraw);
app.use('/api/v2/category', category);
app.use('/api/v2/shipping', shipping);
app.use('/api/v2/site', siteConfig);
app.use('/api/v2/newsletter', newsletter);
app.use('/api/v2/form', form);
app.use('/api/v2/blogs', blogs);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})

cron.schedule('* * * * *', () => {
  const date = new Date().toISOString().substring(0, 10);
  EventsCheck(date)
});

const EventsCheck = async (date) => {
  const found = await Event.find({ draft: false });
  found.forEach(async (eventDate) => {
    const foundDate = new Date(eventDate.start_Date).toISOString().substring(0, 10);
    if (foundDate === date) {
      await Event.findByIdAndUpdate(eventDate._id, {
        $set: {
          status: "Running"
        }
      })
    }
  })
}


// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;

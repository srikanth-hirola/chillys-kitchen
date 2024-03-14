const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongod connected with server: ${data.connection.host}`);
    });

};


// const db1 = mongoose.createConnection(process.env.DB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

// db1.on('open', () => {
//   console.log(`MongoDB connected with server: ${db1.host}`);
// });

// db1.on('error', (err) => {
//   console.error(`MongoDB connection error: ${err}`);
// });

// const db2 = mongoose.createConnection("mongodb+srv://Admin-dinesh:Dinesh@cluster0.l1qq8e4.mongodb.net/eshop2_db", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

// db2.on('open', () => {
//   console.log(`MongoDB connected with server: ${db2.host}`);
// });

// db2.on('error', (err) => {
//   console.error(`MongoDB connection error: ${err}`);
// });

module.exports = connectDatabase;

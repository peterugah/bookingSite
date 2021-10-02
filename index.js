const express = require("express");
const space =  require('./routes/createSpaceRoutes');
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 7000;

app.use(express.json());

//const apiRouter = require('./routes/Api')
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewURLParser: true,
    });
    console.log("Connected to DB");
  } catch (err) {
    console.error(err.message);
  }
};

connectDB();
app.use("/", require("./routes/useroutes"));
app.use("/", require("./routes/Api"));
app.use("/", require("./routes/bookhotelroutes"));
//app.use('/',require('./routes/adminroutes'))
app.use("/home", require("./routes/bookingroutes"));
app.use("/", require("./routes/adminregroutes"));
app.use('/',space )

app.listen(PORT, () => {
  console.log(`now listening for requests on port ${PORT}`);
});

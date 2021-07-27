const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
    });

    console.log("db Connect successfully");
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

module.exports = dbConnect;
import mongoose from "mongoose";
import Guide from "../models/Guide.js";
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  //   await Guide.createCollection().then(() => {
  //     console.log('Guide collection created');
  //   }).catch((err) => {
  //     console.error('Error creating Guide collection:', err);
  // });
  // const seedData = [
  //   { guideName: 'John Doe', email: 'johndoe@example.com', phoneNumber: '0961592551', languages: 'Tiếng Anh, Tiếng Hàn'},
  // ];
  // await Guide.insertMany(seedData);
  } catch (err) {
    console.log("MongoDB database connected failed");
  }
};
export default {connect}
import mongoose from 'mongoose';
import Guide from '../models/Guide.js';
mongoose.set('strictQuery', false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.log('MongoDB database connected failed');
    }
};
export default { connect };

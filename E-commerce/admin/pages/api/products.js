import mongoose from "mongoose";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";


export default async function handle(req, res) {

    const {method} = req;
    console.log('awaiting connection')
    // await mongooseConnect();
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('connected to DB')

    if (method === 'POST'){
        const {title, description, price} = req.body;
        const newProduct = await Product.create({
            title, description, price
        })
        res.json('ok')
    }

    // try {
    //     // await mongoose.connect(process.env.MONGODB_URI);
    //     mongooseConnect();
    //     console.log('Connected to MongoDB');
    // } catch (error) {
    //     console.error('Error connecting to MongoDB:', error);
    // }

}

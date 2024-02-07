import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";



export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    // await mongoose.connect(process.env.MONGODB_URI);
    console.log('connected to DB')

    if(method === 'GET') {
        res.json(await Product.find())
    }


    if (method === 'POST'){
        const {title, description, price} = req.body;
        const newProduct = await Product.create({
            title, description, price
        })
        res.json('ok')
    }
}

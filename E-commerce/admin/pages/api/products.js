import Product from '@/models/Product';
import { mongooseConnect } from '@/lib/mongoose';

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  // await mongoose.connect(process.env.MONGODB_URI);
  console.log('connected to DB');

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    }else{
        res.json(await Product.find());
    }
  }

  // creates product
  if (method === 'POST') {
    const { title, description, price, images, category } = req.body;
    const newProduct = await Product.create({
      title,
      description,
      price,
      images,
      category
    });
    res.json(newProduct); 
  }

  // updates product
  if(method === 'PUT'){
    const { title, description, price, _id, images, category } = req.body;
    const data = await Product.findOneAndUpdate({_id},{
      title,
      description,
      price,
      _id,
      images,
      category
    });
    // console.log(data)
    res.json(true); 
  }

  if(method === 'DELETE'){
    if(req.query?.id){
      console.log(req.query?.id)
      await Product.deleteOne({_id: req.query?.id});
      res.json(true); 
    }
  }
}

import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Categories";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  
  if(method === 'GET'){
    res.json(await Category.find().populate('parent'))
  }

  if(method === 'POST'){
    const {categoryName, parentCategory} = req.body;
    console.log(req.body)
    
    const parentCategoryId = parentCategory || null;

    const categoryDoc = await Category.create({ 
      name: categoryName, 
      parent: parentCategoryId
    })
    res.json(categoryDoc)
  }

  if(method === 'PUT'){
    const {categoryName, parentCategory, _id} = req.body;
    console.log(req.body)


    const categoryDoc = await Category.updateOne({_id},{ 
      name: categoryName, 
      parent: parentCategory,
    })
    res.json(categoryDoc)
  }

  if(method === 'DELETE'){
    // categories?_id=' + category._id
    const {_id} = req.query;
    console.log(_id)
    await Category.deleteOne({_id})

    res.status(200).json('success')
  }
}

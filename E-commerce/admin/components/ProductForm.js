import Layout from "@/components/Layout";
import { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/router";


export default function ProductForm({
  _id,
  title: currentTitle, 
  description: currentDescription, 
  price: currentPrice
}) {
  const [title, setTitle] = useState(currentTitle || '');
  const [description, setDescription] = useState(currentDescription || '');
  const [price, setPrice] = useState(currentPrice || '');
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();


  const productData = {title,description,price}

  async function saveProduct(e){
    e.preventDefault();

    if(_id){
      // update product
      await axios.put('/api/products', {...productData, _id});
    }else{
      // create product
      await axios.post('/api/products', productData);
    }
    setGoToProducts(true);
  }

  if(goToProducts){
    router.push('/products');
  }

  return (

    <form onSubmit={saveProduct}>
        
        <label>Product Name</label>
        <input type="text" placeholder="product name" className="newproduct" value={title} onChange={e => setTitle(e.target.value)} />
        <label>Description</label>
        <textarea placeholder="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
        <label>Price</label>
        <input type="number" placeholder="price" value={price} onChange={e => setPrice(e.target.value)}/>
        <button type="submit" className="btn-primary">Save</button>
        </form>

  );
}

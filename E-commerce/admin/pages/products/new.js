import Layout from "@/components/Layout";
import { useState } from "react";
import axios from 'axios';

export default function NewProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  async function addProduct(e){
    e.preventDefault();
    const productData = {title,description,price}
    await axios.post('/api/products', productData);
  }


  return (
    <Layout>
    <form onSubmit={addProduct}>
        <h1 className=""><b>New Product</b></h1>
        <label>Product Name</label>
        <input type="text" placeholder="product name" className="newproduct" value={title} onChange={e => setTitle(e.target.value)} />
        <label>Description</label>
        <textarea placeholder="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
        <label>Price</label>
        <input type="number" placeholder="price" value={price} onChange={e => setPrice(e.target.value)}/>
        <button type="submit" className="btn-primary">Save</button>
        </form>
    </Layout>
  );
}

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import axios from 'axios';


export default function Products() {
  const [products, setProducts] = useState([]);
  console.log(products)

  useEffect(() => {
    axios.get('/api/products').then(response => setProducts(response.data))
  }, []);

  return (
    <Layout >
        <Link href={'/products/new'} className="btn-primary">Add new product</Link>
        <table className="basic">
          <thead>
            <tr>
              <td>Product name</td>
              <td></td>
            </tr>
          </thead>
        <tbody>
        {products.map(product => (
          <tr>
            <td>{product.title}</td>
            <td>
              buttons
            </td>
          </tr>
        ))}
        </tbody>
        </table>
    </Layout>
  )
}

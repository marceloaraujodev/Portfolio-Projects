import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";


export default function ordersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders').then(response => {
      console.log(response.data)
      setOrders(response.data);
    });
  }, [])

  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 && orders.map((order, index) => (
            <tr key={order._id}>
              <td >{order.createdAt}</td>
              <td>{order.name} {order.email}
              {order.city} {order.zipcode}
              {order.country}
              {order.streetAddress}
              </td>
              <td>
              {order.line_items.map(l => (
                  <>
                    {l.price_data?.product_data.name} x {l.quantity}
                  </>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

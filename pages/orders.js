import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Layout from '../components/Layout';

const Orders = () => {
  const [order, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders').then((res) => {
      setOrders(res.data);
    });
  }, []);

  return (
    <Layout>
      <h1 className="text-black">orders</h1>

      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {order.length > 0 &&
            order.map((o) => (
              <tr key={`order-${o._id}`}>
                <td>{new Date(o.createdAt).toLocaleString().replace(',', ' ')}</td>
                <td>
                  {o.name} {o.email} <br />
                  {o.city}
                  <br /> {o.country}
                  <br />
                  {o.postalCode}
                  <br />
                  {o.streetAddress}
                </td>
                <td>
                  {o.line_items.map((l) => (
                    <div key={`line_item-${l.price_data.unit_amount}`}>
                      {l.price_data.product_data.name} <br />
                      {l.price_data.unit_amount / 100} x {l.quantity}
                      {/* {JSON.stringify(l)} */}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Orders;

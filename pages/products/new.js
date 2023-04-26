import React, { useState } from 'react';

import axios from 'axios';

import Layout from '@/components/Layout';

const NewProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const createProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price };

    await axios.post('/api/products', data);
  };

  return (
    <Layout>
      <form onSubmit={createProduct}>
        <h1> New Product</h1>
        <label>Product Name</label>
        <input type="text" placeholder="product name" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Description</label>
        <textarea
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Price (USD)</label>
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <button className="btn-primary">Save</button>
      </form>
    </Layout>
  );
};

export default NewProduct;

import React, { useState } from 'react';
import axios from 'axios';

// import Layout from './Layout';
import { useRouter } from 'next/router';

const ProductForm = ({ _id, title: existingTitle, description: existingDescription, price: existingPrice }) => {
  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice || '');

  const [goToProducts, setGoToProducts] = useState(false);

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price };
    if (_id) {
      await axios.put('/api/products', { ...data, _id });
    } else {
      await axios.post('/api/products', data);
    }
    setGoToProducts(true);

    if (goToProducts) {
      router.push('/products');
    }
  };

  return (
    <form onSubmit={saveProduct}>
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
  );
};

export default ProductForm;

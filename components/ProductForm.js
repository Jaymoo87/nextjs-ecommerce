import React, { useState } from 'react';
import axios from 'axios';

// import Layout from './Layout';
import { useRouter } from 'next/router';

const ProductForm = ({ _id, title: existingTitle, description: existingDescription, price: existingPrice, images }) => {
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
      await axios.post('/api/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    setGoToProducts(true);

    if (goToProducts) {
      router.push('/products');
    }
  };

  const uploadImage = async (e) => {
    const files = e.target?.files;
    if (files?.length > 0) {
      const data = new FormData();

      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/upload', data);
      console.log(res.data);
    }
  };

  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input type="text" placeholder="product name" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Photos</label>
      <div className="mb-2 text-sm ">
        <label className="flex flex-col items-center justify-center w-24 h-24 text-gray-500 bg-gray-200 border border-blue-200 rounded-lg shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <div> Upload</div>
          <input type="file" className="hidden cursor-pointer" onChange={uploadImage} />
        </label>
        {!images?.length && <div className="mb-2 text-xs">No Photo</div>}
      </div>

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

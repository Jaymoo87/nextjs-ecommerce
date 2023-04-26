import React, { useState } from 'react';
import axios from 'axios';

import { ReactSortable } from 'react-sortablejs';
import { useRouter } from 'next/router';
import Spinner from './Spinner';

const ProductForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) => {
  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice || '');
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState(existingImages || []);

  const [goToProducts, setGoToProducts] = useState(false);

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price, images };
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

  async function uploadImage(e) {
    const files = e.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/upload', data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  const updateImagesOrder = (images) => {
    setImages(images);
  };

  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input type="text" placeholder="product name" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Photos</label>
      <div className="flex flex-wrap gap-2 mb-2 text-sm ">
        <ReactSortable className="flex flex-wrap gap-1" list={images} setList={updateImagesOrder}>
          {images?.length &&
            images.map((link) => (
              <div className="inline-block h-24" key={link}>
                <img src={link} alt="userPhoto" />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="flex items-center h-24 p-1 text-blue-900 rounded-lg">
            <Spinner />
          </div>
        )}
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
          <div className="cursor-pointer"> Upload</div>
          <input type="file" className="hidden " onChange={uploadImage} />
        </label>
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

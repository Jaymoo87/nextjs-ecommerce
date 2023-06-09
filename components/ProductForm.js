import React, { useState, useEffect } from 'react';
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
  category: existingCategory,
  properties: assignedProperties,
}) => {
  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [category, setCategory] = useState(existingCategory || '');
  const [productProperties, setProductProperties] = useState(assignedProperties || {});
  const [price, setPrice] = useState(existingPrice || '');
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [categories, setCategories] = useState([]);

  const [goToProducts, setGoToProducts] = useState(false);

  useEffect(() => {
    axios.get('/api/categories').then((res) => {
      setCategories(res.data);
    });
  }, [categories]);

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price, images, category, properties: productProperties };
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

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catData = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catData.properties);
    while (catData?.parent?._id) {
      const parentCat = categories.find(({ _id }) => _id === catData?.parent?._id);
      propertiesToFill.push(...parentCat.properties);
      catData = parentCat;
    }
  }

  const setProductProperty = (propName, value) => {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  };

  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input type="text" placeholder="product name" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">No Category</option>
        {categories.length > 0 && categories.map((cat) => <option value={cat._id}>{cat.name}</option>)}
      </select>
      {propertiesToFill.length > 0 &&
        propertiesToFill.map((p) => (
          <div className="">
            <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
            <div>
              <select
                value={productProperties[p.name]}
                onChange={(e) => setProductProperty(p.name, e.target.value)}
                type="text"
              >
                {p.values.map((v) => (
                  <option value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      <label>Photos</label>
      <div className="flex flex-wrap gap-2 mb-2 text-sm ">
        {isUploading && (
          <div className="flex items-center h-24 p-1 rounded-lg">
            <Spinner />
          </div>
        )}
        <ReactSortable
          className="flex flex-wrap gap-2 p-5  border-headerBG border-[20px] rounded-tr-3xl rounded-b-3xl bg-headerText"
          list={images}
          setList={updateImagesOrder}
        >
          {images?.length &&
            images.map((link) => (
              <div className="inline-block h-24 max-w-[200px] " key={link}>
                <img src={link} alt="userPhoto" />
              </div>
            ))}
        </ReactSortable>

        <label className="flex flex-col items-center justify-center mt-8 border border-blue-900 rounded-b-lg shadow-lg bg-headerBG text-darkText w-28 h-28">
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
          <div className="cursor-pointer"> Upload Image</div>
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

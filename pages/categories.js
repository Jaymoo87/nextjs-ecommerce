import React, { useEffect, useState } from 'react';

import Layout from '@/components/Layout';
import axios from 'axios';

const Categories = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get('/api/categories').then((res) => {
      setCategories(res.data);
    });
  };
  const saveCategory = async (e) => {
    e.preventDefault();
    await axios.post('/api/categories', { name });
    setName('');
    fetchCategories();
  };

  return (
    <Layout>
      <h1>categories</h1>
      <label>Category Name</label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-0"
          type="text"
          placeholder={'Category name'}
        />
        <button type="submit" className="py-1 btn-primary">
          Save
        </button>
      </form>

      <table className="mt-4 basic">
        <thead>
          <tr>
            <td>Category Name</td>
          </tr>
        </thead>
        <tbody>{categories.length > 0 && categories.map((cat) => <tr>{cat.name}</tr>)}</tbody>
      </table>
    </Layout>
  );
};

export default Categories;

import React, { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import axios from 'axios';

const Categories = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState('');
  const [editedCategory, setEditedCategory] = useState(null);

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
    const data = { name, parentCategory };

    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put('/api/categories', data);
      setEditedCategory(null);
    } else {
      await axios.post('/api/categories', data);
    }
    setName('');
    setCategories('');
    fetchCategories();
  };

  const editCategory = (category) => {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label>{editedCategory ? `Edit Category ${editedCategory.name}` : 'Create New Category '}</label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-0"
          type="text"
          placeholder={'Category name'}
        />

        <select className="mb-0" value={parentCategory} onChange={(e) => setParentCategory(e.target.value)}>
          <option value="0">No Parent Category</option>
          {categories.length > 0 && categories.map((cat) => <option value={cat._id}>{cat.name}</option>)}
        </select>
        <button type="submit" className="py-1 btn-primary">
          Save
        </button>
      </form>

      <table className="mt-4 basic">
        <thead>
          <tr>
            <td>Category Name</td>
            <td>Parent Category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((cat) => (
              <tr>
                <td>{cat.name}</td>
                <td>{cat?.parent?.name}</td>
                <td>
                  <button onClick={() => editCategory(cat)} className="mr-1 btn-primary">
                    {' '}
                    Edit{' '}
                  </button>
                  <button className="btn-primary"> Delete </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Categories;

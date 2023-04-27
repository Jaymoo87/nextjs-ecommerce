import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { withSwal } from 'react-sweetalert2';

import Layout from '../components/Layout';

const Categories = ({ swal }) => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState('');
  const [editedCategory, setEditedCategory] = useState(null);
  const [properties, setProperties] = useState([]);

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

  const deleteCategory = (category) => {
    swal
      .fire({
        title: 'Delete?',
        text: `Are you sure you want to delete this?`,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Yes, Delete',
        confirmButtonColor: '#d55',
        reverseButtons: true,
      })
      .then(async (res) => {
        if (res.isConfirmed) {
          const { _id } = category;
          await axios.delete(`/api/categories?_id=${_id}`);
          fetchCategories();
        }
      })
      .catch((error) => console.log(error));
  };

  const addProperty = () => {
    setProperties((prev) => {
      return [...prev, { name: '', values: '' }];
    });
  };

  const handlePropertyName = (property, index, newName) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };

  const handleValuesChange = (property, index, newValues) => {
    setProperties((prev) => {
      const props = [...prev];
      props[index].values = newValues;
      return props;
    });
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label>{editedCategory ? `Edit Category ${editedCategory.name}` : 'Create New Category '}</label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
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
        </div>
        <div className="mb-2">
          <label className="block underline">Properties</label>
          <button onClick={addProperty} type="button" className="text-sm btn-secondary">
            Add Property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className="flex flex-col w-1/3 gap-1 mt-2 columns-2">
                <input
                  type="text"
                  value={property.name}
                  onChange={(e) => handlePropertyName(property, e.target.value, index)}
                  placeholder="property name (ex: color, size, weight)"
                />
                <input
                  type="text"
                  onChange={(e) => handleValuesChange(index, property, e.target.value)}
                  value={property.value}
                  placeholder="values, comma seperated"
                />
              </div>
            ))}
        </div>
        <button type="submit" className="py-1 mt-2 btn-primary">
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
                    Edit
                  </button>
                  <button onClick={() => deleteCategory(cat)} className="btn-primary">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);

// export default Categories;

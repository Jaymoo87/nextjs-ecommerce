import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { withSwal } from 'react-sweetalert2';

import Layout from '../components/Layout';

const Categories = ({ swal }) => {
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [editedCategory, setEditedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
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
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(','),
      })),
    };

    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put('/api/categories', data);
      setEditedCategory(null);
    } else {
      await axios.post('/api/categories', data);
    }
    setName('');
    setParentCategory('');

    setProperties([]);
    fetchCategories();
  };

  const editCategory = (category) => {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(','),
      }))
    );
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
  const handlePropertyName = (index, property, newName) => {
    setProperties((prev) => {
      const props = [...prev];

      props[index].name = newName;
      return props;
    });
  };

  const handleValuesChange = (index, property, newValues) => {
    setProperties((prev) => {
      const props = [...prev];
      props[index].values = newValues;
      return props;
    });
  };

  const removeProperty = (indexToRemove) => {
    setProperties((prev) => {
      return [...prev].filter((p, propIndex) => {
        return propIndex !== indexToRemove;
      });
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
            <option value="0">Select A Parent Category</option>
            {categories.length > 0 &&
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block mt-4">Properties</label>
          <button onClick={addProperty} type="button" className="mb-2 text-sm btn-secondary">
            Add Property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div key={index} className="flex gap-1 mb-2 lg:w-3/4 sm:w-full ">
                <input
                  type="text"
                  value={property.name}
                  onChange={(e) => handlePropertyName(index, property, e.target.value)}
                  placeholder="property name (ex: color, size, weight)"
                  className="mb-0"
                />
                <input
                  type="text"
                  onChange={(e) => handleValuesChange(index, property, e.target.value)}
                  value={property.values}
                  placeholder="values, comma seperated"
                  className="mb-0"
                />
                <div className="relative">
                  <button onClick={() => removeProperty(index)} type="button" className="justify-end btn-delete">
                    Remove
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName('');
                setParentCategory('');
                setProperties([]);
              }}
              className="py-1 mt-2 btn-secondary "
            >
              Go Back
            </button>
          )}
          <button type="submit" className="py-1 mt-2 btn-primary">
            Save
          </button>
        </div>
      </form>

      {!editedCategory && (
        <table className="mt-4 basic">
          <thead>
            <tr>
              <td className="">| Category Name</td>
              <td className="">| Parent Category</td>
              <td className="">| Options</td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((cat) => (
                <tr key={cat._id}>
                  <td>{cat.name}</td>
                  <td>{cat?.parent?.name}</td>
                  <td className="flex justify-between">
                    {' '}
                    <button onClick={() => editCategory(cat)} className="btn-primary ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                      Edit
                    </button>
                    <button onClick={() => deleteCategory(cat)} className="btn-red">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);

// export default Categories;

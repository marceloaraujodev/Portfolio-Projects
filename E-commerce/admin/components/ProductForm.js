import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Spinner from './Spinner';
import { Reorder } from 'framer-motion';
// import { image } from 'qr-image';

export default function ProductForm({
  _id,
  title: currentTitle,
  description: currentDescription,
  price: currentPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties
}) {
  const [title, setTitle] = useState(currentTitle || '');
  const [description, setDescription] = useState(currentDescription || '');
  const [price, setPrice] = useState(currentPrice || '');
  const [goToProducts, setGoToProducts] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  // gets all categories
  const [categories, setCategories] = useState([]);
  //sets one category
  const [category, setCategory] = useState(assignedCategory);
  const [productProperties, setProductProperties] = useState(assignedProperties || {});

  useEffect(() => {
    axios
      .get('/api/categories')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const router = useRouter();
  const productData = {
    title,
    description,
    price,
    images,
    category,
    productProperties,
  };
  // console.log(productData.productProperties)
  async function saveProduct(e) {
    e.preventDefault();

    if (_id) {
      // update product
      await axios.put('/api/products', { ...productData, _id });
    } else {
      // create product
      await axios.post('/api/products', productData);
    }
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push('/products');
  }

  async function uploadImages(e) {
    const files = e.target?.files;

    if (files.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/upload', data);
      setImages((oldImages) => [...oldImages, ...res.data.links]);
      setIsUploading(false);
    }
  }

  // sets the properties on the select boxes for color storage...
  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      // console.log(newProductProps)
      return newProductProps;
    });
  }

  // filling the properties to access them on product edit
  const propertiesToFill = [];
  // category here is the string id of the product
  if (categories.length > 0 && category) {
    // find id of the selected category
    let catInfo = categories.find(({ _id }) => _id === category);
    // console.log(catInfo);
    propertiesToFill.push(...catInfo.properties);

    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="product name"
        className="newproduct"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((category, index) => (
            <option key={`${category._id}-${index}`} value={category._id}>
              {category.name}
            </option>
          ))}
      </select>

      {propertiesToFill.length > 0 &&
        propertiesToFill.map((propEl, index) => (
          <div key={`${propEl._id}-${index}`} className="flex gap-1">
            <div >{propEl.name}</div>
            <select 
              value={productProperties[propEl.name]}
              onChange={(e) => {
                setProductProp(propEl.name, e.target.value);
              }}
            >
              <option value=''>Choose one</option>
              {propEl.values.map((val) => (
                <option 
                  key={`${propEl._id}-${val}`} 
                  value={val}
                  onChange={(e) => {
                    setProductProp(propEl.name, e.target.value);
                  }}
                >{val}</option>
              ))}
            </select>
          </div>
        ))}

      <label>Photos</label>

      <div className="mb-2 flex flex-wrap gap-2">
        <Reorder.Group
          axis="x"
          values={images}
          onReorder={setImages}
          className="flex"
        >
          {images.length > 0 &&
            images.map((link, index) => (
              <Reorder.Item key={`${link}-${index}`} value={link} as="div">
                <div
                  className="h-24 w-24 flex items-center justify-center"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <img src={link} alt="product img" className="rounded-lg" />
                </div>
              </Reorder.Item>
            ))}
          {isUploading && (
            <div className="h-24 text-center flex items-center justify-center ">
              <Spinner />
            </div>
          )}
        </Reorder.Group>

        <label className=" w-24 h-24 border text-center flex items-center justify-center flex-col text-sm gap-1 text-gray-500 bg-gray-200 cursor-pointer rounded-lg">
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
              d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
            />
          </svg>
          Upload
          <input type="file" className="hidden" onChange={uploadImages} />
        </label>
      </div>
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label>Price</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}

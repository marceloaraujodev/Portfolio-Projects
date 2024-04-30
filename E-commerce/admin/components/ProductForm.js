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
}) {
  const [title, setTitle] = useState(currentTitle || '');
  const [description, setDescription] = useState(currentDescription || '');
  const [price, setPrice] = useState(currentPrice || '');
  const [goToProducts, setGoToProducts] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  
  const router = useRouter(); 

  useEffect(() => {
    images.map(src => {
      const link = src
      console.log(src)
      return src
    })
  }, [images]); // Specify images as a dependency

  const productData = { title, description, price, images };

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
  };

  if (goToProducts) {
    router.push('/products');
  };

  async function uploadImages(e){

    const files = e.target?.files;

    if(files.length > 0){
      setIsUploading(true);
      const data = new FormData();
        for (const file of files){
          data.append('file', file)
        }
        const res = await axios.post('/api/upload', data);
        setImages(oldImages => [...oldImages, ...res.data.links]);
        setIsUploading(false);
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
      <label>Photos</label>

      <div className="mb-2 flex flex-wrap gap-2">
      
      {images.length > 0 && images.map(link => (
        <div key={link} className='h-24 w-24 flex items-center justify-center '>
         <img src={link} alt='product img' className='rounded-lg' />
        </div>
      ))}
      {isUploading && (
        <div className='h-24 text-center flex items-center justify-center '>
          <Spinner />
        </div>
      )}

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
          <input type="file" className="hidden" onChange={uploadImages}/>
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

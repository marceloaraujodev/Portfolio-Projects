import Layout from '@/components/Layout';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { image } from 'qr-image';

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
  const router = useRouter();

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
    e.preventDefault();
    const files = e.target?.files;

    if(files.length > 0){
      console.log('if enter')
      const data = new FormData();
        for (const file of files){
          data.append('file', file)
        }
        const res = await axios.post('/api/upload', data);

        setImages(oldImages => {
          return [...oldImages, ...res.data.links]
        })
        console.log(res.data);
    }
  }

  !!images?.length && images.map(link => {
    console.log('this is LINK:', link) 
    console.log('THIS IS IMG TAG:')
  })

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
      {!!images?.length && images.map((link) => (
        
        <div key={link} className='h-24'>
          <img src={link} alt='product image' className='rounded-lg' />
        </div>
      ))}

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
        {!images?.length && <div>No photos in this product</div>}
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

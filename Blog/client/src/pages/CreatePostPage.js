import { useState } from 'react';
import { Navigate } from 'react-router-dom';
// import 'react-quill/dist/quill.snow.css'; // se nao mudar nada na pagina pode tirar coloquei no editor.js
import Editor from '../components/Editor';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [price, setPrice] = useState('');
  const [redirect, setRedirect] = useState(false);
  
  async function createNewPost(e) {
    e.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    data.set('price', price)

    try {
      const response = await fetch(
        // 'http://localhost:4000/post', // development
        'https://blog-rzyw.onrender.com/post', // production
        {
          method: 'POST',
          body: data,
          credentials: 'include',
        }
        
      );
      if (response.ok) {
        setRedirect(true);
      }else{
        console.log('error creating post:', response.statusText)
      }
      setRedirect(true);
      
    } catch (error) {
      console.log(error)
    }

  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form className="createPost" onSubmit={createNewPost}>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(e) => {
          setSummary(e.target.value);
        }}
      />

      <input
        type="file"
        // required
        onChange={(e) => {
          setFiles(e.target.files);
        }}
      />
      <input
        type="number"
        placeholder='Add Look Price: $ (optional)'
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

      <Editor value={content} onChange={setContent} />
      <button>Create Post</button>
    </form>
  );
}

// get url for the other pages

// Receive URL in Frontend:

// In your frontend code (assuming you're using AJAX or Fetch API), handle the response from the backend API call to the bucketUpload function. This response will contain the publicUrl that you can then use to access the uploaded file:

// JavaScript
// // Assuming you're using Fetch API
// fetch('/post', {
//   // ... request options ...
// })
// .then(response => response.json())
// .then(data => {
//   if (data.status === 'success') {
//     const imageUrl = data.imageUrl; // Access the URL from the response
//     // Use the imageUrl to display the image or perform other actions
//   } else {
//     // Handle errors from the backend
//   }
// });


//----------------bucket uploading

    // async function bucketUpload(req){
    //   try {
    //     const { originalname, path } = req.file;
    //     const nameParts = originalname.split('.');
    //     const ext = nameParts[nameParts.length - 1];
    
    //     const projectId = process.env.PROJECTID;
    //     const keyFilename = process.env.KEYFILENAME;
    //     console.log('req.file', req.file)
    //     // console.log('New file name:', newFileName)
    //     const metadata = { contentType: 'image/' + ext}
    //     const storage = new Storage({ projectId, keyFilename });
    //     const bucket = storage.bucket(process.env.BUCKET_NAME);
    
    //     await bucket.upload(path, {
    //       destination: `uploads/${req.file.filename + ext}`, 
    //       metadata: metadata,
    //     });
        
    //     const publicUrl = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/uploads/${req.file.filename + ext}`;
    //     console.log('Public URL:', publicUrl);
    
    //     return publicUrl; // Or any other relevant data
    
    //   } catch (error) {
    //     console.error('Error uploading file:', error);
    //     throw error; 
    //   }
    // }
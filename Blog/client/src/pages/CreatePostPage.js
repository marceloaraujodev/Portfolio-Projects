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
      await response.json();


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


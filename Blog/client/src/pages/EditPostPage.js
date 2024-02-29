import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../components/Editor';
import { url } from '../apiConfig';

export default function EditPostPage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [price, setPrice] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${url}/post/${id}`
        // `http://localhost:4000/post/${id}` // development
        // 'https://blog-rzyw.onrender.com/post/' + id // production
      );
      const postData = await response.json();
      setTitle(postData.title);
      setContent(postData.content);
      setSummary(postData.summary);
      if(postData.price) {
        setPrice(postData.price);
      }
    };
    fetchData();
  }, [id]);

  async function updatePost(e) {
    e.preventDefault();

    const postEditedData = new FormData();
    postEditedData.set('title', title);
    postEditedData.set('summary', summary);
    postEditedData.set('content', content);
    postEditedData.set('price', price);
    postEditedData.set('id', id);
    if (files?.[0]) {
      postEditedData.set('file', files?.[0]); // ? optional chaining if no image set to undefined
    }

    const response = await fetch(
      `${url}/post`
      // `http://localhost:4000/post/` // prod
      // 'https://blog-rzyw.onrender.com/post'
    , {
      method: 'PUT',
      body: postEditedData,
      credentials: 'include',
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/post/' + id} />;
  }

  return (
    <form onSubmit={updatePost}>
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
        onChange={(e) => {
          setFiles(e.target.files);
        }}
      />
      <input
        type="number"
        value={price}
        placeholder='Price: $'
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

      <Editor onChange={setContent} value={content} />
      <button>Publish Update</button>
    </form>
  );
}


import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../components/Editor';

export default function EditPostPage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://soft-star-9690.on.fleek.co/post/' + id
      );
      const postData = await response.json();
      setTitle(postData.title);
      setContent(postData.content);
      setSummary(postData.summary);
    };
    fetchData();
  }, [id]);

  async function updatePost(e) {
    e.preventDefault();

    const postEditedData = new FormData();
    postEditedData.set('title', title);
    postEditedData.set('summary', summary);
    postEditedData.set('content', content);
    postEditedData.set('id', id);
    if (files?.[0]) {
      postEditedData.set('file', files?.[0]); // ? optional chaining if no image set to undefined
    }

    const response = await fetch('https://soft-star-9690.on.fleek.co/post', {
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

      <Editor onChange={setContent} value={content} />
      <button>Publish Update</button>
    </form>
  );
}

// import React from 'react'

// export default function EditPostPage() {
//   return (
//     <div>EditPostPage</div>
//   )
// }

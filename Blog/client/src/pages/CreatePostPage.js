import { useState } from 'react';
import { Navigate } from "react-router-dom";
// import 'react-quill/dist/quill.snow.css'; // se nao mudar nada na pagina pode tirar coloquei no editor.js
import Editor from '../components/Editor';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(e){
    e.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0])

    const response = await fetch('http://localhost:4000/createPost', { 
      method: 'POST',
      body: data,
      credentials: 'include'
    });
    if(response.ok){
      setRedirect(true);
    }
  }

  if(redirect){
    return <Navigate to={'/'} />
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

      <input type="file" onChange={e => { setFiles(e.target.files)}} />

      <Editor value={content} onChange={setContent} />
      <button>Create Post</button>
    </form>
  );
}

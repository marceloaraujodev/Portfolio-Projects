import { useState } from "react";

export default function Test() {
  const [files, setFiles] = useState('');
  
  async function upload(e){
    e.preventDefault();
    const data = new FormData();
    data.set('file', files[0]);

    const response = await fetch(
      // 'http://localhost:4000/test', // development
      'https://blog-rzyw.onrender.com/test', // production
      {
        method: 'POST',
        body: data,
        credentials: 'include',
        headers: 'Access-Control-Allow-Origin'
      }
      );
      const resData = await response.json();
      console.log(resData);
    console.log('hi')
    }

  return (
    <>
      <h2>Google Storage API Test</h2>
      <input
        type="file"
        // required
        onChange={(e) => {
          setFiles(e.target.files);
        }}
      />
      <button id="submitBtn" accept="image/jpeg" onClick={upload}>submit</button>
    </>
  );
}
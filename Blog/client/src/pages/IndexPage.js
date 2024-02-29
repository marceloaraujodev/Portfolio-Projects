import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import { url } from '../apiConfig';

export default function IndexPage() {
  const [posts, setPost] = useState([]);
  
  useEffect(() => {
    try {
      console.log(url)
      const fetchData = async () => {
        const response = await fetch(
          `${url}/post`
          // 'http://localhost:4000/post' // prod
          // 'https://blog-rzyw.onrender.com/post'
          );
        const data = await response.json();
        setPost(data);
      };
      fetchData();
    } catch (error) {
      console.log(error)
    }
  }, []);

  return (
    <>
      {posts.length <= 0 && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}

      {posts.length > 0 &&
        posts.map((post, index) => <Post {...post} key={index} />)}
    </>
  );
}

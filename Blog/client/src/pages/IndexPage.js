import React, { useEffect, useState } from 'react';
import Post from '../components/Post';

export default function IndexPage() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          'http://localhost:4000/post' // prod
          // 'https://blog-rzyw.onrender.com/post'
          );
        const data = await response.json();
        setPost(data);
      };
      fetchData();
    } catch (error) {
      
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

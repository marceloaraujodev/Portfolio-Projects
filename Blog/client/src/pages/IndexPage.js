import React, { useEffect, useState } from 'react';
import Post from '../components/Post';

export default function IndexPage() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://blog-rzyw.onrender.com/post');
      const data = await response.json();
      setPost(data);
    };
    fetchData();
  }, []);

  return (
    <>
      {posts.length <= 0 && (
        <div class="spinner-container">
          <div class="spinner"></div>
        </div>
      )}

      {posts.length > 0 &&
        posts.map((post, index) => <Post {...post} key={index} />)}
    </>
  );
}

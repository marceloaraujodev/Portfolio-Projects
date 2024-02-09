import React, { useEffect, useState } from 'react';
import Post from '../components/Post';

export default function IndexPage() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://soft-star-9690.on.fleek.co/post');
      const data = await response.json();
      setPost(data);
    };
    fetchData();
  }, []);
  // console.log(posts)

  return (
    <>
      {posts.length > 0 &&
        posts.map((post, index) => <Post {...post} key={index} />)}
    </>
  );
}

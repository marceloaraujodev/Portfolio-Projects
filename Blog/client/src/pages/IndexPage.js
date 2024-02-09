import React, { useEffect, useState } from 'react'
import Post from '../components/Post';

const url = "https://soft-star-9690.on.fleek.co";

export default function IndexPage() {
  const [posts, setPost] = useState([])

  useEffect(() => {
    const fetchData =  async () => {
      const response = await fetch(`${url}/post`);
      const data = await response.json();
      setPost(data)
    }
    fetchData();
  }, []);
  // console.log(posts)

  return (
    <>
      {posts.length > 0 && posts.map((post, index) => (
        <Post {...post} key={index} />
      ))}
    </>
  )
}

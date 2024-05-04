import React, { useEffect, useState } from 'react';
import Post from '../components/Post';


export default function IndexPage() {
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  
  
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            // 'http://localhost:4000/post' // prod
            'https://blog-rzyw.onrender.com/post'
            );
          const data = await response.json();
          setPost(data);
          setLoading(true)
        } catch (error) {
          console.log(error)
          setLoading(false);
        }
      };
      fetchData();

      if(!loading){
        setTimeout(() => {
          fetchData()
        }, 3000);
      }
      setLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

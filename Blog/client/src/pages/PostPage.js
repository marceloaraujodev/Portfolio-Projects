import { format } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import Button from '../components/Button';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51OmiFsBfcEidHzvrvgq1dJhIYcZDqKSQjDKqCBsSvQQuf60SsP6DS4yV4yn9SsLfP1SSrlBznzRwJgUXbdkDrn5T00Zk6x1RYT")


export default function PostPage() {
  const { userInfo } = useContext(UserContext);
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:4000/post/${id}` // prod
        // `https://blog-rzyw.onrender.com/post/${id}`
      );
      const data = await response.json();
      setPostInfo(data);
    };
    fetchData();
  }, [id]);

  if (!postInfo || !userInfo) {
    return '';
  }

  // Production
  async function deletePost() {
    const confirmed = window.confirm(
      'Are you sure you want to delete this post?'
    );
    // if(!confirmed) navigate(`http://localhost:4000/post/${id}`);

    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:4000/post/${id}`,
          // https://blog-rzyw.onrender.com/post/${id},
          {
            method: 'DELETE',
          }
        );

        if (response.ok) {
          navigate('/');
        } else {
          console.log('failed to delete post');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function checkout(){
    const response = await fetch(`http://localhost:4000/checkout-session/${id}`)
    const data = await response.json();
    const publishableKey = data.session.id
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({
      sessionId: publishableKey
    })

  }

  console.log((userInfo.id !== postInfo.author._id), postInfo.price)
  
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{format(new Date(postInfo.createdAt), 'MMM d, yyyy')}</time>
      <div className="author">by @{postInfo.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-post">
          <Button to={`/edit/${postInfo._id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            Edit Post
          </Button>
          <Button onClick={deletePost}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            Delete Post
          </Button>
        </div>
      )}
      {userInfo.id !== postInfo.author._id && (postInfo.price > 0 || !postInfo.price) && (
        <div className="edit-post">
          <Button onClick={checkout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Buy the look
          </Button>
        </div>
      )}
      <div className="image">
        <img
          src={
            `http://localhost:4000/${postInfo.cover}`
            // `https://blog-rzyw.onrender.com/${postInfo.cover}`
          }
          alt="post"
        />
      </div>
      <div
        className="post-body"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
}

import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function Post({
  title,
  summary,
  content,
  cover,
  createdAt,
  author,
  _id
}) {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={
            cover} alt="woman style" // picture cover of the post
            // 'http://localhost:4000/' + cover} alt="woman style" // prod
            // 'https://blog-rzyw.onrender.com/' + cover} alt="woman style"
            />
        </Link>
      </div>
      <div className="texts">
        <h2>{title}</h2>
        <p className="info">
          <a href="https://www.google.com/" className="author">
            {author.username}
          </a>
          <time>{format(new Date(createdAt), 'MMM d, yyyy')}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}

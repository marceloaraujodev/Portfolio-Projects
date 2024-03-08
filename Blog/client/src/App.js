/* eslint-disable jsx-a11y/anchor-is-valid */
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePostPage from './pages/CreatePostPage';
import PostPage from './pages/PostPage';
import EditPostPage from './pages/EditPostPage';
import { UserContextProvider } from './components/UserContext';
import Test from './components/Test';


function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path={'/login'} exact element={<LoginPage />} />
        <Route path={'/register'}  element={<RegisterPage />} />
        <Route path={'/create'} element={<CreatePostPage />} />
        <Route path={'/post/:id'} element={<PostPage />} />
        <Route path={'/edit/:id'} element={<EditPostPage />} />
        <Route path={'/test'} element={<Test />} />
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;

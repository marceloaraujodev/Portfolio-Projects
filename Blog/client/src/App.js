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


function App({queryClient}) {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path={'/login'} element={<LoginPage queryClient={queryClient} />} />
        <Route path={'/register'} element={<RegisterPage queryClient={queryClient} />} />
        <Route path={'/create'} element={<CreatePostPage queryClient={queryClient} />} />
        <Route path={'/post/:id'} element={<PostPage queryClient={queryClient} />} />
        <Route path={'/edit/:id'} element={<EditPostPage queryClient={queryClient} />} />
        <Route path={'/test'} element={<Test />} />
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;

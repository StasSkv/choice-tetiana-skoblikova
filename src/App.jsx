import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import { Team } from './pages/Team/Team';
import { Products } from './pages/Products/Products';
import { Layout } from './components/Layout/Layout';
import { Favorites } from './pages/Favorites/Favorites.jsx';
import { ToastContainer, Zoom } from 'react-toastify';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="team" element={<Team />} />
          <Route path="products" element={<Products />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </>
  );
};

export default App;

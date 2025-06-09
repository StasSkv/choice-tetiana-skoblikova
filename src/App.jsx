import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import { Team } from './pages/Team/Team';
import { Products } from './pages/Products/Products';
import { Cart } from './pages/Cart/Cart';
import { Layout } from './components/Layout/Layout';
import { Favorites } from './pages/Favorites/Favorites.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="team" element={<Team />} />
        <Route path="products" element={<Products />} />
        <Route path="cart" element={<Cart />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

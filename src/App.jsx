import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { lazy, Suspense, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home/Home';
import { Layout } from './components/Layout/Layout';
import { ToastContainer, Zoom } from 'react-toastify';
import { Loader } from './components/Loader/Loader.jsx';

import {
  fetchProductsInCart,
  fetchProductsInCartFromLocal,
} from './redux/cartSlice/cartOperations.js';
import {
  selectIsLoggedIn,
  selectIsLoggingOut,
  selectIsOpen,
} from './redux/authSlice/authSelectors.js';
import { selectProductsIds } from './redux/cartSlice/cartSelectors.js';
import { selectFavoritesIds } from './redux/favoritesSlice/favoritesSelectors.js';
import { AuthModal } from './components/AuthModal/AuthModal.jsx';
import { checkSession } from './redux/authSlice/authOperations.js';
import {
  fetchFavoritesFromLocal,
  fetchProductsInFavorites,
} from './redux/favoritesSlice/favoritesOperations.js';

const LazyTeam = lazy(() => import('./pages/Team/Team.jsx'));
const LazyProductDetails = lazy(() => import('./pages/ProductDetails/ProductDetails.jsx'));
const LazyPlacing = lazy(() => import('./pages/Placing/Placing.jsx'));
const LazyUserOffice = lazy(() => import('./pages/UserOffice/UserOffice.jsx'));
const LazyFavorites = lazy(() => import('./pages/Favorites/Favorites.jsx'));
const LazyProducts = lazy(() => import('./pages/Products/Products.jsx'));

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const productsIds = useSelector(selectProductsIds);
  const favoritesIds = useSelector(selectFavoritesIds);
  const isOpenAuthModal = useSelector(selectIsOpen);
  const isLoggingOut = useSelector(selectIsLoggingOut);

  useEffect(() => {
    if (isLoggingOut || isLoggedIn) return;
    dispatch(fetchProductsInCartFromLocal(productsIds));
    dispatch(fetchFavoritesFromLocal(favoritesIds));
  }, [dispatch, isLoggedIn, isLoggingOut, productsIds, favoritesIds]);

  useEffect(() => {
    if (isLoggingOut || !isLoggedIn) return;
    const init = async () => {
      const res = await dispatch(checkSession());
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(fetchProductsInCart());
        dispatch(fetchProductsInFavorites());
      } else {
        dispatch(fetchProductsInCartFromLocal(productsIds));
        dispatch(fetchFavoritesFromLocal(favoritesIds));
      }
    };
    init();
  }, [dispatch, isLoggedIn, isLoggingOut]);

  // const name = 'Фітомус для вмивання';

  // const imgName = 'PHYTOMOUSS FOR WASHING';

  // console.log(name.toUpperCase());
  // console.log(imgName.toLowerCase().split(' ').join('-'));

  return (
    <>
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="team"
              element={
                <Suspense fallback={<Loader />}>
                  <LazyTeam />
                </Suspense>
              }
            />
            <Route
              path="products"
              element={
                <Suspense fallback={<Loader />}>
                  <LazyProducts />
                </Suspense>
              }
            />
            <Route
              path="products/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <LazyProductDetails />
                </Suspense>
              }
            />
            <Route
              path="favorites"
              element={
                <Suspense fallback={<Loader />}>
                  <LazyFavorites />
                </Suspense>
              }
            />
          </Route>
          <Route path="/office" element={<Layout />}>
            <Route
              path="/office"
              element={
                <Suspense fallback={<Loader />}>
                  <LazyUserOffice />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/placing"
            element={
              <Suspense fallback={<Loader />}>
                <LazyPlacing />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>

      <AuthModal isOpen={isOpenAuthModal} />

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

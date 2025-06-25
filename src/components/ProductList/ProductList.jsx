import { useState } from 'react';
  import ProductCard from '../ProductCard/ProductCard.jsx';
import s from './ProductList.module.css';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../../redux/productsSlice/productsSelectors.js';

const ProductsList = ({ products: propProducts, isFavoritesPage = false }) => {
  const allProducts = useSelector(selectAllProducts);
  const products = isFavoritesPage ? propProducts : allProducts;
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const pageCount = Math.ceil(products.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const selectedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className={s.productListWrap}>
        <ul className={s.productList}>
          {selectedProducts.map((product, index) => (
            <li 
              key={product._id}
              className={s.productCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} isFavoritesPage={isFavoritesPage} />
            </li>
          ))}
        </ul>

        {pageCount > 0 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            forcePage={currentPage}
            containerClassName={s.pagination}
            pageClassName={s.page}
            activeClassName={s.active}
            previousClassName={s.page}
            nextClassName={s.page}
          />
        )}
      </div>
    </>
  );
};

export default ProductsList;
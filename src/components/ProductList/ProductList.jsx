import { useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard.jsx';
import s from './ProductList.module.css';
import ReactPaginate from 'react-paginate';

export const ProductsList = ({ products, isFavoritesPage = false }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  const pageCount = Math.ceil(products.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const selectedProducts = products.slice(startIndex, startIndex + itemsPerPage);
  console.log(products);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className={s.productListWrap}>
      <ul className={s.productList}>
        {selectedProducts.map((product) => (
          <li key={product.id} className={s.productCard}>
            <ProductCard {...product} isFavoritesPage={isFavoritesPage} />
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
  );
};

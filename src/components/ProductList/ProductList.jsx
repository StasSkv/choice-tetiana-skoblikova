import ProductCard from '../ProductCard/ProductCard.jsx';
import s from './ProductList.module.css';
import ReactPaginate from 'react-paginate';

const ProductsList = ({ products = [], pagination, onPageChange, isFavoritesPage = false }) => {
  const pageCount = pagination?.totalPages || 0;
  const currentPage = (pagination?.page || 1) - 1;

  const handlePageClick = ({ selected }) => {
    if (selected + 1 !== (pagination?.page || 1)) {
      onPageChange(selected + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={s.productListWrap}>
      {products.length > 0 && (
        <ul className={s.productList}>
          {products.map((product, index) => (
            <li
              key={product._id}
              className={s.productCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} isFavoritesPage={isFavoritesPage} />
            </li>
          ))}
        </ul>
      )}

      {pageCount > 1 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={handlePageClick}
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

export default ProductsList;

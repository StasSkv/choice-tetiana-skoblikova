import ProductCard from '../ProductCard/ProductCard.jsx';
import s from './ProductList.module.scss';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilters } from '../../redux/productsSlice/productsSelectors.js';
import { setFilters } from '../../redux/productsSlice/productsSlice.js';

const ProductsList = ({ products = [], pagination, isFavoritesPage = false }) => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const pageCount = pagination?.totalPages || 0;
  const currentPage = (pagination?.page || 1) - 1;

  const handlePageChange = (selected) => {
    dispatch(setFilters({ ...filters, page: selected.selected + 1 }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

      {pageCount > 1 && products.length > 0 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          pageCount={pageCount}
          forcePage={currentPage}
          containerClassName={s.pagination}
          pageClassName={s.page}
          activeClassName={s.active}
          previousClassName={s.page}
          nextClassName={s.page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductsList;

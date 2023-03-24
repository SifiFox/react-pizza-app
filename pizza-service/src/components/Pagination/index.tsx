import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  currentPage: number;
  onChangePage: any;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onChangePage,
}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageCount={3}
      forcePage={currentPage - 1}
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={2}
      // renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;

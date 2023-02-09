import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

export default function Pagination({ currentPage, onChangePage }) {
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
      renderOnZeroPageCount={null}
    />
  );
}

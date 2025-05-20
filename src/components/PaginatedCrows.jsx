import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import CrowComponent from "./CrowComponent";

import "../styles/components/PaginatedCrows.css"; // Puedes personalizarlo luego

const PaginatedCrows = ({ crows, itemsPerPage }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = crows.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(crows.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % crows.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="discover-crows-list">
        {currentItems.map((crow) => (
          <CrowComponent key={crow.id} crow={crow} />
        ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Siguiente"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="Anterior"
        containerClassName="pagination"
        activeClassName="active"
        disabledClassName="disabled"
      />
    </>
  );
};

export default PaginatedCrows;

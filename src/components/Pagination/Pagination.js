import React from "react"
import styled from '@emotion/styled';

const Pagination = ({ page, limit, count, onPageChange, ...rest }) => {
  const totalItems = Math.ceil(count / limit);
  let items = []
  if (totalItems <= 4) {
    items = Array.from({length: totalItems}, (_, i) => i + 1)
  } else {
    if (page == totalItems) {
      items = [Number(page) - 7, Number(page) - 6, Number(page) - 5]
    }
    else if (page == 1) {
      items = [page, Number(page) + 1, Number(page)+2]
    } else {
      items = [Number(page) - 1, page, Number(page) + 1]
    }
  }

  const renderPaginationItems = () => {
    return (
      <>
        {items.map((d, k) => (
          <PaginationItem key={k} active={d == page} onClick={() => d!=page && onPageChange(d)}>{d}</PaginationItem>
        ))}

        {totalItems > 4 && (
          <>
            <li className="separator">...</li>
            <PaginationItem active={page === totalItems} onClick={() => page !=totalItems && onPageChange(totalItems)}>{totalItems}</PaginationItem>
          </>
        )}
      </>
    )
  }

  if (!totalItems) {
    return null
  }
  return (
    <PaginationList {...rest}>
      {page != 1 && (
        <PaginationItem onClick={() => onPageChange(page-1)}>
          <img src="/static/images/icons/prev-arrow.svg" width="10" />
        </PaginationItem>
      )}
      {renderPaginationItems()}
      {page !== totalItems && (
        <PaginationItem onClick={() => onPageChange(page+1)}>
          <img src="/static/images/icons/next-arrow.svg" width="10" />
        </PaginationItem>
      )}
    </PaginationList>
  );
};

const PaginationList = styled.ul`
  display: flex;
  list-style: none;
  gap: 0.2rem;
  margin-bottom: 0;
  padding-left: 1rem;

  .separator {
    color: #8492a5;
  }
`;

const PaginationItem = styled.li`
  cursor: pointer;
  background: #ffffff;
  border: 1px solid #d3dce6;
  padding: 2px 9px;
  border-radius: 3px;
  box-shadow: 0px 2px 3px rgb(39 52 67 / 6%);
  color: #8492a5;

  ${props => props.active && (
   `
    color: #657acb;
    border: 1px solid #657acb;
    `
  )}
`;

export default Pagination;

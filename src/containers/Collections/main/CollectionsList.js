import React from 'react';
import styled from '@emotion/styled';
import CollectionItem from './collection-list/CollectionItem';
import { Pagination } from 'components';
import { Loading, BoxTitle } from 'components';

const CollectionsList = ({ collections, loading, query, onSearch, onPageChange, onSortChange }) => {
  console.log({ collections });
  return (
    <CollectionListContainer>
      <CollectionListHeader>
        <span>Collection List</span>
        <SearchBox>
          <img src="/static/images/icons/search.svg" />
          <SearchInput
            type="text"
            placeholder="Search collection..."
            onChange={e => onSearch(e.target.value)}
            value={query.search}
          />
        </SearchBox>
      </CollectionListHeader>

      <CollectionListFilter>
        <div>
          <label>Sort by:</label>
          <select onChange={e => onSortChange(e.target.value)}>
            <option value="asc" selected={query.sortOrder === 'createdAt:asc'}>
              Date Created (ASC)
            </option>
            <option value="desc" selected={query.sortOrder === 'createdAt:desc'}>
              Date Created (DESC)
            </option>
          </select>
        </div>
        {collections && collections.count ? (
          <TopPaginationContainer>
            <div>1 - 10 of 4299</div>
            <Pagination
              page={query.page}
              limit={10}
              count={collections.count}
              onPageChange={onPageChange}
              style={{ paddingLeft: '.5rem' }}
            />
          </TopPaginationContainer>
        ) : null}
      </CollectionListFilter>

      <CollectionItemContainer>
        {loading ? (
          <div className="d-flex w-100 py-4 align-items-center justify-content-center">
            <Loading />
          </div>
        ) : (
          collections &&
          collections.items &&
          collections.items.map((col, key) => <CollectionItem key={key} data={col} />)
        )}
      </CollectionItemContainer>

      {collections && collections.count ? (
        <Footer>
          <Pagination
            page={query.page}
            limit={10}
            count={collections.count}
            onPageChange={onPageChange}
            style={{ paddingLeft: '.5rem' }}
          />
        </Footer>
      ) : null}
    </CollectionListContainer>
  );
};

const CollectionListHeader = styled(BoxTitle)`
  display: flex;
  justify-content: space-between;
`;

const CollectionListContainer = styled.div`
  padding-bottom: 2rem;
`;

const CollectionItemContainer = styled.div`
  margin-top: 1.2rem;
`;

const SearchBox = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-weight: bold;
`;

const CollectionListFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.75rem;
  background-color: #ebeff5;

  select {
    border: none;
    outline: none;
    background: none;
    color: #8492a5;
  }
`;

const TopPaginationContainer = styled.div`
  display: none;
  @media screen and (min-width: 600px) {
    display: flex;
    align-items: center;
  }
`;

const Footer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  @media screen and (min-width: 600px) {
    justify-content: flex-end;
    padding-right: 1.75rem;
  }
`;

export default CollectionsList;

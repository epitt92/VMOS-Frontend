import React, { useState } from 'react';
import styled from '@emotion/styled';
import PickingItem from '../components/PickingItem';
import PickupModal from './pickup-modal';
import { Loading, BoxTitle, RadioButton, StatusBadge, Pagination } from 'components';
import { useModal } from 'components/Modal/hooks/ModalContext';
import { useRouter } from 'next/router';

const PickingList = ({
  data,
  page,
  loading,
  status,
  sortOrder,
  onSearch,
  onSortChange,
  onChangeStatus,
  onPageChange,
}) => {
  const router = useRouter();
  const { modal } = useModal();
  const [_status, setStatus] = useState(status || 'processing');
  const [mobileFilter, setMobileFilter] = useState(false);
  const handleChangeStatus = status => {
    setStatus(status);
    onChangeStatus(status);
  };

  const toggleMobileFilter = () => {
    setMobileFilter(!mobileFilter);
  };

  const renderPagination = () => {
    if (!loading && page && data.size && data.count) {
      const start = (page - 1) * data.size + 1;
      const end = start + data.items.length - 1;
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            {start} - {end} of {data.count}
          </div>
          <Pagination page={page} limit={data.size} count={data.count} onPageChange={onPageChange} />
        </div>
      );
    }
  };

  const handleItemClick = data => {
    if (data.status.toLowerCase() === 'packed') {
      router.push(`picking/details/${data.id}`);
      return;
    }

    modal({
      render: ({ onClose }) => (
        <PickupModal
          style={{ maxWidth: '95%' }}
          onConfirm={() => router.push(`picking/${data.id}`)}
          onClose={onClose}
          data={data}
        />
      ),
    });
  };

  return (
    <PickingListContainer>
      <MobileStatusSelector active={mobileFilter}>
        <SelectorHeader onClick={toggleMobileFilter}>
          <h4>Filter</h4>
          <img src="/static/images/icons/arrow-right.svg" />
        </SelectorHeader>
        <div className="status-form">
          {['all', 'preprocessing', 'processing'].map((data, key) => (
            <RadioButton key={key} className="m-0">
              <input
                className="form-control"
                type="radio"
                id={data + key + 'mobile'}
                name="status-mobile"
                onChange={() => handleChangeStatus(data)}
                checked={data === _status}
              />

              <StatusBadge htmlFor={data + key} status={data}>
                <span onClick={() => {}}>{data}</span>
              </StatusBadge>
            </RadioButton>
          ))}
        </div>
      </MobileStatusSelector>
      <PickingListHeader>
        <CardHeader>
          <div>Orders To Pick</div>
          <StatusSelector>
            {['preprocessing', 'processing', 'packed'].map((data, key) => (
              <RadioButton key={key} className="m-0">
                <input
                  className="form-control"
                  type="radio"
                  id={data + key}
                  name="status"
                  onChange={() => handleChangeStatus(data)}
                  checked={data === _status}
                />

                <StatusBadge htmlFor={data + key} status={data}>
                  <span onClick={() => {}}>{data}</span>
                </StatusBadge>
              </RadioButton>
            ))}
          </StatusSelector>
        </CardHeader>
        <SearchBox>
          <img src="/static/images/icons/search.svg" width="13" height="23" />
          <SearchInput
            type="text"
            placeholder="Search Ref..."
            onKeyUp={e => {
              if (e.keyCode === 13) {
                onSearch(e.target.value);
              }
            }}
          />
        </SearchBox>
      </PickingListHeader>

      <PickingListFilter>
        <div>
          <label>Sort by:</label>
          <select onChange={e => onSortChange(e.target.value)}>
            <option value="desc">Date Created (DESC)</option>
            <option value="asc">Date Created (ASC)</option>
          </select>
        </div>
        <TopPagination>{renderPagination()}</TopPagination>
      </PickingListFilter>

      <PickingItemContainer>
        {loading ? (
          <div className="d-flex w-100 py-4 align-items-center justify-content-center">
            <Loading />
          </div>
        ) : (
          data &&
          data.items &&
          data.items.map((order, key) => <PickingItem key={key} data={order} onItemClick={handleItemClick} />)
        )}
      </PickingItemContainer>

      <Footer>{renderPagination()}</Footer>
    </PickingListContainer>
  );
};

const PickingListHeader = styled(BoxTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  padding-right: 0;
`;

const CardHeader = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const PickingListContainer = styled.div`
  padding-bottom: 2rem;
`;

const PickingItemContainer = styled.div`
  margin-top: 1.2rem;
  width: 100%;
`;

const TopPagination = styled.div`
  display: none;
  @media screen and (min-width: 600px) {
    display: block;
  }
`;

const SearchBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  input {
    max-width: 100px;
  }

  @media screen and (min-width: 600px) {
    input {
      max-width: unset;
    }
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-weight: bold;
  background: none;
`;

const PickingListFilter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  background-color: unset;
  margin-top: 1rem;

  select {
    border: none;
    outline: none;
    background: none;
    color: #8492a5;
  }

  @media screen and (min-width: 600px) {
    padding: 0.75rem 1.75rem;
    background-color: #ebeff5;
    margin-top: 0;
  }
`;

const StatusSelector = styled.div`
  display: none;

  @media screen and (min-width: 600px) {
    display: flex;
    gap: 0.5rem;
  }
`;

const MobileStatusSelector = styled.div`
  box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem;
  gap: 0.5rem;
  border-radius: 3px;
  margin-bottom: 1rem;

  > .status-form {
    margin-top: 0.5rem;
    gap: 0.5rem;
    display: ${props => (props.active ? 'flex' : 'none')};
    flex-direction: column;
  }

  img {
    transform: ${props => (props.active ? 'rotate(90deg)' : 'unset')};
  }

  @media screen and (min-width: 600px) {
    display: none;
  }
`;

const SelectorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    font-size: 14px;
    margin: 0;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 600px) {
    display: block;
    float: right;
    padding: 0.75rem 1.75rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export default PickingList;

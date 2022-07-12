import React from 'react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { BoxTitle, RadioButton, StatusBadge } from 'components';

const CollectionsFilter = ({ status, onChangeStatus }) => {
  const [_status, setStatus] = useState(status || 'Created');
  const handleChangeStatus = status => {
    setStatus(status);
    onChangeStatus(status);
  };

  return (
    <FilterContainer>
      <TopContainer>
        <div>Filter</div>
        <ResetButton onClick={() => handleChangeStatus('all')}>
          <img src="/static/images/icons/x-circle.svg" />
          <span>Reset Filter</span>
        </ResetButton>
      </TopContainer>

      <StatusSelector>
        <span>By Status</span>
        {['Created', 'Accepted', 'Acknowledged', 'Purchased', 'Cancelled'].map((data, key) => (
          <RadioButton key={key}>
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
    </FilterContainer>
  );
};

const FilterContainer = styled.div``;

const StatusSelector = styled.div`
  padding: 0.75rem 1.75rem;
`;

const TopContainer = styled(BoxTitle)`
  display: flex;
  justify-content: space-between;
`;

const ResetButton = styled.button`
  outline: none;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  color: rgba(176, 187, 203, 1);
`;

export default CollectionsFilter;

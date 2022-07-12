import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { DateLabel, ItemStatus } from 'components';
import moment from 'moment';

const CollectionItem = ({ data }) => {
  const router = useRouter();

  const gotoDetail = () => {
    router.push(`/collections/${data.id}`);
  };

  return (
    <Root>
      <CollectionHeader>
        <CollectionTitle onClick={gotoDetail}>{data.name}</CollectionTitle>
        <ItemStatus status={data.status.toLowerCase()}>{data.status.toLowerCase()}</ItemStatus>
      </CollectionHeader>
      <DateLabel>
        <span>Created:</span> {moment().format('YYYY-MM-DD')}
      </DateLabel>
      <Text>{data.description}</Text>
    </Root>
  );
};

const Root = styled.div`
  margin: 0.75rem 1.75rem;
  border-bottom: 1px solid #e0e6ed;
`;

const CollectionHeader = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CollectionTitle = styled.div`
  cursor: pointer;
`;

const Text = styled.p`
  color: #8492a5;
  font-weight: 600;
  font-size: 12px;
`;

export default CollectionItem;

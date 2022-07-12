import React, { useEffect, useState } from 'react';
import Layout from 'layout';
import { Title, Card, PageBody } from 'components/ui';
import PickingList from './PickingList';
import styled from '@emotion/styled';
import { ApiOrders } from 'api';
import qs from 'qs';
import { useRouter } from 'next/router';

const Picking = ({ search, sort, sortOrder, status, page }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    search,
    sort,
    sortOrder,
    status,
    page,
  });
  const router = useRouter();

  const handleGetOrders = async () => {
    setLoading(true);
    const result = await ApiOrders.gets(query.page, 10, [query.status], query.search, query.sortOrder);
    setOrders(result.data.data);
    setLoading(false);
    const queryParams = qs.stringify(query);
    router.push(`picking?${queryParams}`);
  };

  const handleStatusChange = status => {
    setQuery({ ...query, status, page: 1 });
  };

  const handleSearchChange = search => {
    setQuery({ ...query, search, page: 1 });
  };

  const handleSortChange = sortOrder => {
    setQuery({ ...query, sortOrder, page: 1 });
  };

  const handlePageChange = page => {
    setQuery({ ...query, page });
  };

  useEffect(() => {
    handleGetOrders();
  }, [query]);

  return (
    <Layout>
      <PageBody>
        <Header>
          <HeaderTitle>Picking</HeaderTitle>
        </Header>
        <Box>
          <PickingCard style={{ flexGrow: 1 }}>
            <PickingList
              search={search}
              loading={loading}
              data={orders}
              page={query.page}
              sortOrder={sortOrder}
              onPageChange={handlePageChange}
              onChangeStatus={handleStatusChange}
              onSearch={handleSearchChange}
              onSortChange={handleSortChange}
            />
          </PickingCard>
        </Box>
      </PageBody>
    </Layout>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderTitle = styled(Title)``;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 200px;
  align-items: flex-start;

  @media screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

const PickingCard = styled(Card)`
  background-color: unset;
  box-shadow: none;

  @media screen and (min-width: 600px) {
    background-color: white;
    box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
  }
`;

export default Picking;

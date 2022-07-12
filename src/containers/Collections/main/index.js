import React, { useEffect, useState } from 'react';
import Layout from 'layout';
import { Title, Card, PageBody } from 'components/ui';
import CollectionsFilter from './CollectionsFilter';
import NewCollectionsForm from './NewCollectionsForm';
import CollectionsList from './CollectionsList';
import styled from '@emotion/styled';
import { ApiSupplierCollections } from 'api';
import qs from 'qs';
import { useRouter } from 'next/router';
import { Button } from 'components';

const Collections = ({ search, sort, status, page }) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    per_page: 10,
    search,
    sort,
    status,
    page,
  });
  const router = useRouter();

  const handleGetCollections = async () => {
    setLoading(true);
    const result = await ApiSupplierCollections.index(query.page, query);
    setCollections(result.data.data);
    setLoading(false);
    const queryParams = qs.stringify(query);
    router.push(`collections?${queryParams}`);
  };

  const handleSortChange = sortOrder => {
    setQuery({ ...query, sort: `createdAt:${sortOrder}`, page: 1 });
  };

  const handleSearchChange = search => {
    setQuery({ ...query, search, page: 1 });
  };

  const handlePageChange = page => {
    setQuery({ ...query, page });
  };

  const handleStatusChange = status => {
    setQuery({ ...query, status, page: 1 });
  };

  useEffect(() => {
    handleGetCollections(1);
  }, [query]);

  return (
    <Layout>
      <PageBody>
        <Header>
          <HeaderTitle>Collections</HeaderTitle>
          <ButtonHeaderGroup>
            <Button variant="primary-outline">
              <img src="/static/images/icons/upload.svg" />
              Upload File(CSV)
            </Button>
            <Button variant="primary-outline">
              <img src="/static/images/icons/download.svg" />
              Download Format
            </Button>
          </ButtonHeaderGroup>
        </Header>
        <Box>
          <FilterCard>
            <CollectionsFilter onChangeStatus={handleStatusChange} />
            <NewCollectionsForm onReload={handlePageChange} />
          </FilterCard>
          <Card style={{ flexGrow: 1 }}>
            <CollectionsList
              query={query}
              loading={loading}
              collections={collections}
              onSearch={handleSearchChange}
              onPageChange={handlePageChange}
              onSortChange={handleSortChange}
            />
          </Card>
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

const ButtonHeaderGroup = styled.div`
  display: none;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media screen and (min-width: 600px) {
    display: flex;
  }
`;

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

const FilterCard = styled(Card)`
  width: 100%;
  max-width: 100%;

  @media screen and (min-width: 600px) {
    max-width: 444px;
  }
`;

export default Collections;

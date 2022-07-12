import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Breadcrumbs, HeadingDetailTitle, Loading } from 'components';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import Catalogue from './Catalogue';
import useSWR from 'swr';
import { ApiReturnOrders } from 'api';
import ProductListContainer from './ProductListContainer';

const fetchReturn = async id => {
  const resp = await ApiReturnOrders.detail(id);
  const data = resp.data.data;
  return { detail: data.modal, items: data.items };
};

const Created = ({ id }) => {
  const { data, error } = useSWR([id, 'return-created'], fetchReturn);
  const isBigScreen = useMediaQuery({ query: '(min-width: 600px)' });

  if (!data && !error) {
    return (
      <div className="d-flex w-100 py-4 align-items-center justify-content-center">
        <Loading />
      </div>
    );
  }

  if (!data) {
    return <p>Error fetching data from api </p>;
  }

  return (
    <>
      <div>
        <Breadcrumbs>Returns / {data.detail.title}</Breadcrumbs>
        <HeadingDetailTitle>{data.detail.title}</HeadingDetailTitle>
        <Box>
          <ProductListContainer id={id} />
          {isBigScreen && <Catalogue id={id} detail={data.detail} items={data.items} />}
        </Box>
      </div>
      <MobileNavigation id={id} />
    </>
  );
};

const MobileNavigation = ({ id }) => {
  const [upButton, setUpBotton] = useState(false);
  const router = useRouter();

  const handleScroll = () => {
    window.scroll({
      top: 0,
      left: 100,
      behavior: 'smooth',
    });
  };

  const handleGoDetails = () => {
    router.push(`/picking/${id}/summary`);
  };

  useEffect(() => {
    var distanceScrolled = document.documentElement.scrollTop;
    setUpBotton(distanceScrolled > 10);

    const handleScrollEvent = () => {
      var distanceScrolled = document.documentElement.scrollTop;
      setUpBotton(distanceScrolled > 10);
    };
    window.addEventListener('scroll', handleScrollEvent);

    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);
  return (
    <FloatingButtonGroup>
      {upButton && (
        <ButtonUp onClick={handleScroll}>
          <img src="/static/images/icons/arrow-up.svg" />
          Go Up
        </ButtonUp>
      )}
      <ButtonDetails onClick={handleGoDetails}>See Details</ButtonDetails>
    </FloatingButtonGroup>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 200px;
  align-items: stretch;

  @media screen and (min-width: 840px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const FloatingButtonGroup = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: block;

  @media screen and (min-width: 600px) {
    display: none;
  }
`;

const CircleButton = styled.button`
  --size: 66px;
  border-radius: var(--size);
  width: var(--size);
  height: var(--size);
  display: flex;
  flex-direction: column;
  border: none;
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const ButtonUp = styled(CircleButton)`
  background: #b0bbcb;
  opacity: 0.7;
  margin-bottom: 1rem;
  gap: 0.3rem;
`;

const ButtonDetails = styled(CircleButton)`
  background: #657acb;
  box-shadow: 0px 2px 3px rgba(101, 122, 203, 0.41);
`;

export default Created;

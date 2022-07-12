import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  BoxTitle,
  Breadcrumbs,
  Card,
  ItemStatus,
  FlexBox,
  HeadingDetailTitle,
  Line,
  StepCard,
  Button,
  DateLabel,
  Loading,
} from 'components';
import ItemsCreator from './ItemsCreator';
import CostCreator from './CostCreator';
import { ApiImage, ApiSupplierCollections } from 'api';
import { useItemsCreator } from './hooks';
import moment from 'moment';
import useSWR from 'swr';
import { useRouter } from 'next/router';

const CollectionDetail = ({ id, step }) => {
  const { items } = useItemsCreator();
  const { data, error } = useSWR([id, 'collectiondetail'], () => ApiSupplierCollections.get(id));
  const router = useRouter();

  const stepinfos = [
    {
      number: 1,
      title: 'Quotation Accepted',
      description: 'Designer accepts quotation for all product.User enters basic product information.',
    },
    {
      number: 2,
      title: 'Purchase Acknowledged',
      description: 'User completes & Input order quantity form sales territories, then generates purchase order.',
    },
    {
      number: 3,
      title: 'Product & In-Product',
      description: 'Awating purchase arrival. User adds details for shipment.',
    },
  ];

  const createProduct = async (id, product) => {
    console.log({ product });
    const formData = new FormData();
    formData.append('file', product.file);
    formData.append('param1', product.product_code.label);
    formData.append('param2', product.upc);
    formData.append('param3', 'Mainthumbnail');
    const img = await ApiImage.upload(formData);
    console.log({ img });

    if (!img.data.success) {
      throw new Error('Failed to upload image');
    }

    console.log('debug', { product });
    await ApiSupplierCollections.createProducts(id, {
      name: product.product_code.label + ' ' + product.territory.label,
      cost: product.cost,
      itemClass: product.product_code.value,
      itemGroup: product.territory.value,
      itemBrand: product.brand.value.
      product_code: product.code,
      currency: data.currency,
      territory: 'Singapore',
      upc: product.upc,
      qty: product.qty,
      imageUrl: 'https://vmos-asset-staging.s3.ap-southeast-1.amazonaws.com/assets/' + img.data.data.filename,
    });
  };

  const handleConfirm = async () => {
    if (step == 2) {
      await ApiSupplierCollections.update({ id, status: 1 });
      window.location = `/collections/${id}?step=3`;
      return;
    }
    try {
      // const resp = await ApiSupplierCollections.create(JSON.parse(data));
      // const d = { id: 511, currency: "SGD"}
      const apis = items.map(data => createProduct(id, data));
      await Promise.all(apis);
      await ApiSupplierCollections.update({
        action: 1,
        collection_id: id,
      });
      window.location = `/collections/${id}?step=2`;
    } catch (e) {
      console.error(e.message);
    } finally {
    }
  };

  console.log({ data });
  if (!data && !error) {
    return (
      <div className="d-flex w-100 py-4 align-items-center justify-content-center">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs>Collections / {data.name}</Breadcrumbs>
      <HeadingDetailTitle>Barbie Bag Collection</HeadingDetailTitle>
      <StepCardContainer>
        {stepinfos.map((data, key) => (
          <StepCard data={{ ...data, active: key < step }} key={key} />
        ))}
      </StepCardContainer>

      <Card className="mt-4">
        <BoxTitle>
          <span>Collection Details</span>
          <Button variant="danger-outline">Cancel Collection</Button>
        </BoxTitle>

        <FlexBox>
          <HeadingDetailTitle>{data.name}</HeadingDetailTitle>
          <ItemStatus status={data.status && data.status.toLowerCase()}>{data.status}</ItemStatus>
        </FlexBox>

        <FlexBox>
          <DetailItemContainer>
            <DetailItem>
              <ItemLabel>Currency:</ItemLabel>
              <ItemValue>{data.currency}</ItemValue>
            </DetailItem>
            <DateLabel>
              <span>Created:</span> {moment(data.created_at).format('DD/MM/YYYY')}
            </DateLabel>
            <Note>{data.description}</Note>
          </DetailItemContainer>
        </FlexBox>

        <BoxTitle topBorder={true}>
          <span>Collection Items*</span>
          <Button variant="primary-outline">
            <img src="/static/images/icons/file.svg" />
            Quote Amendment
          </Button>
        </BoxTitle>

        {data.id && <ItemsCreator id={id} step={step} />}

        <BoxTitle topBorder={true}>
          <span>Other Cost</span>
        </BoxTitle>

        <CostCreator id={id} step={step} currency={data.currency} />

        <Line />

        <FlexBox>
          <div></div>
          <Button onClick={handleConfirm} variant="primary" size="medium" className="my-3">
            Confirm
          </Button>
        </FlexBox>
      </Card>
    </div>
  );
};

const StepCardContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
`;

const Note = styled.span`
  color: #b0bbcb;
`;

const DetailItemContainer = styled.div`
  margin-bottom: 2rem;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemLabel = styled.div`
  color: #8492a5;
`;

const ItemValue = styled.div`
  color: black;
`;

export default CollectionDetail;

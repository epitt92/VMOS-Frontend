import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Input, Select, BoxTitle } from 'components';
import { ApiSupplier, ApiSupplierCollections } from 'api';
import useSWR from 'swr';
import { useRouter } from 'next/router';

const fetchInitialProperties = async () => {
  const [suppliers] = await Promise.all([ApiSupplier.index()]);
  return {
    suppliers: suppliers.data.data.models,
  };
};

const NewCollectionsForm = ({ onReload }) => {
  const [state, setState] = useState({
    collectionName: '',
    supplierName: {},
    currency: { label: 'USD', value: 'USD' },
    emailTitle: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    collectionName: null,
  });

  const dispatch = (name, value) => {
    setErrors({ ...errors, [name]: null });
    if (name === 'supplierName') {
      const cur = properties.suppliers.find(d => {
        return d.accNo === value.value;
      });
      setState({ ...state, [name]: value, currency: { label: cur.currencyCode, value: cur.currencyCode } });
    } else {
      setState({ ...state, [name]: value, errors });
    }
  };

  const { data: properties, error } = useSWR(true, fetchInitialProperties, {
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
  });
  const router = useRouter();

  const supplierOptions =
    properties && properties.suppliers
      ? properties.suppliers.map(data => ({ value: data.accNo, label: data.companyName }))
      : [];

  const handleSubmit = async () => {
    if (!state.collectionName) {
      setErrors({ ...errors, collectionName: 'Collection name required' });
      return;
    }

    const data = {
      currency: state.currency.value,
      description: state.description,
      email_title: state.emailTitle,
      name: state.collectionName,
      creditor_code: state.supplierName.value,
    };

    const { data: response } = await ApiSupplierCollections.create(data);
    console.log({ response });

    window.localStorage.setItem('tmpSupplierCollection', JSON.stringify(response.data));
    router.push(`/collections/${response.data.id}`);
  };

  return (
    <NewCollectionsFormContainer>
      <BoxTitle>
        <span>New Collection</span>
      </BoxTitle>

      <FormContainer>
        <Input
          label={
            errors.collectionName ? (
              <span className="text-danger d-block" style={{ marginBottom: '0.625rem' }}>
                {errors.collectionName}
              </span>
            ) : (
              <label>Collection Name*</label>
            )
          }
          required="required"
          placeholder="Collection Name"
          value={state.collectionName}
          onChange={e => dispatch('collectionName', e.target.value)}
          name="title"
          title="Return title"
        />

        <Select
          label={<label>Supplier Name*</label>}
          options={supplierOptions}
          background={`#fff`}
          border={`#D3DCE6`}
          margin={`1.25rem`}
          colorHover={`#fff`}
          colorSelected={`#fff`}
          color={`#212529`}
          backgroundSelected={`#828BAE`}
          custom={true}
          value={state.supplierName}
          onChange={value => dispatch('supplierName', value)}
          placeholder={`Select`}
        />

        <Select
          label={<label>Currency*</label>}
          options={currencyOptions}
          background={`#fff`}
          border={`#D3DCE6`}
          margin={`1.25rem`}
          colorHover={`#fff`}
          colorSelected={`#fff`}
          color={`#212529`}
          backgroundSelected={`#828BAE`}
          custom={true}
          value={state.currency}
          onChange={value => dispatch('currency', value)}
          placeholder={`Select`}
        />

        <Input
          label={<label>Email Title</label>}
          required="required"
          placeholder="Email Title"
          value={''}
          name="title"
          title="Email Title"
          value={state.emailTitle}
          onChange={e => dispatch('emailTitle', e.target.value)}
        />

        <Input
          label={<label>Description</label>}
          required="required"
          placeholder="Description"
          value={''}
          name="title"
          title="Description"
          type={'textarea'}
          value={state.description}
          onChange={e => dispatch('description', e.target.value)}
        />

        <Button onClick={handleSubmit} variant="primary" size="medium" style={{ float: 'right' }} className="my-3">
          Create
        </Button>
      </FormContainer>
    </NewCollectionsFormContainer>
  );
};

const NewCollectionsFormContainer = styled.div``;

const FormContainer = styled.div`
  padding: 0.75rem 1.75rem;
  margin-top: 1rem;

  label {
    margin-bottom: 0.625rem;
  }
`;

const currencyOptions = [
  {
    label: 'USD',
    value: 'USD',
  },
  {
    label: 'RMB',
    value: 'RMB',
  },
  {
    label: 'SGD',
    value: 'SGD',
  },
  {
    label: 'MYR',
    value: 'MYR',
  },
  {
    label: 'YEN',
    value: 'YEN',
  },
];

export default NewCollectionsForm;

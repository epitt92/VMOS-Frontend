import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Input, Select, FlexBox, FloatingButton } from 'components';
import { ApiCollections } from 'api';
import { useItemsCreator } from '../hooks';

const ItemForm = ({ collectionId, id, onRemove, classifications, namecodes, step }) => {
  const { removeItem, updateItem } = useItemsCreator();
  const [state, setState] = useState({
    product_code: '',
    item_group: '',
    qty: '',
    cost: '',
    code: '',
    upc: '',
    name: '',
  });
  const [img, setImg] = useState();
  const [file, setFile] = useState();

  const dispatch = (name, value) => {
    const newstate = { ...state, [name]: value };
    setState(newstate);
    console.log('state', newstate);

    updateItem(id, { ...newstate, img, file });
    console.log({ file });
  };

  const fileEl = useRef(null);
  const handleUpload = () => {
    var file = fileEl.current.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    setFile(file);
    updateItem(id, { ...state, file });

    reader.onloadend = function(e) {
      setImg([reader.result]);
    }.bind(this);
  };

  const handleUploadClick = () => {
    fileEl.current.click();
  };

  const handleGetProductCode = async () => {
    try {
      const resp = await ApiCollections.generateProductCode(
        collectionId,
        state.item_group.value,
        state.product_code.value
      );
      dispatch('code', resp.data.data);
    } catch (e) {
      console.error(e.messageid);
    }
  };

  const handleGetProductUpc = async () => {
    try {
      const resp = await ApiCollections.generateUpc(collectionId, state.item_group.value, state.product_code.value);
      dispatch('upc', resp.data.data);
    } catch (e) {
      console.error(e.messageid);
    }
  };

  const productName = `${state.product_code.label} ${state.item_group.label}`
    ? state.product_code.label && state.item_group.label
    : '';

  return (
    <Root>
      <FloatingButton onClick={() => removeItem(id)}>
        <img src="/static/images/icons/delete.svg" />
      </FloatingButton>
      <Form>
        <div style={{ display: 'flex' }}>
          <UploadBox onClick={handleUploadClick}>
            <input
              style={{ display: 'none' }}
              ref={fileEl}
              type="file"
              name="user[image]"
              multiple={true}
              onChange={handleUpload}
            />
            {img ? <img src={img} width="65" height="65" /> : <img src="/static/images/icons/no-product.svg" />}
            <FlexBox style={{ gap: '.5rem', color: '#8492A5' }}>
              <img src="/static/images/icons/upload-grey.svg" />
              <span>Upload Image</span>
            </FlexBox>
            <Note>Optimal resolution: 500 x 500</Note>
          </UploadBox>
          <div style={{ paddingLeft: '15px', width: '50%', marginTop: '1rem' }}>
            <FormGroup style={{ padding: 0, marginTop: '1rem' }}>
              <Select
                options={namecodes}
                background={`#fff`}
                border={`#D3DCE6`}
                colorHover={`#fff`}
                colorSelected={`#fff`}
                color={`#212529`}
                backgroundSelected={`#828BAE`}
                custom={true}
                value={state.product_code}
                onChange={value => dispatch('product_code', value)}
                placeholder={`Select Namecode`}
              />
            </FormGroup>

            <FormGroup style={{ padding: 0, marginTop: '1rem' }}>
              <Select
                options={classifications}
                background={`#fff`}
                border={`#D3DCE6`}
                colorHover={`#fff`}
                colorSelected={`#fff`}
                color={`#212529`}
                backgroundSelected={`#828BAE`}
                custom={true}
                value={state.territory}
                onChange={value => dispatch('territory', value)}
                placeholder={`Select Character`}
              />
            </FormGroup>

            <FormGroup style={{ padding: 0, marginTop: '1rem' }}>
              <Select
                options={classifications}
                background={`#fff`}
                border={`#D3DCE6`}
                colorHover={`#fff`}
                colorSelected={`#fff`}
                color={`#212529`}
                backgroundSelected={`#828BAE`}
                custom={true}
                value={state.territory}
                onChange={value => dispatch('territory', value)}
                placeholder={`ItemBrand`}
              />
            </FormGroup>
          </div>
        </div>

        <FormGroup style={{ padding: 0, marginTop: '1rem' }}>
          <InputWithAddon>
            <Input
              autoWidth={true}
              required="required"
              placeholder="Product Code"
              value={state.code}
              onChange={e => dispatch('code', e.target.value)}
              name="title"
              title="Product Code"
            />
            <img src="/static/images/icons/fetch-icon.svg" onClick={handleGetProductCode} />
          </InputWithAddon>
        </FormGroup>

        <FormGroup>
          <Input
            autoWidth={true}
            required="required"
            placeholder="Product Name"
            value={productName}
            name="title"
            title="Product Name"
          />
        </FormGroup>

        <FormGroup>
          <InputWithAddon>
            <Input value={state.upc} onChange={e => dispatch('upc', e.target.value)} name="title" title="Product UPC" />
            <img src="/static/images/icons/fetch-icon.svg" onClick={handleGetProductUpc} />
          </InputWithAddon>
        </FormGroup>

        <FormGroup>
          <Input
            autoWidth={true}
            required="required"
            placeholder="Qty Per Ctn"
            value={state.qty}
            onChange={e => dispatch('qty', e.target.value)}
            name="title"
            title="Qty Per Ctn"
          />

          <Input
            autoWidth={true}
            required="required"
            placeholder="Cost Price"
            value={state.cost}
            onChange={e => dispatch('cost', e.target.value)}
            name="title"
            title="Cost Price"
          />
        </FormGroup>
      </Form>
    </Root>
  );
};

const Root = styled.div`
  position: relative;
  background: #f6f7f9;
  border: 1px solid #ebeff5;
  border-radius: 3px;
`;

const UploadBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 200px;
  border: 2px dashed #d3dce6;
  border-radius: 3px;
  background-color: #f6f7f9;
`;

const Form = styled.div`
  display: flex;
  margin: 1rem;
  flex-direction: column;
`;

const Note = styled.span`
  color: #b0bbcb;
`;

const FormGroup = styled(FlexBox)`
  padding: 0;
  gap: 1rem;

  > div {
    width: 100%;
  }

  input[type='text'] {
    min-width: auto;
  }
`;

const InputWithAddon = styled.div`
  position: relative;
  img {
    position: absolute;
    right: 10px;
    top: 20%;
    cursor: pointer;
  }
`;

export default ItemForm;

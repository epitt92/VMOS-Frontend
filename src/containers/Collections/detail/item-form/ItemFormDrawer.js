import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Input, Select, FlexBox, FloatingButton, Button } from 'components';
import { ApiCollections } from 'api';
import { useItemsCreator } from '../hooks';
import { DrawerBody, DrawerContent, DrawerHeader } from 'components/Drawer/DrawerUI';

const ItemFormDrawer = ({ data, onClose }) => {
  const { removeItem, updateItem } = useItemsCreator();
  const [state, setState] = useState({
    product_code: {},
    territory: data.territory,
    qty: data.qty,
    rrp: data.rrp,
    cost: data.cost,
    code: '',
    upc: '',
    name: data.name,
    width: data.width,
    length: data.length,
    height: data.height,
  });
  const [img, setImg] = useState();
  const [file, setFile] = useState();

  const dispatch = (name, value) => {
    const newstate = { ...state, [name]: value };
    setState(newstate);
    updateItem(id, { ...newstate, img, file });
    console.log({ file });
  };

  useEffect(() => {
    setState({
      product_code: {},
      territory: data.territory,
      qty: data.qty,
      rrp: data.rrp,
      cost: data.cost,
      code: '',
      upc: '',
      name: data.name,
      width: data.width,
      length: data.length,
      height: data.height,
    });
  }, [data]);

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

  console.log({ data });

  const handleUploadClick = () => {
    fileEl.current.click();
  };

  return (
    <DrawerContent>
      <DrawerHeader>
        <h3>Edit Product</h3>
        <FloatingButton onClick={() => removeItem(id)}>
          <img src="/static/images/icons/delete.svg" />
        </FloatingButton>
      </DrawerHeader>
      <DrawerBody>
        <UploadBox onClick={handleUploadClick}>
          <input
            style={{ display: 'none' }}
            ref={fileEl}
            type="file"
            name="user[image]"
            multiple={true}
            onChange={handleUpload}
          />
          {img ? (
            <img src={img} width="65" height="65" />
          ) : (
            <img src={process.env.NEXT_PUBLIC_ASSET_BASE_URL + '/' + data.imageUrl} width="65" height="65" />
          )}
          <FlexBox style={{ gap: '.5rem', color: '#8492A5' }}>
            <img src="/static/images/icons/upload-grey.svg" />
            <span>Upload Image</span>
          </FlexBox>
          <Note>Optimal resolution: 500 x 500</Note>
        </UploadBox>

        <FormGroup style={{ padding: 0, marginTop: '0.5rem' }}>
          <Input
            label={<label style={{ marginBottom: '.5rem' }}>Product Name</label>}
            required="required"
            placeholder="Product Name"
            value={state.name}
            onChange={e => dispatch('name', e.target.value)}
            name="title"
            title="Product Name"
            style={{ marginBottom: '0.5rem' }}
          />
        </FormGroup>

        <FormGroup>
          <Input
            label={<label style={{ marginBottom: '.5rem' }}>Territory Name</label>}
            required="required"
            placeholder="Territory Name"
            value={state.territory}
            onChange={e => dispatch('territory', e.target.value)}
            name="title"
            title="Territory Name"
            style={{ marginBottom: '0.5rem' }}
          />
        </FormGroup>

        <FormGroup>
          <Input
            label={<label style={{ marginBottom: '.5rem' }}>RRP</label>}
            required="required"
            placeholder="RRP"
            value={state.rrp}
            onChange={e => dispatch('rrp', e.target.value)}
            name="title"
            title="RRP"
            style={{ marginBottom: '0.5rem' }}
          />
        </FormGroup>

        <FormGroup>
          <Input
            label={<label style={{ marginBottom: '.5rem' }}>Qty</label>}
            autoWidth={true}
            required="required"
            placeholder="Qty"
            value={state.qty}
            onChange={e => dispatch('qty', e.target.value)}
            name="title"
            title="Qty"
          />

          <Input
            label={<label style={{ marginBottom: '.5rem' }}>Cost</label>}
            autoWidth={true}
            required="required"
            placeholder="Cost"
            value={state.cost}
            onChange={e => dispatch('cost', e.target.value)}
            name="title"
            title="Cost"
          />
        </FormGroup>

        <FormGroup>
          <Input
            label={<label style={{ marginBottom: '.5rem' }}>Length</label>}
            autoWidth={true}
            required="required"
            placeholder="Length"
            value={state.length}
            onChange={e => dispatch('length', e.target.value)}
            name="title"
            title="Length"
            style={{ width: '100%' }}
          />

          <Input
            label={<label style={{ marginBottom: '.5rem' }}>Height</label>}
            autoWidth={true}
            required="required"
            placeholder="Height"
            value={state.height}
            onChange={e => dispatch('height', e.target.value)}
            name="title"
            title="Height"
            style={{ width: '100%' }}
          />

          <Input
            label={<label style={{ marginBottom: '.5rem' }}>Width</label>}
            autoWidth={true}
            required="required"
            placeholder="Width"
            value={state.width}
            onChange={e => dispatch('width', e.target.value)}
            name="title"
            title="Width"
            style={{ width: '100%' }}
          />
        </FormGroup>

        <FormGroup>
          <Input
            type="textarea"
            label={<label style={{ marginBottom: '.5rem' }}>Comments</label>}
            required="required"
            placeholder="Comments"
            value={state.comments}
            onChange={e => dispatch('comments', e.target.value)}
            name="title"
            title="Comments"
            style={{ marginBottom: '0.5rem' }}
          />
        </FormGroup>

        <FormGroup>
          <Button style={{ width: '100%' }} variant="primary-outline" onClick={onClose}>
            Cancel
          </Button>
          <Button style={{ width: '100%' }} variant="primary">
            Confirm
          </Button>
        </FormGroup>
      </DrawerBody>
    </DrawerContent>
  );
};

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
  margin-bottom: 1rem;
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

export default ItemFormDrawer;

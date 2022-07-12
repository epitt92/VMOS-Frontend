import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from 'layout';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ApiLocations, ApiReturnOrders, ApiAltSkus, ApiOrders } from 'api';
import { Loading, SelectAsync } from 'components';
import { checkValidExist, log } from 'helpers';
import { toast } from 'react-toastify';
import moment from 'moment';
import SkuSelect from './components/SkuSelect';

const Nav = styled.nav`
  .breadcrumb {
    .breadcrumb-item {
      a {
        color: #8492a5;
      }
    }
  }
`;

const TitleDetail = styled.div`
  font-size: 18px;
  font-family: 'OpenSans Bold';
  color: #3b4857;
`;

const Campaign = styled.div`
  background: #fff;
  box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
  border-radius: 5px;
  margin-top: 1.5rem;
  padding-bottom: 2rem;
  .start-date {
    padding: 0.375rem 0.75rem;
    background: #ebeff5;
    border-radius: 5px;
    display: inline-flex;
    width: auto;
    margin-top: 1rem;
    margin-bottom: 0.75rem;
  }
  .title {
    padding: 0.75rem 1.75rem;
    border-bottom: 1px solid #e0e6ed;
    > b {
      font-size: 1rem;
    }
  }
  .header {
    padding: 0.75rem 1.75rem;
    > b {
      font-size: 1.125rem;
      display: block;
      margin-bottom: 0.5rem;
    }
  }
  .content {
    margin-top: 1rem;
    padding-bottom: 2rem;
    .options-edit {
      ul {
        &.options-menu {
          box-shadow: 0px 3px 18px rgba(39, 52, 67, 0.2);
          border-radius: 5px;
          position: absolute;
          z-index: 1111;
          background: #fff;
          margin-top: 5px;
          width: 100%;
        }
        li {
          > span {
            padding: 0.5rem 0.625rem;
            display: flex;
            align-items: center;
            color: #657acb;
            cursor: pointer;
            &:hover {
              cursor: pointer;
              background: #ebeff5;
            }
          }
        }
      }
    }
    .delete {
    }
    .delete-return {
    }
    .table > :not(:first-child) {
      border-top: 0px;
    }
    .table > :not(caption) > * > * {
      padding: 0.75rem 1.25rem;
      text-align: center;
      vertical-align: middle;
      .btn-unassigned {
        display: inline-flex;
        align-items: center;
        font-size: 0.75rem;
        padding: 0.375rem 0.75rem;
        &:after {
          margin-left: auto;
          content: '';
          width: 8px;
          height: 8px;
          display: inline-flex;
          background-repeat: no-repeat;
          background-image: url('/static/images/icons/arrow-down-small.svg');
        }
      }
    }
  }
`;

const Detail = ({ location_code, customergroup, location, address, description }) => {
  const router = useRouter();
  const [detail, setDetail] = React.useState({
    data: [],
    edit: [],
    loadingSku: [],
  });
  const [loading, setLoading] = React.useState(true);
  const [activeAction, setActiveAction] = React.useState(-1);

  const getDetail = async code => {
    try {
      const { data } = await ApiLocations.detail(code);
      console.log({ data });
      setDetail(prev => ({ ...prev, data: data.data.items }));
      setLoading(false);
      log(data, 'info');
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (code, type, any) => async e => {
    const { value } = e.target;
    setDetail(prev => ({
      ...prev,
      data: prev.data.map(any => {
        if (any.product_code === code) {
          return {
            ...any,
            [type]: value,
          };
        }

        return { ...any };
      }),
    }));
    updateProductLocation(any, type, value, 'input');
  };

  const handleSkuChange = (index, e) => {
    detail.data[index] = { ...detail.data[index], alt_sku: e.label, alt_sku_value: e.value };
    setDetail({
      ...detail,
    });
    updateProductLocation(detail.data[index], 'alt_sku_id', e.value, 'select');
  };

  const updateProductLocation = async (any, type, value, form) => {
    try {
      const objectToSend =
        form === 'input '
          ? {
              alt_sku_id: 0,
              location_code: any.location_code,
              max_qty: parseInt(any.max_qty),
              min_qty: parseInt(any.min_qty),
              product_code: any.product_code,
              retail_price: any.price,
              [type]: parseInt(value),
            }
          : {
              alt_sku_id: value,
              location_code: any.location_code,
              max_qty: parseInt(any.max_qty),
              min_qty: parseInt(any.min_qty),
              product_code: any.product_code,
              retail_price: any.price,
            };

      const { data } = await ApiLocations.updateProductLocation(objectToSend);
      showNotif('Successfully updated', 'success');
      log(data, 'info');

      if (type === 'input') {
        setDetail(prev => ({
          ...prev,
          data: prev.data.map(item => (item.product_code === any.code ? { ...item, [type]: value } : { ...item })),
        }));
      }
    } catch (e) {
      showNotif(e?.response?.data?.error?.message, 'error');
      log(e, 'error');
    }
  };

  const showAction = index => () => {
    if (activeAction === index) {
      setActiveAction(-1);
      return;
    }
    setActiveAction(index);
  };

  const handleCancelEdit = () => {
    setDetail(prev => ({
      ...prev,
      edit: [],
    }));
  };

  const handleDelete = async data => {
    try {
      const objectToSend = { location_code: data.location_code, product_code: data.product_code };
      const response = await ApiLocations.deleteProductLocation(objectToSend);
      setDetail(prev => ({
        ...prev,
        data: prev.data.filter(any => any.product_code !== response.data.data.product_code),
      }));
      showNotif('Successfully deleted', 'success');
      log(response, 'info');
    } catch (e) {
      showNotif(e?.response?.data?.error?.message, 'error');
      log(e, 'error');
    }
  };

  const handleDeleteAndCreateReturns = async (any, index) => {
    // await handleDelete(any);
    await createReturns(any, index);
  };

  const createReturns = async (data, index) => {
    try {
      const objectToSend = {
        returns: {
          location: data.location_code,
          customer_return_ref: '',
          description: '',
          title: `Return From, ${data.location_code} ${moment(new Date()).format('DD/MM/YYYY hh:mm:ss')}`,
        },
      };

      const { data: resp } = await ApiReturnOrders.create(objectToSend);
      const returns = resp.data.modal;

      const ddetail = detail.data[index];
      const createItemsData = {
        altSku: ddetail.alt_sku,
        defectiveQuantity: 0,
        itemCode: ddetail.product_code,
        quantity: ddetail.stock,
      };
      await ApiReturnOrders.createItems({ items: [createItemsData], returnId: returns.id });

      showNotif('Successfully created returns', 'success');
    } catch (e) {
      showNotif(e?.response?.data?.error?.message, 'error');
      log(e, 'error');
    }
  };

  const showNotif = (message, type) => {
    return toast(`${message}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type,
    });
  };

  const handleInputChange = code => async value => {
    setDetail(prev => ({
      ...prev,
      data: prev.data.map(item => (item.product_code === code ? { ...item, alt_sku: value } : { ...item })),
    }));
  };

  const handleSelect = any => async value => {
    updateProductLocation(any, 'alt_sku_id', value.value, 'select');
  };

  const loadOptions = price => value => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await ApiAltSkus.indexSelect(100, 0, customergroup, price);
        const { models = [] } = data.data;
        const newOptions = models.map(m => ({ label: m.altSku, value: m.id }));
        const result = newOptions.filter(state => state.label.toLowerCase().includes(value.toLowerCase()));
        resolve(result);
      } catch (e) {
        showNotif(e?.response?.data?.error?.message, 'error');
        log(e, 'error');
        reject(e);
      }
    });
  };

  const handleGenerateOrder = async () => {
    const date = new Date();
    const objectToSend = {
      debtor: customergroup,
      FromLocation: process.env.NEXT_PUBLIC_FROM_LOCATION,
      active: true,
      consignment: false,
      customer_name: `${location}`,
      customer_po_ref: null,
      date: date,
      description: 'test',
      name: `${location} ${date.toISOString()}`,
      submitted_at: date,
    };
    const { data } = await ApiOrders.create(objectToSend);
    const orders = { ...data.data, data: detail.data };
    window.localStorage.setItem('campaign_data', JSON.stringify(orders));
    router.push(
      `/orders/${location}?customergroup=${customergroup}&location=${location}&address=${address}&description=${description}`
    );
  };

  React.useEffect(() => {
    getDetail(location);
  }, [location]);

  return (
    <Layout>
      <Nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link scroll={false} href={`/sales`}>
              <a>Catalogue</a>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Catalogue Detail</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {location_code} Overview
          </li>
        </ol>
      </Nav>
      <TitleDetail>Catalogue Detail</TitleDetail>
      <Campaign>
        <div className="title">
          <b>Campaign Summary</b>
        </div>
        <div className="header">
          <b>{description}</b>
          <p className="m-0">{location}</p>
          {/* <div className='start-date'>
            Start Date: 13/09/19
          </div> */}
          {/* <span className='d-block text-read'>Some description text about this campaign</span> */}
        </div>
        <div className="content">
          <div className="table-responsive">
            <table className="table">
              <thead className="table-light">
                <tr onClick={handleCancelEdit}>
                  <th scope="col">Products</th>
                  <th scope="col">ItemCode</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Alt SKU</th>
                  <th scope="col">Price</th>
                  <th scope="col">MinStock</th>
                  <th scope="col">MaxStock</th>
                  <th scope="col">CurrentQty</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td style={{ boxShadow: 'none', borderBottomWidth: '0px' }} colSpan={11}>
                      <div className="d-flex w-100 py-4 align-items-center justify-content-center">
                        <Loading />
                      </div>
                    </td>
                  </tr>
                ) : (
                  detail.data.map((any, index) => {
                    return (
                      <tr key={any.product_code + index}>
                        <td onClick={handleCancelEdit}>
                          <div className="d-flex align-items-center">
                            <img
                              style={{ width: '60px', height: 'auto' }}
                              src={
                                checkValidExist(any.product_image_url)
                                  ? any.product_image_url
                                  : '/static/images/placeholder-image.png'
                              }
                              alt="product"
                              className="img-fluid"
                            />
                          </div>
                        </td>
                        <td onClick={handleCancelEdit}>{any.product_code}</td>
                        <td onClick={handleCancelEdit}>{any.bar_code}</td>
                        <td onClick={handleCancelEdit} style={{ width: '60%' }}>
                          <SkuSelect
                            onChange={e => handleSkuChange(index, e)}
                            debtor={customergroup}
                            price={any.price}
                            selected={{ value: any.alt_sku_value, label: any.alt_sku }}
                          />
                        </td>
                        <td onClick={handleCancelEdit}>${any.price}</td>
                        <td onClick={handleCancelEdit} className="text-center">
                          <input
                            type="number"
                            onChange={handleChange(any.product_code, 'min_qty', any)}
                            className="form-control"
                            value={any.min_qty}
                          />
                        </td>
                        <td onClick={handleCancelEdit} className="text-center">
                          <input
                            type="number"
                            onChange={handleChange(any.product_code, 'max_qty', any)}
                            className="form-control"
                            value={any.max_qty}
                          />
                        </td>
                        <td onClick={handleCancelEdit} className="text-center">
                          {any.stock}
                        </td>
                        <td style={{ width: '15%' }}>
                          <div className="position-relative options-edit">
                            <button
                              onClick={showAction(index)}
                              className="btn w-100 btn-primary justify-content-center text-white btn-unassigned">
                              <span className="d-flex w-100 justify-content-center">Action</span>
                            </button>
                            {activeAction === index && (
                              <ul className="list-unstyled options-menu">
                                <li
                                  onClick={() => {
                                    handleDelete(any);
                                  }}
                                  className="delete">
                                  <span>Delete</span>
                                </li>
                                <li className="delete-return">
                                  <span
                                    style={{ textAlign: 'left' }}
                                    onClick={() => {
                                      handleDeleteAndCreateReturns(any, index);
                                    }}>
                                    Delete & Return
                                  </span>
                                </li>
                              </ul>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-end">
            <Link
              scroll={false}
              href={`/sales/detail-product?location_code=${location_code}&customergroup=${customergroup}&location=${location}&address=${address}`}>
              <a className="btn w-15 btn-outline-secondary text-primary me-4">Modify</a>
            </Link>
            <a onClick={handleGenerateOrder} className="btn w-15 btn-primary text-white me-4">
              Generate Order
            </a>
          </div>
        </div>
      </Campaign>
    </Layout>
  );
};

export default Detail;

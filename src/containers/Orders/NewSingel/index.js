import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { ApiLocations, ApiOrders, ApiAltSkus } from 'api';
import { log, checkValidExist } from 'helpers';
import { Loading, FloatingButton, FlexBox, Button } from 'components';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { usePageLoading } from 'components/PageLoading/PageLoading';
import { useModal } from 'components/Modal/hooks/ModalContext';

const Detail = ({ id, customergroup, location, address, location_code, description }) => {
  const router = useRouter();
  const [detail, setDetail] = React.useState({ data: [] });
  const [loading, setLoading] = React.useState(false);
  const [orderLoading, setOrderLoading] = React.useState(false);
  const { modal } = useModal();

  const handleChange = (code, type) => async e => {
    const { value } = e.target;
    setDetail(prev => ({
      ...prev,
      data: prev.data.map(any => {
        if (any.product_code === code) {
          return { ...any, [type]: value };
        }
        return { ...any };
      }),
    }));
  };

  const getDetailData = () => {
    let detail = window.localStorage.getItem('campaign_data');
    if (!detail) {
      return;
    }
    detail = JSON.parse(detail);
    const data = detail.data.map(d => ({ ...d, current_qty: 1 }));
    setDetail({ ...detail, data });
  };

  const getDetail = async code => {
    try {
      const { data } = await ApiLocations.detail(code);
      if (data.data.items.length) {
        const response = await Promise.all(
          data.data.items.map(async item => {
            const altsku = await ApiAltSkus.indexSelect(1, 0, customergroup, item.price);
            if (altsku.data.data.models.length > 0) {
              return {
                ...item,
                alt_sku: altsku.data.data.models[0].altSku,
                current_qty: item.current_qty !== null ? item.current_qty : 1,
              };
            }

            return { ...item, current_qty: item.current_qty !== null ? item.current_qty : 1 };
          })
        );
        setDetail(prev => ({ ...prev, data: response }));
        log(response, 'info');
      }

      setLoading(false);
    } catch (e) {
      showNotif(e?.response?.data?.error?.message, 'error');
      log(e, 'error');
      setLoading(false);
    }
  };

  const patchOrders = async () => {
    const date = new Date();
    try {
      const objectToSend = {
        active: true,
        consignment: false,
        customer_name: `${id}`,
        customer_po_ref: null,
        date: date,
        description: 'test',
        name: `${id} ${date.toISOString()}`,
        submitted_at: date,
      };
      const { data } = await ApiOrders.patch(detail.id, { status: 'submitted' });
      return data;
    } catch (e) {
      showNotif(e?.response?.data?.error?.message, 'error');
      log(e, 'error');
    }
  };

  const updateListOrderItems = async (orderId, orders) => {
    try {
      console.log({ orders });
      const newOders = orders
        .filter(any => any.current_qty > 0)
        .map(any => ({
          // "alt_sku": any.alt_sku || "",
          final_price: any.price,
          // "pick_qty": 1,
          // "pricing_note": "testing",
          product_code: any.product_code,
          // "promo_price": "",
          quantity: any.current_qty,
        }));

      const { data } = await ApiOrders.updateItems(orderId, newOders);
      log(data, 'info');
    } catch (e) {
      showNotif(e?.response?.data?.error?.message, 'error');
      log(e, 'error');
    }
  };

  const handleDelete = async (data, index) => {
    const newData = detail.data.filter((d, i) => i !== index);
    setDetail({ ...detail, data: newData });
    try {
      // const objectToSend = {
      //   location_code: id,
      //   product_code: data.product_code
      // }
      // const response = await ApiLocations.deleteProductLocation(objectToSend);
      showNotif('Successfully deleted', 'success');
      log(response, 'info');
    } catch (e) {
      // showNotif(e?.response?.data?.error?.message, 'error');
      // log(e, 'error');
    } finally {
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
  const { showPageLoading, closePageLoading } = usePageLoading();

  const createOrders = orders => async () => {
    showPageLoading();
    console.log({ detail });
    await updateListOrderItems(detail.id, orders);
    await patchOrders(detail.id, { status: 'submitted' });
    closePageLoading();

    modal({
      width: '400px',
      render: ({ onClose }) => (
        <ModalContainer>
          <CloseButton onClick={onClose}>
            <img src="/static/images/icons/close.svg" />
          </CloseButton>
          <Title>Order Submitted</Title>
          <FlexBox style={{ margin: '1.5rem 0 .5rem', justifyContent: 'center', gap: '1rem' }}>
            <Button style={{ minWidth: '150px' }} variant="primary" onClick={() => router.push('/sales')} size="medium">
              Back to Catalogue
            </Button>
          </FlexBox>
        </ModalContainer>
      ),
    });
  };

  const handleCancelOrder = async () => {
    await ApiOrders.patch(detail.id, { status: 'void' });
    router.back();
  };

  React.useEffect(() => {
    // getDetail(id);
    if (window && window.localStorage) {
      getDetailData();
    }
  }, [id]);
  return (
    <>
      <Nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link scroll={false} href={`/sales`}>
              <a>Catalogue</a>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              scroll={false}
              href={`/sales/detail?location_code=${id}&customergroup=${customergroup}&location=${location}&address=${address}`}>
              <a>Catalogue Detail</a>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Overview
          </li>
        </ol>
      </Nav>
      <HeaderDetail>
        <TitleDetail>New Single Order</TitleDetail>
        <StepDetail className="mb-0">
          <li>
            <span>1</span>
            Main Info
          </li>
          <li className="active">
            <span>2</span>
            Add Products
          </li>
          <li>
            <span>3</span>
            Order Details
          </li>
        </StepDetail>
      </HeaderDetail>

      <Campaign>
        <div className="title">
          <b>Order Details</b>
        </div>
        <div className="header">
          <b>{description}</b>
          <p className="m-0">{location}</p>
          {/* <div className='start-date'>
            Start Date: 13/09/19
          </div> */}
          {/* <span className='d-block customer-sumarry'>
            #Customer PO Ref: Lorem ipsum dolor asit amet example text
          </span> */}
          {/* <span className='d-block text-read'>Some description text about this order</span> */}
        </div>
        <div className="content">
          <div className="table-responsive">
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">Products</th>
                  <th scope="col"></th>
                  <th scope="col">Alt SKU</th>
                  <th scope="col">RRP</th>
                  <th scope="col" className="order-qty-th">
                    Order Qty
                  </th>
                  <th scope="col">Warehouse</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      style={{
                        boxShadow: 'none',
                        borderBottomWidth: '0px',
                      }}
                      colSpan={7}>
                      <div className="d-flex w-100 py-4 align-items-center justify-content-center">
                        <Loading />
                      </div>
                    </td>
                  </tr>
                ) : (
                  detail.data.map((any, index) => {
                    return (
                      <tr key={any.product_code}>
                        <td>
                          <div className="d-inline-flex align-items-center">
                            <img
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
                        <td>{any.product_code}</td>
                        <td>
                          <div className="d-inline-flex">
                            <input
                              className="form-control form-control-alt-sku"
                              type="text"
                              onChange={handleChange(any.id, 'alt_sku')}
                              value={any.alt_sku}
                            />
                          </div>
                        </td>
                        <td>${any.price}</td>
                        <td>
                          <div className="d-inline-flex order-qty">
                            <span
                              onClick={() => {
                                setDetail(prev => ({
                                  ...prev,
                                  data: prev.data.map(item =>
                                    item.product_code === any.product_code
                                      ? { ...item, current_qty: parseInt(item.current_qty - 1) }
                                      : { ...item }
                                  ),
                                }));
                              }}>
                              -
                            </span>
                            <input
                              onChange={handleChange(any.product_code, 'current_qty')}
                              className="form-control"
                              type="number"
                              value={any.current_qty}
                            />
                            <span
                              onClick={() => {
                                setDetail(prev => ({
                                  ...prev,
                                  data: prev.data.map(item =>
                                    item.product_code === any.product_code
                                      ? { ...item, current_qty: parseInt(item.current_qty + 1) }
                                      : { ...item }
                                  ),
                                }));
                              }}>
                              +
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className="stock">
                            <p className="text-read">Stock:</p>&nbsp;
                            {any.stock}
                          </span>
                        </td>
                        <td>
                          <span
                            style={{ cusor: 'pointer' }}
                            onClick={() => {
                              handleDelete(any, index);
                            }}>
                            <img style={{ width: '15px' }} src={'/static/images/icons/times.svg'} />
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="total-info">
            <div className="row">
              <div className="col-md-7 text-center">
                <b>Total Info:</b>
              </div>
              <div className="col-md-5">
                <div className="row">
                  <div className="col-md-4">
                    qty:&nbsp;<b>27</b>
                  </div>
                  <div className="col-md-4">
                    Alt SKU:&nbsp;<b>13</b>
                  </div>
                  <div className="col-md-4">
                    <b>${detail.data.reduce((any, item) => parseInt(any) + parseInt(item.price), 0)}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-end">
            <button onClick={handleCancelOrder} className="btn w-15 btn-outline-secondary text-primary me-4">
              Cancel Order
            </button>
            <button onClick={createOrders(detail.data)} className="btn w-15 btn-primary text-white me-4">
              Submit
            </button>
          </div>
        </div>
      </Campaign>
    </>
  );
};

const Nav = styled.nav`
  .breadcrumb {
    .breadcrumb-item {
      a {
        color: #8492a5;
      }
    }
  }
`;

const HeaderDetail = styled.div`
  display: flex;
  align-items: center;
`;

const TitleDetail = styled.div`
  font-size: 18px;
  font-family: 'OpenSans Bold';
  color: #3b4857;
`;

const StepDetail = styled.ul`
  margin-left: auto;
  display: flex;
  list-style: none;
  li {
    margin-right: 1.5625rem;
    display: inline-flex;
    align-items: center;
    color: #8492a5;
    &.active {
      > span {
        color: #fff;
        &:after {
          content: '';
          width: 25px;
          height: 25px;
          background: #657acb;
          position: absolute;
          border-radius: 50%;
          z-index: -1;
        }
      }
    }
    > span {
      position: relative;
      width: 30px;
      height: 30px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      border: 1px solid #b0bbcb;
      margin-right: 0.625rem;
      color: #8492a5;
      border-radius: 50%;
    }
  }
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
    .form-control-alt-sku {
      border-radius: 0px;
      box-shadow: 0px 2px 3px rgb(39 52 67 / 6%);
      text-align: center;
    }
    .order-qty {
      .form-control {
        text-align: center;
      }
    }
    .total-info {
      background: #ebeff5;
      padding-top: 1rem;
      padding-bottom: 1rem;
    }
    margin-top: 1rem;
    padding-bottom: 2rem;
    .table > :not(:first-child) {
      border-top: 0px;
    }
    .table > :not(caption) > * > * {
      padding: 1.25rem 1.25rem;
      text-align: center;
      vertical-align: middle;
      &.order-qty-th {
        text-align: center;
        width: 10%;
      }
      .alt-sku {
        height: 38px;
        width: auto;
        align-items: center;
        box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
        width: 100%;
        border: 1px solid #ced4da;
        text-align: center;
        justify-content: center;
      }
      .order-qty {
        align-items: center;
        box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
        .form-control {
          border-left: 0px;
          border-right: 0px;
          border-radius: 0px;
        }
        > span {
          font-size: 1.25rem;
          display: inline-flex;
          color: #b0bbcb;
          height: 38px;
          width: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #ced4da;
          cursor: pointer;
          &:last-of-type {
            border-left: 0px;
          }
          &:first-of-type {
            border-right: 0px;
          }
        }
      }
      .stock {
        padding: 0.375rem 0.75rem;
        background: #ebeff5;
        border-radius: 5px;
        display: inline-flex;
        width: auto;
        margin-top: 1rem;
        margin-bottom: 0.75rem;
        p {
          font-weight: normal;
          display: inline-block;
          margin-bottom: 0px;
        }
      }
      img {
        width: 45px;
        height: auto;
        display: inline-block;
      }
      .btn-unassigned {
        display: inline-flex;
        align-items: center;
        font-size: 0.75rem;
        padding: 0.375rem 0.75rem;
        &:after {
          margin-left: 0.25rem;
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

const CloseButton = styled(FloatingButton)`
  border: none;
  top: 10px;
  right: 15px;

  img {
    width: 14px;
    height: 14px;
  }
`;

const ModalContainer = styled.div`
  position: relative;
  padding: 1.5rem 0;
  width: min(400px, 95%);
`;

const Box = styled.div`
  padding-left: 1.75rem;
  padding-right: 1.75rem;
`;

const ModalBody = styled.div`
  display: none;
  @media screen and (min-width: 600px) {
    display: block;
  }
`;

const Title = styled.div`
  text-align: center;
  font-size: 18px;
  padding-top: 0;
  padding-bottom: 1.5rem;
  padding-left: 1.75rem;
  padding-right: 1.75rem;
  margin-bottom: 1.5rem;
  border-bottom: none;
`;

export default Detail;

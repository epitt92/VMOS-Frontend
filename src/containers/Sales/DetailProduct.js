import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from 'layout';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Select, Loading } from 'components';
import { ApiLocations, ApiItems } from 'api';
import { useDebounce } from 'use-debounce';
import { checkValidExist, log } from 'helpers';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
const characters = [
  {
    value: 'Paw Patrol',
    label: 'Paw Patrol',
  },
  {
    value: 'blaze-and-the-monster',
    label: 'Blaze and The Monster',
  },
];

const catagories = [
  {
    value: 'bag-and-pouches',
    label: 'Bag & Pouches',
  },
];

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
  margin-bottom: 2rem;
`;

const Product = styled.div`
  box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
  border-radius: 5px;
  background: #fff;
  .paginate {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    .sort-place {
      margin-right: 2rem;
      .btn-outline-secondary {
        display: inline-flex;
        align-items: center;
      }
      .active {
        border: 1px solid #657acb;
        background-color: transparent;
        color: #657acb;
        img {
          width: auto;
          height: 16px;
        }
      }
    }
  }
  .products {
    padding: 1.75rem;
    .card {
      border: 1px solid #e0e6ed;
      .btn-primary {
        margin-top: 1.25rem;
        background: #e2e8ff;
        border: 1px solid #e2e8ff;
        color: #657acb;
        &.btn-flagged {
          background: #ebeff5;
          border: 1px solid #ebeff5;
          color: #8492a5;
        }
      }
      img {
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
      }
      span {
        font-size: 0.75rem;
        margin-bottom: 0.5rem;
      }
      b {
        font-size: 1.125rem;
      }
    }
  }
  .add {
    padding: 1.75rem;
    background: #717a9d;
    color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    .input-group {
      .input-group-text {
        background: #828bae;
        &:last-of-type {
          font-size: 0.75rem;
          color: #fff;
          border-left: 1px solid rgba(255, 255, 255, 0.3);
          border-right: 0px;
          border-top: 0px;
          border-bottom: 0px;
          margin-left: 0px !important;
        }
      }
      .form-control {
        background: #828bae;
        box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
        color: #fff;
        &::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
    ul {
      list-style: none;
      padding: 0px;
      margin: 0px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      li {
        display: inline-flex;
        width: calc(33.3%);
        margin-right: 0.5rem;
        &:last-of-type {
          margin-right: 0;
        }
        &.active {
          a {
            background: #565f84;
            border: 1px solid #565f84;
            &:before {
              content: '';
              width: 0;
              height: 0;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-top: 5px solid #565f84;
              position: absolute;
              bottom: -6px;
              left: 0;
              right: 0;
              margin: 0 auto;
            }
          }
        }
        a {
          &:hover {
            background: #565f84;
            border: 1px solid #565f84;
            cursor: pointer;
            &:before {
              content: '';
              width: 0;
              height: 0;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-top: 5px solid #565f84;
              position: absolute;
              bottom: -6px;
              left: 0;
              right: 0;
              margin: 0 auto;
            }
          }
          position: relative;
          border: 1px solid #848db0;
          color: #fff;
          text-transform: uppercase;
          padding: 0.5rem 2rem;
          border-radius: 4px;
          width: 100%;
          text-align: center;
          cursor: pointer;
          box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
        }
      }
    }
    h5 {
      font-family: 'OpenSans Bold';
      font-size: 16px;
    }
  }
`;

const Catalogue = styled.div`
  box-shadow: 0px 1px 10px rgb(39 52 67 / 8%);
  background: #fff;
  border-radius: 5px;
  .title {
    padding: 1rem 1.75rem;
    display: flex;
    border-bottom: 1px solid #e0e6ed;
  }
  .header {
    padding: 1rem 1.75rem;
    .start-date {
      padding: 0.375rem 0.75rem;
      background: #ebeff5;
      border-radius: 5px;
      display: inline-flex;
      width: auto;
      margin-top: 1rem;
      margin-bottom: 0.75rem;
    }
  }
  .content {
    .table > :not(caption) > * > * {
      padding: 1.25rem 1.25rem;
      vertical-align: middle;
    }
    .table > :not(:first-child) {
      border-top: 0px;
    }
    td {
      img {
        width: 30px;
        height: auto;
      }
    }
  }
`;

const PaginationAndSearch = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0rem 0rem;
  padding-top: 0rem;
  margin-left: ${props => (props.marginLeft ? `auto` : `2rem`)};
  > span {
    padding-bottom: 0rem;
    display: flex;
  }
  > ul {
    list-style: none;
    margin-bottom: 0;
    padding-left: 0;
    display: flex;
    border-bottom: ${props => (props.border ? `1px solid #E0E6ED` : `0px solid #E0E6ED`)};
    width: 100%;
    padding-bottom: 0rem;
    li {
      display: inline-flex;
      margin-right: 0.3125rem;
      &.active {
        span {
          color: #657acb;
          border: 1px solid #657acb;
        }
      }
      span {
        &.prev-arrow,
        &.next-arrow {
          &:hover {
          }
        }
        cursor: pointer;
        img {
          width: 10px;
          height: auto;
        }
        display: inline-flex;
        border: 1px solid #d3dce6;
        width: 28px;
        height: 28px;
        align-items: center;
        justify-content: center;
        color: #8492a5;
        background: #fff;
        border-radius: 3px;
        box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
      }
    }
  }
`;

const DetailProduct = ({ location_code, search, customergroup, location, address }) => {
  const pagination = Array.from({ length: 50 }, (_, i) => i + 1);
  const groupPagination = (arr, chunkSize, maxLength) => {
    const grouped = Array.from({ length: maxLength }, () => arr.splice(0, chunkSize));
    return grouped.filter(any => any.length > 0);
  };

  const groupedPagination = groupPagination(pagination, 3, pagination.length);
  const router = useRouter();
  const { customeritem, tab = 'product' } = router.query;
  const [product, setProduct] = React.useState({
    charactersOption: characters,
    character: {},
    catagoriesOption: catagories,
    catagory: {},
    data: [],
    items: [],
    summaryData: [],
    summaryDataProductCodes: [],
    limit: 10,
    offset: 0,
    paginate: 1,
    parentPaginate: 0,
    orderId: '',
    groupedPagination,
  });
  const [loadingSummary, setLoadingSummary] = React.useState(true);
  const [searchLoading, setSearchLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [keywords, setKeywords] = React.useState(search);
  const [newKeywords] = useDebounce(keywords, 2000);

  const handleInputSelect = type => newValue => {
    setProduct(prev => ({
      ...prev,
      [type]: newValue,
    }));
  };

  const getDetail = async code => {
    try {
      const { data } = await ApiLocations.detail(code);
      // console.log('getDetail detail items.length******' + data.data.items);
      setProduct(prev => ({
        ...prev,
        summaryData: data.data.items,
        summaryDataProductCodes: data.data.items.map(any => any.product_code),
      }));
      setLoadingSummary(false);
      return data;
    } catch (e) {
      showNotif(e?.response?.data?.error?.message, 'error');
      log(e, 'error');
      setLoadingSummary(false);
    }
  };

  const getSearchDetailItems = async (page, limit, query) => {
    try {
      setSearchLoading(true);
      const offset = parseInt((page - 1) * limit);
      const thepage = checkValidExist(query) ? offset : 0;
      const { data } = await ApiItems.index(limit, thepage, query, '');
      // console.log('getSearchDetailItems original product length***' + product.length);
      setProduct(prev => ({
        ...prev,
        data: data.data.models,
      }));
      log(data, 'info');
      setSearchLoading(false);
    } catch (e) {
      showNotif(e?.response?.data?.error?.message, 'error');
      log(e, 'error');
      setSearchLoading(false);
    }
  };

  const getDetailsItems = async (page, limit, query, orderId) => {
    try {
      setLoading(true);
      const offset = parseInt((page - 1) * limit);
      const thepage = checkValidExist(query) ? 0 : offset;
      const { data } = await ApiItems.index(limit, thepage, query, orderId);
      const prevItemsCopy = product.items.length ? JSON.parse(JSON.stringify(product.items)) : [];
      // console.log('getDetailsItems******1111' + prevItemsCopy.length);
      setProduct(prev => ({
        ...prev,
        items: prevItemsCopy.concat(data.data.models),
      }));
      log(data, 'info');
      setLoading(false);
    } catch (e) {
      showNotif(e?.response?.data?.error?.message, 'error');
      log(e, 'error');
      setLoading(false);
    }
  };

  const createConfirmProduct = async () => {
    const productCodes = product.summaryDataProductCodes;
    try {
      const responses = await Promise.all(
        productCodes.map(async code => {
          const objectToSend = {
            location_code,
            product_code: code,
          };
          let product = await ApiLocations.createProductLocation(objectToSend);
          return product;
        })
      );
      log(responses, 'info');
      showNotif('Success confirm', 'info');
    } catch (e) {
      showNotif(e?.response?.data?.error?.message, 'error');
      log(e, 'error');
    }
  };

  const handleNextPrev = (currentPaginate, groupPaginate) => () => {
    console.log('triggered next');
    const activeParentPaginate = groupPaginate.findIndex(any => any.includes(currentPaginate));
    if (activeParentPaginate !== -1) {
      setProduct(prev => ({ ...prev, paginate: currentPaginate, parentPaginate: activeParentPaginate }));
    }
  };

  const checkHasMore = () => {
    // product.paginate + 1, product.groupedPagination
    const currentPaginate = product.paginate + 1;
    const groupPaginate = product.groupedPagination;
    const activeParentPaginate = groupPaginate.findIndex(any => any.includes(currentPaginate));
    return activeParentPaginate !== -1 ? true : false;
  };

  const handleSearch = async e => {
    const { value } = e.target;
    setSearchLoading(true);
    setKeywords(value ? value.toLowerCase() : '');
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

  React.useEffect(() => {
    if (checkValidExist(newKeywords)) {
      if (product.data.length === 0) {
        getDetail(location);
      }
      getSearchDetailItems(product.paginate, product.limit, newKeywords);
      router.push(
        `/sales/detail-product?location_code=${location_code}&customergroup=${customergroup}&location=${location}&address=${address}&search=${newKeywords}`,
        undefined,
        { scroll: false }
      );
    } else {
      getDetailsItems(product.paginate, product.limit, newKeywords, product.orderId);
      getDetail(location);
      router.push(
        `/sales/detail-product?location_code=${location_code}&customergroup=${customergroup}&location=${location}&address=${address}`,
        undefined,
        { scroll: false }
      );
    }
  }, [location_code, newKeywords, product.limit, product.offset, product.paginate]);

  const handleDelete = async (data, type) => {
    try {
      const objectToSend = {
        location_code: location_code,
        product_code: type === 'summary' ? data.product_code : data.itemCode,
      };
      const response = await ApiLocations.deleteProductLocation(objectToSend);
      setProduct(prev => ({
        ...prev,
        summaryData: prev.summaryData.filter(any => any.product_code !== response.data.data.product_code),
      }));
      showNotif('Successfully deleted', 'success');
      log(response, 'info');
    } catch (e) {
      showNotif(e?.response?.data?.error?.message, 'error');
      log(e, 'error');
    }
  };

  const addProduct = async data => {
    try {
      const objectToSend = {
        location_code: location,
        product_code: data.itemCode,
      };
      const response = await ApiLocations.createProductLocation(objectToSend);
      showNotif('Successfully flagged', 'success');
      log(response, 'info');
      return response;
    } catch (e) {
      showNotif(e?.response?.data?.error?.message, 'error');
      log(e, 'error');
    }
  };

  // const lastParent = groupedPagination[groupedPagination.length - 1];
  // const lastItem = lastParent[lastParent.length - 1];
  const activeItems = checkValidExist(newKeywords) ? product.data : product.items;

  log(product, 'info');

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
            <Link
              scroll={false}
              href={`/sales/detail?location_code=${location_code}&customergroup=${customergroup}&location=${location}&address=${address}`}>
              <a>Catalogue Detail</a>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Modify
          </li>
        </ol>
      </Nav>
      <TitleDetail>Catalogue Detail</TitleDetail>
      <div className="row">
        <div className="col-md-7">
          <Product>
            <div className="add">
              <h5 className="mb-4">Add Products</h5>
              <h6 className="mt-4">Products Search</h6>
              <div className="input-group border-0">
                <span className="input-group-text border-0" id="basic-addon1">
                  <img src="/static/images/icons/search-white.svg" alt="Search" />
                </span>
                <input
                  type="text"
                  onChange={handleSearch}
                  className="form-control border-0"
                  placeholder="Search"
                  aria-label="Search"
                  value={keywords}
                  aria-describedby="basic-addon1"
                />
                <span className="input-group-text">Apr/15 - Nov/18</span>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Select
                    label={<h6 className="mt-4">Character</h6>}
                    options={product.charactersOption}
                    value={product.character}
                    placeholder={'Select character'}
                    onChange={handleInputSelect('character')}
                  />
                </div>
                <div className="col-md-6">
                  <Select
                    label={<h6 className="mt-4">Category</h6>}
                    options={product.catagoriesOption}
                    value={product.catagory}
                    placeholder={'Select catagory'}
                    onChange={handleInputSelect('catagory')}
                  />
                </div>
              </div>
            </div>
            <div className="paginate">
              <div className="row g-0 align-items-center">
                <div className="col-md-6">
                  {/* <PaginationAndSearch marginLeft={false} border={false}>
                    {
                      // checkValidExist(newKeywords) ?
                      // <>
                      //   <span>
                      //     Search result for :
                      //     &nbsp;<b>{newKeywords}</b>
                      //   </span>
                      // </>
                      // :
                      <ul>
                        <li>
                          <span
                            className="prev-arrow"
                            onClick={handleNextPrev(product.paginate - 1, product.groupedPagination)}>
                            <img src="/static/images/icons/prev-arrow.svg" />
                          </span>
                        </li>
                        {product.groupedPagination[product.parentPaginate].map(any => {
                          return (
                            <li className={`${any === product.paginate ? `active` : ``}`} key={any}>
                              <span
                                onClick={
                                  any === product.paginate ? null : handleNextPrev(any, product.groupedPagination)
                                }>
                                {any}
                              </span>
                            </li>
                          );
                        })}
                        <li>...</li>
                        <li className={`${lastItem === product.paginate ? `active` : ``}`}>
                          <span onClick={handleNextPrev(lastItem, product.groupedPagination)}>{lastItem}</span>
                        </li>
                        <li>
                          <span
                            className="next-arrow"
                            onClick={handleNextPrev(product.paginate + 1, product.groupedPagination, 'search')}>
                            <img src="/static/images/icons/next-arrow.svg" />
                          </span>
                        </li>
                      </ul>
                    }
                  </PaginationAndSearch> */}
                </div>
                <div className="col-md-6 text-end">
                  {checkValidExist(newKeywords) ? null : (
                    <div className="d-inline-flex sort-place align-items-center">
                      <span className="d-inline-block me-2">Sort by:</span>
                      <button type="button" className="btn btn-outline-secondary me-3 text-read">
                        Relevance
                      </button>
                      <button type="button" className="btn btn-outline-secondary active text-read">
                        Price
                        <img src="/static/images/icons/sort-up.svg" alt="Sort up" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              style={{
                paddingTop: 0,
                paddingBottom: product.data.length ? '1.75rem' : '0',
              }}
              className="products">
              {/* <div className="row"> */}
              {searchLoading || loading ? (
                <div className="row">
                  <div className="col-md-12 d-flex py-4 align-items-center justify-content-center">
                    <Loading />
                  </div>
                </div>
              ) : null}
              <InfiniteScroll
                dataLength={activeItems.length}
                next={handleNextPrev(product.paginate + 1, product.groupedPagination, 'search')}
                hasMore={checkHasMore()}>
                <div className="row">
                  {activeItems.map(any => {
                    return (
                      <div key={any.id} className="col-md-6 mb-3">
                        <div className="card">
                          <img
                            className="img-fluid"
                            src={checkValidExist(any.imageUrl) ? any.imageUrl : '/static/images/placeholder-image.png'}
                          />
                          <div className="card-body">
                            <span className="d-block">{any.description}</span>
                            <b className="d-block">${any.price}</b>
                            {product.summaryData.filter(item => item.product_code === any.itemCode).length > 0 ? (
                              <button
                                type="button"
                                onClick={() => {
                                  handleDelete(any, 'flagged').then(() => {
                                    getDetail(location_code);
                                  });
                                }}
                                className="btn btn-primary btn-flagged d-flex w-100 align-items-center justify-content-center">
                                <img
                                  style={{ width: '14px', marginRight: '5px' }}
                                  src={'/static/images/icons/flag.svg'}
                                />
                                Flagged
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  addProduct(any).then(() => {
                                    getDetail(location).then(({ data }) => {});
                                  });
                                }}
                                className="btn btn-primary d-flex w-100 align-items-center justify-content-center">
                                Flag
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </InfiniteScroll>
              {/* </div> */}
            </div>
          </Product>
        </div>
        <div className="col-md-5">
          <Catalogue>
            <b className="title">Catalogue Summary</b>
            <div className="header">
              <h5>{location}</h5>
              <span className="d-block">{address}</span>
              {/* <div className='start-date'>
                Start Date: 13/09/19
              </div> */}
              {/* <span className='d-block text-read'>Some description text about this campaign</span> */}
            </div>

            <div className="content">
              <div className="table-responsive">
                <table className="table">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Flagged Products</th>
                      <th scope="col">Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingSummary ? (
                      <tr>
                        <td
                          style={{
                            boxShadow: 'none',
                            borderBottomWidth: '0px',
                          }}
                          colSpan={3}>
                          <div className="d-flex w-100 py-4 align-items-center justify-content-center">
                            <Loading />
                          </div>
                        </td>
                      </tr>
                    ) : (
                      product.summaryData.map(any => {
                        return (
                          <tr key={any.product_code}>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src={
                                    checkValidExist(any.product_image_url)
                                      ? any.product_image_url
                                      : '/static/images/placeholder-image.png'
                                  }
                                />
                                <span className="d-inline-block ms-3">We Bare Bears Multi Purpose Pouch Ice Bear</span>
                              </div>
                            </td>
                            <td>${any.price}</td>
                            <td>
                              <span
                                onClick={() => {
                                  handleDelete(any, 'summary');
                                }}
                                style={{ cursor: 'pointer' }}>
                                x
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              <div className="row px-3 pb-4">
                <div className="col-md-12">
                  <Link scroll={false} href={`/sales/detail?location_code=${location_code}`}>
                    <a className="btn btn-outline-secondary w-100 text-read">Completed</a>
                  </Link>
                </div>
              </div>
            </div>
          </Catalogue>
        </div>
      </div>
    </Layout>
  );
};

export default DetailProduct;

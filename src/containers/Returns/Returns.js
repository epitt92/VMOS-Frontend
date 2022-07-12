import React from 'react';
import Layout from 'layout';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Loading, Input, Select } from 'components';
import { ApiLocations, ApiReturnOrders } from 'api';
import { checkValidExist, log } from 'helpers';
import { useDebounce } from 'use-debounce';
import { toast } from 'react-toastify';

const Title = styled.h5`
  font-size: 16px;
  color: #657acb;
  font-family: 'OpenSans Bold';
  display: inline-block;
  position: relative;
  margin-bottom: 2rem;
  &:before {
    content: '';
    width: 100%;
    height: 4px;
    border-radius: 5px;
    background: #657acb;
    position: absolute;
    display: block;
    bottom: -10px;
  }
`;

const Filter = styled.div`
  background: #fff;
  box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
  border-radius: 3px;
  .title {
    padding: 0.75rem 1.5rem;
    display: flex;
    border-bottom: 1px solid #e0e6ed;
    margin-bottom: 1.75rem;
  }
  .status {
    padding: 0.75rem 1.5rem;
    border-bottom: 0px solid #e0e6ed;
    margin-bottom: 0rem;
    .status-badge {
      border-radius: 30px;
      padding: 2px 10px;
      font-size: 0.75rem;
    }
    .created {
      color: #d09248;
      background: rgba(208, 146, 72, 0.1);
      border: 1px solid #d09248;
    }
    .submitted {
      color: #7591f4;
      border: 1px solid #7591f4;
      background: rgba(117, 145, 244, 0.1);
    }
    .approved {
      color: #79b616;
      border: 1px solid #79b616;
      background: rgba(121, 182, 22, 0.1);
    }
    .rejected {
      color: #f46b59;
      border: 1px solid #f46b59;
      background: rgba(244, 107, 89, 0.1);
    }
    .cancelled {
      color: #f46b59;
      border: 1px solid #f46b59;
      background: rgba(244, 107, 89, 0.1);
    }
    > span {
      display: block;
      margin-bottom: 1.25rem;
    }
    .radio-button input[type='radio'] {
      display: none;
    }
    .radio-button {
      display: flex;
      align-items: center;
      margin-bottom: 1.25rem;
    }
    .radio-button label {
      position: relative;
      display: flex;
      align-items: center;
      padding-left: 1.5rem;
      cursor: pointer;
    }
    .radio-button label::before,
    .radio-button label::after {
      position: absolute;
      content: '';
      top: 50%;
      border-radius: 100%;
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
    }
    .radio-button label::before {
      left: 0;
      width: 16px;
      height: 16px;
      margin-top: -8px;
      background: #fff;
      border: 1px solid #b0bbcb;
    }
    .radio-button label:hover::before {
      background: #fff;
    }
    .radio-button label::after {
      opacity: 0;
      left: 4.2px;
      width: 8px;
      height: 8px;
      margin-top: -4px;
      background: #657acb;
      -webkit-transform: scale(2);
      transform: scale(2);
    }
    .radio-button input[type='radio']:checked + label::before {
      background: #fff;
      border: 1px solid #657acb;
    }
    .radio-button input[type='radio']:checked + label::after {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  .returns {
    .returns-field {
      padding: 0rem 1.5rem;
      padding-bottom: 1.5rem;
    }
    > span {
      padding: 0.75rem 1.5rem;
      display: flex;
      border-bottom: 1px solid #e0e6ed;
      margin-bottom: 1.75rem;
    }
  }
`;

const Reset = styled.span`
  color: #b0bbcb;
  margin-left: auto;
  display: flex;
  align-items: center;
  cursor: pointer;
  > span {
    width: 20px;
    height: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid #b0bbcb;
    font-size: 10px;
    margin-right: 5px;
    border-radius: 50%;
  }
`;

const ReturnsList = styled.div`
  background: #fff;
  box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
  border-radius: 3px;
  .sort {
    background: #ebeff5;
    padding: 0.5125rem 1.5rem;
    display: flex;
    align-items: center;
    height: 44px;
  }
  .head {
    display: flex;
    padding: 0.3125rem 1.5rem;
    align-items: center;
    > span {
      display: inline-flex;
    }
    .search-return {
      margin-left: auto;
      .form-control {
        &:focus {
          box-shadow: none;
          outline: 0;
        }
        &::placeholder {
          color: #b0bbcb;
        }
      }
    }
  }
`;

const ReturnsItem = styled.div`
  padding: 1.1875rem 0rem;
  border-bottom: 1px solid #e0e6ed;
  position: relative;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  > .status {
    position: absolute;
    right: 0;
    top: 1.1875rem;
    color: #fff;
    border-radius: 30px;
    padding: 2px 10px;
    font-size: 0.75rem;
    text-transform: capitalize;
    &.submitted {
      background: #7591f4;
    }
    &.created {
      background: #d09248;
    }
    &.rejected {
      background: #f46b59;
    }
    &.cancelled {
      background: #f46b59;
    }
    &.approved {
      background: #79b616;
    }
  }
  > .description {
    color: #8492a5;
  }
  > div.d-flex {
    > span.date {
      padding: 0.375rem 0.75rem;
      background: #ebeff5;
      border-radius: 5px;
      display: -webkit-inline-box;
      display: -webkit-inline-flex;
      display: -ms-inline-flexbox;
      display: inline-flex;
      width: auto;
      margin-top: 1rem;
      margin-bottom: 0.75rem;
      color: #3b4857;
      &:first-of-type {
        margin-right: 0.625rem;
      }
      .state {
        color: #8492a5;
      }
    }
  }
  &:last-of-type {
    border: 0px;
  }
`;

const Sort = styled.div`
  display: inline-flex;
  align-items: center;
  > select {
    padding: 0px;
    color: #8492a5;
    font-size: 0.875rem;
    option:checked {
      color: #8492a5;
    }
    option {
      color: #8492a5;
    }
    &:focus {
      box-shadow: unset;
      color: #8492a5;
      outline: 0;
    }
    box-shadow: unset;
    outline: 0;
  }
`;

const PaginationAndSearch = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0rem 0rem;
  padding-top: 0rem;
  margin-left: ${props => (props.marginLeft ? `auto` : `unset`)};
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

const Returns = ({ search, sort, sortOrder, status, location_code }) => {
  const pagination = Array.from({ length: 50 }, (_, i) => i + 1);
  const groupPagination = (arr, chunkSize, maxLength) => {
    const grouped = Array.from({ length: maxLength }, () => arr.splice(0, chunkSize));
    return grouped.filter(any => any.length > 0);
  };

  const groupedPagination = groupPagination(pagination, 3, pagination.length);
  const router = useRouter();
  const [keywords, setKeywords] = React.useState(search);
  const [newKeywords] = useDebounce(keywords, 2000);
  const [searchLoading, setSearchLoading] = React.useState(checkValidExist(search));
  const [loading, setLoading] = React.useState(true);
  const [returns, setReturns] = React.useState({
    paginate: 1,
    parentPaginate: 0,
    groupedPagination,
    customerOptions: [],
    customer: {},
    title: '',
    titleError: '',
    customerRef: '',
    customerRefError: '',
    description: '',
    limitPage: 10,
    offSet: 0,
    sort,
    sortOrder,
    status,
    data: [],
  });

  const handleNextPrev = (currentPaginate, groupPaginate) => () => {
    const activeParentPaginate = groupPaginate.findIndex(any => any.includes(currentPaginate));
    if (activeParentPaginate !== -1) {
      setReturns(prev => ({ ...prev, paginate: currentPaginate, parentPaginate: activeParentPaginate }));
    }
  };

  const getLocations = async (activePage = 1, limit = 100) => {
    try {
      const { data } = await ApiLocations.indexLocation('', activePage, limit);
      setReturns(prev => ({
        ...prev,
        customerOptions: data.data.items.map(any => {
          return {
            debtor: any.udfDebtor,
            label: `${any.description}`,
            value: any.location,
          };
        }),
      }));
      return data;
    } catch (e) {
      console.log(e);
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

  const getReturnOrders = async (page, limit, keyword, sort, sortOrder, status) => {
    try {
      setLoading(true);
      const offset = parseInt((page - 1) * limit);
      const response = await ApiReturnOrders.index(offset, limit, keyword, sort, sortOrder, status);
      log(response.data.data.models, 'info');
      setReturns(prev => ({ ...prev, data: response.data.data.models }));
      setLoading(false);
    } catch (e) {
      showNotif(e?.response?.data?.error?.message, 'error');
      log(e, 'error');
      setLoading(false);
    }
  };

  const getSearchResult = async (page, limit, value, sort, sortOrder, status) => {
    try {
      setSearchLoading(true);
      const offset = parseInt((page - 1) * limit);
      const thepage = checkValidExist(value) ? 0 : offset;
      const response = await ApiReturnOrders.index(thepage, limit, value, sort, sortOrder, status);
      log(
        response.data.data.models.map(any => `${any.id} ${any.status}`),
        'info'
      );
      setReturns(prev => ({ ...prev, data: response.data.data.models }));
      setSearchLoading(false);
    } catch (e) {
      showNotif(e?.response?.data?.error?.message, 'error');
      log(e, 'error');
      setSearchLoading(false);
    }
  };

  const handleInput = type => e => {
    const { value } = e.target;
    setReturns(prev => ({ ...prev, [type]: value }));
  };

  const handleInputSelect = newValue => {
    setReturns(prev => ({ ...prev, customer: newValue }));
  };

  const checkFormValid = async returnsState => {
    const form = document.getElementsByTagName('form')[0];
    const fields = Array.from(form.querySelectorAll('[required]'));
    const fieldsCheck = fields.map(any => ({ name: any.name, title: any.title }));
    const resultFieldsChecks = fieldsCheck.filter(any => {
      setReturns(prev => ({
        ...prev,
        [`${any.name}Error`]: checkValidExist(returnsState[any.name]) ? '' : `${any.title} must be filled in`,
      }));
      if (!checkValidExist(returnsState[any.name])) {
        return any;
      }
    });
    return resultFieldsChecks;
  };

  const submitReturns = returnsState => () => {
    checkFormValid(returnsState).then(error => {
      if (error.length === 0) {
        createReturns(returnsState);
      }
    });
  };

  const createReturns = async returnsState => {
    try {
      const objectToSend = {
        returns: {
          location: returnsState.customer.value,
          customer_return_ref: returnsState.customerRef,
          description: returnsState.description,
          title: returnsState.title,
        },
      };
      const { data } = await ApiReturnOrders.create(objectToSend);
      log(data, 'info');
      showNotif('Returns success Created', 'success');
      window.localStorage.setItem('returnDebtor', returnsState.customer.debtor);
      router.push(`/returns/created/${data.data.modal.id}`);
    } catch (e) {
      showNotif(e?.response?.data?.error?.message, 'error');
      log(e, 'error');
    }
  };

  const handleSearch = async e => {
    const { value } = e.target;
    setKeywords(value ? value.toLowerCase() : '');
  };

  React.useEffect(() => {
    if (checkValidExist(newKeywords) || (checkValidExist(returns.status) && returns.status !== 'all')) {
      getSearchResult(returns.paginate, returns.limitPage, newKeywords, sort, returns.sortOrder, returns.status).then(
        () => {
          setSearchLoading(false);
        }
      );

      if (returns.data.length === 0) {
        getReturnOrders(returns.paginate, returns.limitPage, newKeywords, sort, returns.sortOrder, returns.status).then(
          () => {
            setLoading(false);
          }
        );
        getLocations();
      }

      if (checkValidExist(newKeywords) && checkValidExist(returns.status)) {
        router.push(`/returns?search=${newKeywords}&status=${returns.status}`, undefined, { scroll: false });
      } else if (!checkValidExist(newKeywords) && checkValidExist(returns.status)) {
        router.push(`/returns?status=${returns.status}`, undefined, { scroll: false });
      } else if (checkValidExist(newKeywords) && !checkValidExist(returns.status)) {
        router.push(`/returns?search=${newKeywords}`, undefined, { scroll: false });
      }
    } else {
      getReturnOrders(returns.paginate, returns.limitPage, newKeywords, sort, returns.sortOrder, returns.status).then(
        () => {
          setLoading(false);
        }
      );
      getLocations();
      router.push(`/returns`, undefined, { scroll: false });
    }
  }, [returns.paginate, returns.limitPage, newKeywords, sort, returns.sortOrder, returns.status]);

  const lastParent = groupedPagination[groupedPagination.length - 1];
  const lastItem = lastParent[lastParent.length - 1];

  return (
    <>
      <Layout>
        <Title>Returns</Title>
        <div className="row">
          <div className="col-md-4">
            <Filter>
              <div className="title">
                <span>Filter</span>
                {returns.status !== 'all' && (
                  <Reset
                    onClick={() => {
                      setReturns(prev => ({
                        ...prev,
                        status: 'all',
                      }));
                    }}>
                    <span>x</span>Reset Filter
                  </Reset>
                )}
              </div>
              <div className="status">
                <span>By Status</span>
                <div className="radio-button">
                  <input
                    className="form-control"
                    type="radio"
                    id="all"
                    name="status"
                    checked={returns.status === 'all'}
                  />
                  <label
                    onClick={() => {
                      setReturns(prev => ({ ...prev, status: 'all' }));
                    }}
                    htmlFor="all">
                    All
                  </label>
                </div>
                <div className="radio-button">
                  <input
                    className="form-control"
                    type="radio"
                    id="created"
                    name="status"
                    checked={returns.status === 'created'}
                  />
                  <label htmlFor="created">
                    <span
                      onClick={() => {
                        setReturns(prev => ({ ...prev, status: 'created' }));
                      }}
                      className="created status-badge">
                      Created
                    </span>
                  </label>
                </div>
                <div className="radio-button">
                  <input
                    className="form-control"
                    type="radio"
                    id="submitted"
                    name="status"
                    checked={returns.status === 'submitted'}
                  />
                  <label htmlFor="submitted">
                    <span
                      onClick={() => {
                        setReturns(prev => ({ ...prev, status: 'submitted' }));
                      }}
                      className="submitted status-badge">
                      Submitted
                    </span>
                  </label>
                </div>
                <div className="radio-button">
                  <input
                    className="form-control"
                    type="radio"
                    id="approved"
                    name="status"
                    checked={returns.status === 'approved'}
                  />
                  <label htmlFor="approved">
                    <span
                      onClick={() => {
                        setReturns(prev => ({ ...prev, status: 'approved' }));
                      }}
                      className="approved status-badge">
                      Approved
                    </span>
                  </label>
                </div>
                <div className="radio-button">
                  <input
                    className="form-control"
                    type="radio"
                    id="rejected"
                    name="status"
                    checked={returns.status === 'rejected'}
                  />
                  <label htmlFor="rejected">
                    <span
                      onClick={() => {
                        setReturns(prev => ({ ...prev, status: 'rejected' }));
                      }}
                      className="rejected status-badge">
                      Rejected
                    </span>
                  </label>
                </div>
              </div>
              <form className="returns">
                <span>New Returns</span>
                <div className="returns-field">
                  <Input
                    label={
                      checkValidExist(returns.titleError) ? (
                        <span className="text-danger d-block" style={{ marginBottom: '0.625rem' }}>
                          {returns.titleError}
                        </span>
                      ) : (
                        <span className="d-block" style={{ marginBottom: '0.625rem' }}>
                          Return title
                        </span>
                      )
                    }
                    required="required"
                    placeholder="Title"
                    value={returns.title}
                    name="title"
                    title="Return title"
                    onChange={handleInput('title')}
                  />
                  <Input
                    label={
                      checkValidExist(returns.customerRefError) ? (
                        <span className="text-danger d-block" style={{ marginBottom: '0.625rem' }}>
                          {returns.customerRefError}
                        </span>
                      ) : (
                        <span className="d-block" style={{ marginBottom: '0.625rem' }}>
                          Customer Return Ref#
                        </span>
                      )
                    }
                    required="required"
                    value={returns.customerRef}
                    name="customerRef"
                    title="Customer Return Ref#"
                    onChange={handleInput('customerRef')}
                    placeholder="Enter Customer Return Ref#"
                  />
                  <Select
                    label={
                      <span className="d-block" style={{ marginBottom: '0.625rem' }}>
                        Customer
                      </span>
                    }
                    options={returns.customerOptions}
                    onChange={handleInputSelect}
                    background={`#fff`}
                    border={`#D3DCE6`}
                    margin={`1.25rem`}
                    colorHover={`#fff`}
                    colorSelected={`#fff`}
                    color={`#212529`}
                    backgroundSelected={`#828BAE`}
                    custom={true}
                    value={returns.customer}
                    placeholder={`Select customer`}
                  />
                  <Input
                    label={
                      <span className="d-block" style={{ marginBottom: '0.625rem' }}>
                        Description
                      </span>
                    }
                    value={returns.description}
                    onChange={handleInput('description')}
                    type={'textarea'}
                  />
                  <div className="text-end">
                    {Object.keys(returns.customer).length > 0 && (
                      <a onClick={submitReturns(returns)} className="btn btn-primary text-white">
                        Create
                      </a>
                    )}
                  </div>
                </div>
              </form>
            </Filter>
          </div>
          <div className="col-md-8">
            <ReturnsList>
              <div className="head">
                <span>Returns List</span>
                <div className="input-group w-auto search-return border-0">
                  <span className="input-group-text pe-1 bg-transparent border-0" id="basic-addon1">
                    <img src="/static/images/icons/search.svg" alt="Search" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Search Returns"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <div className="sort">
                {checkValidExist(newKeywords) ? null : (
                  <Sort>
                    <span style={{ width: '80px' }} className="d-flex">
                      Sort by:
                    </span>
                    <select
                      className="form-control border-0 bg-transparent"
                      onChange={event => {
                        setReturns(prev => ({ ...prev, sortOrder: event.target.value }));
                      }}
                      value={returns.sortOrder}>
                      <option value="asc">Date Created (ASC)</option>
                      <option value="desc">Date Created (DESC)</option>
                    </select>
                  </Sort>
                )}
                <PaginationAndSearch marginLeft={!checkValidExist(newKeywords)} border={false}>
                  {checkValidExist(newKeywords) ? (
                    <>
                      <span>
                        Search result for : &nbsp;<b>{newKeywords}</b>
                      </span>
                    </>
                  ) : (
                    <ul>
                      <li>
                        <span
                          className="prev-arrow"
                          onClick={handleNextPrev(returns.paginate - 1, returns.groupedPagination)}>
                          <img src="/static/images/icons/prev-arrow.svg" />
                        </span>
                      </li>
                      {returns.groupedPagination[returns.parentPaginate].map(any => {
                        return (
                          <li className={`${any === returns.paginate ? `active` : ``}`} key={any}>
                            <span
                              onClick={
                                any === returns.paginate ? null : handleNextPrev(any, returns.groupedPagination)
                              }>
                              {any}
                            </span>
                          </li>
                        );
                      })}
                      <li>...</li>
                      <li className={`${lastItem === returns.paginate ? `active` : ``}`}>
                        <span onClick={handleNextPrev(lastItem, returns.groupedPagination)}>{lastItem}</span>
                      </li>
                      <li>
                        <span
                          className="next-arrow"
                          onClick={handleNextPrev(returns.paginate + 1, returns.groupedPagination, 'search')}>
                          <img src="/static/images/icons/next-arrow.svg" />
                        </span>
                      </li>
                    </ul>
                  )}
                </PaginationAndSearch>
              </div>
              <div className="list">
                {loading || searchLoading ? (
                  <div className="d-flex py-4 align-items-center justify-content-center">
                    <Loading />
                  </div>
                ) : (
                  returns.data.map(any => {
                    return (
                      <ReturnsItem key={any.id}>
                        <Link href={any.status === 'Created' ? `/returns/created/${any.id}` : `/returns/${any.id}`}>
                          <a style={{ color: '#212529' }} className="d-block">
                            {any.title}
                          </a>
                        </Link>
                        <div className="d-flex">
                          {checkValidExist(any.createdAt) && (
                            <span className="date">
                              <span className="state">Created:</span>
                              &nbsp;{any.createdAt}
                            </span>
                          )}
                          {checkValidExist(any.submittedAt) && (
                            <span className="date">
                              <span className="state">Submitted:</span>
                              &nbsp;{any.submittedAt}
                            </span>
                          )}
                        </div>
                        <span className="ref d-block mb-1">
                          {checkValidExist(any.reference) && `#Ref: ${any.reference}`}
                          &nbsp;&nbsp;
                          {checkValidExist(any.customerReturnRef) && `#Customer Ref: ${any.customerReturnRef}`}
                        </span>
                        <span className="description">{any.description}</span>
                        <span className={`status ${any.status.toLowerCase()}`}>{any.status}</span>
                      </ReturnsItem>
                    );
                  })
                )}
              </div>
            </ReturnsList>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Returns;

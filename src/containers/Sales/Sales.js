import React from 'react';
import Layout from 'layout';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Modal, Toggle, Loading } from 'components';
import { ApiLocations } from 'api';
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

const CustomerList = styled.div`
  box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
  border-radius: 5px;
  .list {
    background: #fff;
    padding-bottom: 3px;
    padding-top: 6px;
    padding-left: 10px;
    .a {
    }
  }
  .search {
    padding: 1.75rem;
    background: #717a9d;
    color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    h5 {
      font-family: 'OpenSans Bold';
      font-size: 16px;
    }
    > span {
      margin-bottom: 0.5rem;
      display: flex;
    }
    .input-group-text {
      background: rgba(255, 255, 255, 0.15);
      box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
    }
    input {
      color: #fff;
      background: rgba(255, 255, 255, 0.15);
      box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
      margin-left: 0px !important;
      &::placeholder {
        color: rgba(255, 255, 255, 0.2);
      }
    }
  }
`;

const CustomerItem = styled.a`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  cursor: pointer;
  color: #212529;
  position: relative;
  margin-bottom: 11px;
  img {
    width: 12px;
    height: auto;
  }
  &:last-of-type {
    &:after {
      display: none;
    }
  }
  &:after {
    content: '';
    background: #e0e6ed;
    height: 1px;
    width: 100%;
    position: relative;
    bottom: -1rem;
    margin-bottom: -6px;
  }
  &.active {
    background: #f6f7f9;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    position: relative;
    b {
      color: #657acb;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 5px;
      height: 100%;
      background: #657acb;
      top: 0;
      border-radius: 5px;
    }
  }
  &:hover {
    color: #212529;
  }
  > b {
    display: flex;
    margin-bottom: 0.5rem;
  }
`;

const OutletList = styled.div`
  box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
  border-radius: 5px;
  background: #fff;
  .outlets {
    padding: 1.5rem 1.75rem;
  }
  .outlets-list {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .search {
    padding: 1.75rem;
    background: #717a9d;
    color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    h5 {
      font-family: 'OpenSans Bold';
      font-size: 16px;
    }
    > span {
      margin-bottom: 0.5rem;
      display: flex;
    }
    .input-group-text {
      background: rgba(255, 255, 255, 0.15);
      box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
    }
    input {
      color: #fff;
      background: rgba(255, 255, 255, 0.15);
      box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
      margin-left: 0px !important;
      &::placeholder {
        color: rgba(255, 255, 255, 0.2);
      }
    }
  }
`;

const OutletItem = styled.div`
  cursor: pointer;
  padding: 1rem 0rem;
  margin-left: 1.75rem;
  margin-right: 1.75rem;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e0e6ed;
  &:last-of-type {
    border-bottom: none;
  }
  .margin {
    padding: 0.375rem 0.75rem;
    background: #ebeff5;
    border-radius: 5px;
    display: inline-flex;
    width: auto;
    margin-top: 1rem;
  }
  > div {
    > b {
      img {
        width: 15px;
        height: auto;
      }
    }
  }
`;

const PaginationAndSearch = styled.div`
  display: flex;
  align-items: center;
  padding: 0rem 2rem;
  padding-top: 1rem;
  margin-left: 10px;
  > span {
    padding-bottom: 1rem;
    display: flex;
  }
  > ul {
    list-style: none;
    margin-bottom: 0;
    padding-left: 0;
    display: flex;
    border-bottom: ${props => (props.border ? `1px solid #E0E6ED` : `0px solid #E0E6ED`)};
    width: 100%;
    padding-bottom: 1rem;
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
        border-radius: 3px;
        box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
      }
    }
  }
`;

const Location = styled.div`
  padding: 1.875rem;
  > b {
    text-align: center;
    display: block;
  }
  > hr {
    background-color: #e0e6ed;
    opacity: 1;
  }
  .form-control {
    font-size: 0.75rem;
    box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
  }
`;

const Day = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border: 1px solid ${props => (props.active ? `#657ACB` : `#E0E6ED`)};
  border-radius: 3px;
  margin-bottom: 0.75rem;
  box-shadow: ${props => (props.active ? `0px 2px 4px rgba(101, 122, 203, 0.27)` : `none`)};
  > span {
    margin-right: auto;
  }
`;

const Sales = ({ customergroup, search }) => {
  const pagination = Array.from({ length: 50 }, (_, i) => i + 1);
  const paginationOutlet = Array.from({ length: 50 }, (_, i) => i + 1);
  const groupPagination = (arr, chunkSize, maxLength) => {
    const grouped = Array.from({ length: maxLength }, () => arr.splice(0, chunkSize));
    return grouped.filter(any => any.length > 0);
  };
  const groupedPagination = groupPagination(pagination, 5, pagination.length);
  const groupedPaginationOutlet = groupPagination(paginationOutlet, 3, paginationOutlet.length);
  const router = useRouter();
  const [showModalGeolocation, setShowModalGeoLocation] = React.useState(false);
  const [sales, setSales] = React.useState({
    search: [],
    outletList: [],
    paginateOutlet: 0,
    parentPaginateOutlet: 0,
    paginate: 0,
    parentPaginate: 0,
    limitPage: 20,
    monday: false,
    groupedPagination,
    groupedPaginationOutlet,
    activeArrayDay: [],
    shelves: {
      '1ft': '',
      '2_5ft': '',
      '2ft': '',
      '3_5ft': '',
      '3ft': '',
      '4_5ft': '',
      '4ft': '',
      '5ft': '',
    },
    wagon: 0,
    activeLocationCode: ``,
  });
  const [loading, setLoading] = React.useState(true);
  const [loadingList, setLoadingList] = React.useState(true);
  const [keywords, setKeywords] = React.useState(search);
  const [newKeywords] = useDebounce(keywords, 2000);
  const [keywordsOutlet, setKeywordsOutlet] = React.useState('');
  const [newKeywordsOutlet] = useDebounce(keywordsOutlet, 2000);
  const [searchLoading, setSearchLoading] = React.useState(checkValidExist(search));
  const [searchLoadingOutlet, setSearchLoadingOutlet] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState([]);
  const [searchResultOutlet, setSearchResultOutlet] = React.useState([]);

  const handleChangeCheckBox = type => e => {
    setSales(prev => ({
      ...prev,
      activeArrayDay:
        prev.activeArrayDay.filter(active => active === type).length > 0
          ? prev.activeArrayDay.filter(active => active !== type)
          : prev.activeArrayDay.concat(type),
    }));
  };

  const handleNextPrev = (currentPaginate, groupPaginate, type) => () => {
    const activeParentPaginate = groupPaginate.findIndex(any => any.includes(currentPaginate + 1));
    if (activeParentPaginate !== -1) {
      if (type === 'search') {
        setLoading(true);
        setSales(prev => ({ ...prev, paginate: currentPaginate, parentPaginate: activeParentPaginate }));
      } else if (type === 'outletList') {
        setLoadingList(true);
        setSales(prev => ({ ...prev, paginateOutlet: currentPaginate, parentPaginateOutlet: activeParentPaginate }));
      }
    }
  };

  const getDebtors = async (activePage, limit) => {
    try {
      const { data } = await ApiLocations.indexDebtors(activePage, limit);
      setSales(prev => ({ ...prev, search: data.data }));
      setLoading(false);
      setLoadingList(false);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const getLocations = async (acc_no, activePage, limit) => {
    try {
      const { data } = await ApiLocations.indexLocation(acc_no, activePage, limit);
      setSales(prev => ({
        ...prev,
        outletList: data.data.items,
      }));
      setLoading(false);
      setLoadingList(false);
      // setKeywords(search);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = type => async e => {
    const { value } = e.target;
    if (type === 'search') {
      setSearchLoading(true);
      setKeywords(value ? value.toLowerCase() : '');
    } else if (type === 'outletList') {
      setSearchLoadingOutlet(true);
      setKeywordsOutlet(value ? value.toLowerCase() : '');
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

  const getSearchResult = async (value, customer_group, salesSearch) => {
    const path = checkValidExist(customer_group)
      ? `${window.location.pathname}?customergroup=${customer_group}`
      : `/sales`;
    if (value.length > 0) {
      const result = salesSearch.filter(any => {
        const name = any.name.toLowerCase();
        const address = any.address.toLowerCase();
        const customergroup = any.customer_group.toLowerCase();
        if (name.includes(value) || address.includes(value) || customergroup.includes(value)) {
          return { ...any };
        }
      });
      setSearchResult(result);
      setSearchLoading(false);
      if (checkValidExist(customer_group)) {
        router.push(`${path}&search=${value}`, undefined, { scroll: false });
      } else {
        router.push(`${path}?search=${value}`, undefined, { scroll: false });
      }
    } else {
      setSearchResult([]);
      setSearchLoading(false);
      router.push(`${path}`, undefined, { scroll: false });
    }
  };

  const getSearchResultOutlet = async (value, salesOutletList) => {
    if (value.length > 0) {
      const result = salesOutletList.filter(any => {
        const location = any.location.toLowerCase();
        const address = any.address.toLowerCase();
        const location_code = any.location_code.toLowerCase();
        const acc_no = any.acc_no.toLowerCase();
        if (
          location.includes(value) ||
          address.includes(value) ||
          location_code.includes(value) ||
          acc_no.includes(value)
        ) {
          return { ...any };
        }
      });
      setSearchResultOutlet(result);
      setSearchLoadingOutlet(false);
    } else {
      setSearchResultOutlet([]);
      setSearchLoadingOutlet(false);
    }
  };

  const getSaLocations = code => async () => {
    try {
      const response = await ApiLocations.getSaLocation(code, 10, 0);
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const data = response.data.data.models[0];
      const activeArrayDay = days.filter((any, index) => data[`scheduled_${days[index]}`] && any);
      setSales(prev => ({
        ...prev,
        activeArrayDay,
        shelves: {
          '1ft': data.shelves_1ft,
          '2_5ft': data.shelves_2_5ft,
          '2ft': data.shelves_2ft,
          '3_5ft': data.shelves_3_5ft,
          '3ft': data.shelves_3ft,
          '4_5ft': data.shelves_4_5ft,
          '4ft': data.shelves_4ft,
          '5ft': data.shelves_5ft,
        },
        wagon: data.wagon,
        activeLocationCode: code,
      }));
      setShowModalGeoLocation(true);
      log(data, 'info');
    } catch (e) {
      showNotif(e?.response?.data?.error?.message, 'error');
      log(e, 'error');
    }
  };

  const updateSaLocation = (code, shelves, days, wagon) => async () => {
    try {
      const objectToSend = {
        scheduled_Friday: days.includes('Friday') ? `1` : `0`,
        scheduled_Monday: days.includes('Monday') ? `1` : `0`,
        scheduled_Saturday: days.includes('Saturday') ? `1` : `0`,
        scheduled_Sunday: days.includes('Sunday') ? `1` : `0`,
        scheduled_Thursday: days.includes('Thursday') ? `1` : `0`,
        scheduled_Tuesday: days.includes('Tuesday') ? `1` : `0`,
        scheduled_Wednesday: days.includes('Wednesday') ? `1` : `0`,
        shelves_1ft: shelves[`1ft`],
        shelves_2_5ft: shelves[`2_5ft`],
        shelves_2ft: shelves[`2ft`],
        shelves_3_5ft: shelves[`3_5ft`],
        shelves_3ft: shelves[`3ft`],
        shelves_4_5ft: shelves[`4_5ft`],
        shelves_4ft: shelves[`4ft`],
        shelves_5ft: shelves[`5ft`],
        wagon: wagon,
      };
      const response = ApiLocations.updateSaLocation(code, objectToSend);
      log(response, 'info');
      showNotif('Successfully updated', 'success');
      setShowModalGeoLocation(false);
    } catch (error) {
      showNotif(error, 'error');
    }
  };

  const handleInputShelves = type => e => {
    const { value } = e.target;
    setSales(prev => ({ ...prev, shelves: { ...prev.shelves, [type]: value } }));
  };

  React.useEffect(() => {
    getDebtors(sales.paginate, sales.limitPage)
      .then(({ data }) => {
        if (checkValidExist(newKeywords)) {
          // search result when keyword typed
          setSearchLoading(true);
          getSearchResult(newKeywords, customergroup, data).then(() => {
            // setLoadingList(false);
            if (checkValidExist(customergroup)) {
              getLocations(customergroup, sales.paginateOutlet, sales.limitPage);
              setSearchLoading(false);
              if (checkValidExist(customergroup) && checkValidExist(newKeywords)) {
                router.push(`/sales?customergroup=${customergroup}&search=${newKeywords}`, undefined, {
                  scroll: false,
                });
              } else if (checkValidExist(customergroup)) {
                router.push(`/sales?customergroup=${customergroup}`, undefined, { scroll: false });
              }
            }
          });
        } else {
          // default search result when keyword deleted
          setSearchLoading(false);
          if (checkValidExist(customergroup) && checkValidExist(newKeywords)) {
            router.push(`/sales?customergroup=${customergroup}&search=${newKeywords}`, undefined, { scroll: false });
          } else if (checkValidExist(customergroup)) {
            router.push(`/sales?customergroup=${customergroup}`, undefined, { scroll: false });
          } else {
            router.push(`/sales`, undefined, { scroll: false });
          }
        }
      })
      .catch(e => {
        showNotif(e?.response?.data?.error?.message, 'error');
      });

    if (checkValidExist(newKeywordsOutlet)) {
      setSearchLoadingOutlet(true);
      getSearchResultOutlet(newKeywordsOutlet, sales.outletList);
    } else if (!checkValidExist(newKeywordsOutlet)) {
      setSearchLoadingOutlet(false);
    }

    if (typeof customergroup !== 'undefined') {
      if (!checkValidExist(newKeywords)) {
        setLoadingList(true);
        getLocations(customergroup, sales.paginateOutlet, sales.limitPage);
      }
    }
  }, [sales.paginate, sales.paginateOutlet, sales.limitPage, customergroup, newKeywords, newKeywordsOutlet]);

  const lastParent = groupedPagination[groupedPagination.length - 1];
  const lastItem = lastParent[lastParent.length - 1];
  const lastParentOutlet = groupedPaginationOutlet[groupedPaginationOutlet.length - 1];
  const lastItemOutlet = lastParentOutlet[lastParentOutlet.length - 1];
  const activeItems = checkValidExist(newKeywords) ? searchResult : sales.search;
  const activeItemsOutlet = checkValidExist(newKeywordsOutlet) ? searchResultOutlet : sales.outletList;

  return (
    <>
      <Layout>
        <Title>Catalogue Management</Title>
        <div className="row">
          <div className="col-md-6">
            <CustomerList>
              <div className="search">
                <h5 className="mb-4">Customers list</h5>
                <span>Сustomer Search</span>
                <div className="input-group border-0">
                  <span className="input-group-text border-0" id="basic-addon1">
                    <img src="/static/images/icons/search-gradient.svg" alt="Search" />
                  </span>
                  <input
                    onChange={handleSearch('search')}
                    value={keywords}
                    type="text"
                    className="form-control border-0"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
              <PaginationAndSearch border={true}>
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
                        onClick={handleNextPrev(sales.paginate - 1, sales.groupedPagination, 'search')}>
                        <img src="/static/images/icons/prev-arrow.svg" />
                      </span>
                    </li>
                    {sales.groupedPagination[sales.parentPaginate].map(any => {
                      return (
                        <li className={`${any === sales.paginate + 1 ? `active` : ``}`} key={any}>
                          <span
                            onClick={
                              any === sales.paginate + 1
                                ? null
                                : handleNextPrev(any - 1, sales.groupedPagination, 'search')
                            }>
                            {any}
                          </span>
                        </li>
                      );
                    })}
                    <li>...</li>
                    <li className={`${lastItem === sales.paginate ? `active` : ``}`}>
                      <span onClick={handleNextPrev(lastItem, sales.groupedPagination, 'search')}>{lastItem}</span>
                    </li>
                    <li>
                      <span
                        className="next-arrow"
                        onClick={handleNextPrev(sales.paginate + 1, sales.groupedPagination, 'search')}>
                        <img src="/static/images/icons/next-arrow.svg" />
                      </span>
                    </li>
                  </ul>
                )}
              </PaginationAndSearch>
              <div className="list">
                {loading || searchLoading ? (
                  <div className="d-flex py-4 align-items-center justify-content-center">
                    <Loading />
                  </div>
                ) : (
                  <>
                    {activeItems.map(any => {
                      return (
                        <Link
                          scroll={false}
                          key={any.id}
                          href={`${
                            checkValidExist(newKeywords)
                              ? `/sales?customergroup=${any.customer_group}&search=${newKeywords}`
                              : `/sales?customergroup=${any.customer_group}`
                          }`}>
                          <CustomerItem className={`${any.customer_group === customergroup ? `active` : ``}`}>
                            <b>{any.name}</b>
                            <div className="d-flex align-items-center">
                              <img className="me-2" src="/static/images/icons/map-marker.svg" alt="Map" />
                              <span>{any.address}</span>
                            </div>
                          </CustomerItem>
                        </Link>
                      );
                    })}
                  </>
                )}
              </div>
            </CustomerList>
          </div>
          {typeof customergroup !== 'undefined' && checkValidExist(customergroup) && (
            <div className="col-md-6">
              <OutletList>
                <div className="search">
                  <h5 className="mb-4">Outlet list</h5>
                  <span>Outlet Search</span>
                  <div className="input-group border-0">
                    <span className="input-group-text border-0" id="basic-addon1">
                      <img src="/static/images/icons/search-gradient.svg" alt="Search" />
                    </span>
                    <input
                      onChange={handleSearch('outletList')}
                      value={keywordsOutlet}
                      type="text"
                      className="form-control border-0"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <h6 style={{ paddingLeft: '1.75rem' }} className="mb-0">
                      List of outlets
                    </h6>
                  </div>
                  <div className="col-md-8">
                    <PaginationAndSearch
                      style={{
                        paddingRight: '1.75rem',
                        paddingLeft: '1.75rem',
                        justifyContent: 'flex-end',
                      }}>
                      {checkValidExist(newKeywordsOutlet) ? (
                        <>
                          <span>
                            Search result for : &nbsp;<b>{newKeywordsOutlet}</b>
                          </span>
                        </>
                      ) : (
                        <ul style={{ width: 'auto' }}>
                          <li>
                            <span
                              className="prev-arrow"
                              onClick={handleNextPrev(
                                sales.paginateOutlet - 1,
                                sales.groupedPaginationOutlet,
                                'outletList'
                              )}>
                              <img src="/static/images/icons/prev-arrow.svg" />
                            </span>
                          </li>
                          {sales.groupedPaginationOutlet[sales.parentPaginateOutlet].map(any => {
                            return (
                              <li className={`${any === sales.paginateOutlet + 1 ? `active` : ``}`} key={any}>
                                <span
                                  onClick={
                                    any === sales.paginateOutlet + 1
                                      ? null
                                      : handleNextPrev(any - 1, sales.groupedPaginationOutlet, 'outletList')
                                  }>
                                  {any}
                                </span>
                              </li>
                            );
                          })}
                          <li>...</li>
                          <li className={`${lastItemOutlet === sales.paginateOutlet ? `active` : ``}`}>
                            <span onClick={handleNextPrev(lastItem, sales.groupedPaginationOutlet, 'outletList')}>
                              {lastItemOutlet}
                            </span>
                          </li>
                          <li style={{ marginRight: '0px' }}>
                            <span
                              className="next-arrow"
                              onClick={handleNextPrev(
                                sales.paginateOutlet + 1,
                                sales.groupedPaginationOutlet,
                                'outletList'
                              )}>
                              <img src="/static/images/icons/next-arrow.svg" />
                            </span>
                          </li>
                        </ul>
                      )}
                    </PaginationAndSearch>
                  </div>
                </div>
                <div className="outlets-list">
                  {loadingList || searchLoadingOutlet ? (
                    <div className="d-flex py-4 align-items-center justify-content-center">
                      <Loading />
                    </div>
                  ) : (
                    activeItemsOutlet.map(any => {
                      return (
                        <OutletItem key={any.b2b_cust_id}>
                          <div className="d-flex align-items-center  mb-2">
                            <div onClick={getSaLocations(any.location_code)}>
                              <img className="me-2 d-inline-block" src="/static/images/icons/edit.svg" alt="Edit" />
                            </div>
                            <Link
                              scroll={false}
                              href={`/sales/detail?location_code=${
                                any.location_code ? any.location_code : ''
                              }&location=${any.location}&customergroup=${customergroup}&address=${
                                any.address ? any.address : ''
                              }&description=${any.description}`}>
                              <a>
                                <b>{any.description}</b>
                              </a>
                            </Link>
                            <a className="ms-auto btn btn-outline-secondary d-inline-flex align-items-center text-primary">
                              <img
                                className="me-2 d-inline-block"
                                src="/static/images/icons/download.svg"
                                alt="Download"
                              />
                              Download Catalog
                            </a>
                          </div>
                          <span>
                            <img className="me-2" src="/static/images/icons/map-marker.svg" alt="Map" />
                            <Link
                              scroll={false}
                              href={`/sales/detail?location_code=${
                                any.location_code ? any.location_code : ''
                              }&location=${any.location}&customergroup=${customergroup}&address=${
                                any.address ? any.address : ''
                              }&description=${any.description}`}>
                              <a className="text-dark">{any.address1}</a>
                            </Link>
                          </span>
                          <div>
                            <p className="margin">Margin: 0%</p>
                          </div>
                        </OutletItem>
                      );
                    })
                  )}
                </div>
              </OutletList>
            </div>
          )}
        </div>
      </Layout>
      <Modal
        show={showModalGeolocation}
        onClose={() => {
          setShowModalGeoLocation(false);
        }}
        width={`400px`}
        height={`auto`}>
        <Location>
          <b>Edit location code</b>
          <hr />
          <div className="row mt-4">
            <div className="col-md-6">
              <input
                onChange={handleInputShelves('1ft')}
                type="number"
                value={sales.shelves['1ft']}
                placeholder="1Ft Qty"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <input
                onChange={handleInputShelves('2_5ft')}
                type="number"
                value={sales.shelves['2_5ft']}
                placeholder="2.5Ft Qty"
                className="form-control"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <input
                onChange={handleInputShelves('2ft')}
                type="number"
                value={sales.shelves['2ft']}
                placeholder="2Ft Qty"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <input
                onChange={handleInputShelves('3_5ft')}
                type="number"
                value={sales.shelves['3_5ft']}
                placeholder="3.5Ft Qty"
                className="form-control"
              />
            </div>
          </div>
          <div className="row mt-3 mb-4">
            <div className="col-md-6">
              <input
                onChange={handleInputShelves('3ft')}
                type="number"
                value={sales.shelves['3ft']}
                placeholder="3Ft Qty"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <input
                onChange={handleInputShelves('4_5ft')}
                type="number"
                value={sales.shelves['4_5ft']}
                placeholder="4.5Ft Qty"
                className="form-control"
              />
            </div>
          </div>
          <div className="row mt-3 mb-4">
            <div className="col-md-6">
              <input
                onChange={handleInputShelves('4ft')}
                type="number"
                value={sales.shelves['4ft']}
                placeholder="4Ft Qty"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <input
                onChange={handleInputShelves('5ft')}
                type="number"
                value={sales.shelves['5ft']}
                placeholder="5ft"
                className="form-control"
              />
            </div>
          </div>
          <div className="row mt-3 mb-4">
            <div className="col-md-6">
              <input
                onChange={e => {
                  const { value } = e.target;
                  setSales(prev => ({ ...prev, wagon: value }));
                }}
                type="number"
                value={sales.wagon}
                placeholder="Wagon"
                className="form-control"
              />
            </div>
          </div>
          <hr />
          <div className="row mt-4">
            <div className="col-md-6">
              <Day active={sales.activeArrayDay.includes('Monday')}>
                <span>Monday</span>
                <Toggle onChange={handleChangeCheckBox('Monday')} value={sales.activeArrayDay.includes('Monday')} />
              </Day>
              <Day active={sales.activeArrayDay.includes('Tuesday')}>
                <span>Tuesday</span>
                <Toggle onChange={handleChangeCheckBox('Tuesday')} value={sales.activeArrayDay.includes('Tuesday')} />
              </Day>
              <Day active={sales.activeArrayDay.includes('Wednesday')}>
                <span>Wednesday</span>
                <Toggle
                  onChange={handleChangeCheckBox('Wednesday')}
                  value={sales.activeArrayDay.includes('Wednesday')}
                />
              </Day>
              <Day active={sales.activeArrayDay.includes('Thursday')}>
                <span>Thursday</span>
                <Toggle onChange={handleChangeCheckBox('Thursday')} value={sales.activeArrayDay.includes('Thursday')} />
              </Day>
            </div>
            <div className="col-md-6">
              <Day active={sales.activeArrayDay.includes('Friday')}>
                <span>Friday</span>
                <Toggle onChange={handleChangeCheckBox('Friday')} value={sales.activeArrayDay.includes('Friday')} />
              </Day>
              <Day active={sales.activeArrayDay.includes('Saturday')}>
                <span>Saturday</span>
                <Toggle onChange={handleChangeCheckBox('Saturday')} value={sales.activeArrayDay.includes('Saturday')} />
              </Day>
              <Day active={sales.activeArrayDay.includes('Sunday')}>
                <span>Sunday</span>
                <Toggle onChange={handleChangeCheckBox('Sunday')} value={sales.activeArrayDay.includes('Sunday')} />
              </Day>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6">
              <button
                onClick={() => {
                  setShowModalGeoLocation(false);
                }}
                className="btn w-100 btn-outline-secondary text-primary me-4">
                Cancel
              </button>
            </div>
            <div className="col-md-6">
              <button
                onClick={updateSaLocation(sales.activeLocationCode, sales.shelves, sales.activeArrayDay, sales.wagon)}
                className="btn w-100 btn-primary text-white me-4">
                Create
              </button>
            </div>
          </div>
        </Location>
      </Modal>
    </>
  );
};

export default Sales;

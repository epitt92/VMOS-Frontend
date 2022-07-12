import React, { useState, useEffect } from 'react';
import Layout from 'layout';
import Link from 'next/link';
import {
  ProductContainer,
  AddProducts,
  ProductTable,
  ListItem,
  OrderSummary,
  OrderTable,
  OrderAltSkuTable,
  NewOrderMain,
  MobileFilter,
  SeeOrder,
  GoUp,
  OrderSummaryMobile,
  OrderHeader,
  ProductsItem,
  AddProduct,
} from './styled';
import { ApiItems, ApiAltSkus, ApiOrders, ApiClassifications, ApiNameCodes } from 'api';

import { Select, Loading } from 'components';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import moment from 'moment';

const Options = ({ price = '', debtor = '', flag = false }) => {
  const [data, setData] = useState([]);
  useEffect(async () => {
    if (flag) {
      const { data } = await ApiAltSkus.indexSelect(100, 0, debtor, price);
      const { models = [] } = data.data;
      setData(models);
    }
  }, [flag]);

  return (
    <>
      {data.map((item, index) => (
        <option key={index} value={item.id}>
          {item.altSku}
        </option>
      ))}
    </>
  );
};

const Products = ({ id = '' }) => {
  const [newOrders, setNewOrders] = useState({
    items: [],
    search: '',
    nowPage: 1,
    products: [],
    altSkus: [],
    nameCodes: [],
    classification: [],
    brand: {},
    class: {},
  });

  const [loading, setLoading] = useState(true);
  const [tabItem, setTabItem] = useState(1);
  const [show, setShow] = useState('main'); //main, filter
  const [showScroll, setShowScroll] = React.useState(false);
  const [showSummary, setShowSummary] = useState('main'); //summary
  const [qtyFlag, setQtyFlag] = useState(false);
  const [order, setOrder] = useState({});

  const listRef = React.createRef();

  const router = useRouter();

  const getItems = async (search = newOrders.search) => {
    try {
      if (newOrders.nowPage > 1) {
        let oldItems = newOrders.items;

        const response = await ApiItems.index(10, newOrders.nowPage - 1, search);
        setNewOrders(prev => ({ ...prev, items: oldItems.concat(response.data.data.models) }));
      } else {
        setLoading(true);
        const response = await ApiItems.index(10, newOrders.nowPage - 1, search);
        setNewOrders(prev => ({ ...prev, items: response.data.data.models }));
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const getOrder = () => {
    ApiOrders.getById(id)
      .then(response => {
        const order = response.data.data.items[0];
        setOrder(order);
      })
      .catch(e => console.log(e));
  };

  const getOrderItems = () => {
    ApiOrders.getItems(id)
      .then(response => {
        const products = response.data.data.items.map(item => ({
          id: item.product_id,
          itemCode: item.product_code,
          itemId: item.id,
          count: item.quantity,
          price: item.final_price,
          altSku: item.alt_sku,
          altSkuId: item.alt_sku_id,
          altSkus: item.alt_skus,
        }));
        setNewOrders(prev => ({ ...prev, products: products }));
      })
      .catch(e => console.log(e));
  };

  const getaltskus = async () => {
    try {
      const response = await ApiOrders.getAltSkus(id);
      setNewOrders(prev => ({ ...prev, altSkus: response.data.data.items }));
    } catch (e) {
      console.log(e);
    }
  };

  const getNameCodes = () => {
    ApiNameCodes.gets().then(response => {
      setNewOrders(prev => ({
        ...prev,
        nameCodes: response.data.data.items.map(any => {
          return {
            label: `${any.name}`,
            value: any.id,
          };
        }),
      }));
    });
  };

  const getClassification = () => {
    ApiClassifications.gets().then(response => {
      setNewOrders(prev => ({
        ...prev,
        classification: response.data.data.items.map(any => {
          return {
            label: `${any.name}`,
            value: any.id,
          };
        }),
      }));
    });
  };

  const handleInput = e => {
    setNewOrders(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const pageClick = page => {
    if (page > 0) {
      setNewOrders(prev => ({ ...prev, nowPage: page }));
    }
  };

  const clickQty = async (index, count = -1) => {
    if (count === -1) {
      count = document.getElementById(`yourqty${index}`).value;
    }

    const newProducts = {
      ...newOrders.items[index],
      count: count,
    };

    const qty = Number(newOrders.items[index].utdQty);

    if (qty < count) {
      return toast('Insufficient Stock', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: 'error',
      });
    } else {
      const data = [
        {
          alt_sku: newProducts.altSku,
          alt_sku_id: Number(newProducts.altSkuId),
          final_price: `${newProducts.price}`,
          product_code: `${newProducts.itemCode}`,
          quantity: newProducts.count,
        },
      ];

      const response = await ApiOrders.updateItems(id, data);

      if (response.data.success) {
        getOrderItems();

        return toast('Item Added to Cart', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: 'success',
        });
      }
    }
  };

  const splitQty = index => {
    const products = newOrders.products;
    products.splice(index, 1);

    setNewOrders(prev => ({ ...prev, products: products }));
  };

  const clickTab = item => {
    setTabItem(item);
    getaltskus();
  };

  const updateItem = async () => {
    const data = {
      status: 'submitted',
    };
    const response = await ApiOrders.patch(id, data);
    console.log(response);
    router.push(`/orders/order-details/${id}`);
  };

  const qty = async (index, value) => {
    setQtyFlag(true);
    let product = newOrders.products[index];

    toast('Adding item into Cart', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: 'success',
    });

    const data = [
      {
        alt_sku: product.altSku,
        alt_sku_id: Number(product.altSkuId) === 0 ? null : Number(product.altSkuId),
        final_price: `${product.price}`,
        product_code: `${product.itemCode}`,
        quantity: product.count + Number(value),
      },
    ];
    ApiOrders.updateItems(id, data).then(response => {
      setQtyFlag(false);

      if (response.data.success) {
        getOrderItems();
        toast('Item Successfully added', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: 'success',
        });
      }
    });
  };

  const newItemsSelect = (e, index) => {
    let selIndex = e.nativeEvent.target.selectedIndex;

    let product = newOrders.products[index];
    console.log(e.target.value);
    const data = [
      {
        alt_sku: e.nativeEvent.target[selIndex].text,
        // alt_sku_id: Number(e.target.value) === 0 ? null : Number(e.target.value),
        final_price: `${product.price}`,
        product_code: `${product.itemCode}`,
        quantity: product.count,
      },
    ];

    ApiOrders.updateItems(id, data).then(response => {
      if (response.data.success) {
        getOrderItems();
      }
    });
  };

  const handleNumber = e => {
    console.log(e);
  };

  const handleClass = newValue => {
    setNewOrders(prev => ({ ...prev, class: newValue }));
    getItems(newValue.label);
  };

  const handleBrand = newValue => {
    setNewOrders(prev => ({ ...prev, brand: newValue }));
    getItems(newValue.label);
  };

  const onScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 0) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const productScroll = () => {
    const scrollTop = listRef.current.scrollTop;
    const scrollHeight = listRef.current.scrollHeight;
    let scroll = scrollHeight - scrollTop;
    console.log(scroll);
    if (scroll < 933) {
      let nowpage = newOrders.nowPage + 1;
      setNewOrders(prev => ({ ...prev, nowPage: nowpage }));
    }
  };

  const scrollGoUp = () => {
    window.scrollTo(0, 0);
  };

  const altskuChange = (e, index) => {
    let selIndex = e.nativeEvent.target.selectedIndex;

    let items = newOrders.items;
    items[index].altSku = e.nativeEvent.target[selIndex].text;
    items[index].altSkuId = e.target.value;
    setNewOrders(prev => ({ ...prev, items: items }));
  };

  const altskuClick = index => {
    let items = newOrders.items;
    items[index].altSkuFlag = true;
    setNewOrders(prev => ({ ...prev, items: items }));
  };

  const onResetFilters = () => {
    setNewOrders(prev => ({ ...prev, search: '', brand: {}, class: {} }));
    getItems();
  };

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll);
    getOrder();
    getNameCodes();
    getClassification();
    getaltskus();
    getOrderItems();
  }, []);

  React.useEffect(() => {
    getItems();
  }, [newOrders.search, newOrders.nowPage]);

  React.useEffect(() => {
    getaltskus();
  }, [newOrders.products]);

  return (
    <>
      <NewOrderMain show={show === 'main' ? true : false}>
        <Layout>
          <OrderHeader>
            <img src="/static/images/icons/arrow-left.svg" onClick={() => setShow('main')} />
            <span>{order.name} </span>
          </OrderHeader>
          <ProductContainer show={showSummary === 'main' ? true : false}>
            <div className="header">
              <div className="text">
                <div className="line">
                  <Link href="/orders">Orders</Link> / New Single Order
                </div>
                <div className="title">New Single Order</div>
              </div>
              <div className="steps">
                <div className="step-list">
                  <div className="radius">1</div>
                  <div className="text">Main Info</div>
                </div>
                <div className="step-list active">
                  <div className="radius">2</div>
                  <div className="text">Add Products</div>
                </div>
                <div className="step-list">
                  <div className="radius">3</div>
                  <div className="text">Order Details</div>
                </div>
              </div>
            </div>

            <div className="neworder-container">
              <div className="addproducts">
                <AddProducts>
                  <div className="header">
                    <div className="title">Add Products</div>
                    <div className="search">
                      <div className="search-header">
                        <div className="text">Products Search</div>
                        <div className="mobile-open-filter" onClick={() => setShow('filter')}>
                          <img src="/static/images/icons/open-filter.svg" />
                          <span>Open Filter</span>
                        </div>
                      </div>
                      <div className="search-input">
                        <input
                          type="text"
                          placeholder="Search"
                          name="search"
                          value={newOrders.search}
                          onChange={handleInput}
                        />
                        <img src="/static/images/icons/search-white.svg" />
                      </div>
                      <div className="reset-filter" onClick={onResetFilters}>
                        <img src="/static/images/icons/x-circle-red.svg" />
                        <span>Reset All Filters</span>
                      </div>
                    </div>
                    <div className="select">
                      <div className="select-item">
                        <Select
                          label={
                            <span className="label" style={{ marginBottom: '0.625rem' }}>
                              Item Brand
                            </span>
                          }
                          onChange={handleBrand}
                          options={newOrders.classification}
                          background={`#828BAE`}
                          border={`#828BAE`}
                          margin={`1.25rem`}
                          colorHover={`#fff`}
                          colorSelected={`#f54324e`}
                          color={`#FFFFFF`}
                          backgroundSelected={`#fff`}
                          custom={true}
                          value={newOrders.brand}
                          placeholder={`Paw Parol`}
                        />
                      </div>
                      <div className="select-item">
                        <Select
                          label={
                            <span className="label" style={{ marginBottom: '0.625rem' }}>
                              Item Class
                            </span>
                          }
                          onChange={handleClass}
                          options={newOrders.nameCodes}
                          background={`#828BAE`}
                          border={`#828BAE`}
                          margin={`1.25rem`}
                          colorHover={`#fff`}
                          colorSelected={`#f54324e`}
                          color={`#FFFFFF`}
                          backgroundSelected={`#fff`}
                          custom={true}
                          value={newOrders.class}
                          placeholder={`Bag & Pouches`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="body">
                    <ProductTable>
                      <div className="header">
                        <div className="sort">
                          <div className="title">Sort by:</div>
                          <button type="button">Releyance</button>
                          <button type="button">Price</button>
                        </div>
                      </div>
                      <div className="list" ref={listRef} onScroll={productScroll}>
                        {loading ? (
                          <div className="d-flex py-4 align-items-center justify-content-center">
                            <Loading />
                          </div>
                        ) : (
                          newOrders.items.map((item, index) => (
                            <ListItem key={index}>
                              {index === 0 ? <hr className="list-hr-header" /> : ''}
                              <div key={index} className="content">
                                <div className="img">
                                  <img src={item.imageUrl} />
                                  <div className="count">
                                    <select
                                      name=""
                                      id=""
                                      onChange={e => altskuChange(e, index)}
                                      onClick={() => altskuClick(index)}
                                      value={item.altSkuId}>
                                      <option value=""></option>
                                      <Options price={item.price} debtor={order.debtor} flag={item.altSkuFlag} />
                                    </select>
                                  </div>
                                </div>
                                <div className="text">
                                  <div className="header">
                                    <div className="title"> {item.itemCode} </div>
                                    <div className="right">
                                      <span className="old-price">{item.oldPrice ? `$${item.oldPrice}` : ' '} </span>
                                      <span className="price">${item.price} </span>
                                      <img src="/static/images/icons/options.svg" />
                                    </div>
                                  </div>
                                  <div className="mobile-stock">
                                    <div className="stock">
                                      <span className="text">Stock:</span>
                                      <span className="number"> {item.utdQty || 0}</span>
                                    </div>
                                    <div className="price">
                                      <span className="old-price">{item.oldPrice ? `$${item.oldPrice}` : ' '}</span>
                                      <span className="now-price">${item.price}</span>
                                    </div>
                                  </div>
                                  <div className="description">{item.description}</div>
                                  <div className="btn-list">
                                    <div className="left">
                                      <button type="button" onClick={() => clickQty(index, 1)} className="number">
                                        1
                                      </button>
                                      <button type="button" onClick={() => clickQty(index, 4)} className="number">
                                        4
                                      </button>
                                      <button type="button" onClick={() => clickQty(index, 10)} className="number">
                                        10
                                      </button>
                                      <button type="button" onClick={() => clickQty(index, 20)} className="number">
                                        20
                                      </button>

                                      <div className="qty-group">
                                        <input
                                          type="number"
                                          className="qty"
                                          placeholder="Your qty"
                                          id={`yourqty${index}`}
                                        />
                                        <img src="/static/images/icons/pulse.svg" onClick={() => clickQty(index)} />
                                      </div>
                                    </div>
                                    <div className="right">
                                      <button type="button" className="stock">
                                        Stock: <span>{item.utdQty || 0}</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="mobile-btn-list">
                                <div className="left">
                                  <button type="button" onClick={() => clickQty(index, 1)} className="number">
                                    1
                                  </button>
                                  <button type="button" onClick={() => clickQty(index, 4)} className="number">
                                    4
                                  </button>
                                  <button type="button" onClick={() => clickQty(index, 10)} className="number">
                                    10
                                  </button>
                                  <button type="button" onClick={() => clickQty(index, 20)} className="number">
                                    20
                                  </button>
                                </div>

                                <div className="right">
                                  <div className="qty-group">
                                    <input
                                      type="number"
                                      className="qty"
                                      placeholder="Your qty"
                                      id={`yourqty${index}`}
                                    />
                                    <img src="/static/images/icons/pulse.svg" onClick={() => clickQty(index)} />
                                  </div>
                                </div>
                              </div>
                              <hr className="list-hr" />
                            </ListItem>
                          ))
                        )}
                      </div>

                      <div className="mobile-page">
                        <ul>
                          <li onClick={() => pageClick(newOrders.nowPage - 1)}>
                            <span className="prev-arrow">
                              <img src="/static/images/icons/prev-arrow.svg" />
                            </span>
                          </li>
                          {newOrders.nowPage % 2 === 1 ? (
                            <>
                              <li className="active" onClick={() => pageClick(newOrders.nowPage)}>
                                <span> {newOrders.nowPage} </span>
                              </li>
                              <li onClick={() => pageClick(newOrders.nowPage + 1)}>
                                <span className=""> {newOrders.nowPage + 1} </span>
                              </li>
                            </>
                          ) : (
                            <>
                              <li onClick={() => pageClick(newOrders.nowPage - 1)}>
                                <span className="">{newOrders.nowPage - 1}</span>
                              </li>
                              <li className="active" onClick={() => pageClick(newOrders.nowPage)}>
                                <span>{newOrders.nowPage}</span>
                              </li>
                            </>
                          )}
                          <span>...</span>
                          <li>
                            <span className="">576</span>
                          </li>
                          <li onClick={() => pageClick(newOrders.nowPage + 1)}>
                            <span className="prev-arrow">
                              <img src="/static/images/icons/next-arrow.svg" />
                            </span>
                          </li>
                        </ul>
                      </div>
                    </ProductTable>
                  </div>
                </AddProducts>
              </div>
              <div className="ordersummary">
                <OrderSummary>
                  <div className="title">Order Summary</div>
                  <hr />
                  <div className="order">
                    <div>
                      <div className="title"> {order.name} </div>
                      <div className="star">
                        <img src="/static/images/icons/star.svg" />
                        Make Priority
                      </div>
                    </div>
                    <div className="description">Customer: {order.customer_name}</div>
                    <div className="btn-list">
                      <button type="button">
                        Created: <span>{moment(order.created_at).format('DD/MM/YYYY')}</span>
                      </button>
                      {order.submitted_at === null ? (
                        ''
                      ) : (
                        <button type="button">
                          Submitted: <span>{moment(order.submitted_at).format('DD/MM/YYYY')}</span>
                        </button>
                      )}
                      <button type="button">
                        Due: <span>{moment(order.due_at).format('DD/MM/YYYY')}</span>
                      </button>
                    </div>
                    <div className="ref">#Ref: {} </div>
                    <div className="customer">
                      <div className="text">#Customer PO Ref: {order.customer_po_ref} </div>
                      <div className="upload">
                        <img src="/static/images/icons/upload.svg" />
                        Upload File (CSV)
                      </div>
                    </div>
                    <div className="about">
                      <div className="text">{order.description}</div>
                      <div className="download">
                        <img src="/static/images/icons/download.svg" />
                        Download Format (CSV)
                      </div>
                    </div>
                    <hr />
                    <div className="tab">
                      {tabItem === 1 ? (
                        <>
                          <div className="tab-item active" onClick={() => clickTab(1)}>
                            Summary
                          </div>
                          <div className="tab-item" onClick={() => clickTab(2)}>
                            Alt SKU
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="tab-item" onClick={() => clickTab(1)}>
                            Summary
                          </div>
                          <div className="tab-item active" onClick={() => clickTab(2)}>
                            Alt SKU
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="order-table">
                    <div className="header-left"></div>
                    <div className="header-right"></div>
                    {tabItem === 1 ? (
                      <OrderTable>
                        <thead>
                          <tr className="header">
                            <th>Product</th>
                            <th>Alt SKU</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {newOrders.products.map((item, index) => (
                            <tr className="body" key={index}>
                              <td className="product">
                                <img src={item.imageUrl} />
                                <span>{item.itemCode}</span>
                              </td>
                              <td className="altsku">
                                <select
                                  key={index}
                                  name=""
                                  id=""
                                  onChange={e => newItemsSelect(e, index)}
                                  // defaultValue={item.altSku}
                                  value={item.altSku}>
                                  {item.altSkus.findIndex(any => any === item.altSku) < 0 ? (
                                    <option>{item.altSku}</option>
                                  ) : (
                                    <option></option>
                                  )}
                                  {item.altSkus.map((any, key) => (
                                    <option key={key} value={any}>
                                      {any}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td className="price">
                                <span className="now-price">$ {item.price} </span>
                                <br />
                                <span className="old-price"></span>
                              </td>
                              <td className="qty">
                                <button
                                  type="button"
                                  className="minus"
                                  onClick={() => qty(index, -1)}
                                  disabled={qtyFlag}>
                                  -
                                </button>
                                <input type="number" name="" value={item.count} onChange={handleNumber} />
                                <button type="button" className="plus" onClick={() => qty(index, 1)} disabled={qtyFlag}>
                                  +
                                </button>
                              </td>
                              <td className="subtotal">$ {item.price * item.count} </td>
                              <td className="action">
                                <img src="/static/images/icons/delete.svg" onClick={() => splitQty(index)} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </OrderTable>
                    ) : (
                      <OrderAltSkuTable>
                        <div className="header">
                          <span>Product</span>
                          <span>Alt SKU</span>
                        </div>
                        {newOrders.altSkus?.map(item => (
                          <div className="body">
                            <div className="altSkus-header">
                              <span>{item.altSku === null ? 'No Alt-Sku' : item.altSku}</span>
                              <span>{item.altSkuCount}</span>
                            </div>
                            {item.productCodes.map(any => (
                              <div className="products">
                                <span>{any}</span>
                                <span>1</span>
                              </div>
                            ))}
                            <hr />
                          </div>
                        ))}
                      </OrderAltSkuTable>
                    )}
                  </div>
                  <div className="table-footer">
                    <div>Total Info:</div>
                    <div>
                      <span>Total qty:</span>
                      {newOrders.products.reduce((acc, currTotal) => acc + currTotal.count, 0)}
                    </div>
                    <div>
                      <span>Alt SKU:</span>
                      {newOrders.altSkus.reduce((acc, item) => acc + item.altSkuCount, 0)}
                    </div>
                    <div>
                      ${' '}
                      {newOrders.products
                        .reduce((acc, currTotal) => acc + currTotal.count * currTotal.price, 0)
                        .toFixed(2)}
                    </div>
                  </div>
                  <div className="btn-footer">
                    <button type="button" className="cancel">
                      Cancel Order
                    </button>
                    <button onClick={updateItem} type="button" className="submit">
                      Submit
                    </button>
                  </div>
                </OrderSummary>
              </div>
            </div>
          </ProductContainer>
          <OrderSummaryMobile show={showSummary === 'summary' ? true : false}>
            <div className="title">Order Summary</div>
            <hr />
            <div className="header">
              <div className="title">
                <span>{order.name}</span>
                <img src="/static/images/icons/star.svg" />
              </div>
              <div className="customer">Customer: {order.customer_name}</div>
              <div className="date-list">
                <div className="header">
                  {order.created_at === 'null' ? (
                    ''
                  ) : (
                    <span className="date">
                      <span className="state">Created:</span>
                      <span>{moment(order.created_at).format('DD/MM/YYYY')}</span>
                    </span>
                  )}
                  {order.submitted_at === 'null' ? (
                    ''
                  ) : (
                    <span className="date">
                      <span className="state">Submitted:</span>
                      <span> {moment(order.submitted_at).format('DD/MM/YYYY')}</span>
                    </span>
                  )}
                </div>
                <div className="footer">
                  {order.due_at === 'null' ? (
                    ''
                  ) : (
                    <span className="date">
                      <span className="state">Due:</span>
                      <span>{moment(order.due_at).format('DD/MM/YYYY')}</span>
                    </span>
                  )}
                </div>
              </div>
              <div className="ref">#Ref: {}</div>
              <div className="customer-po-ref">#Customer PO Ref: {order.customer_po_ref}</div>
              <div className="description">{order.description}</div>
            </div>
            <div className="products">
              <div className="header">Products</div>
              <div className="body">
                {newOrders.products.map((item, index) => (
                  <ProductsItem key={index}>
                    <div className="header">
                      <img src={item.imageUrl} />
                      <div className="text">
                        <span className="title"> {item.itemCode} </span>
                        <span className="price">${item.price}</span>
                        <span className="old-price"></span>
                      </div>
                      <img onClick={() => splitQty(index)} className="close" src="/static/images/icons/close.svg" />
                    </div>
                    <div className="altsku">
                      <span>Alt SKU</span>
                      <div>
                        <select key={index} name="" id="" onChange={e => newItemsSelect(e, index)} value={item.altSku}>
                          {item.altSkus.findIndex(any => any === item.altSku) < 0 ? (
                            <option>{item.altSku}</option>
                          ) : (
                            <option></option>
                          )}
                          {item.altSkus.map((any, key) => (
                            <option key={key} value={any}>
                              {any}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="qty">
                      <span>Qty</span>
                      <div>
                        <span className="minus">-</span>
                        <input type="number" name="" value={item.count} onChange={handleNumber} />
                        <span className="plus">+</span>
                      </div>
                    </div>
                    <div className="stock">
                      <span>WH Stock</span>
                      <div>
                        <span>Stock:</span>
                      </div>
                    </div>
                    <hr />
                  </ProductsItem>
                ))}
              </div>
              <div className="footer">
                <div className="one">
                  <div className="title">Total Info:</div>
                  <div className="price">
                    ${newOrders.products.reduce((acc, currTotal) => acc + currTotal.count * currTotal.price, 0)}
                  </div>
                </div>
                <div className="two">
                  <div className="qty">
                    Total qty:
                    <span className="value">
                      {newOrders.products.reduce((acc, currTotal) => acc + currTotal.count, 0)}{' '}
                    </span>
                  </div>
                  <div className="altsku">
                    Alt SKU: <span className="value"></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="btn-list">
              <button type="button" className="cancel">
                Cancel Order
              </button>
              <button onClick={updateItem} type="button" className="submit">
                Submit
              </button>
            </div>
          </OrderSummaryMobile>
        </Layout>
        <GoUp show={showScroll} onClick={scrollGoUp}>
          <img src="/static/images/icons/arrow-up.svg" />
          <span>Go Up</span>
        </GoUp>
        <SeeOrder show={showSummary === 'main' ? true : false} onClick={() => setShowSummary('summary')}>
          <span>See Order</span>
        </SeeOrder>
        <AddProduct show={showSummary === 'summary' ? true : false} onClick={() => setShowSummary('main')}>
          <span>Add Product</span>
        </AddProduct>
      </NewOrderMain>
      <MobileFilter show={show === 'filter' ? true : false}>
        <div className="header">
          <img src="/static/images/icons/delete.svg" onClick={() => setShow('main')} />
          <span>Filter Products</span>
        </div>
        <hr />
        <div className="body">
          <Select
            label={
              <span className="label" style={{ marginBottom: '0.625rem', color: '#fff' }}>
                Item Brand
              </span>
            }
            onChange={handleBrand}
            options={newOrders.classification}
            background={`#828BAE`}
            border={`#828BAE`}
            margin={`1.25rem`}
            colorHover={`#fff`}
            colorSelected={`#fff`}
            color={`#FFFFFF`}
            backgroundSelected={`#fff`}
            custom={true}
            value={newOrders.brand}
            placeholder={`Paw Parol`}
          />
          <Select
            label={
              <span className="label" style={{ marginBottom: '0.625rem', color: '#fff' }}>
                Item Class
              </span>
            }
            onChange={handleClass}
            options={newOrders.nameCodes}
            background={`#828BAE`}
            border={`#828BAE`}
            margin={`1.25rem`}
            colorHover={`#fff`}
            colorSelected={`#fff`}
            color={`#FFFFFF`}
            backgroundSelected={`#fff`}
            custom={true}
            value={newOrders.class}
            placeholder={`Bag & Pouches`}
          />

          <button type="button" onClick={() => setShow('main')}>
            Apply
          </button>
          <div className="reset">
            <img src="/static/images/icons/x-circle.svg" />
            <span>Reset All Filters</span>
          </div>
        </div>
      </MobileFilter>
    </>
  );
};

export default Products;

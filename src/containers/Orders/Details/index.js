import React, { useState, useEffect } from 'react';
import { TextArea, DetailsBody, DetailsDesktop, OrderTable, DetailsMobile, Modal } from './styled';
import Layout from 'layout';
import { ApiOrders } from 'api';
import { Input, Loading } from 'components';
import { useRouter } from 'next/router';
import { checkValidExist } from 'helpers';
import moment from 'moment';

const Details = ({ id = '' }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [statusText, setStatusText] = useState();
  const router = useRouter();
  const [tabItem, setTabItem] = useState(1); // item, alt
  const [altskus, setAltskus] = useState([]);
  const [order, setOrder] = useState([]);
  const [statusFlag, setStatusFlag] = useState(false);
  const [assignedFlag, setAssignedFlag] = useState(false);

  // Remark
  const [remarks, setRemarks] = useState('');

  const [modalShow, setModalShow] = useState(false);

  const [statusList, setStatusList] = useState([
    'created',
    'submitted',
    'preprocessing',
    'processing',
    'readyfordelivery',
    'complete',
    'void',
  ]);

  const getOrderItems = async () => {
    try {
      setLoading(true);
      const response = await ApiOrders.getItems(id);
      setItems(response.data.data.items);
      console.log(response.data.data.items);
      setLoading(false);
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

        if (response.data.data.items[0].status === 'packed') {
          setStatusText('SUBMITTED');
        } else {
          setStatusText(response.data.data.items[0].status.toLowerCase());
        }
      })
      .catch(e => console.log(e));
  };

  const getaltskus = async () => {
    try {
      const response = await ApiOrders.getAltSkus(id);
      setAltskus(response.data.data.items);
    } catch (e) {
      console.log(e);
    }
  };

  const updateRemark = async () => {
    let data = {
      remarks,
    };
    try {
      const response = await ApiOrders.patch(id, data);
    } catch (e) {
      console.log(e);
    }
  };

  const updateStatus = string => {
    ApiOrders.updateStatus(id, string).then(res => {
      if (res.data.success) {
        setModalShow(true);
        setStatusText(string);
      }
    });
  };

  const clickTab = item => {
    setTabItem(item);
    getaltskus();
  };

  useEffect(() => {
    getOrderItems();
    getaltskus();
    getOrder();
  }, []);

  return (
    <>
      {modalShow ? (
        <Modal>
          <div className="backgroud" onClick={() => setModalShow(false)}></div>
          <div className="body">
            <div className="modal-title">Status Update Successful</div>
            <div className="btn-list">
              <button
                type="button"
                className="back"
                onClick={() => {
                  router.push('/orders');
                  setModalShow(false);
                }}>
                Back to Order List
              </button>
              <button type="button" className="order" onClick={() => setModalShow(false)}>
                Order Summary
              </button>
            </div>
          </div>
        </Modal>
      ) : (
        ''
      )}
      <Layout>
        <DetailsDesktop>
          <div className="header">
            <div className="line">
              <span className="order" onClick={() => router.push('/orders')}>
                Orders
              </span>{' '}
              / <span>{order.name}</span>
            </div>
            <div className="title"> {order.name} </div>
          </div>
          <DetailsBody>
            <div className="header">
              <div className="text">Order Details</div>
              <div className="action">
                <div className="status">
                  <div className={`status-select ${statusText} `} onClick={() => setStatusFlag(!statusFlag)}>
                    {statusText}
                  </div>
                  {statusFlag ? (
                    <div className="status-options">
                      {statusList.map((item, index) => (
                        <div
                          className="item"
                          key={index}
                          onClick={() => {
                            setStatusFlag(false);
                            updateStatus(item);
                          }}>
                          {item === statusText ? (
                            <img src="/static/images/icons/radio-active.svg" alt="" />
                          ) : (
                            <img src="/static/images/icons/radio-basic.svg" alt="" />
                          )}
                          {item === 'readyfordelivery' ? (
                            <span className={`${item}`}>Ready For Deliver</span>
                          ) : (
                            <span className={`${item}`}>{item}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="assigned">
                  <div className="assigned-select" onClick={() => setAssignedFlag(!assignedFlag)}>
                    {' '}
                    Unassigned{' '}
                  </div>
                  {assignedFlag ? (
                    <div className="assigned-options">
                      <div className="item">Account Name</div>
                      <div className="item">Account Name</div>
                      <div className="item">Account Name</div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            <hr />
            <div className="body">
              <div className="body-header">
                <div className="title">{order.name}</div>
                <span className={`type ${statusText?.toLowerCase()}`}>
                  {statusText === 'readyfordelivery' ? 'Ready For Delivery' : statusText}
                </span>
              </div>
              <div className="customer">Customer: {order.location} </div>
              <div className="saleperson">Salesperson: </div>
              <div className="date">
                <div className="item">
                  <span className="type">Created:</span>
                  <span className="value">
                    {checkValidExist(order.created_at) && moment(order.created_at).format('DD/MM/YYYY')}
                  </span>
                </div>
                {order.submitted_at !== null ? (
                  <div className="item">
                    <span className="type">Submitted:</span>
                    <span className="value">
                      {checkValidExist(order.submitted_at) && moment(order.submitted_at).format('DD/MM/YYYY')}{' '}
                    </span>
                  </div>
                ) : (
                  ''
                )}
                {order.due_at !== null ? (
                  <div className="item">
                    <span className="type">Due:</span>
                    <span className="value">
                      {checkValidExist(order.due_at) && moment(order.due_at).format('DD/MM/YYYY')}{' '}
                    </span>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="ref">
                <span>#Ref: {} </span>
                <span>#Invoice Ref: {order.invoice_ref}</span>
              </div>
              <div className="customer-poref">#Customer PO Ref: {order.customer_po_ref} </div>
              <div className="description"></div>
            </div>
            <hr />
            <div className="tab">
              <div className={tabItem === 1 ? `item active` : `item`} onClick={() => clickTab(1)}>
                Order Items
              </div>
              <div className={tabItem === 2 ? `item active` : `item`} onClick={() => clickTab(2)}>
                Alt SKU
              </div>
            </div>
            {loading ? (
              <div className="d-flex py-4 align-items-center justify-content-center">
                <Loading />
              </div>
            ) : (
              <div className="tab-content">
                {tabItem === 1 ? (
                  <div className="item-table">
                    <div className="header"></div>
                    <OrderTable>
                      <thead>
                        <tr>
                          <th className="product">Product</th>
                          <th></th>
                          <th>Alt SKU</th>
                          <th>RRP</th>
                          <th>Price</th>
                          <th>OrderQty</th>
                          <th>PickQty</th>
                          <th>Subtotal</th>
                          <th>Discount</th>
                          <th>Final Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items?.map((item, index) => (
                          <tr key={index}>
                            <td className="product">
                              <img />
                            </td>
                            <td className="text-bold">{item.product_code}</td>
                            <td>{item.alt_sku}</td>
                            <td>${item.product_rrp} </td>
                            <td>${item.final_price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.pick_qty}</td>
                            <td>${item.quantity * item.final_price}</td>
                            <td>$0</td>
                            <td className="text-bold">${(item.quantity * item.final_price).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </OrderTable>
                    <div className="footer">
                      <div className="total">Total Info:</div>
                      <div className="qty">
                        <span>Total qty:</span> {items.reduce((acc, currTotal) => acc + currTotal.quantity, 0)}
                      </div>
                      <div className="alt-sku">
                        <span>Alt SKU:</span>
                        {altskus.reduce((acc, item) => acc + item.altSkuCount, 0)}
                      </div>
                      <div className="price">
                        $
                        {items
                          .reduce((acc, currTotal) => acc + currTotal.quantity * currTotal.final_price, 0)
                          .toFixed(2)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="alt-skus">
                    <div className="header">
                      <span>Product</span>
                      <span>Alt SKU</span>
                    </div>
                    {altskus?.map(item => (
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
                    <div className="footer">
                      <div className="total">Total Info:</div>
                      <div className="qty">
                        <span>Total qty:</span> {items.reduce((acc, currTotal) => acc + currTotal.pick_qty, 0)}
                      </div>
                      <div className="alt-sku">
                        <span>Alt SKU:</span>
                        {altskus.reduce((acc, item) => acc + item.altSkuCount, 0)}
                      </div>
                      <div className="price">
                        ${items.reduce((acc, currTotal) => acc + currTotal.pick_qty * currTotal.final_price, 0)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="remarks">
              <TextArea value={remarks} onChange={e => setRemarks(e.target.value)}></TextArea>
              <button type="button" onClick={updateRemark}>
                Update
              </button>
            </div>
          </DetailsBody>
        </DetailsDesktop>
        <DetailsMobile>
          <div className="header">{order.name}</div>
          <div className="body">
            <div className="title">Details</div>
            <hr />
            <div className="content">
              <div className="status">{statusText}</div>
              <div className="title">{order.name}</div>
              <div className="customer">Customer: {order.location}</div>
              <div className="date-list">
                <div className="header">
                  {order.created_at === null ? (
                    ''
                  ) : (
                    <span className="date">
                      <span className="state">Created:</span>
                      <span>{checkValidExist(order.created_at) && moment(order.created_at).format('DD/MM/YYYY')}</span>
                    </span>
                  )}
                  {order.submitted_at === null ? (
                    ''
                  ) : (
                    <span className="date">
                      <span className="state">Submitted:</span>
                      <span>
                        {checkValidExist(order.submitted_at) && moment(order.submitted_at).format('DD/MM/YYYY')}
                      </span>
                    </span>
                  )}
                </div>
                <div className="footer">
                  {order.due_at === null ? (
                    ''
                  ) : (
                    <span className="date">
                      <span className="state">Due:</span>
                      {/* <span>{moment(due).format('DD/MM/YYYY')}</span> */}
                      <span>{checkValidExist(order.due_at) && moment(order.due_at).format('DD/MM/YYYY')}</span>
                    </span>
                  )}
                </div>
              </div>
              <button className="status-btn processed">Processed: VM2</button>
              <button className="status-btn ready">Ready: VM2</button>
              <div className="ref">#Ref: {}</div>
              <div className="invoice-ref">#Invoice Ref: {order.invoice_ref}</div>
              <div className="customer-po-ref">#Customer PO Ref: {order.customer_po_ref}</div>
              <div className="description">{order.description}</div>
            </div>
          </div>
          <button className="home">Home</button>
        </DetailsMobile>
      </Layout>
    </>
  );
};

export default Details;

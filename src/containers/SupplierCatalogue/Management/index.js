import React from 'react';
import Layout from 'layout';
import { ManagementContainer, ProductList, ProductItem } from './styled';
import { Pagination } from 'components';

const Index = () => {
  const [management, setManagement] = React.useState({
    localPage: 1,
    OverseaPage: 1,
  });

  const handleLocalPageChange = page => {
    setManagement(prev => ({ ...prev, localPage: page }));
  };

  return (
    <>
      <Layout>
        <ManagementContainer>
          <div className="title">Product Management</div>
          <div className="body">
            <ProductList>
              <div className="header">
                <div className="title">Local Product List</div>
                <div className="search">
                  <div className="label">Outlet Search</div>
                  <div className="search-input">
                    <img src="/static/images/icons/search-white.svg" alt="" />
                    <input type="text" placeholder="Search" />
                  </div>
                </div>
              </div>
              <div className="list">
                <div className="header">
                  <span>List of outlets</span>
                  <Pagination
                    page={management.localPage}
                    limit={10}
                    count={100}
                    onPageChange={handleLocalPageChange}
                    style={{ paddingLeft: '.5rem' }}
                  />
                </div>
                <div className="body">
                  <ProductItem>
                    <div className="action">
                      <div className="edit">
                        <img src="/static/images/icons/edit.svg" alt="" />
                        <span>Product List</span>
                      </div>
                      <div className="download">
                        <img src="/static/images/icons/download.svg" alt="" />
                        <span>Download Catalog</span>
                      </div>
                    </div>
                    <div className="name">Creditor Name: `Creditor Name`</div>
                    <button type="button">
                      <span>Margin:</span> 0%
                    </button>
                  </ProductItem>
                  <ProductItem>
                    <div className="action">
                      <div className="edit">
                        <img src="/static/images/icons/edit.svg" alt="" />
                        <span>Product List</span>
                      </div>
                      <div className="download">
                        <img src="/static/images/icons/download.svg" alt="" />
                        <span>Download Catalog</span>
                      </div>
                    </div>
                    <div className="name">Creditor Name: `Creditor Name`</div>
                    <button type="button">
                      <span>Margin:</span> 0%
                    </button>
                  </ProductItem>
                  <ProductItem>
                    <div className="action">
                      <div className="edit">
                        <img src="/static/images/icons/edit.svg" alt="" />
                        <span>Product List</span>
                      </div>
                      <div className="download">
                        <img src="/static/images/icons/download.svg" alt="" />
                        <span>Download Catalog</span>
                      </div>
                    </div>
                    <div className="name">Creditor Name: `Creditor Name`</div>
                    <button type="button">
                      <span>Margin:</span> 0%
                    </button>
                  </ProductItem>
                </div>
              </div>
            </ProductList>
            <ProductList>
              <div className="header">
                <div className="title">Oversea Product List</div>
                <div className="search">
                  <div className="label">Outlet Search</div>
                  <div className="search-input">
                    <img src="/static/images/icons/search-white.svg" alt="" />
                    <input type="text" placeholder="Search" />
                  </div>
                </div>
              </div>
              <div className="list">
                <div className="header">
                  <span>List of outlets</span>
                  <Pagination
                    page={management.localPage}
                    limit={10}
                    count={1000}
                    onPageChange={handleLocalPageChange}
                    style={{ paddingLeft: '.5rem' }}
                  />
                </div>
                <div className="body">
                  <ProductItem>
                    <div className="action">
                      <div className="edit">
                        <img src="/static/images/icons/edit.svg" alt="" />
                        <span>Product List</span>
                      </div>
                      <div className="download">
                        <img src="/static/images/icons/download.svg" alt="" />
                        <span>Download Catalog</span>
                      </div>
                    </div>
                    <div className="name">Creditor Name: `Creditor Name`</div>
                    <button type="button">
                      <span>Margin:</span> 0%
                    </button>
                  </ProductItem>
                  <ProductItem>
                    <div className="action">
                      <div className="edit">
                        <img src="/static/images/icons/edit.svg" alt="" />
                        <span>Product List</span>
                      </div>
                      <div className="download">
                        <img src="/static/images/icons/download.svg" alt="" />
                        <span>Download Catalog</span>
                      </div>
                    </div>
                    <div className="name">Creditor Name: `Creditor Name`</div>
                    <button type="button">
                      <span>Margin:</span> 0%
                    </button>
                  </ProductItem>
                  <ProductItem>
                    <div className="action">
                      <div className="edit">
                        <img src="/static/images/icons/edit.svg" alt="" />
                        <span>Product List</span>
                      </div>
                      <div className="download">
                        <img src="/static/images/icons/download.svg" alt="" />
                        <span>Download Catalog</span>
                      </div>
                    </div>
                    <div className="name">Creditor Name: `Creditor Name`</div>
                    <button type="button">
                      <span>Margin:</span> 0%
                    </button>
                  </ProductItem>
                </div>
              </div>
            </ProductList>
          </div>
        </ManagementContainer>
      </Layout>
    </>
  );
};

export default Index;

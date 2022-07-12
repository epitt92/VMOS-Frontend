import React, { useEffect, useState } from "react"
import styled from '@emotion/styled';
import { BoxTitle, Card, FlexBox, Line, Button, Loading, } from "components";
import OrderItems from "./order-items/OrderItems";
import ProductItems from "./product-items/ProductItems";
import { ApiItems } from "api";
import { Pagination } from "components";
import { usePickOrder } from "./hooks/PickOrderContext";

const OrderItemsList = ({ id }) => {
  const { orders, loadingOrders } = usePickOrder()
  const [query, setQuery] = useState({
    search: "",
    page: 1
  })
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(loadingOrders)
  const [search, setSearch] = useState({
    confirmDialog: false,
    keyword: "",
    confirm: false,
  })

  const handleGetProducts = async () => {
    setLoading(true);
    const result = await ApiItems.index(10, query.page * 10, query.search);
    setProducts(result.data.data);
    setLoading(false);
  };

  const handleTriggerSearch = keyword => {
    if (search.confirm) {
      setQuery({ ...query, search: keyword})
    } else {
      setSearch({ ...search, confirmDialog: true, keyword  })
    }
  };

  const handlePageChange = page => {
    setQuery({ ...query, page });
  };

  useEffect(() => {
    handleGetProducts()
  }, [query])

  const renderItems = () => {
    if (search.confirmDialog || search.confirm) return
    if (loadingOrders) {
      return (
        <div className="d-flex w-100 py-4 align-items-center justify-content-center">
          <Loading />
        </div>
      )
    } else {
      return (
        <OrderItems id={id} data={orders} />
      )
    }
  }

  const renderProducts = () => {
    if (!search.confirm) return
    if (loading) {
      return (
        <div className="d-flex w-100 py-4 align-items-center justify-content-center">
          <Loading />
        </div>
      )
    } else {
      return (
        <>
          <FlexBox style={{ flexDirection: "column", alignItems: "stretch" }}>
            <Pagination
              page={query.page} limit={10} count={products.count}
              onPageChange={handlePageChange}
              style={{ paddingLeft: 0, paddingBottom: ".8rem", paddingTop: ".5rem" }} />
            <Line />
          </FlexBox>
          <ProductItems id={id} data={products} />
        </>
      )
    }
  }

  const handleConfirmYes = () => {
    setSearch({ ...search, confirmDialog: false, confirm: true})
    setQuery({ search: search.keyword, page: 1 })
  }

  const handleConfirmNo = () => {
    setSearch({ ...search, confirmDialog: false, confirm: false})
  }

  const renderSearchConfirmation = () => {
    if (!search.confirmDialog) return
    return (
      <ConfirmBox>
        <p>Item Not Within Item. <br /> Seach outside of Order?</p>
        <ButtonGroup>
          <Button
            onClick={handleConfirmNo}
            variant="primary-outline">
            No
          </Button>
          <Button
            onClick={handleConfirmYes}
            variant="primary">
            Yes
          </Button>
        </ButtonGroup>
      </ConfirmBox>
    )
  }

  return (
    <OrderListContainer className="mt-2">
      <SearchHeader>
        <SearchHeaderGroup>
          <span>Add Products</span>
          <Button variant="outline" addonRight={true}>
            <span>Speed Add</span>
            <img src="/static/images/icons/icon-help.svg" />
          </Button>
        </SearchHeaderGroup>
        <SpeedAddInfo>
          <SpeedAddHeader>
            <img src="/static/images/icons/alert-octagon.svg" />
            <h5>Convenient Speed Add</h5>
          </SpeedAddHeader>
          <p>Activate <strong>Speed Add</strong> to immediately add matching products to the stocktake list. Perfect for entry via barcode scanner. (Products will only match when its UPC fully matches the input).</p>
        </SpeedAddInfo>

        <FlexBox style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <SearchTitle>Products Search</SearchTitle>

          <SearchBox>
            <img src="/static/images/icons/search-white.svg" />
            <SearchInput
              type="text"
              placeholder="Search products..."
              onKeyUp={(e) => {
                handleTriggerSearch(e.target.value)
              }}
            />
          </SearchBox>
        </FlexBox>
      </SearchHeader>

      {renderItems()}
      {renderProducts()}
      {renderSearchConfirmation()}

    </OrderListContainer>
  )
}

const OrderListContainer = styled(Card)`
  border-radius: 0;
  overflow: hidden;
  margin-left: -30px;
  margin-right: -30px;
  width: auto;

  @media screen and (min-width: 600px) {
    border-radius: 3px;
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
`

const SearchHeader = styled.div`
  background: #717A9D;
  color: white;
  padding-top: 1rem;
  padding-bottom: 1rem;
`

const SearchHeaderGroup = styled(BoxTitle)`
border: none;
padding: 0 1.75rem;
`

const SearchTitle = styled.h4`
  margin-top: .8rem;
  font-size: 12px;
`

const SearchBox = styled.div`
  display: flex;
  gap: 0.5rem;
  box-shadow: 0px 2px 3px 0px rgba(39, 52, 67, 0.06);
  background: #828BAE;
  padding: .4rem .8rem;
  border-radius: 3px;
  width: 100%;
  margin-bottom: .8rem;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-weight: bold;
  background: none;
  color: white;
  flex-grow: 1;

  &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: white;
    opacity: 1; /* Firefox */
  }
`;

const SpeedAddHeader = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
  margin-bottom: 1rem;
  font-family: "OpenSans";

  h5 {
  font-size: 14px;
  margin-bottom: 0;
  }
`

const SpeedAddInfo = styled.div`
  margin: 1rem 1.75rem;

  @media screen and (min-width: 600px) {
    display: none;
  }
`

const ConfirmBox = styled.div`
box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
border-radius: 3px;
margin: 1.75rem;
margin-bottom: 7.5rem;
p {
text-align: center;
}
padding: 1rem 0;
`

const ButtonGroup = styled.div`
display: flex;
justify-content: center;
gap: 1rem;

>button {
width: 150px;
}
`

export default OrderItemsList

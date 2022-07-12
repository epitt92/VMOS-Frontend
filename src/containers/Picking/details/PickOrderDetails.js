import React, { useEffect, useState } from "react"
import styled from '@emotion/styled';
import PickingItem from "../components/PickingItem";
import { BoxTitle, Card, FlexBox, Line, Button, Input, Loading } from "components";
import Tab from "../components/Tab";
import Summary from "./tabs/SummaryTab";
import Completed from "./tabs/CompletedTab";
import Incorrect from "./tabs/IncorrectTab";
import AltSku from "./tabs/AltSkuTab";
import { ApiOrders } from "api";

const PickingDetails = ({ id }) => {
  const [item, setItem] = useState()
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([])
  const [options, setOptions] = useState(false)

  const handleGetOrders = async (id) => {
    const result = await ApiOrders.getItems(id);
    setOrders(result.data.data.items);
    setLoading(false);
  }

  const showOptions = () => {
    setOptions(true)
    document.body.classList.add("no-scroll")
  }
  const hideOptions = () => {
    setOptions(false)
    document.body.classList.remove("no-scroll")
  }

  useEffect(() => {
    getItem()
  }, [])

  const getItem = async () => {
    setLoading(true);
    const resp = await ApiOrders.getById(id)
    const data = resp.data.data.items[0]
    setItem(data)
    handleGetOrders(data.id)
  }

  const renderPickingItem = () => {
    if (item) {
      return (
        <PickingItem
          hideSeparator={true}
          data={item} />
      )
    }

    return (
      <div className="d-flex w-100 py-4 align-items-center justify-content-center">
        <Loading />
      </div>
    )
  }
  return (
    <>
      <Portal active={options}>
        <PortalHeader>
          <img src="/static/images/icons/close.svg" onClick={hideOptions} width="18" />
          <PortalTitle>Options</PortalTitle>
        </PortalHeader>

        <PortalBody>
          <span>Set Order Status: </span>
          <PackingStatus>Packing</PackingStatus>
        </PortalBody>
      </Portal>
      <Card className="mt-2" style={{ flexGrow: 1 }}>
        <BoxTitle>
          <span>Picking Details</span>
          <HeaderRight>
            <span>Set Order Status: </span>
            <PackingStatus>Packing</PackingStatus>
            <Button variant="primary-plain" className="pl-3">
              <img src="/static/images/icons/edit.svg" />
              Edit Order
            </Button>
          </HeaderRight>
          <HeaderOptions onClick={showOptions}>
            <img src="/static/images/icons/options.svg" />
          </HeaderOptions>
        </BoxTitle>

        {renderPickingItem()}
        <Line />
        <Tab
          menus={["Summary", "Completed", "Incorrect", "ALT Sku"]}
          components={[
            () => <Summary data={orders} loading={loading} />,
            () => <Completed data={orders} loading={loading} />,
            () => <Incorrect data={orders} loading={loading} />,
            () => <AltSku id={id} />,
          ]}
        />
      </Card>
    </>
  )
}

const HeaderRight = styled.div`
  display: none;
  gap: 1rem;
  align-items: center;
  > span {
    color: #3B4857;
  }

  @media screen and (min-width: 600px) {
    display: flex;
  }
`

const HeaderOptions = styled.div`
  display: block;

  @media screen and (min-width: 600px) {
    display: none;
  }
`

const PackingStatus = styled.div`
  background: rgba(76, 171, 224, 0.3);
  border: 1px solid #4CABE0;
  color: #4CABE0;
  text-align: center;
  padding: .2rem .5rem;
  border-radius: 3px;
  opacity: .8;
`

const Portal = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: ${props => props.active ? "block" : "none"};
  z-index: 9999;
  background: white;

  @media screen and (min-width: 600px) {
    display: none;
  }
`

const PortalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid #D3DCE6;
  padding: 20px 1.75rem;
`
const PortalTitle = styled.h2`
    margin-bottom: 0;
    font-size: 18px;
`
const PortalBody = styled.div`
  padding: 10px 1.75rem;
  flex-direction: column;
  gap: .8rem;
  display: flex;

> div {
  width: max-content;
}
`

const altSkusData = [{
  sku: "11992586",
  totalQty: 7,
  skus: [{
    sku: "8888943773067",
    qty: 1
  }, {
    sku: "8888943773067",
    qty: 3
  }, {
    sku: "8888943773067",
    qty: 2
  }, {
    sku: "8888943773067",
    qty: 1
  }]
}, {
  sku: "72957291",
  totalQty: 32,
  skus: [{
    sku: "8888943773067",
    qty: 13
  }, {
    sku: "8888943773067",
    qty: 4
  }, {
    sku: "8888943773067",
    qty: 3
  }, {
    sku: "8888943773067",
    qty: 2
  }]
}]


export default PickingDetails

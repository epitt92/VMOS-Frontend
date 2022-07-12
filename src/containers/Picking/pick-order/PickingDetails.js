import React, { useEffect, useState } from "react"
import styled from '@emotion/styled';
import PickingItem from "../components/PickingItem";
import { BoxTitle, Card, FlexBox, Line, Button, Input, Loading } from "components";
import Tab from "../components/Tab";
import Summary from "./picking-details/SummaryTab";
import Completed from "./picking-details/CompletedTab";
import Incorrect from "./picking-details/IncorrectTab";
import AltSku from "./picking-details/AltSkuTab";
import { useRouter } from "next/router";
import { ApiOrders } from "api";
import { useMediaQuery } from "react-responsive";

const PickingDetails = ({ id }) => {
  const router = useRouter()
  const [item, setItem] = useState()
  const isBigScreen = useMediaQuery({ query: '(min-width: 600px)' })

  useEffect(() => {
    getItem()
  }, [])

  const getItem = async () => {
    const resp = await ApiOrders.getById(id)
    setItem(resp.data.data.items[0])
  }

  const handleComplete = async () => {
    await ApiOrders.patch(id, { status: "packed" })
    router.push("/picking/details/" + id)
  }

  const handleEdit = () => {
    if (!isBigScreen) {
      router.push(`/picking/${id}`)
    }
  }

  const renderPickingItem = () => {
    if (item) {
      return (
        <PickingItem
          noShadow={true}
          hideStatus={true}
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
    <Card className="mt-2">
      <BoxTitle>
        <span>Picking Details</span>

        <EditButton onClick={handleEdit} variant="primary-plain" className="pl-3">
          <img src="/static/images/icons/edit.svg" />
          Edit Order
        </EditButton>
      </BoxTitle>

      {renderPickingItem()}
      <Line />
      <Tab
        title="Items to pick"
        menus={["Summary", "Completed", "Incorrect", "ALT Sku"]}
        components={[
          () => <Summary id={id} />,
          () => <Completed id={id} data={[]} />,
          () => <Incorrect id={id} data={[]} />,
          () => <AltSku id={id} />,
        ]}
      />

      <FlexBox>
        <RemarksContainer>
          <Input
            label={<label style={{ marginBottom: ".8rem", marginTop: "1rem" }}>Remarks</label>}
            required="required"
            placeholder="Remarks"
            value={""}
            onChange={e => dispatch('remarks', e.target.value)}
            name="title"
            title="Return title"
            type="textarea"
          />
        </RemarksContainer>
      </FlexBox>

      <FlexBox style={{ justifyContent: "flex-end", gap: "1rem" }}>
        <Button onClick={handleEdit} variant="primary-outline" size="medium" className="my-3" style={{ minWidth: "150px" }}>Cancel</Button>
        <Button
          onClick={handleComplete}
          variant="primary" size="medium" className="my-3" style={{ minWidth: "150px" }}>Complete</Button>
      </FlexBox>
    </Card>
  )
}

const RemarksContainer = styled.div`
  width: 100%;
`

const EditButton = styled(Button)`
  display: block;
  @media screen and (min-width: 600px) {
    display: none;
  }
`

export default PickingDetails

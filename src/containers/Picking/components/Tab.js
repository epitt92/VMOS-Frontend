import React, { useState } from "react"
import styled from '@emotion/styled';

const Tab = ({ title, menus, components }) => {
  const [active, setActive] = useState(0)
  const handleChangeTab = (id) => {
    setActive(id)
  }
  return (
    <Root>
      <Header>
        { title && <Title>{title}</Title> }
        <TabMenu>
          {menus.map((data, key) => (
            <Menu key={key} active={active === key} onClick={() => handleChangeTab(key)}>{data}</Menu>
          ))}
        </TabMenu>
      </Header>

      <Body>
        {components[active]()}
      </Body>
    </Root>
  )
}

const Root = styled.div`
  margin: 1rem 0;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1.75rem;
  margin-bottom: .5rem;
`
const Title = styled.h4`
  color: #3B4857;
  font-size: 14px;
    display: none;

  @media screen and (min-width: 600px) {
  display: block;
  }
`

const TabMenu = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  gap: .5rem;
`

const Menu = styled.li`
  font-size: 14px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  color: ${props => props.active ? "#657ACB":"#B0BBCB"}
`

const Body = styled.div`

`
export default Tab

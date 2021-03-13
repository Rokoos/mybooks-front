import React, { Fragment} from 'react';
import styled from 'styled-components';
import Burger from './Burger';
import View from '../View'

const Nav = styled.nav`
  width: 100%;
  height: 55px;
  color: #fff;
  position:fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #000;
  padding: 0 20px;
`

const Navbar = () => {
  return (
    <Fragment>
      <Nav>
        <Burger />
      </Nav>
      <View/>
    </Fragment>
  )
}

export default Navbar
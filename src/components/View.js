import React from 'react'
import { MDBView, MDBMask } from 'mdbreact';
import MainTheme from '../images/leaves-1076307_1920.jpg'

const View = () => {
  return (
    <MDBView src={MainTheme} >
        <MDBMask overlay="black-strong" className="flex-center flex-column text-white text-center">
          <h1 style={{fontFamily: '"Great Vibes", cursive'}}>Let's write about books...</h1>
        </MDBMask>
      </MDBView>
  )
}

export default View

import React from "react";
import { MDBView, MDBMask } from "mdbreact";
import Theme from "../images/aviation.jpg";
// Photo by Ross Parmly on Unsplash

const View = () => {
  return (
    <MDBView src={Theme}>
      <MDBMask
        overlay="black-strong"
        className="flex-center flex-column text-white text-center"
      >
        <h2 className="view_font">Let's write about aviation books...</h2>
      </MDBMask>
    </MDBView>
  );
};

export default View;

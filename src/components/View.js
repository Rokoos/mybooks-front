import React from "react";
import { MDBView, MDBMask } from "mdbreact";
import Theme from "../images/aviation.jpg";
// Photo by Jacky Lo on Unsplash

const View = () => {
  return (
    <MDBView src={Theme}>
      <MDBMask
        overlay="black-strong"
        className="flex-center flex-column text-white text-center"
      >
        <h1 style={{ fontFamily: '"Great Vibes", cursive' }}>
          Let's write about aviation books...
        </h1>
      </MDBMask>
    </MDBView>
  );
};

export default View;

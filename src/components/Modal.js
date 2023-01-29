import React, { Component, Fragment, useState } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";

const Modal = ({ remove, text, title }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const deleteAccount = () => {
    remove();
    toggle();
  };

  return (
    <Fragment>
      <MDBBtn color="danger" onClick={toggle} className="custom_btn">
        {title}
      </MDBBtn>

      <MDBModal isOpen={modal} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>{text}</MDBModalHeader>

        <MDBModalFooter>
          <MDBBtn color="dark" onClick={toggle}>
            Close
          </MDBBtn>
          <MDBBtn color="danger" onClick={deleteAccount}>
            {title}
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </Fragment>
  );
};

export default Modal;

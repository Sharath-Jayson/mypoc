import React from 'react';
import styled from 'styled-components';

const ModalDiv = styled.div`
  position: relative;
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
  z-index: 1;
  display: block;
  ${({ display }) =>
    !display &&
    `
        display: none;
      `}
`;

const ModalTitle = styled.h5``;

const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
`;

const ModalBody = styled.div`
  position: relative;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1rem;
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
  border-top: 1px solid #e9ecef;
`;

const Modal = (props) => {
  // const Body = props.body;
  // const Footer = props.footer;

  return (
    <ModalDiv>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <ModalHeader>
            <ModalTitle>{props.title}</ModalTitle>
            <button onClick={props.close}>
              <span>&times;</span>
            </button>
          </ModalHeader>
          <ModalBody>{props.body && props.body()}</ModalBody>

          {/* conditionally render footer */}
          {props.footer && <ModalFooter>{props.footer()}</ModalFooter>}
        </div>
      </div>
    </ModalDiv>
  );
};

export default Modal;

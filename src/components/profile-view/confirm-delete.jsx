import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

export const ConfirmDelete = ({ show, onHide, onConfirm, message }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body className="alert-custom">
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>
          Cancel
        </Button>
        <Button onClick={onConfirm} className="ms-3">
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmDelete.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

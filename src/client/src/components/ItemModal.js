import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addItems } from "../actions/itemActions";
import PropType from "prop-types";

class ItemModal extends Component {
  state = {
    modal: false,
    name: ""
  };
  
  

  static PropType = {
    isAuthenticated: PropType.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  //para inputs
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    const NewItem = {
      name: this.state.name
    };
    // Agregar item via action
    this.props.addItems(NewItem);

    // cerrar el modal
    this.toggle();
  };
  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Agregar Pregunta
          </Button>
        ) : (
          <h4 className="mb-3 ml-4" color="dark">
            Bienvenido a Nutri Help.
          </h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Agregar Pregunta</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Pregunta</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Agregar Pegunta"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Agregar Pegunta
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToprops = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToprops,
  { addItems }
)(ItemModal);

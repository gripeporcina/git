import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItems, updateItems } from "../actions/itemActions";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";

class DietList extends Component {
  
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null
  };

  static propTypes = {
    getItems: PropTypes.func.isRequired,
    updateItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };


  componentDidMount() {
    this.props.getItems();
  };

  onDeleteClick = id => {
    this.props.deleteItems(id);
  };

  onUpdateClick = id => {
    this.props.updateItems(id);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="diet-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                { this.props.isAuthenticated ? (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      style={{marginRight: '2rem'}}
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                    Eliminar
                       &times;
                  </Button>
                ) : null }
                {name}
                { this.props.isAuthenticated ? (
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Ingrese sus datos"
                  className="mb-3" 
                  style={{ marginRight: '1rem' }}
                  onChange={this.onChange}
                />
                ) : null}
                { this.props.isAuthenticated ? (
                <Button 
                className="anadir-btn"
                      color="dark"
                      size="sm"
                      style={{ marginLeft: "10re7" }}
                      onClick={this.onUpdateClick.bind(this, _id)}
                      >
                      Ingresar
                    </Button>
                    ) : null}
                    
                  { this.props.isAuthenticated ? (
                  <Button 
                    className="update-btn"
                      color="dark"
                      size="sm"
                      onClick={this.onUpdateClick.bind(this, _id)}
                      style={{marginLeft: "17rem" }}
                      >
                      Cambiar
                    </Button>
                    ) : null}

                </ListGroupItem>
              </CSSTransition>
            ))
            }
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}


const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getItems, deleteItems, updateItems }
)(DietList);

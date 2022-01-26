import React, { Component } from "react";
import PropTypes from "prop-types";
import { FcSearch } from 'react-icons/fc';
import { AiOutlineClose } from 'react-icons/ai';
import { Header, Form, FormBtn, BtnLabel, FormInput, ClearBtn } from "./Searchbar.styled";

class Searchbar extends Component {
  state = {
    inputValue: "",
  };

  onSubmitForm = (ev) => {
    const { onSubmit } = this.props;
    const { inputValue } = this.state;
    ev.preventDefault();
    onSubmit(inputValue.toLowerCase());
    this.onClearInput()
  };

  onChangeInput = (ev) => {
    this.setState({ inputValue: ev.target.value });
  };

  onClearInput = () => {
    this.setState({ inputValue: "" });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <Header>
        <Form onSubmit={this.onSubmitForm}>
          <FormBtn type="submit"><FcSearch/>
            <BtnLabel>
            </BtnLabel>
          </FormBtn>
          <FormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChangeInput}
            value={inputValue}
          />
          <ClearBtn type="button" onClick={this.onClearInput}><AiOutlineClose/></ClearBtn>
        </Form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmitForm: PropTypes.func
}

export default Searchbar;

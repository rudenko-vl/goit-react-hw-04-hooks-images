import React, { useState } from "react";
import PropTypes from "prop-types";
import { FcSearch } from 'react-icons/fc';
import { AiOutlineClose } from 'react-icons/ai';
import { Header, Form, FormBtn, BtnLabel, FormInput, ClearBtn } from "./Searchbar.styled";

const Searchbar = ({onSubmit}) => {
  const [inputValue, setInputValue] = useState('');

  const onSubmitForm = (ev) => {
    ev.preventDefault();
    onSubmit(inputValue.toLowerCase());
    onClearInput()
  };

  const onChangeInput = (ev) => {
    setInputValue(ev.target.value)
  };

  const onClearInput = () => {
    setInputValue('')
  };

    return (
      <Header>
        <Form onSubmit={onSubmitForm}>
          <FormBtn type="submit"><FcSearch/>
            <BtnLabel>
            </BtnLabel>
          </FormBtn>
          <FormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={onChangeInput}
            value={inputValue}
          />
          <ClearBtn type="button" onClick={onClearInput}><AiOutlineClose/></ClearBtn>
        </Form>
      </Header>
    );
  }


Searchbar.propTypes = {
  onSubmitForm: PropTypes.func
}

export default Searchbar;

import PropTypes from "prop-types";
import { Btn } from "./Button.styled";
import { Wrapper } from "../Loader/Loader.styled";
function Button({ onClick }) {
    return (
        <Wrapper>
            <Btn type="button" onClick={(ev) => {
            onClick(ev)
        }}>Load More</Btn>
        </Wrapper>
        
    )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
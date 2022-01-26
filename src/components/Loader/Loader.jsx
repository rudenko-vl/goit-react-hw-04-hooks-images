
import { BallTriangle } from 'react-loader-spinner';
import { Wrapper } from "./Loader.styled";
function Loader() {
    return (
        <Wrapper>
            <BallTriangle color="#00BFFF" height={100} width={100} />
        </Wrapper>
    )
}

export default Loader;
import React, { Component } from "react";
import { GlobalStyle } from "./GlobalStyle";
import PixabayApi from "../helpers/api-service";
import Searchbar from "./Searchbar/Searchbar";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import Loader from "./Loader/Loader";
import ImageGallery from "./ImageGallery/ImageGallery";
import { Container } from "./App.styled";

class App extends Component {
  state = {
    imageName: "",
    arrayImages: [],
    page: 1,
    showModal: false,
    loading: false,
    largeImage: null,
  };
  
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.imageName !== this.state.imageName ||
      prevState.page !== this.state.page
    ) {
      this.requestPictures();
    }
    return;
  }

  onFormSubmit = newImageName => {
    if (newImageName === this.state.imageName) {
      return;
    }
    this.setState({
      imageName: newImageName,
      arrayImages: [],
      page: 1,
    });
  };

  
  requestPictures = async () => {
    const { imageName, arrayImages, page } = this.state;
    this.setState({
      loading: true,
    });
    const newImages = await PixabayApi(imageName, page);
    this.setState({
      arrayImages: [...arrayImages, ...newImages],
      loading: false,
    });
  }
 

  onImageClick = (largeImage) => {
    this.setState({ largeImage });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onLoadMore = (ev) => {
    ev.preventDefault();
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  render() {
    const { largeImage, arrayImages, loading, showModal } = this.state;
    return (
      <Container>
        <GlobalStyle />
        <Searchbar onSubmit={this.onFormSubmit}/>
        <ImageGallery arrayImages={arrayImages} onClick={largeImageURL => {
              this.toggleModal();
              this.onImageClick(largeImageURL);
          }} />
          {arrayImages.length > 0 && <Button onClick={this.onLoadMore} />}
         {loading && <Loader/>} 
        {showModal && <Modal toggleModal={this.toggleModal}>
          <img src={largeImage} alt="" />
        </Modal>}
      </Container>
    );
  }
}

export default App;

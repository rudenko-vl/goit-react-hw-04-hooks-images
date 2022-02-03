import React, { useState, useEffect } from "react";
import { GlobalStyle } from "./GlobalStyle";
import PixabayApi from "../helpers/api-service";
import Searchbar from "./Searchbar/Searchbar";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import Loader from "./Loader/Loader";
import ImageGallery from "./ImageGallery/ImageGallery";
import { Container } from "./App.styled";

const App = () => {
  const [imageName, setImageName] = useState('');
  const [arrayImages, setArrayImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setILoading] = useState(false);
  const [largeImage, setLargeImage] = useState(null);


  useEffect(() => {
    if (imageName === '') {
     return;
    }
    setILoading(true)
    PixabayApi(imageName, page).then(newImages => {
      setArrayImages([...arrayImages, ...newImages]);
    })
    setILoading(false);

    // const requestPictures = async () => {
    //   setILoading(true)
    //   const newImages = await PixabayApi(imageName, page);
    //   console.log(newImages)
    //   setArrayImages([...newImages, ...arrayImages]);
    //   setILoading(false);
    //   if (newImages.length === 0) {
    //     alert('Nothing found, please try again')
    //   }
    // }
    // requestPictures()
  }, [arrayImages, imageName, page])

  const onFormSubmit = newImageName => {
    if (newImageName === imageName) {
      return;
    }
    setImageName(newImageName)
    setArrayImages([])
    setPage(1)
  };


  const onImageClick = (largeImage) => {
    setLargeImage(largeImage);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onLoadMore = (ev) => {
    ev.preventDefault();
    setPage(page + 1)
  };

    return (
      <Container>
        <GlobalStyle />
        <Searchbar onSubmit={onFormSubmit}/>
        <ImageGallery arrayImages={arrayImages} onClick={largeImageURL => {
              toggleModal();
              onImageClick(largeImageURL);
          }} />
          {arrayImages.length > 0 && <Button onClick={onLoadMore} />}
         {loading && <Loader/>} 
        {showModal && <Modal toggleModal={toggleModal}>
          <img src={largeImage} alt={Date.now()} />
        </Modal>}
      </Container>
    );
  }

export default App;

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
    async function fetchImages() {
      setILoading(true)
      try {
        const newImages = await PixabayApi(imageName, 1)
        setArrayImages(newImages)
      } catch (error) {
        console.log(error)
      } finally {
        setILoading(false)
      }
    }
    fetchImages()
  }, [imageName])


  useEffect(() => {
    if (page === 1) {
      return
    }
    async function fetchImages() {
      setILoading(true)
      try {
        const newImages = await PixabayApi(imageName, page)
        setArrayImages(prewImages => [...prewImages, ...newImages])
      } catch (error) {
        console.log(error)
      } finally {
        setILoading(false)
      }
    }
    fetchImages()
  }, [imageName, page])

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

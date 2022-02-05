import React, { useState, useEffect } from "react";
import { GlobalStyle } from "./GlobalStyle";
import PixabayApi from "../helpers/api-service";
import Searchbar from "./Searchbar/Searchbar";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import Loader from "./Loader/Loader";
import ImageGallery from "./ImageGallery/ImageGallery";
import { Container } from "./App.styled";
import toast, { Toaster } from 'react-hot-toast';

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
        const newImages = await PixabayApi(imageName, page)
        if (newImages.length === 0) {
          toast.error('Nothing found, please try again!')
        }
        setArrayImages(prewImages => [...prewImages, ...newImages])
      } catch (error) {
        console.log(error)
      } finally {
        setILoading(false)
        if (page > 1) {
          window.scrollBy({ top: 1000, behavior: 'smooth' });
        }
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
        <Toaster/>
      </Container>
    );
  }

export default App;

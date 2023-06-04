// App.jsx
import React, { useState, useEffect, useCallback } from 'react';

import useAsync from 'hooks/useAsync';

import fetchImagesAPI from 'utils/api';
import showMessage from 'utils/swalConfig';

import Layout from './layout';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Spinner from './Spinner';
import { SpinnerWrapper } from './App.styled';

const App = () => {
  const [state, setState] = useState({
    images: [],
    searchQuery: '',
    currentPage: 1,
    largeImage: null,
    showModal: false,
    isLargeImageLoaded: false,
    hasMoreImages: true,
    total: 0,
  });

  const {
    images,
    searchQuery,
    currentPage,
    largeImage,
    showModal,
    isLargeImageLoaded,
    hasMoreImages,
    total,
  } = state;

  const asyncFetchImages = useCallback(async () => {
    if (!searchQuery) return;

    try {
      const { hits, totalHits } = await fetchImagesAPI(
        searchQuery,
        currentPage
      );

      if (hits.length === 0) {
        return showMessage(
          `No images found for ${searchQuery}. Please try another query.`
        );
      }

      setState(prevState => ({
        ...prevState,
        images: [...prevState.images, ...hits],
        total: totalHits,
      }));
    } catch (error) {
      throw error;
    }
  }, [searchQuery, currentPage]);

  const { execute, status, error } = useAsync(asyncFetchImages, false);

  useEffect(() => {
    execute();
  }, [execute]);

  const handleSearchSubmit = newQuery => {
    if (newQuery === searchQuery) {
      return showMessage(
        'You entered the same search query. Please enter a new one.'
      );
    }

    setState({
      images: [],
      searchQuery: newQuery,
      currentPage: 1,
      largeImage: null,
      showModal: false,
      isLargeImageLoaded: false,
      hasMoreImages: true,
      total: 0,
    });
  };

  const loadMoreImages = () => {
    setState(prevState => ({
      ...prevState,
      currentPage: prevState.currentPage + 1,
    }));
  };

  const openModal = image => {
    setState({ ...state, largeImage: image, showModal: true });
  };

  const closeModal = () => {
    setState({
      ...state,
      largeImage: null,
      showModal: false,
      isLargeImageLoaded: false,
    });
  };

  const handleImageLoad = () => {
    setState({ ...state, isLargeImageLoaded: true });
  };

  return (
    <Layout className="App">
      <Searchbar
        onSubmit={handleSearchSubmit}
        isSubmitting={status === 'pending'}
      />

      {error && showMessage('Something went wrong...')}

      <ImageGallery images={images} onImageClick={openModal} />

      {status === 'pending' && (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )}

      {total > images.length &&
        status !== 'pending' &&
        images.length > 0 &&
        hasMoreImages && <Button onClick={loadMoreImages} />}

      {showModal && (
        <Modal
          onClose={closeModal}
          largeImage={largeImage}
          isLargeImageLoaded={isLargeImageLoaded}
          onImageLoad={handleImageLoad}
        />
      )}
    </Layout>
  );
};

export default App;

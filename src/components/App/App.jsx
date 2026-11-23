import { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { SearchBar } from "../SearchBar/SearchBar";
import { ImageGallery } from "../ImageGallery/ImageGallery";

import styles from "./App.module.css";

import { fetchImages, PER_PAGE } from "../../services/pixabayApi";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";
import { Modal } from "../Modal/Modal";
export class App extends Component {
  state = {
    query: "",
    page: 1,
    totalHits: 0,
    images: [],
    isLoading: false,
    selectedImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({
        isLoading: true,
      });

      const isActual = () =>
        query === this.state.query && page === this.state.page;

      fetchImages(query, page)
        .then(({ hits, totalHits }) => {
          if (!isActual()) return;

          if (hits.length === 0) {
            toast.info("Nothing found for your query");
            return;
          }
          this.setState(({ images }) => {
            const newImages = hits.filter(
              (hit) => !images.some((image) => image.id === hit.id),
            );

            return {
              images: [...images, ...newImages],
              totalHits,
            };
          });
        })
        .catch((error) => {
          if (!isActual()) return;
          toast.error(error.message);
        })
        .finally(() => {
          if (!isActual()) return;

          this.setState({
            isLoading: false,
          });
        });
    }
  }

  handleSearch = (query) => {
    if (query === this.state.query) return;
    this.setState({
      query,
      page: 1,
      images: [],
      totalHits: 0,
    });
  };

  handleLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  handleImageClick = (image) => {
    this.setState({
      selectedImage: image,
    });
  };
  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, totalHits, page, isLoading, selectedImage } = this.state;
    return (
      <div className="wrapper">
        <SearchBar onSubmit={this.handleSearch} />
        <main className={styles.page}>
          <div className="page__container">
            <ImageGallery
              images={images}
              onImageClick={this.handleImageClick}
            />
            {isLoading && <Loader />}
            {page < Math.ceil(totalHits / PER_PAGE) && !isLoading && (
              <Button onClick={this.handleLoadMore} />
            )}
          </div>
        </main>
        {selectedImage && (
          <Modal image={selectedImage} onCloseModal={this.handleCloseModal} />
        )}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

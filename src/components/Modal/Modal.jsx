import { Component } from "react";
import styles from "./Modal.module.css";

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    document.body.style.overflow = "hidden";
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    document.body.style.overflow = "";
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.image;

    return (
      <div className={styles.overlay} onClick={this.handleBackdropClick}>
        <div className={styles.modal}>
          <img className={styles.image} src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

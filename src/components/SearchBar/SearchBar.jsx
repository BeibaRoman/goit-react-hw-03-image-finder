import { Component } from "react";
import { toast } from "react-toastify";
import styles from "./SearchBar.module.css";

export class SearchBar extends Component {
  state = {
    inputValue: "",
  };

  handleChange = (e) => {
    const { value } = e.currentTarget;
    this.setState({
      inputValue: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.inputValue.trim() === "") {
      toast.warning("Please enter a search query");
      return;
    }

    this.props.onSubmit(this.state.inputValue.trim());

    this.setState({
      inputValue: "",
    });
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.button}>
            <span className={styles.buttonLabel}>Search</span>
          </button>

          <input
            onChange={this.handleChange}
            value={this.state.inputValue}
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

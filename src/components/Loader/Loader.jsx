import { ThreeDots } from "react-loader-spinner";
import styles from "./Loader.module.css";

export function Loader() {
  return (
    <div className={styles.loader}>
      <ThreeDots
        visible={true}
        height="60"
        width="60"
        color="#3f51b5"
        ariaLabel="loading"
      />
    </div>
  );
}

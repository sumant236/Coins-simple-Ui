import styles from "./Cards.module.css";

export default function Cards({ keyId, image, imgName, price, name }) {
  return (
    // create a component every time data exists
      <div className={styles.card} key={keyId}>
        <div className={styles.imgWrapper}>
            <img src={image} alt={imgName} className={styles.img}/>
            <p>{name}</p>
        </div>
        <div>
            <p className={styles.price}>${price}</p>
        </div>
      </div>
  );
}
import React from "react";

import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>:(</span>
        <br />
        Ничего не найдено
      </h1>

      <p className={styles.descriprion}>
        К сожалению данная страница отстутствует в нашем интернет-магазине
      </p>
    </div>
  );
};

export default NotFoundBlock;

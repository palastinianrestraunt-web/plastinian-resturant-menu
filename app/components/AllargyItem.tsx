"use client";

import React, { useState } from "react";
import styles from "@/styles/Allargy.module.css";

type Props = {
  value: number;
  lang: "en" | "cz";
};

const AllargyItem = (props: Props) => {
  const { value, lang } = props;
  const [viewText, setViewText] = useState(false);
  return (
    <span
      className={styles.allergy_item}
      onClick={() => setViewText((prev) => !prev)}
    >
      {viewText ? AllargiesText[value][lang] : value}
    </span>
  );
};

export default AllargyItem;

const AllargiesText: Record<number, Record<"en" | "cz", string>> = {
  1: { en: "Cereals containing gluten", cz: "Obiloviny obsahující lepek" },
  3: { en: "Eggs and egg products", cz: "Vejce a výrobky z nich" },
  5: { en: "Groundnut kernels (peanuts)", cz: "Jádra podzemnice olejné (arašídy)" },
  7: { en: "Milk and milk products", cz: "Mléko a výrobky z něj" },
  8: { en: "Nuts", cz: "Skořápkové plody" },
  11: { en: "Sesame seeds", cz: "Sezamová semena" },
  13: { en: "Lupine and its products", cz: "Vlčí bob (lupina)" },
};

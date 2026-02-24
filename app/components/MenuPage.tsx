"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import {
  Categories,
  Categories_en,
  MenuCategory,
  MenuItem,
  MenuItemOption,
} from "@/models/menu";
import AllargyItem from "./AllargyItem";

type Props = {
  grouped: MenuCategory[];
};

export default function MenuPage({ grouped }: Props) {
  const [lang, setLang] = useState("cz");
  const [showTopNav, setShowTopNav] = useState(false);
  const orderButtonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (orderButtonsRef.current) {
        const rect = orderButtonsRef.current.getBoundingClientRect();
        setShowTopNav(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`${styles.topNav} ${showTopNav ? styles.topNavVisible : ""}`}>
        <Image
          src={`/logo_h.svg`}
          width="200"
          height="40"
          alt="Palestinian Restaurant logo"
        />
        <div className={styles.topNavButtons}>
          <a
            href="https://palestinianrestaurant.choiceqr.com/en/takeaway/section:menu"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.orderButton}
          >
            <i className={`fa-solid fa-person-walking ${styles.orderIcon}`}></i>
            {lang === "en" ? "Order Takeaway" : "Objednat s sebou"}
          </a>
          <a
            href="https://palestinianrestaurant.choiceqr.com/en/delivery/section:menu"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.orderButton}
          >
            <i className={`fa-solid fa-motorcycle ${styles.orderIcon}`}></i>
            {lang === "en" ? "Order Delivery" : "Objednat rozvoz"}
          </a>
        </div>
      </nav>
      <main className={styles.container}>
        <header>
          <Image
            className={styles.logo}
            src={`/logo_h.svg`}
            width="1000"
            height="130"
            alt="Palestinian Restaurant logo"
          />
        </header>
        <div className={styles.orderButtons} ref={orderButtonsRef}>
          <div
            className={styles.langSelector}
            onClick={() => {
              setLang((prev) => (prev === "en" ? "cz" : "en"));
            }}
          >
            {lang == "en" ? (
              <img
                src={"./czech-republic.png"}
                width={30}
                height={30}
                alt="change menu language"
              />
            ) : (
              <img
                src={"./united-kingdom.png"}
                width={30}
                height={30}
                alt="change menu language"
              />
            )}
          </div>
          <a
            href="https://palestinianrestaurant.choiceqr.com/en/takeaway/section:menu"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.orderButton}
          >
            <i className={`fa-solid fa-person-walking ${styles.orderIcon}`}></i>
            {lang === "en" ? "Order Takeaway" : "Objednat s sebou"}
          </a>
          <a
            href="https://palestinianrestaurant.choiceqr.com/en/delivery/section:menu"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.orderButton}
          >
            <i className={`fa-solid fa-motorcycle ${styles.orderIcon}`}></i>
            {lang === "en" ? "Order Delivery" : "Objednat rozvoz"}
          </a>
        </div>
        {grouped.length > 0 &&
          grouped.map((cat: MenuCategory) => (
            <div className={styles.menu} key={`menu_category_${cat.category}`}>
              <h2 className={styles.menu_group_heading}>
                {lang === "en"
                  ? Categories_en[cat.category]
                  : Categories[cat.category]}
              </h2>
              <div className={styles.menu_group}>
                {cat.items.map((item: MenuItem) => (
                  <div
                    className={styles.menu_item_with_option}
                    key={`menu_item_${item.id}`}
                  >
                    <div className={styles.menu_item}>
                      <div className={styles.top_section}>
                        <Image
                          style={{
                            display: item.img === "xxx" ? "none" : "block",
                          }}
                          className={styles.menu_item_image}
                          src={`/Produkty/${item.img}`}
                          alt={
                            item.img === "xxx"
                              ? "  "
                              : item.en_name + "-" + item.cz_name
                          }
                          width={1000}
                          height={1000}
                          priority
                        />
                        {item.isVegan && (
                          <span className={styles.vegan}>
                            {lang === "en" ? "Vegetarian" : "Vegetariánské"}
                          </span>
                        )}
                      </div>
                      <div className={styles.menu_item_text}>
                        <h2 className={styles.menu_item_heading}>
                          <div className={styles.menu_item_heading_name}>
                            <span className={styles.menu_item_name}>
                              {" "}
                              <span className={styles.order_nummber}>
                                {item.number}.
                              </span>{" "}
                              {` ${
                                lang === "en" ? item.en_name : item.cz_name
                              }`}
                            </span>
                            <span className={styles.menu_item_name_sub}>
                              {lang === "en" ? item.cz_name : item.en_name}
                            </span>
                          </div>
                          <div>
                            <span className={styles.menu_item_price}>
                              {!item.options && (
                                <>
                                  <span
                                    className={styles.menu_item_price_amount}
                                  >
                                    {item.price}
                                  </span>
                                  <span
                                    className={styles.menu_item_price_currency}
                                  >
                                    CZK
                                  </span>
                                </>
                              )}
                            </span>
                          </div>
                        </h2>
                        <p className={styles.menu_item_description}>
                          {lang === "en"
                            ? item.en_description
                            : item.cz_description}
                        </p>
                        {item.allergy && (
                          <div className={styles.allergy_wrapper}>
                            <h4 className={styles.allergy_title}>
                              {item.allergy.length == 0
                                ? ""
                                : lang === "en"
                                  ? "Allergies"
                                  : "Alergeny"}
                            </h4>
                            <p className={styles.allergy}>
                              {item.allergy.map((v) => (
                                <AllargyItem
                                  key={`allergy_${item.id}_${v}`}
                                  value={v}
                                  lang={lang as "en" | "cz"}
                                />
                              ))}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    {item.options && (
                      <div className={styles.menu_item_option_wrapp}>
                        {item.options.map((option: MenuItemOption) => (
                          <div
                            className={styles.menu_item_option}
                            key={`option_${item.id}_${option.en_name}`}
                          >
                            <span className={styles.menu_item_option_name}>
                              {" "}
                              {lang === "en" ? option.en_name : option.cz_name}
                            </span>
                            <span className={styles.menu_item_option_price}>
                              <span
                                className={styles.menu_item_option_price_amount}
                              >
                                {option.price}
                              </span>
                              <span
                                className={
                                  styles.menu_item_option_price_currency
                                }
                              >
                                CZK
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footer_top}>
          <div className={styles.footer_top_section}>
            <h3>
              {lang === "en" ? "Find" : "Kde nás"}{" "}
              <span>{lang === "en" ? "us" : "najdete"}</span>
            </h3>
            <div className={styles.social}>
              <a
                target="_blank"
                href="https://m.facebook.com/profile.php?id=100080996603475"
                className="fa-brands fa-facebook"
              ></a>
              <a
                target="_blank"
                href="https://www.instagram.com/palestinian_restaurant_prague/"
                className="fa-brands fa-instagram"
              ></a>
            </div>
            <a href="https://maps.app.goo.gl/Lj9YspNJBbt3D8318?g_st=ic">
              {" "}
              <span>Spálená 90/17, 110 00 Nové Město, Czechia</span>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d687.0243070229683!2d14.419349692681253!3d50.07944708762389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b95aeb20f33f9%3A0x39e0e5ab0d4b3374!2sMr.%20Falafel!5e0!3m2!1sen!2seg!4v1680509042141!5m2!1sen!2seg"
                width="100%"
                height="250"
                style={{
                  marginTop: "1rem",
                  border: "none",
                }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </a>
          </div>
          <div className={styles.footer_top_section}>
            <div className={styles.footer_top_section}>
              <h3>
                {lang === "en" ? "Call" : "Zavolejte"}{" "}
                <span>{lang === "en" ? "us" : "nám"}</span>
              </h3>
              <a href="tel:+420602342820">+420 602 342 820</a>
            </div>
            <div className={styles.footer_top_section}>
              <h3>
                {lang === "en" ? "Working" : "Otevírací"}{" "}
                <span>{lang === "en" ? "hours:" : "doba"}</span>
              </h3>
              <table itemProp="openingHours">
                <tbody>
                  <tr>
                    <th>{lang === "en" ? "Monday:" : "Pondělí:"}</th>
                    <td>
                      <span>10:00 - 22:00</span>
                    </td>
                  </tr>
                  <tr>
                    <th>{lang === "en" ? "Tuesday:" : "Úterý:"}</th>
                    <td>
                      <span>10:00 - 22:00</span>
                    </td>
                  </tr>
                  <tr>
                    <th>{lang === "en" ? "Wednesday:" : "Středa:"}</th>
                    <td>
                      <span>10:00 - 22:00</span>
                    </td>
                  </tr>
                  <tr>
                    <th>{lang === "en" ? "Thursday:" : "Čtvrtek:"}</th>
                    <td>
                      <span>10:00 - 22:00</span>
                    </td>
                  </tr>
                  <tr>
                    <th>{lang === "en" ? "Friday:" : "Pátek:"}</th>
                    <td>
                      <span>10:00 - 22:00</span>
                    </td>
                  </tr>
                  <tr>
                    <th>{lang === "en" ? "Saturday:" : "Sobota:"}</th>
                    <td>
                      <span>10:00 - 22:00</span>
                    </td>
                  </tr>
                  <tr>
                    <th>{lang === "en" ? "Sunday:" : "Neděle:"}</th>
                    <td>
                      <span>10:00 - 22:00</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className={styles.footer_bottom}>
          <Image
            className={styles.logo}
            src={`/logo_h.svg`}
            width="100"
            height="130"
            alt="Palestinian Restaurant logo"
          />

          <div className={styles.copyright}>
            Copyright © 2023 Palestinian restaurant - All rights reserved{" "}
            <br /> Designed By:{" "}
            <a target="_blank" href="http://digitalizers.co/">
              Digitalizers agency
            </a>
          </div>
          <div className={styles.flag_background}>
            <div className={styles.flag_top}></div>
            <div className={styles.flag_middle}></div>
            <div className={styles.flag_triangle}></div>
          </div>
        </div>
      </footer>
    </>
  );
}

import React, { useState, useEffect } from "react";

import { facts } from "./facts";

import s from "./OnWay.module.scss";

const FactIcons = ({ progress }) => {
  const [activeFactIndex, setActiveFactIndex] = useState(null);
  const [icons, setIcons] = useState([]);
  const n = 320; // ProgressMax

  useEffect(() => {
    const numberOfFacts = facts.length;

    const factIcons = facts.map((fact, index) => {
      const factPosition = (index + 1) / (numberOfFacts + 1);

      return (
        <div
          className={`${s.factIcon} ${
            activeFactIndex === index ? s.activeFact : ""
          }`}
          style={{ left: `${factPosition * 100}%` }}
          key={index}
        >
          {activeFactIndex === index ? (
            <div className={s.factDiv}>
              <div className={s.factText}>{fact.text}</div>
              <img src={fact.image} alt={`Fact ${index + 1}`} className={s.factImg} />
            </div>
          ) : (
            <>
              <img src="/images/onway/info-point.png" alt={`Fact ${index + 1}`} />
            </>
          )}
        </div>
      );
    });

    setIcons(factIcons);
  }, [progress, activeFactIndex]);

  useEffect(() => {
    const numberOfFacts = facts.length;

    for (let i = 0; i < numberOfFacts; i++) {
      const factPosition = (i + 1) / (numberOfFacts + 1);

      if (progress >= factPosition * n) {
        setActiveFactIndex(i);
      } else {
        break;
      }
    }
  }, [progress]);

  return <div className={s.factIcons}>{icons}</div>;
};

export default FactIcons;
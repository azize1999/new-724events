import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // Tri du plus ancien au plus récent (inverse de l'original)
  const byDateAsc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  ) || [];

  // Gestion du timer avec cleanup
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex(prevIndex => 
        prevIndex < byDateAsc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [index, byDateAsc.length]);

  // Gestion du clic sur les boutons radio
  const handleRadioChange = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="SlideCardList">
      {byDateAsc?.map((event, idx) => (
        <div
          key={`slide-container-${event.id || idx}`} // Fallback to index if id is undefined
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateAsc.map((event, idx) => (
            <input
              key={`radio-${event.id || idx}`} // Fallback to index if id is undefined
              type="radio"
              name="radio-button"
              checked={index === idx}
              onChange={() => handleRadioChange(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
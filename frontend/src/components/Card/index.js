// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import
import './style.scss';

// images sport
import pin from 'src/assets/icons/pin.svg';
import clock from 'src/assets/icons/clock.svg';

import sports from './sports';

// == Composant
const Card = ({ card, isLogged, showLoginModal, userCard }) => {

  let cardClassName = 'card';
  if(userCard === 1) {
    cardClassName = 'card card--user';
  } else if(userCard === 2) {
    cardClassName = 'card card--user card--creator';
  }

  // console.log('CARD', card);
  return (
    <article className={cardClassName}>
      <a href="#" className="card__link">
        <img src={sports[card.sport.icon]} alt="" className="card__image" />
        <div className="card__sport">{card.sport.name}</div>
        <h2 className="card__title">{card.title}</h2>
        <div className="card__infos">
          <div className="card__container">
            <img src={clock} alt="" className="card__icon" />
            <p className="card__text">
              {card.time} - {card.date}
            </p>
          </div>
          <div className="card__container">
            <img src={pin} alt="" className="card__icon" />
            <p className="card__text">
              {card.activity_place.city}
              {card.activity_place.distance && (
                <>
                  <br />({parseFloat(card.activity_place.distance).toFixed(1)} km)
                </>
              )}
            </p>
          </div>
        </div>
        <p className="card__description">{card.description}</p>
      </a>

      {isLogged ? (
        <>
        {userCard !== 0 ? (
          <button className="card__join" type="button">
            Detail
          </button>
        ) : (
          <button className="card__join" type="button">
            Rejoindre
          </button>
        )}
        </>
      ) : (
        <button onClick={showLoginModal} className="card__join" type="button">
          Rejoindre
        </button>
      )}
      
    </article>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
  showLoginModal: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  userCard: PropTypes.number.isRequired,
};

// == Export
export default Card;

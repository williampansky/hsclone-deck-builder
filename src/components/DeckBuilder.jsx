import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CARD_DATABASE from 'lib/utils/card-databse';
import styled from 'styled-components';
import Card from 'components/Card';
import Deck from 'components/Deck';
import exists from 'utils/element.exists';
import CARDCLASS from 'enums/cardClass.enums';
import PlayerEnergy from 'components/player-energy/PlayerEnergy';
import replaceDynamicText from 'utils/replace-dynamic-text';
import replaceConstant from 'utils/replace-constants';
import getConstantDescription from 'utils/get-constant-description';
import createMarkup from 'utils/createMarkup';

export default function DeckBuilder({ selectedCardClass }) {
  const [database, setDatabase] = useState(null);
  const [cardClass, setCardClass] = useState(selectedCardClass);
  const [selectedCards, setSelectedCards] = useState([]);
  const [energyFilter, setEnergyFilter] = useState(-1);
  const [modalObject, setModalObject] = useState(null);

  const setDbCallback = useCallback((cardClass, energyFilter) => {
    const databaseArray = Object.keys(CARD_DATABASE).map(i => CARD_DATABASE[i]);
    setDatabase(
      databaseArray
        .filter(item => {
          if (energyFilter === -1) {
            return item.cardClass === cardClass;
          } else if (energyFilter === 10) {
            return item.cardClass === cardClass && item.cost >= 10;
          } else {
            return item.cardClass === cardClass && item.cost === energyFilter;
          }
        })
        .sort((a, b) => a.cost - b.cost)
    );
  }, []);

  useEffect(() => {
    setDbCallback(cardClass, energyFilter);
    // setDatabase(CARD_DATABASE);
  }, [cardClass, energyFilter]);

  function sortArray(arr) {
    // eslint-disable-next-line array-callback-return
    return arr.sort((a, b) => {
      if (a.cost > b.cost) return 1;
      if (a.cost < b.cost) return -1;
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
    });
  }

  const addSelectedCardCallback = useCallback(
    incomingCard => {
      if (calculateDeckLength(selectedCards) === 30) return;
      const { id } = incomingCard;
      if (selectedCards.find(o => o.id === id && o.elite === true)) {
        return;
      } else if (selectedCards.find(o => o.id === id && o._amount === 2)) {
        return;
      } else if (selectedCards.find(o => o.id === id)) {
        const cardObj = selectedCards.find(o => o.id === id);
        const newCardObj = { ...cardObj, _amount: 2 };
        const newArray = selectedCards.filter(o => o.id !== id);
        setSelectedCards(sortArray([...newArray, newCardObj]));
      } else {
        setSelectedCards(previousData =>
          sortArray([...previousData, { ...incomingCard, _amount: 1 }])
        );
      }
    },
    [selectedCards]
  );

  const removeSelectedCardsCallback = useCallback(
    event => {
      const id = event.target.getAttribute('data-id');
      if (selectedCards.find(o => o.id === id && o._amount === 1)) {
        const newArray = selectedCards.filter(o => o.id !== id);
        setSelectedCards(sortArray([...newArray]));
      } else {
        const cardObj = selectedCards.find(o => o.id === id);
        const newCardObj = { ...cardObj, _amount: 1 };
        const newArray = selectedCards.filter(o => o.id !== id);
        setSelectedCards(sortArray([...newArray, newCardObj]));
      }
    },
    [selectedCards]
  );

  function calculateDeckLength(array) {
    let amount = 0;
    array.forEach(obj => {
      amount = Math.abs(amount + obj._amount);
    });
    return amount;
  }

  function handleClass(card, db = selectedCards) {
    if (calculateDeckLength(db) === 30) return 'locked';
    const { id } = card;
    const cardObj = db.find(o => o.id === id);
    if (!exists(cardObj)) return;
    const { _amount, elite } = cardObj;
    return _amount === 2 || elite === true ? 'locked' : '';
  }

  function changeCardClass(event) {
    return setCardClass(event.target.value);
  }

  function filterDatabaseByEnergy(event) {
    if (energyFilter === parseInt(event.target.value))
      return setEnergyFilter(-1);
    return setEnergyFilter(parseInt(event.target.value));
  }

  function handleTooltipClick(obj) {
    return setModalObject(obj);
  }

  function cardText(string, spellDmg) {
    const replacedDynamicDmg = replaceDynamicText(string, spellDmg);
    const replacedSymbols = replaceConstant(replacedDynamicDmg);
    return replacedSymbols;
  }

  return (
    <React.Fragment>
      <Wrapper>
        <Header>
          <button onClick={e => changeCardClass(e)} value={selectedCardClass}>
            {replaceConstant(selectedCardClass)}
          </button>
          <button onClick={e => changeCardClass(e)} value={CARDCLASS[0]}>
            {CARDCLASS[0]}
          </button>
        </Header>

        <Sidebar>
          <Deck
            data={selectedCards}
            length={calculateDeckLength(selectedCards)}
            onClick={event => removeSelectedCardsCallback(event)}
          />
          <img
            alt=""
            className="background"
            src="assets/images/ui/UI_Sidebar.png"
          />
        </Sidebar>

        <GridWrapper>
          {exists(database) ? (
            <Grid>
              {database.map((card, index) => {
                return (
                  <div className={handleClass(card)} key={index}>
                    <div
                      className="tooltip"
                      onClick={() => handleTooltipClick(card)}
                    >
                      <div className="text__value">{`?`}</div>
                    </div>
                    <Card
                      artist={card.artist}
                      attack={card.attack}
                      cardClass={card.cardClass}
                      collectible={card.collectible}
                      cost={card.cost}
                      elite={card.elite}
                      entourage={card.entourage}
                      flavor={card.flavor}
                      goldenImageSrc={card.goldenImageSrc}
                      health={card.health}
                      hideStats={card.hideStats}
                      howToEarn={card.howToEarn}
                      howToEarnGolden={card.howToEarnGolden}
                      id={card.id}
                      isGolden={card.isGolden}
                      mechanics={card.mechanics}
                      name={card.name}
                      playRequirements={card.playRequirements}
                      race={card.race}
                      rarity={card.rarity}
                      set={card.set}
                      sounds={card.sounds}
                      spellDamage={card.spellDamage}
                      spellType={card.spellType}
                      targetingArrowText={card.targetingArrowText}
                      text={card.text}
                      type={card.type}
                      warcryNumber={card.warcryNumber}
                      onClick={() => addSelectedCardCallback(card)}
                    />
                  </div>
                );
              })}
            </Grid>
          ) : null}
        </GridWrapper>

        <Footer>
          <PlayerEnergy
            active={energyFilter}
            onClick={e => filterDatabaseByEnergy(e)}
          />
        </Footer>
      </Wrapper>

      <Modal
        className={modalObject !== null ? 'open' : ''}
        onClick={() => handleTooltipClick(null)}
      >
        {modalObject !== null ? (
          <React.Fragment>
            <div className="modal__dialog">
              <div className="flex">
                <Card
                  artist={modalObject.artist}
                  attack={modalObject.attack}
                  cardClass={modalObject.cardClass}
                  collectible={modalObject.collectible}
                  cost={modalObject.cost}
                  elite={modalObject.elite}
                  entourage={modalObject.entourage}
                  flavor={modalObject.flavor}
                  goldenImageSrc={modalObject.goldenImageSrc}
                  health={modalObject.health}
                  hideStats={modalObject.hideStats}
                  howToEarn={modalObject.howToEarn}
                  howToEarnGolden={modalObject.howToEarnGolden}
                  id={modalObject.id}
                  isGolden={modalObject.isGolden}
                  mechanics={modalObject.mechanics}
                  name={modalObject.name}
                  playRequirements={modalObject.playRequirements}
                  race={modalObject.race}
                  rarity={modalObject.rarity}
                  set={modalObject.set}
                  sounds={modalObject.sounds}
                  spellDamage={modalObject.spellDamage}
                  spellType={modalObject.spellType}
                  targetingArrowText={modalObject.targetingArrowText}
                  text={modalObject.text}
                  type={modalObject.type}
                  warcryNumber={modalObject.warcryNumber}
                />
                <div>
                  <div className="text__value">
                    <h2 className="name">{modalObject.name}</h2>
                  </div>
                  <div className="text__value">
                    <p
                      className="flavor"
                      dangerouslySetInnerHTML={createMarkup(
                        cardText(
                          modalObject.flavor,
                          modalObject.dynamicSpellDamageText
                        )
                      )}
                    />
                  </div>
                  {modalObject.mechanics !== [] ? (
                    <div className="text__value">
                      <p className="mechanics">
                        {replaceConstant(modalObject.mechanics[0])}
                      </p>
                      <p className="mechanics mechanics__description">
                        <small>
                          {getConstantDescription(modalObject.mechanics[0])}
                        </small>
                      </p>
                    </div>
                  ) : null}
                  <div className="text__value">
                    <ul>
                      <li>
                        <strong>Type:</strong> {modalObject.type}
                      </li>
                      <li>
                        <strong>Set:</strong> {modalObject.set}
                      </li>
                      <li>
                        <strong>Rarity:</strong> {modalObject.rarity}
                      </li>
                      {modalObject.playRequirements && (
                        <li>
                          <strong>Play Requirements:</strong>{' '}
                          {modalObject.playRequirements}
                        </li>
                      )}
                      {modalObject.targetingArrowText && (
                        <li>
                          <strong>Targeting Text:</strong>{' '}
                          {modalObject.targetingArrowText}
                        </li>
                      )}
                      {modalObject.howToEarn && (
                        <li>
                          <strong>How to Earn:</strong> {modalObject.howToEarn}
                        </li>
                      )}
                      {modalObject.artist && (
                        <li>
                          <strong>Artist:</strong>{' '}
                          <a
                            href={modalObject.artist}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {modalObject.artist}
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </Modal>
    </React.Fragment>
  );
}

DeckBuilder.propTypes = {
  selectedCardClass: PropTypes.string
};

DeckBuilder.defaultProps = {
  selectedCardClass: CARDCLASS[7]
};

const Header = styled.header`
  background: #444;
  top: 0;
`;

const Footer = styled.footer`
  background: #444;
  bottom: 0;
`;

const Sidebar = styled.aside`
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  height: 100%;
  z-index: 3;

  .background {
    height: 100%;
    position: absolute;
    pointer-events: none;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    user-select: none;
  }
`;

const Wrapper = styled.main`
  ${Header},
  ${Footer} {
    position: fixed;
    width: calc(100vw - 272px);
    left: 0;
    right: 0;
    z-index: 2;
    height: 50px;
  }
`;

const GridWrapper = styled.div`
  background: #292928;
  position: fixed;
  top: 50px;
  padding: 20px;
  bottom: 50px;
  overflow-y: auto;
  width: calc(100vw - 272px);
`;

const Grid = styled.article`
  display: grid;
  margin: 0 auto;
  padding: 20px 0;
  grid-gap: 20px;
  grid-template-columns: repeat(
    auto-fill,
    minmax(calc(var(--card-height) / 1.4), 1fr)
  );

  & > div {
    margin-bottom: 20px;
    position: relative;
  }

  & > div .card__v3 {
    cursor: pointer;
    margin: 0 auto;
  }

  & > div .card__v3 {
    transition: opacity 200ms ease-in-out;
  }

  & > div .card__v3:before,
  & > div .card__v3:after {
    content: '';
    border-radius: 12px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0;
    transition: opacity 200ms ease-in-out;
    will-change: opacity;
  }

  & > div .card__v3:before {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.625);
  }

  & > div .card__v3:after {
    box-shadow: 0 0 10px 10px rgba(255, 255, 0, 0.825);
  }

  & > div .card__v3:hover {
    &:before {
      opacity: 0;
    }

    &:after {
      opacity: 1;
    }
  }

  & > div.locked .card__v3 {
    cursor: not-allowed;
    opacity: 0.45;

    &:hover:before,
    &:hover:after {
      opacity: 0;
    }
  }

  .tooltip {
    align-items: center;
    background: #ddd;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    flex-flow: column nowrap;
    font-size: 27px;
    height: 40px;
    justify-content: center;
    pointer-events: auto;
    position: absolute;
    right: 1%;
    top: -4%;
    user-select: none;
    width: 40px;
    z-index: 2;
    transition: opacity, transform 200ms ease-in-out;
    transform: scale(0);
    opacity: 0;
  }

  & > div:hover {
    z-index: 100;

    .tooltip {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const Modal = styled.div`
  display: flex;
  align-items: flex-start;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  overflow: hidden;
  padding: 50px 30px;
  background: rgba(0, 0, 0, 0.875);
  opacity: 0;
  transition: opacity 150ms linear;

  .modal__dialog {
    position: relative;
    box-sizing: border-box;
    margin: auto;
    width: 75vw;
    max-width: 900px !important;
    background: none;
    opacity: 0;
    transform: translateY(-100px);
    transition: 500ms linear;
    transition-property: opacity, transform;
    padding: 30px 30px;
    cursor: default;
  }

  &.open {
    opacity: 1;
    z-index: 9000;
  }

  &.open .modal__dialog {
    opacity: 1;
    transform: translateY(0);
  }

  .card__v3 {
    transform: scale(1.5);
  }

  .flex {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
  }

  .flex > div:nth-child(2) {
    margin-left: 150px;
  }

  ul {
    padding: 0 0 0 1.25em;
  }

  ul li + li {
    margin-top: 0.465em;
  }

  ul strong {
    color: #fff649;
    margin: 0 0.25em 0 0;
  }

  ul a {
    color: white;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  .name {
    font-size: 1.875em;
    margin: 0 0 0.625em;
  }

  .flavor {
    font-size: 1.25em;
    margin: 0 0 0.875em;
    opacity: 0.75;
  }

  .mechanics {
    margin: 0 0 0.15em;
  }

  .mechanics.mechanics__description {
    margin: 0 0 0.875em;
    max-width: 80%;
    opacity: 0.75;
  }
`;

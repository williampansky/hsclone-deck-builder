import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CARD_DATABASE from 'lib/utils/card-databse';
import styled from 'styled-components';
import Card from 'components/Card';
import Deck from 'components/Deck';
import exists from 'utils/element.exists';
import CARDCLASS from 'enums/cardClass.enums';
import PlayerEnergy from 'components/player-energy/PlayerEnergy';

export default function DeckBuilder({ selectedCardClass }) {
  const [database, setDatabase] = useState(null);
  const [cardClass, setCardClass] = useState(selectedCardClass);
  const [selectedCards, setSelectedCards] = useState([]);
  const [energyFilter, setEnergyFilter] = useState(-1);

  const setDbCallback = useCallback((cardClass, energyFilter) => {
    const databaseArray = Object.keys(CARD_DATABASE).map(i => CARD_DATABASE[i]);
    setDatabase(
      databaseArray
        .filter(item => {
          if (energyFilter === -1) return item.cardClass === cardClass;
          if (energyFilter === 10) return item.cardClass === cardClass;
          return item.cardClass === cardClass && item.cost === energyFilter;
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

  const addSelectedCardsCallback = useCallback(
    incomingCard => {
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
    return setEnergyFilter(parseInt(event.target.value));
  }

  return (
    <React.Fragment>
      <Wrapper>
        <Header>
          <button onClick={e => changeCardClass(e)} value={selectedCardClass}>
            {selectedCardClass}
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
                      onClick={() => addSelectedCardsCallback(card)}
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
    </React.Fragment>
  );
}

DeckBuilder.propTypes = {
  selectedCardClass: PropTypes.string
};

DeckBuilder.defaultProps = {
  selectedCardClass: CARDCLASS[2]
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
  }

  & > div .card__v3 {
    cursor: pointer;
    margin: 0 auto;
  }

  & > div .card__v3 {
    transition: opacity 200ms ease-in-out;
  }

  & > div .card__v3:after {
    content: '';
    border-radius: 12px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.625);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    transition: box-shadow 200ms ease-in-out;
  }

  & > div .card__v3:hover {
    &:after {
      box-shadow: 0 0 10px 5px rgba(255, 255, 0, 0.825);
    }
  }

  & > div.locked .card__v3 {
    cursor: not-allowed;
    opacity: 0.45;
    &:hover:after {
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.625);
    }
  }
`;
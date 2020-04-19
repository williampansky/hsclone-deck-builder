import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CARD_DATABASE from 'lib/utils/card-databse';
import styled from 'styled-components';
import Card from 'components/Card';
import Deck from 'components/Deck';
import exists from 'utils/element.exists';
import CARDCLASS from 'enums/cardClass.enums';
// child components

export default function DeckBuilder({ cardClass }) {
  const [database, setDatabase] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);

  const setDbCallback = useCallback(cardClass => {
    const databaseArray = Object.keys(CARD_DATABASE).map(i => CARD_DATABASE[i]);
    setDatabase(
      databaseArray
        .filter(item => {
          return item.cardClass === cardClass;
        })
        .sort((a, b) => a.cost - b.cost)
    );
  }, []);

  useEffect(() => {
    setDbCallback(cardClass);
    // setDatabase(CARD_DATABASE);
  }, [cardClass]);

  function sortArray(arr) {
    // eslint-disable-next-line array-callback-return
    return arr.sort((a, b) => {
      if (a.cost > b.cost) return 1;
      if (a.cost < b.cost) return -1;
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
    });
    // return arr
    //   .sort((a, b) => a.cost - b.cost)
    //   .sort((a, b) =>
    //     a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
    //   );
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

  return (
    <React.Fragment>
      <Wrapper>
        <Header>
          <button>{cardClass}</button>
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
                  <div key={index}>
                    <div onClick={() => addSelectedCardsCallback(card)}>
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
                      />
                    </div>
                  </div>
                );
              })}
            </Grid>
          ) : null}
        </GridWrapper>

        <Footer>Footer</Footer>
      </Wrapper>
    </React.Fragment>
  );
}

DeckBuilder.propTypes = {
  cardClass: PropTypes.string
};

DeckBuilder.defaultProps = {
  cardClass: CARDCLASS[2]
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
  background: floralwhite;
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

  & > div > div {
    cursor: pointer;
  }

  & > div .card__v3 {
    margin: 0 auto;
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
  }
`;

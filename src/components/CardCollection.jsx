import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CARD_DATABASE from 'lib/utils/card-databse';
import CARDCLASS from 'enums/cardClass.enums';
import CardGrid from 'components/CardGrid';
import CardModal from 'components/CardModal';
import Deck from 'components/Deck';
import exists from 'utils/element.exists';
import replaceConstant from 'utils/replace-constants';
import replaceDynamicText from 'utils/replace-dynamic-text';
import Filters from 'features/filters/Filters.container';

export default function CardCollection({ selectedCardClass }) {
  const { selectedEnergyFilter } = useSelector(state => state.filters);
  const filteredResults = useSelector(state => state.filteredResults);
  const [database, setDatabase] = useState(null);
  const [cardClass, setCardClass] = useState(selectedCardClass);
  const [ownedCards, setOwnedCards] = useState([]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardClass, energyFilter]);

  const addSelectedCardCallback = useCallback(incomingCard => {
    return;
  }, []);

  function handleClass(card, db = ownedCards) {
    const { id } = card;
    const owned = db.find(o => o.id === id);
    if (!exists(owned)) return 'locked';
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
        <GridWrapper>
          {exists(database) ? (
            <CardGrid
              addSelectedCardCallback={addSelectedCardCallback}
              database={filteredResults}
              // handleClass={handleClass}
              handleTooltipClick={handleTooltipClick}
            />
          ) : null}
        </GridWrapper>

        <Footer>
          <Filters />
        </Footer>
      </Wrapper>

      <CardModal
        modalObject={modalObject}
        cardText={cardText}
        handleTooltipClick={() => handleTooltipClick(null)}
      />
    </React.Fragment>
  );
}

CardCollection.propTypes = {
  selectedCardClass: PropTypes.string
};

CardCollection.defaultProps = {
  selectedCardClass: CARDCLASS[1]
};

const Header = styled.header`
  background: #444;
  top: 0;
  user-select: none;
`;

const Footer = styled.footer`
  background: #444;
  bottom: 0;
  user-select: none;
  padding: 0 10px;
`;

const Wrapper = styled.main`
  ${Header},
  ${Footer} {
    position: fixed;
    width: 100vw;
    left: 0;
    right: 0;
    z-index: 2;
    height: 50px;
  }
`;

const GridWrapper = styled.div`
  background: #292928;
  position: fixed;
  top: 0;
  padding: 20px;
  bottom: 50px;
  overflow-y: auto;
  width: 100vw;
`;

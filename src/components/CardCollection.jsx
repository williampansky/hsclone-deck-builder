import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CARDCLASS from 'enums/cardClass.enums';
import CardGrid from 'components/CardGrid';
import CardModal from 'components/CardModal';
import exists from 'utils/element.exists';
import replaceConstant from 'utils/replace-constants';
import replaceDynamicText from 'utils/replace-dynamic-text';
import Filters from 'features/filters/Filters.container';

export default function CardCollection() {
  const filteredResults = useSelector(state => state.filteredResults);
  const database = useSelector(state => state.database);
  const [modalObject, setModalObject] = useState(null);

  // function handleClass(card, db = ownedCards) {
  //   const { id } = card;
  //   const owned = db.find(o => o.id === id);
  //   if (!exists(owned)) return 'locked';
  // }

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
    height: 80px;
  }
`;

const GridWrapper = styled.div`
  background: #292928;
  position: fixed;
  top: 0;
  padding: 20px;
  bottom: 60px;
  overflow-y: auto;
  width: 100vw;
`;

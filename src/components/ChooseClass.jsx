import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CARD_DATABASE from 'lib/utils/card-databse';
import CARDCLASS from 'enums/cardClass.enums';
import CardGrid from 'components/CardGrid';
import CardModal from 'components/CardModal';
import Deck from 'components/Deck';
import exists from 'utils/element.exists';
import PlayerEnergy from 'features/filters/EnergyFilters';
import replaceConstant from 'utils/replace-constants';
import replaceDynamicText from 'utils/replace-dynamic-text';
import Filters from 'features/filters/Filters.container';
import { selectClass } from 'features/filters/filters.slice';
import { newDeck } from 'features/decks/decks.slice';
import Sidebar from 'components/Sidebar';
import SidebarActivator from 'components/SidebarActivator';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

export default function ChooseClass() {
  let { deckId } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();
  const { sidebarActive } = useSelector(state => state.sidebar);
  const { availableCardClasses } = useSelector(state => state.filters);
  const { selectedCardClass } = useSelector(state => state.filters);
  const filteredResults = useSelector(state => state.filteredResults);
  const database = useSelector(state => state.database);
  const [selectedCards, setSelectedCards] = useState([]);
  const [modalObject, setModalObject] = useState(null);

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

  function handleTooltipClick(obj) {
    return setModalObject(obj);
  }

  function cardText(string, spellDmg) {
    const replacedDynamicDmg = replaceDynamicText(string, spellDmg);
    const replacedSymbols = replaceConstant(replacedDynamicDmg);
    return replacedSymbols;
  }

  function handleClick(string, param = deckId) {
    dispatch(selectClass(string));
    dispatch(
      newDeck({
        deckId: param,
        name: `Deck Slot ${param}`,
        cardClass: string
      })
    );
    history.push(`/decks/${param}`);
  }

  function imageSrc(string) {
    if (!exists(string)) return;
    const str = string.replace(/(%)/g, '');
    return `url(assets/images/classes/${str}/DEFAULT.jpg)`;
  }

  function badgeSrc(string) {
    if (!exists(string)) return;
    const str = string.replace(/(%)/g, '');
    return `assets/images/classes/${str}/BADGE.png`;
  }

  return (
    <React.Fragment>
      <Wrapper sidebarActive={sidebarActive}>
        <GridWrapper sidebarActive={sidebarActive}>
          <ClassGrid>
            {availableCardClasses
              .filter(obj => obj.value !== CARDCLASS[0])
              .map((obj, idx) => {
                return (
                  <div
                    className="class__item magictime puffIn"
                    key={idx}
                    onClick={() => handleClick(obj.value, deckId)}
                  >
                    {/* <div
                      className="avatar"
                      style={{ backgroundImage: imageSrc(obj.value) }}
                    /> */}
                    <div className="class__name">
                      <h2 className="text__value">{obj.name}</h2>
                    </div>
                    <div className="class__badge--wrapper">
                      <img
                        alt=""
                        className="class__badge"
                        src={badgeSrc(obj.value)}
                      />
                    </div>
                  </div>
                );
              })}
          </ClassGrid>
        </GridWrapper>

        <Sidebar active={sidebarActive} selectedCardClass={selectedCardClass} />

        <Footer sidebarActive={sidebarActive}>
          <Filters />
          <SidebarActivator active={sidebarActive} />
        </Footer>
      </Wrapper>
    </React.Fragment>
  );
}

ChooseClass.propTypes = {
  selectedCardClass: PropTypes.string
};

ChooseClass.defaultProps = {
  selectedCardClass: CARDCLASS[5]
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
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  user-select: none;
  width: 100%;
  height: 100%;

  ${Header},
  ${Footer} {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 2;
    height: 80px;
    width: ${p => (p.sidebarActive ? 'calc(100vw - 300px)' : 'calc(100vw)')};
    transition: width 150ms var(--animation-transition-cubic);
  }
`;

const GridWrapper = styled.div`
  background: #292928;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  bottom: 60px;
  overflow-y: auto;
  width: ${p => (p.sidebarActive ? 'calc(100vw - 300px)' : 'calc(100vw)')};
  transition: width 150ms var(--animation-transition-cubic);
`;

const ClassGrid = styled.div`
  display: grid;
  margin: 0 auto;
  padding: 20px 0;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(20vw, 1fr));

  .class__item {
    cursor: pointer;
    position: relative;
    text-align: center;
    height: 250px;
    width: 250px;
    margin: 0 auto;
  }

  /* prettier-ignore */
  .class__item {
    animation-duration: 400ms;
    &:nth-child(1) { animation-delay: 0ms; }
    &:nth-child(2) { animation-delay: 100ms; }
    &:nth-child(3) { animation-delay: 200ms; }
    &:nth-child(4) { animation-delay: 300ms; }
    &:nth-child(5) { animation-delay: 400ms; }
    &:nth-child(6) { animation-delay: 500ms; }
    &:nth-child(7) { animation-delay: 600ms; }
    &:nth-child(8) { animation-delay: 700ms; }
    &:nth-child(9) { animation-delay: 800ms; }
  }

  .class__item .class__name {
    position: absolute;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 100%;
    opacity: 0;
    top: 0;
    left: 0;
    transition: opacity, transform 150ms ease-in-out;
    will-change: opacity, transform;
    margin: 0 auto;
    border-radius: 50%;
    transform: scale(0.5);
    z-index: 1;

    h2 {
      margin: 0;
      position: relative;
      z-index: 1;
    }

    &:after {
      background: rgba(0, 0, 0, 0.45);
      /* content: ''; */
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      opacity: 0;
      transition: opacity 150ms ease-in-out;
      will-change: opacity;
      border-radius: 50%;
    }
  }

  .class__item .avatar {
    height: 200px;
    width: 200px;
    max-width: 100%;
    image-rendering: pixelated;
    object-fit: cover;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    margin: 0 auto;
  }

  .class__item .class__badge--wrapper {
    width: 100%;
    z-index: 1;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    transform: scale(1);
    transition: opacity, transform 150ms ease-in-out;
    will-change: opacity, transform;

    .class__badge {
      width: 100%;
      image-rendering: pixelated;
    }
  }

  .class__item:hover {
    .class__name {
      opacity: 1;
      transform: scale(1);
    }

    .class__badge--wrapper {
      opacity: 0.625;
      transform: scale(0.925);
    }
  }
`;

import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectClass,
  selectEnergy,
  selectRace
} from 'features/filters/filters.slice';
import { setResults } from 'features/filtered-results.slice';
import ClassFilters from 'features/filters/ClassFilters';
import EnergyFilters from 'features/filters/EnergyFilters';
import { useParams } from 'react-router-dom';
import BackButton from 'components/BackButton';
import RaceFilters from 'features/filters/RaceFilters';

export default function Filters() {
  let { deckId } = useParams();
  const dispatch = useDispatch();
  const {
    availableCardClasses,
    availableCardRaces,
    selectedCardClass,
    selectedCardRace,
    selectedEnergyFilter
  } = useSelector(state => state.filters);

  const setDbCallback = useCallback(
    (cardClass, cardRace, energyFilter) => {
      dispatch(
        setResults({
          cardClass: cardClass,
          race: cardRace,
          energyFilter: energyFilter
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    setDbCallback(selectedCardClass, selectedCardRace, selectedEnergyFilter);
  }, [
    selectedCardClass,
    selectedCardRace,
    selectedEnergyFilter,
    setDbCallback
  ]);

  return (
    <Component>
      {deckId ? <BackButton /> : null}
      <ClassFilters
        active={selectedCardClass}
        availableCardClasses={availableCardClasses}
        onClick={event => dispatch(selectClass(event.target.value))}
      />
      <RaceFilters
        active={selectedCardRace}
        availableCardRaces={availableCardRaces}
        onClick={event => dispatch(selectRace(event.target.value))}
      />
      <EnergyFilters
        active={selectedEnergyFilter}
        onClick={event => dispatch(selectEnergy(event.target.value))}
      />
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  position: relative;
`;

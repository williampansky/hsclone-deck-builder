import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectClass,
  selectEnergy,
  selectMechanic,
  selectRace,
  selectSet
} from 'features/filters/filters.slice';
import { setResults } from 'features/filtered-results.slice';
import ClassFilters from 'features/filters/ClassFilters';
import EnergyFilters from 'features/filters/EnergyFilters';
import { useParams } from 'react-router-dom';
import BackButton from 'components/BackButton';
import RaceFilters from 'features/filters/RaceFilters';
import MechanicsFilters from 'features/filters/MechanicsFilters';
import SetFilters from './SetFilters';

export default function Filters() {
  let { deckId } = useParams();
  const dispatch = useDispatch();
  const {
    availableCardClasses,
    availableCardMechanics,
    availableCardRaces,
    availableCardSets,
    selectedCardClass,
    selectedCardMechanics,
    selectedCardRace,
    selectedCardSet,
    selectedEnergyFilter
  } = useSelector(state => state.filters);

  const setDbCallback = useCallback(
    (cardClass, cardMechanics, cardRace, cardSet, energyFilter) => {
      dispatch(
        setResults({
          cardClass: cardClass,
          mechanics: cardMechanics,
          race: cardRace,
          set: cardSet,
          energyFilter: energyFilter
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    setDbCallback(
      selectedCardClass,
      selectedCardMechanics,
      selectedCardRace,
      selectedCardSet,
      selectedEnergyFilter
    );
  }, [
    selectedCardClass,
    selectedCardMechanics,
    selectedCardRace,
    selectedCardSet,
    selectedEnergyFilter,
    setDbCallback
  ]);

  return (
    <Component>
      {deckId ? <BackButton /> : null}
      <ClassFilters
        active={selectedCardClass}
        data={availableCardClasses}
        onClick={event => dispatch(selectClass(event.target.value))}
        onChange={selectedOption => dispatch(selectClass(selectedOption))}
      />
      <RaceFilters
        active={selectedCardRace}
        data={availableCardRaces}
        onClick={selectedOption => dispatch(selectRace(selectedOption))}
      />
      <MechanicsFilters
        active={selectedCardMechanics}
        data={availableCardMechanics}
        onClick={selectedOption => dispatch(selectMechanic(selectedOption))}
      />
      <SetFilters
        active={selectedCardSet}
        data={availableCardSets}
        onClick={selectedOption => dispatch(selectSet(selectedOption))}
      />
      <EnergyFilters
        active={selectedEnergyFilter}
        onClick={event => dispatch(selectEnergy(event.target.value))}
        onChange={selectedOption => dispatch(selectEnergy(selectedOption))}
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

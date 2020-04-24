import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { selectClass, selectEnergy } from 'features/filters/filters.slice';
import { setResults } from 'features/filtered-results.slice';
import ClassFilters from 'features/filters/ClassFilters';
import EnergyFilters from 'features/filters/EnergyFilters';
import { useParams } from 'react-router-dom';
import BackButton from 'components/BackButton';

export default function Filters() {
  let { deckId } = useParams();
  const dispatch = useDispatch();
  const {
    availableCardClasses,
    selectedCardClass,
    selectedEnergyFilter
  } = useSelector(state => state.filters);

  const setDbCallback = useCallback(
    (cardClass, energyFilter) => {
      dispatch(
        setResults({
          cardClass: cardClass,
          energyFilter: energyFilter
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    setDbCallback(selectedCardClass, selectedEnergyFilter);
  }, [selectedCardClass, selectedEnergyFilter, setDbCallback]);

  return (
    <Component>
      {deckId ? <BackButton /> : null}
      <ClassFilters
        active={selectedCardClass}
        availableCardClasses={availableCardClasses}
        onClick={event => dispatch(selectClass(event.target.value))}
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
`;

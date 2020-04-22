import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function ClassFilters({ availableCardClasses, onClick }) {
  return availableCardClasses ? (
    <Component>
      {availableCardClasses
        .map(obj => {
          const { name, value } = obj;
          return (
            <button key={name} onClick={e => onClick(e)} value={value}>
              {name}
            </button>
          );
        })
        .sort((a, b) => a._order - b._order)}
    </Component>
  ) : null;
}

ClassFilters.propTypes = {
  availableCardClasses: PropTypes.array,
  onClick: PropTypes.func
};

ClassFilters.defaultTypes = {
  availableCardClasses: [],
  onClick: () => {}
};

const Component = styled.div``;

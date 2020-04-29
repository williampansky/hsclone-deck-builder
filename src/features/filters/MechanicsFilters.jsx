import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useElementSize from 'react-element-size';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CARDCLASS from 'enums/cardClass.enums';
import replaceConstant from 'utils/replace-constants';
import { useHistory, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Select from 'react-select';

export default function MechanicsFilters({ active, data, onClick }) {
  // const sortedData = data.sort((a, b) => {
  //   if (a.label > b.label) return 1;
  //   if (a.label < b.label) return -1;
  //   return 1;
  // });

  return data ? (
    <Component>
      <div className="label">Mechanics</div>
      <Select
        className="select"
        defaultValue={data.find(obj => obj._order === 1)}
        menuPlacement="top"
        onChange={selectedOption => onClick(selectedOption.value)}
        options={data}
        width="100%"
      />
    </Component>
  ) : null;
}

MechanicsFilters.propTypes = {
  active: PropTypes.string,
  data: PropTypes.array,
  onClick: PropTypes.func
};

MechanicsFilters.defaultTypes = {
  data: [],
  onClick: () => {}
};

const Component = styled.div`
  align-items: flex-start;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  margin: 0 10px 0 0;
  height: 40px;
  width: 100%;

  .label {
    color: white;
    text-transform: uppercase;
    font-family: 'Verdana', monospace;
    font-size: 10px;
    margin: 0 0 4px;
    text-align: left;
  }

  .select {
    width: 100%;
  }
`;

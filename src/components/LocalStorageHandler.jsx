import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { toggleSidebar } from 'features/sidebar/sidebar.slice';

export default function LocalStorageHandler() {
  const dispatch = useDispatch();
  const decks = useSelector(state => state.decks);
  const { sidebarActive } = useSelector(state => state.sidebar);
  const { selectedCardClass } = useSelector(state => state.filters);

  useEffect(() => {
    localStorage.setItem('sidebarActive', sidebarActive);
  }, [sidebarActive]);

  useEffect(() => {
    localStorage.setItem('decks', JSON.stringify(decks));
  }, [decks]);

  useEffect(() => {
    localStorage.setItem('selectedCardClass', selectedCardClass);
  }, [selectedCardClass]);

  return null;
}

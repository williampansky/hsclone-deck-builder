import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function LocalStorageHandler() {
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

import React, { useCallback, useEffect, useState } from 'react';
import CARD_DATABASE from 'lib/utils/card-databse';
import styled from 'styled-components';
import Card from 'components/Card';
// child components

export default function DeckBuilderWrapper() {
  const [database, setDatabase] = useState([]);

  useEffect(() => {
    setDatabase(CARD_DATABASE);
  }, []);

  return (
    <React.Fragment>
      <Wrapper>
        <Header></Header>
        <GridWrapper>
          <Grid>
            {Object.keys(database).map((card, index) => {
              return (
                <div key={index}>
                  <Card
                    artist={database[card].artist}
                    attack={database[card].attack}
                    cardClass={database[card].cardClass}
                    collectible={database[card].collectible}
                    cost={database[card].cost}
                    elite={database[card].elite}
                    entourage={database[card].entourage}
                    flavor={database[card].flavor}
                    goldenImageSrc={database[card].goldenImageSrc}
                    health={database[card].health}
                    hideStats={database[card].hideStats}
                    howToEarn={database[card].howToEarn}
                    howToEarnGolden={database[card].howToEarnGolden}
                    id={database[card].id}
                    isGolden={database[card].isGolden}
                    mechanics={database[card].mechanics}
                    name={database[card].name}
                    playRequirements={database[card].playRequirements}
                    race={database[card].race}
                    rarity={database[card].rarity}
                    set={database[card].set}
                    sounds={database[card].sounds}
                    spellDamage={database[card].spellDamage}
                    spellType={database[card].spellType}
                    targetingArrowText={database[card].targetingArrowText}
                    text={database[card].text}
                    type={database[card].type}
                    warcryNumber={database[card].warcryNumber}
                  />
                </div>
              );
            })}
          </Grid>
        </GridWrapper>
        <Sidebar>
          <img
            alt=""
            className="background"
            src="assets/images/ui/UI_Sidebar.png"
          />
        </Sidebar>
        <Footer>Footer</Footer>
      </Wrapper>
    </React.Fragment>
  );
}

const Header = styled.header`
  background: #444;
  top: 0;
`;

const Footer = styled.footer`
  background: #444;
  bottom: 0;
`;

const Sidebar = styled.aside`
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  height: 100%;
  z-index: 3;

  .background {
    height: 100%;
    position: absolute;
    pointer-events: none;
  }
`;

const Wrapper = styled.main`
  ${Header},
  ${Footer} {
    position: fixed;
    width: calc(100vw - 272px);
    left: 0;
    right: 0;
    z-index: 2;
    height: 50px;
  }
`;

const GridWrapper = styled.div`
  position: fixed;
  top: 50px;
  padding: 20px;
  bottom: 50px;
  overflow-y: auto;
  width: calc(100vw - 272px);
`;

const Grid = styled.article`
  display: grid;
  margin: 0 auto;
  padding: 20px 0;
  grid-gap: 20px;
  grid-template-columns: repeat(
    auto-fill,
    minmax(calc(var(--card-height) / 1.4), 1fr)
  );

  & > div {
    margin-bottom: 20px;
  }

  & > div .card__v3 {
    margin: 0 auto;
  }
`;

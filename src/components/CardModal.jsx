import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from 'components/Card';
import replaceConstant from 'utils/replace-constants';
import getConstantDescription from 'utils/get-constant-description';
import createMarkup from 'utils/createMarkup';

export default function CardModal({
  cardText,
  handleTooltipClick,
  modalObject
}) {
  return (
    <Modal
      className={modalObject !== null ? 'open' : ''}
      onClick={() => handleTooltipClick(null)}
    >
      {modalObject !== null ? (
        <React.Fragment>
          <div className="modal__dialog">
            <div className="flex">
              <Card
                artist={modalObject.artist}
                attack={modalObject.attack}
                cardClass={modalObject.cardClass}
                collectible={modalObject.collectible}
                cost={modalObject.cost}
                elite={modalObject.elite}
                entourage={modalObject.entourage}
                flavor={modalObject.flavor}
                goldenImageSrc={modalObject.goldenImageSrc}
                health={modalObject.health}
                hideStats={modalObject.hideStats}
                howToEarn={modalObject.howToEarn}
                howToEarnGolden={modalObject.howToEarnGolden}
                id={modalObject.id}
                isGolden={modalObject.isGolden}
                mechanics={modalObject.mechanics}
                name={modalObject.name}
                playRequirements={modalObject.playRequirements}
                race={modalObject.race}
                rarity={modalObject.rarity}
                set={modalObject.set}
                sounds={modalObject.sounds}
                spellDamage={modalObject.spellDamage}
                spellType={modalObject.spellType}
                targetingArrowText={modalObject.targetingArrowText}
                text={modalObject.text}
                type={modalObject.type}
                warcryNumber={modalObject.warcryNumber}
              />
              <div>
                <div className="text__value">
                  <h2 className="name">{modalObject.name}</h2>
                </div>
                <div className="text__value">
                  <p
                    className="flavor"
                    dangerouslySetInnerHTML={createMarkup(
                      cardText(
                        modalObject.flavor,
                        modalObject.dynamicSpellDamageText
                      )
                    )}
                  />
                </div>
                {modalObject.mechanics !== [] ? (
                  <div className="text__value">
                    <p className="mechanics">
                      {replaceConstant(modalObject.mechanics[0])}
                    </p>
                    <p className="mechanics mechanics__description">
                      <small>
                        {getConstantDescription(modalObject.mechanics[0])}
                      </small>
                    </p>
                  </div>
                ) : null}
                <div className="text__value">
                  <ul>
                    <li>
                      <strong>Type:</strong> {modalObject.type}
                    </li>
                    <li>
                      <strong>Set:</strong> {modalObject.set}
                    </li>
                    <li>
                      <strong>Rarity:</strong> {modalObject.rarity}
                    </li>
                    {modalObject.playRequirements && (
                      <li>
                        <strong>Play Requirements:</strong>{' '}
                        {modalObject.playRequirements}
                      </li>
                    )}
                    {modalObject.targetingArrowText && (
                      <li>
                        <strong>Targeting Text:</strong>{' '}
                        {modalObject.targetingArrowText}
                      </li>
                    )}
                    {modalObject.howToEarn && (
                      <li>
                        <strong>How to Earn:</strong> {modalObject.howToEarn}
                      </li>
                    )}
                    {modalObject.artist && (
                      <li>
                        <strong>Artist:</strong>{' '}
                        <a
                          href={modalObject.artist}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {modalObject.artist}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : null}
    </Modal>
  );
}

CardModal.propTypes = {
  cardText: PropTypes.func,
  handleTooltipClick: PropTypes.func,
  modalObject: PropTypes.object
};

const Modal = styled.div`
  display: flex;
  align-items: flex-start;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  overflow: hidden;
  padding: 50px 30px;
  background: rgba(0, 0, 0, 0.875);
  opacity: 0;
  transition: opacity 150ms linear;

  .modal__dialog {
    position: relative;
    box-sizing: border-box;
    margin: auto;
    width: 75vw;
    max-width: 900px !important;
    background: none;
    opacity: 0;
    transform: translateY(-100px);
    transition: 500ms linear;
    transition-property: opacity, transform;
    padding: 30px 30px;
    cursor: default;
  }

  &.open {
    opacity: 1;
    z-index: 9000;
  }

  &.open .modal__dialog {
    opacity: 1;
    transform: translateY(0);
  }

  .card__v3 {
    transform: scale(1.5);
  }

  .flex {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
  }

  .flex > div:nth-child(2) {
    margin-left: 150px;
  }

  ul {
    padding: 0 0 0 1.25em;
  }

  ul li + li {
    margin-top: 0.465em;
  }

  ul strong {
    color: #fff649;
    margin: 0 0.25em 0 0;
  }

  ul a {
    color: white;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  .name {
    font-size: 1.875em;
    margin: 0 0 0.625em;
  }

  .flavor {
    font-size: 1.25em;
    margin: 0 0 0.875em;
    opacity: 0.75;
  }

  .mechanics {
    margin: 0 0 0.15em;
  }

  .mechanics.mechanics__description {
    margin: 0 0 0.875em;
    max-width: 80%;
    opacity: 0.75;
  }
`;

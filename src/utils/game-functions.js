import {
  IMAGED_CARD_TEXT_MAPPING,
  IMAGED_CARD_VALUES_MAPPING,
  IMAGED_CARD_COLORS_MAPPING,
  IMAGED_CARD_ICON_MAPPING,
} from "../../lib/constants";

export const getCardValue = (value) =>
  IMAGED_CARD_VALUES_MAPPING[value] || +value;
export const getCardColor = (suit) => IMAGED_CARD_COLORS_MAPPING[suit];
export const getCardText = (value) => IMAGED_CARD_TEXT_MAPPING[value] || value;
export const getCardSuitIcon = (value) => IMAGED_CARD_ICON_MAPPING[value];

export const getDeckValue = (arr) => {
  const deckValue = arr
    .sort((a, b) => getCardValue(a.value) - getCardValue(b.value))
    .reduce((deckValue, card) => {
      let cardValue = getCardValue(card.value);
      if (card.value === "ACE" && deckValue + cardValue > 21) {
        cardValue = 1;
      }
      deckValue += cardValue;
      return deckValue;
    }, 0);

  return deckValue;
};

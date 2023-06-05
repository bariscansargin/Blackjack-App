import {
  IMAGED_CARD_TEXT_MAPPING,
  IMAGED_CARD_VALUES_MAPPING,
  IMAGED_CARD_COLORS_MAPPING,
  IMAGED_CARD_ICON_MAPPING,
} from "../../lib/constants";

export const getCardValue = (value) =>IMAGED_CARD_VALUES_MAPPING[value] || +value;
export const getCardColor = (suit) => IMAGED_CARD_COLORS_MAPPING[suit];
export const getCardText = (value) => IMAGED_CARD_TEXT_MAPPING[value] || value;
export const getCardSuitIcon = (value) => IMAGED_CARD_ICON_MAPPING[value];

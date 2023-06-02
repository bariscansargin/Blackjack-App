import { IMAGED_CARD_VALUES_MAPPING } from "../../lib/constants";
export const getCardValue = (value) => IMAGED_CARD_VALUES_MAPPING[value] || +value;

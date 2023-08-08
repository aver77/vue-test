import {CardsEnum} from "@/data/enums";

export const getCardWeightByName = (cardName?: CardsEnum): number => {
    switch (cardName) {
        case CardsEnum.JOKER: {
            return 0
        }
        case CardsEnum.ACE: {
            return 1
        }
        case CardsEnum.KING: {
            return 2
        }
        case CardsEnum.QUEEN: {
            return 3
        }
        case CardsEnum.JACK: {
            return 4
        }
        default: {
            return 10;
        }
    }
}
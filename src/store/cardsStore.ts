import * as Vuex from "vuex"
import {v4 as uuid} from "uuid";
import {CardsEnum} from "@/data/enums";
import {addCard, editCard, filterCardsByWeight, removeCard} from "@/store/mutationNames";
import {getCardWeightByName} from "@/utils/getCardWeightByName";

export const cardsStore = new Vuex.Store({
    state: {
        cards: [
            {
                id: uuid(),
                type: CardsEnum.ACE,
                weight: getCardWeightByName(CardsEnum.ACE)
            },
            {
                id: uuid(),
                type: CardsEnum.KING,
                weight: getCardWeightByName(CardsEnum.KING)
            },
            {
                id: uuid(),
                type: CardsEnum.QUEEN,
                weight: getCardWeightByName(CardsEnum.QUEEN)
            },
            {
                id: uuid(),
                type: CardsEnum.JACK,
                weight: getCardWeightByName(CardsEnum.JACK)
            },
            {
                id: uuid(),
                type: CardsEnum.JOKER,
                weight: getCardWeightByName(CardsEnum.JOKER)
            }
        ]
    },
    getters: {
        getCards: state => state.cards,
        getAllAces: state => state.cards.filter(card => card.type === CardsEnum.ACE),
        getAllQueens: state => state.cards.filter(card => card.type === CardsEnum.QUEEN),
        getAllKings: state => state.cards.filter(card => card.type === CardsEnum.KING),
        getAllJacks: state => state.cards.filter(card => card.type === CardsEnum.JACK),
        getAllJokers: state => state.cards.filter(card => card.type === CardsEnum.JOKER),
    },
    mutations: {
        [filterCardsByWeight] (state) {
            state.cards = state.cards.sort(({weight: firstWeight}, {weight: secondWeight}) => firstWeight - secondWeight)
        },
        [removeCard] (state, payload) {
            state.cards = state.cards.filter(card => card.id !== payload.id);
        },
        [addCard] (state, payload) {
            state.cards = [...state.cards, {id: uuid(), ...payload}]
        },
        [editCard] (state, payload) {
            const editedCardIndex = state.cards.findIndex(card => card.id === payload.id);
            state.cards = [...state.cards.slice(0, editedCardIndex), payload, ...state.cards.slice(editedCardIndex + 1)];
        }
    }
})
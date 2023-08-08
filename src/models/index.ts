import {CardsEnum} from "@/data/enums";

export interface ITodo {
    id?: string;
    name: string;
    desc: string;
}

export interface ICard {
    id?: string;
    type: CardsEnum;
    weight: number;
}
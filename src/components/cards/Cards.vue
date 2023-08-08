<template>
    <h1>Cards:</h1>
    <div>
        <h2>Добавить карту:</h2>
        <select :value="cardValue" @change="e => cardValue=e.target.value">
            <option :value="CardsEnum.ACE">{{CardsEnum.ACE}}</option>
            <option :value="CardsEnum.QUEEN">{{CardsEnum.QUEEN}}</option>
            <option :value="CardsEnum.KING">{{CardsEnum.KING}}</option>
            <option :value="CardsEnum.JACK">{{CardsEnum.JACK}}</option>
            <option :value="CardsEnum.JOKER">{{CardsEnum.JOKER}}</option>
        </select>
        <button @click="addCard()">Добавить</button>
    </div>
    <button @click="_filterCardsByWeight()">Filter cards</button>
    <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; padding: 20px">
        <div v-for="card in cards" style="width: 100px; height: 200px; border-radius: 2px; padding: 10px; background: lightgrey">
            <Card :card="card"/>
        </div>
    </div>
</template>
<script lang="ts">
    import {defineComponent} from "vue";
    import {cardsStore} from "@/store/cardsStore";
    import Card from "@/components/cards/card/Card.vue";
    import {CardsEnum} from "@/data/enums";
    import {mapMutations} from "vuex";
    import {addCard, filterCardsByWeight} from "@/store/mutationNames"
    import {getCardWeightByName} from "@/utils/getCardWeightByName";
    export default defineComponent({
        name: "Cards",
        components: {Card},
        data() {
            return {
                cardValue: CardsEnum.ACE,
                CardsEnum
            }
        },
        computed: {
            cards() {
                return cardsStore.getters.getCards
            },
        },
        methods: {
            ...mapMutations({
                _addCard: addCard,
                _filterCardsByWeight: filterCardsByWeight,
            }),
            addCard() {
                this._addCard({
                    type: this.cardValue,
                    weight: getCardWeightByName(this.cardValue)
                })
            }
        }
    })
</script>
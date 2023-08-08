<template>
    <p>{{card.type}}</p>
    <p>{{card.weight}}</p>
    <button
        :style="{'background': editCardVisible ? 'red': 'green'}"
        @click="onEditBtnClick(card.type)"
    >
        {{editCardVisible ? "Закрыть изменение": "Изменить карту"}}
    </button>
    <div v-if="editCardVisible" >
        <select :value="cardValue" @change="e => cardValue=e.target.value">
            <option :value="CardsEnum.ACE">{{CardsEnum.ACE}}</option>
            <option :value="CardsEnum.QUEEN">{{CardsEnum.QUEEN}}</option>
            <option :value="CardsEnum.KING">{{CardsEnum.KING}}</option>
            <option :value="CardsEnum.JACK">{{CardsEnum.JACK}}</option>
            <option :value="CardsEnum.JOKER">{{CardsEnum.JOKER}}</option>
        </select>
        <button @click="editCard(card.id)">Изменить карту</button>
    </div>
    <button @click="removeCard(card.id)">Удалить</button>
</template>
<script lang="ts">
    import {defineComponent, PropType} from "vue";
    import {ICard} from "@/models";
    import {mapMutations} from "vuex";
    import {editCard, removeCard} from "@/store/mutationNames";
    import {CardsEnum} from "@/data/enums";
    import {getCardWeightByName} from "@/utils/getCardWeightByName";

    interface IData {
        CardsEnum: typeof CardsEnum,
        cardValue?: CardsEnum,
        editCardVisible: boolean
    }
    export default defineComponent({
        name: "Card",
        data(): IData {
          return {
              CardsEnum: CardsEnum,
              cardValue: undefined,
              editCardVisible: false
          }
        },
        props: {
            card: {
                type: Object as PropType<ICard>
            }
        },
        methods: {
            ...mapMutations({
                _editCard: editCard,
                _removeCard: removeCard
            }),
            removeCard(id: string) {
                this._removeCard({id})
            },
            onEditBtnClick(initialCardValue: CardsEnum) {
                this.cardValue = initialCardValue;
                this.editCardVisible = !this.editCardVisible
            },
            editCard(id: string) {
                this._editCard({
                    id,
                    type: this.cardValue,
                    weight: getCardWeightByName(this.cardValue)
                })
            }
        }
    })
</script>
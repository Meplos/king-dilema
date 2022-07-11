<script setup lang="ts">
import { ref } from "vue";
import { ws } from "../controller";
const card = {
  Nenni: 0,
  OuiDa: 0,
  Skip: 0,
};

const bet = ref<number>(0);
const activeCard = ref("");
const isVoteActive = ref(true);

const isCurrentCardSelected = (currentCard: string) => {
  return activeCard.value === currentCard;
};

const vote = () => {
  if (activeCard.value.trim() <= 0) {
    throw new Error("Please select a card");
  }

  isVoteActive.value = false;
  const active = activeCard.value;
  const currentBet = bet.value;
  ws.sendMessage(
    "vote",
    JSON.stringify({
      card: active,
      bet: currentBet,
    })
  );
};

const changeCard = (newActiveCard: string) => {
  if (isVoteActive.value) activeCard.value = newActiveCard;
};
</script>

<template>
  <div class="player-page__vote-card-container flex justify-around mb-5">
    <div
      class="card bg-red-600 text-slate-50 font-bold p-11"
      @click="changeCard('NENNI')"
      :class="
        isCurrentCardSelected('NENNI') ? 'border-fuchsia-500 border-2' : ''
      "
    >
      <span class="card-title">NENNI</span>
      <div class="card-value" v-if="card.Nenni">{{ card.Nenni }}</div>
    </div>
    <div
      class="card bg-amber-500 text-slate-50 font-bold p-11"
      @click="changeCard('SKIP')"
      :class="
        isCurrentCardSelected('SKIP') ? 'border-fuchsia-500 border-2' : ''
      "
    >
      <span class="card-title">Skip</span>
      <div class="card-value" v-if="card.Skip">{{ card.Skip }}</div>
    </div>
    <div
      class="card bg-cyan-500 text-slate-50 font-bold p-11"
      @click="changeCard('OUIDA')"
      :class="
        isCurrentCardSelected('OUIDA') ? 'border-fuchsia-500 border-2' : ''
      "
    >
      <span class="card-title">Oui-Da</span>
      <div class="card-value" v-if="card.OuiDa">{{ card.OuiDa }}</div>
    </div>
  </div>

  <div class="player-page__vote-form-container flex justify-between">
    <input
      type="number"
      class="mx-5 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      id="exampleText0"
      v-model="bet"
      placeholder="Enter your vote"
    />
    <button
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="vote"
      :disabled="!isVoteActive"
    >
      <svg
        class="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
  </div>
</template>

<style>
.player-page__vote-card-container {
  width: 100%;
}
</style>

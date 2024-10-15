<template>
  <div>
    <template v-if="this.question">

      <h1 v-html="this.question.text"></h1>

      <div class="answers">
        <div class="answer" v-for="(answer, index) in this.answers" v-bind:key="index">
          <input type="radio" :disabled="this.answerSubmitted" name="options" v-bind:value="answer"
            v-model="this.selectedOption">
          <label v-html="answer"></label>
        </div>
      </div>

      <section>
        <p v-bind:class="{ 'correct-answer': this.isCorrectAnswer, 'incorrect-answer': !this.isCorrectAnswer }"
          v-if="this.answerSubmitted" v-html="this.confirmRightAfterAnswer"></p>
      </section>

      <button class="submit-button" 
        :class="{'disabled-button': this.submitButtonDisabled, 'enabled-button': !this.submitButtonDisabled}" 
        :disabled="this.submitButtonDisabled" @click="submitAnswer()">Send</button>
    </template>
  </div>

</template>

<script>

export default {
  name: 'App',
  components: {

  },

  data() {

    return {
      question: {},
      selectedOption: undefined,
      answerSubmitted: false,
      submitButtonDisabled: true,
      isCorrectAnswer: false
    }

  },

  computed: {
    answers() {

      let answers = [];
      
      if (this.question) {
        let allAnswers = [...this.question.incorrectAnswers];
        const SIZE_ANSWERS = allAnswers.length;
        const MIN_VALUE_LIST = 0;

        /** Realizr a ordenacao aleatoria utilizando o Random */
        let randomPosition = Math.floor(Math.random() * (SIZE_ANSWERS - MIN_VALUE_LIST + 1) + MIN_VALUE_LIST);
        allAnswers.splice(randomPosition, 0, this.question.correctAnswer);

        answers = allAnswers;
      }

      return answers;
    }

  },
  updated() {
    this.submitButtonDisabled = false;
  },   

  // Chamada do get OpenTriviaAPI
  beforeCreate() {

    const URL_QUIZ = "https://the-trivia-api.com/v2/questions?limit=1";

    this.axios.get(URL_QUIZ).then((response) => {

      response.data.forEach(answer => {

        this.question.text = answer.question.text;
        this.question.incorrectAnswers = answer.incorrectAnswers;
        this.question.correctAnswer = answer.correctAnswer

      });

    })

  },

  beforeUnmount() {
    this.question = {}
  },

  methods: {

    submitAnswer() {

      if (this.selectedOption == this.question.correctAnswer) {
        this.confirmRightAfterAnswer = "Congratulations!";
        this.isCorrectAnswer = true;
      } else {
        this.confirmRightAfterAnswer = "You failed! Do your best in the next question! I believe in you..";
        this.isCorrectAnswer = false;
      }

      this.answerSubmitted = true;
      
    }
  }



}
</script>

<style lang="scss">

:root {
  --color-correct-answer: #1B512D;
  --color-incorrect-answer: #E43F6F;
  --color-default-app: #2C3E50;
  --color-white: #FFFFFF;
  --color-enabled-button: blue;
  --color-disabled-button: #CCCCCC;

}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0 auto;
  color: var(--color-default-app);
  margin-top: 60px;
  max-width: 960px;
}

.answers {
  text-align: center;
  justify-content: center;
  flex-direction: column;
}

.correct-answer {
  color: var(--color-correct-answer);
}

.incorrect-answer {
  color: var(--color-incorrect-answer);
}

.answer {
  padding-bottom: 1em;
}

.disabled-button {
  background-color: var(--color-disabled-button);
}

.enabled-button {
  background-color: var(--color-enabled-button);
}

.submit-button {
  padding: 1em 4em;
  color: var(--color-white);
  border-radius: .75em;
  font-weight: bold;
}
</style>

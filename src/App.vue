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

      <button class="submit-button" @click="submitAnswer()">Send</button>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0 auto;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 960px;
}

.answers {
  text-align: center;
  justify-content: center;
  flex-direction: column;
}

.correct-answer {
  color: #1B512D;
}

.incorrect-answer {
  color: #E43F6F;
}

.answer {
  padding-bottom: 1em;
}

.submit-button {
  padding: 1em 4em;
  background-color: blue;
  color: #FFFFFF;
  border-radius: .75em;
  font-weight: bold;
}
</style>

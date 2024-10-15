<template>
  <div>
    <template v-if="this.listOfAnswers.question">

      <h1 v-html="this.listOfAnswers.question"></h1>

      <div class="answers">
        <div class="answer" v-for="(answer, index) in this.answers" v-bind:key="index">
          <input type="radio"
          :disabled="this.answerSubmitted"
           name="options" 
           v-bind:value="answer" 
           v-model="this.selectedOption">
          <label v-html="answer"></label>
        </div>
      </div>

      <section>
        <p v-bind:class="{'correct-answer': this.isCorrectAnswer, 'incorrect-answer': !this.isCorrectAnswer}" v-if="this.answerSubmitted" v-html="this.confirmRightAfterAnswer"></p>
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
      listOfAnswers: undefined,
      selectedOption: undefined,
      currentQuestion: undefined,
      answerSubmitted: false,
      isCorrectAnswer: false
    }

  },

  computed: {
    answers() {
      let answers = [...this.listOfAnswers.incorrectAnswers];
      const SIZE_ANSWERS = answers.length;
      const MIN_VALUE_LIST = 0;

      /** Realizr a ordenacao aleatoria utilizando o Random */
      let randomPosition = Math.floor(Math.random() * (SIZE_ANSWERS - MIN_VALUE_LIST + 1) + MIN_VALUE_LIST);
      answers.splice(randomPosition, 0, this.listOfAnswers.correctAnswer);
      
      return answers;
    }
    
  },

  // Chamada do get OpenTriviaAPI
  created() {

    const URL_QUIZ = "https://the-trivia-api.com/v2/questions";

    this.axios.get(URL_QUIZ)
      .then((response) => {

        this.listOfAnswers = response.data;

        console.log(response.data.length);

        this.listOfAnswers.forEach(answer => {
  
          this.listOfAnswers.question = answer.question.text;
          this.listOfAnswers.incorrectAnswers = answer.incorrectAnswers;
          this.listOfAnswers.correctAnswer = answer.correctAnswer

          this.currentQuestion = answer;
          
        });

      })
      .catch(() => {
      })

  },

  methods: {
    
    submitAnswer() {

      if (this.selectedOption == this.currentQuestion.correctAnswer) {
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

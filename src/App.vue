<template>
  <div>
    <template v-if="this.listOfAnswers.question">

      <h1 v-html="this.listOfAnswers.question"></h1>

      <div class="answers">
        <div class="answer" v-for="(answer, index) in this.answers" v-bind:key="index">
          <input type="radio" value="answer">
          <label v-html="answer"></label>
        </div>
      </div>

      <button class="submit-button">Send</button>
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
      listOfAnswers: undefined
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

        this.listOfAnswers.forEach(answer => {
  
          this.listOfAnswers.question = answer.question.text;
          this.listOfAnswers.incorrectAnswers = answer.incorrectAnswers;
          this.listOfAnswers.correctAnswer = answer.correctAnswer
          
        });

      })
      .catch(() => {
      })

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

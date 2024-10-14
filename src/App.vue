<template>

  <div>
    <h1 v-html="this.question"></h1>

    <div class="answers">
      <div class="answer">
        <input type="radio" id="true" >
        <label for="true">True</label>
      </div>
      <div class="answer">
        <input type="radio" id="false" >
        <label for="false">False</label>
      </div>
    </div>

    <button class="submit-button">Send</button>
  </div>

</template>

<script>

export default {
  name: 'App',
  components: {
    
  },

  data() {

    return {
      correctAnswer: undefined,
      incorrectAnswers: undefined,
      question: undefined
    }

  },

  computed: {
    answers() {
      let answers = [...this.incorrectAnswers];
      const SIZE_ANSWERS = answers.length;
      const MIN_VALUE_LIST = 0;

      /** Realizr a ordenacao aleatoria utilizando o Random */
      let randomPosition = Math.floor(Math.random() * (SIZE_ANSWERS - MIN_VALUE_LIST + 1) + MIN_VALUE_LIST);
      answers.splice(randomPosition, 0, this.correctAnswer);
      
      return answers;
    }
    
  },

  // Chamada do get OpenTriviaAPI
  created() {

    const URL_OPEN_TRIVIA = "https://opentdb.com/api.php?amount=1&category=9&type=multiple";

    this.axios.get(URL_OPEN_TRIVIA)
      .then((response) => {

        const randowQuestion = response.data.results[0];

        this.question = randowQuestion.question;
        this.incorrectAnswers = randowQuestion.incorrect_answers;
        this.correctAnswer = randowQuestion.correct_answer
      })
      .catch((error) => {
        console.log(error)
          if (error.status == 429) {
            console.log("Recarregar jogo")
          }
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

<template>

  <div>
    <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum nemo atque neque pariatur minima ad temporibus ullam, beatae iste velit mollitia laudantium. Repellat delectus id sed animi laborum, recusandae perspiciatis!</h1>

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

  // Chamada do get OpenTriviaAPI
  created() {

    const URL_OPEN_TRIVIA = "https://opentdb.com/api.php?amount=1&category=9";

    this.axios.get(URL_OPEN_TRIVIA)
      .then((response) => {
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error)
          if (error.status == 429) {
            alert("Recarregar jogo")
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

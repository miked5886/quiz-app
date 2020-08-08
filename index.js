/* when start button is clicked the quiz begins */
function startQuiz() {
  $('#start-button').on('click', function(event){
    renderQuestion();
  }
  );
}

/* displays the current question number and players score */
function updateQuestionAndScore() {
  const html = $(`<ul>
      <li id="js-answered">Question: ${STORE.currentQuestion + 1}/${STORE.questions.length}</li>
      <li id="js-score">Score: ${STORE.score}/${STORE.questions.length}</li>
    </ul>`);
  $(".score-question").html(html);
}

/* Displays the answer choices for the current question */
function updateChoices()
{
  let question = STORE.questions[STORE.currentQuestion];
  for(let i=0; i<question.options.length; i++)
  {
    $('.js-options').append(`
        <input type = "radio" name="options" id="option${i+1}" value= "${question.options[i]}" tabindex ="${i+1}"> 
        <label for="option${i+1}"> ${question.options[i]}</label> <br/>
        <span id="js-r${i+1}"></span>
    `);
  }
  
}

/*displays the question*/
function renderQuestion() {
  let question = STORE.questions[STORE.currentQuestion];
  updateQuestionAndScore();
  const questionHtml = $(`
  <div  class="quiz-display">
    <form id="js-questions">
       <h3> ${question.question}</h3>
       <div class="js-options"></div>
          <button type = "submit" id="submit-button" class = "btn" tabindex="5">Submit</button>
          <button type = "button" id="next-button" class = "btn"  tabindex="6"> Next </button>
    </form>
  </div>`);
$("main").html(questionHtml);
updateChoices();
$("#next-button").hide();
}

/* displays score and restart quiz button */
function displayScore() {
  let scoreHtml = $(
    `<div class="quiz-display">
      <form id="js-restart-quiz">
              <h3>Your Score is: ${STORE.score}/${STORE.questions.length}</h3>
              <button type="button" id="restart-button" class = "btn"> Restart Quiz </button>
    </form>
    </div>`);
    STORE.currentQuestion = 0;
    STORE.score = 0;
  $("main").html(scoreHtml);
}

/* checks whether it reached the end of questions */
function handleQuestions() {
  $('body').on('click','#next-button', (event) => {
    STORE.currentQuestion === STORE.questions.length?displayScore() : renderQuestion();
  });
}


/*checks whether the chosen answer is right or wrong and displays  message*/ 
function handleChoices() {
  $('body').on("submit",'#js-questions', function(event) {
    event.preventDefault();
    let renderedQuestion = STORE.questions[STORE.currentQuestion];
    let selectedOption = $("input[name=options]:checked").val();
    if (!selectedOption) {
      return;
    } 
    let id_num = renderedQuestion.options.findIndex(i => i === selectedOption);
    let id = "#js-r" + ++id_num;
    $('span').removeClass("right-answer wrong-answer");
    if(selectedOption === renderedQuestion.answer) {
      STORE.score++; 
      $(`${id}`).append(`GOAL !<br/>`);
      $(`${id}`).addClass("right-answer");
    }
    else {
      $(`${id}`).append(`MISS ! <br/> The answer is "${renderedQuestion.answer}"<br/>`);
      $(`${id}`).addClass("wrong-answer");
    }

    STORE.currentQuestion++;
    $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
    $('#submit-button').hide();
    $("input[type=radio]").attr('disabled', true);
    $('#next-button').show();
  });
}

function restartQuiz() {
  $('body').on('click','#restart-button', (event) => {
    renderQuestion();
  });
}

function handleQuizApp() {
  startQuiz();
  handleQuestions();
  handleChoices();
  restartQuiz();
}

$(handleQuizApp);
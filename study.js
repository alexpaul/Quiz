const container = document.querySelector('#container')
const questionsList = document.querySelector('#questions')

for(let prompt of questions) {
    const questionLI = document.createElement('li')
    const questionUL = document.createElement('ul')

    questionLI.append(prompt.question)
    questionsList.append(questionLI)
    questionLI.append(questionUL)

    for(let answer of prompt.answer) {
      const answerLI = document.createElement('li')
      answerLI.append(answer)
      questionUL.append(answerLI)
    }


}

/*
<ul>
  <li>
    <ul>
      <li></li>
    </ul>
  </li>
  <li></li>
  <li></li>
  <li></li>
</ul>
*/
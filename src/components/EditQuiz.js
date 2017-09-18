import React from 'react';
import { getKey } from '../helpers';

const EditQuiz = ({ quizObj, updateAnswer, handleUpdateQuestion, handleUpdateAnswer, handleSubmitEdit }) => {
  const questions = quizObj.questions.map((question, index) => {
    const quesId = question.id;
    return (
      <div key={quesId}>
        <input
          id={quesId}
          value={quizObj.questions[index].question_text}
          onChange={e => handleUpdateQuestion(e, quesId)}
        />
        {
          question.answers.map((answer, i) => {
            const ansId = answer.id;
            return (
              <div key={ansId}>
                <input
                  id={ansId}
                  name={answer.answer_text}
                  value={quizObj.questions[index].answers[i].answer_text}
                  onChange={e => handleUpdateAnswer(e, quesId, ansId)}
                />
              </div>
            );
          })
        }
      </div>
    );
  });

  return (
    <div>
      <h1>{quizObj.name}</h1>
      {questions}
      <button onClick={handleSubmitEdit}>submit changes</button>
    </div>
  );
};

export default EditQuiz;

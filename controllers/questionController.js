const { db } = require('../server');

exports.indexQuestions = (req, res) => {
  const { quizId } = req.params;
  db('question')
    .where('quiz_id', quizId)
    .select()
    .then((question) => {
      if (question.length) {
        res.status(200).json(question);
      } else {
        res.status(404).json({
          error: `Could not find questions with the quiz id of ${quizId}`,
        });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

exports.addQuestion = (req, res) => {
  const newQuestion = req.body;
  return db('question')
    .insert(newQuestion, 'id')
    .then(question => res.status(201).json({
      id: question[0],
    }))
    .catch(error => res.status(500).json({
      error,
    }));
};

exports.editQuestion = (req, res) => {
  const newPatch = req.body;
  db('question')
    .where('id', req.params.id)
    .select()
    .update(newPatch, 'id')
    .then((question) => {
      res.status(201).json({ id: question });
    })
    .catch(error => res.status(500).json({ error }));
};
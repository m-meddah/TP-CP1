const Answer = require("./answer");
const Level = require("./level");
const Question = require("./question");
const Quiz = require("./quiz");
const Tag = require("./tag");
const User = require("./user");

Question.hasMany(Answer, {
  foreignKey: "question_id",
  as: "answers",
});
Answer.belongsTo(Question, {
  foreignKey: "question_id",
  as: "question",
});

Question.belongsTo(Answer, {
  foreignKey: "answer_id",
  as: "goodAnswer",
});

Question.belongsTo(Level, {
  foreignKey: "level_id",
  as: "level",
});
Level.hasMany(Question, {
  foreignKey: "level_id",
  as: "questions",
});

Question.belongsTo(Quiz, {
  foreignKey: "quiz_id",
  as: "quiz",
});
Quiz.hasMany(Question, {
  foreignKey: "quiz_id",
  as: "questions",
});

Quiz.belongsTo(User, {
  foreignKey: "user_id",
  as: "author",
});
User.hasMany(Quiz, {
  foreignKey: "user_id",
  as: "quizList",
});

Quiz.belongsToMany(Tag, {
  as: "tags",
  through: "quiz_has_tag",
  foreignKey: "quiz_id",
  otherKey: "tag_id",
});
Tag.belongsToMany(Quiz, {
  as: "quizList",
  through: "quiz_has_tag",
  foreignKey: "tag_id",
  otherKey: "quiz_id",
});

module.exports = { Answer, Level, Question, Tag, User, Quiz };

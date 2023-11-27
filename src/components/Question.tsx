import shuffle from "../fn";
import QuestionProps from "../type/QuestionProps";

const Question = (question: QuestionProps) => {

  const allQuestions = [question.correct_answer, question.incorrect_answers] as string[];
  const questions = shuffle(allQuestions) as string[];
  
  return (
    <p key={question.id}>
      {question.id}-{question.question}
      {questions.map((iq) => {
        return <li>{iq}</li>;
      })}
    </p>
  );
};
export default Question;

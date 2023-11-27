import { shuffle } from "../helpers";
import QuestionProps from "../type/QuestionProps";

const Question = (question: QuestionProps) => {
  const allQuestions = [
    question.correct_answer,
    question.incorrect_answers,
  ] as string[];
  const questions = shuffle(allQuestions) as string[];

  return (
    <div key={question.id} className="p-5">
      <div className="pb-5">
        {question.id} - {question.question}
      </div>
      {questions.map((iq) => {
        return (
          <div className="mt-2 p-2 border-2">
            {iq}
          </div>
        );
      })}
    </div>
  );
};
export default Question;

import { useEffect, useState } from "react";
import { compareArrays, shuffle } from "../helpers";
import AlternativeProps from "../type/AlternativeProps";
import AlternativeState from "../type/AlternativeState";
import QuestionProps from "../type/QuestionProps";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle/AlertTitle";

const Question = (question: QuestionProps) => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [alternatives, setAlternatives] = useState<AlternativeProps[]>([]);
  const [expire, setExpire] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  const questions = [
    ...question.correct_answers,
    ...question.incorrect_answers,
  ] as string[];
  const statements = shuffle(questions) as string[];

  useEffect(() => {
    const ss = statements.map((text, index) => {
      return {
        index: index,
        statement: text,
        state: AlternativeState.DESELECTED,
        onClick: onSelect,
      } as AlternativeProps;
    });
    console.log(ss);
    setAlternatives(ss);
    setAnswers([]);
    setShowHint(false);
  }, [question.id]);

  useEffect(() => {
    console.log("expire", expire);
    if (expire == null) return;
    const timeoutID = setTimeout(() => question.moveNext(), 1000);
    return () => clearTimeout(timeoutID);
  }, [expire]);

  function onSelect(index: number) {
    const answer = alternatives[index].statement;

    // select/deselect
    const newState = answers.includes(answer)
      ? AlternativeState.DESELECTED
      : AlternativeState.SELECTED;
    switch (newState) {
      case AlternativeState.DESELECTED:
        delete answers[index];
        break;
      case AlternativeState.SELECTED:
        answers.push(answer);
        break;
    }
    updateState(index, newState);

    // final answer
    if (question.correct_answers.length == answers.length) {
      const newState = compareArrays(question.correct_answers, answers)
        ? AlternativeState.CORRECT
        : AlternativeState.INCORRECT;

      switch (newState) {
        case AlternativeState.CORRECT:
          setExpire(question.id);
          break;
        case AlternativeState.INCORRECT:
          setShowHint(true);
          break;
      }
      updateState(index, newState);
    }
  }

  const updateState = (index: number, astate: AlternativeState) => {
    const newState = alternatives.map((obj) => {
      // 👇️ if id equals 2, update country property
      if (obj.index === index) {
        return { ...obj, state: astate };
      }

      // 👇️ otherwise return the object as is
      return obj;
    });

    setAlternatives(newState);
  };

  return (
    <div key={question.id}>
      <div className="text-lg">{question.question}</div>
      <br />

      {showHint && (
        <Alert severity="error" onClose={() => question.moveNext()}>
          <AlertTitle>Hint!</AlertTitle>
          {question.hint}
        </Alert>
      )}

      {/* {alternatives.map((alternative) => {
        return <Alternative {...alternative} />;
      })} */}

      {alternatives.map((a) => {
        return (
          <div
            key={a.index}
            className="mt-2 p-5 shadow rounded cursor-pointer transition-colors"
            style={{ backgroundColor: a.state }}
            onClick={() => onSelect(a.index)}
          >
            {a.statement}
          </div>
        );
      })}


    </div>
  );
};
export default Question;

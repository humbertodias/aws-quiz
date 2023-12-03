import { useEffect } from "react";
import { compareArrays, shuffle } from "../helpers";
import AlternativeProps from "../type/AlternativeProps";
import AlternativeState from "../type/AlternativeState";
import QuestionProps from "../type/QuestionProps";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle/AlertTitle";

import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";

import { signal } from "@preact/signals-react";
import Alternative from "./Alternative";
const alternatives = signal<AlternativeProps[]>([]);
const answers = signal<string[]>([]);
const expire = signal<string | null>(null);
const showHint = signal<boolean>(false);

const Question = (question: QuestionProps) => {
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

    alternatives.value = ss;
    answers.value = [] as string[];
    for (let i = 0; i < ss.length; i++) {
      answers.value.push();
    }
    showHint.value = false;
  }, [question.id]);

  useEffect(() => {
    if (expire.value == null) return;
    const timeoutID = setTimeout(() => question.moveNext(), 1000);
    return () => clearTimeout(timeoutID);
  }, [expire.value]);

  function onSelect(index: number) {
    const answer = alternatives.value[index].statement;

    // select/deselect
    const newState = answers.value.includes(answer)
      ? AlternativeState.DESELECTED
      : AlternativeState.SELECTED;
    switch (newState) {
      case AlternativeState.DESELECTED:
        answers.value[index] = "";
        break;
      case AlternativeState.SELECTED:
        answers.value[index] = answer;
        break;
    }
    updateState(index, newState);

    // final answer
    if (question.correct_answers.length == selectedAnswers().length) {
      const newState = compareArrays(question.correct_answers, answers.value)
        ? AlternativeState.CORRECT
        : AlternativeState.INCORRECT;

      switch (newState) {
        case AlternativeState.CORRECT:
          question.onAnswer(true);
          break;
        case AlternativeState.INCORRECT:
          question.onAnswer(false);
          break;
      }
      updateState(index, newState);
      expire.value = question.id;
    }
  }

  const updateState = (index: number, astate: AlternativeState) => {
    const newState = alternatives.value.map((obj) => {
      // 👇️ if obj.id equals index, update property
      if (obj.index === index) {
        return { ...obj, state: astate };
      }

      // 👇️ otherwise return the object as is
      return obj;
    });

    alternatives.value = newState;
  };

  const selectedAnswers = () => {
    return answers.value.filter((a) => a != "");
  };

  const toggleHint = () => {
    showHint.value = !showHint.value;
  };
  return (
    <div key={question.id}>
      <div className="text-lg">
        {question.question}
        <Button
          color="inherit"
          startIcon={<InfoIcon />}
          onClick={toggleHint}
        ></Button>
      </div>
      <br />

      {showHint.value && (
        <Alert severity="info">
          <AlertTitle>Hint</AlertTitle>
          {question.hint}
        </Alert>
      )}
      
      {/* {alternatives.value.map((alternative) => {
        return <Alternative {...alternative} />
      })} */}
      {alternatives.value.map((a) => {
        return (
          <div
            key={a.index}
            className="mt-2 p-3 shadow rounded cursor-pointer transition-colors"
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

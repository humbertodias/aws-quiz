type QuestionProps = {
    id: string,
    exam_id: string,
    question: string,
    incorrect_answers: string[],
    correct_answers: string[],
    hint: string,
    moveNext: () => void;
    movePrevious: () => void;
    onAnswer: (correct: boolean) => void
}

export default QuestionProps

type QuestionProps = {
    id: string,
    exam_id: string,
    question: string,
    incorrect_answers: string[],
    correct_answers: string[],
    hint: string,
}

export default QuestionProps

type QuestionProps = {
    id: string,
    task: string,
    question: string,
    incorrect_answers: string[],
    correct_answers: string[],
    hint: string,
}

export default QuestionProps

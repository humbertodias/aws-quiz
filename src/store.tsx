import { signal } from "@preact/signals-react"
import ExamProps from "./type/ExamProps"
import QuestionProps from "./type/QuestionProps"

export const exams = signal<ExamProps[]>([])
export const questions = signal<QuestionProps[]>([])
export const corrects = signal<boolean[]>([])
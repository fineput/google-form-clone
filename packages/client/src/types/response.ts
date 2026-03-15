import type {AnswerValue} from "./questions.ts";

export interface Answer {
    questionId: string;
    value: AnswerValue;
}

export interface FormResponse {
    id: string;
    formId: string;
    answers: Answer[];
    submittedAt: string;
}

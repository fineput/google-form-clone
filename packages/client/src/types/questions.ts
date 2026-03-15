export type QuestionsType = 'TEXT' | 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'DATE';

export interface Question {
    id: number;
    title: string;
    type: QuestionsType;
    options?: string[];
    required: boolean;
}

export type AnswerValue = string | string[];

export interface Answer {
    questionId: string;
    value: string;
}
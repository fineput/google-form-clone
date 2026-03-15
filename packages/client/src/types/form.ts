import type { Question } from "./questions.ts";

export interface Form {
    id: string;
    title: string;
    description: string;
    questions: Question[];
}
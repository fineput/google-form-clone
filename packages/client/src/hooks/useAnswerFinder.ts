import type { Answer} from "../types/response.ts";
import {useMemo} from "react";


export const useAnswerFinder = (answers: Answer[]) => {
    return useMemo(() => {
        return (questionId: string | number) => {
            const answer = answers.find(
                (a) => String(a.questionId) === String(questionId)
            );
            return answer ? answer.value : null;
        };
    }, [answers]);
};
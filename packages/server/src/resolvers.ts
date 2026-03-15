import { Form, Question, Response, Answer} from './types';

const forms: Form[] = [];
const responses: Response[] = [];

export const resolvers = {
    Query: {
        forms: (): Form[] => forms,
        form: (_parent: undefined, args: {id: string}): Form | undefined =>
            forms.find(f => f.id === args.id),
        responses: (_parent: undefined, args: {formId: string}): Response[] =>
            responses.filter(r => r.formId === args.formId),
    },

    Mutation: {
        createForm: (_parent: undefined, args: {title: string, description?: string, questions: Question[] }): Form => {
            const newForm: Form = {
                id: Date.now().toString(),
                ...args
            };
            forms.push(newForm);
            return newForm;
        },

        submitResponse: (_parent: undefined, args: {formId: string, answers: Answer[]}): Response => {
            const newResponse: Response = {
                id: Date.now().toString(),
                submittedAt: new Date().toISOString(),
                ...args
            };
            responses.push(newResponse);
            return newResponse;
        }
    }
}
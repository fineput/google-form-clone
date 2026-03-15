import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { gql } from 'graphql-request';
import type {Answer} from '../types/questions.ts';
import type {Form} from '../types/form.ts';
import type {FormResponse} from '../types/response.ts';

export const formApi = createApi({
    reducerPath: 'formApi',
    tagTypes: ['Forms'],
    baseQuery: graphqlRequestBaseQuery({
        url: 'http://localhost:4001/graphql',
    }),
    endpoints: (builder) => ({
        getForms: builder.query<Form[], void>({
            query: () => ({
                document: `
                    query GetForms {
                        forms {
                          id
                          title
                          description
                        }
                    }
                `
            }),
            providesTags: ['Forms'],
        }),
        createForm: builder.mutation<Form, Omit<Form, 'id'>>({
            query: (newForm) => ({
                document: gql`
                    mutation CreateForm($title: String!, $description: String, $questions: [QuestionInput!]) {
                        createForm(title: $title, description: $description, questions: $questions) {
                            id
                            title
                        }
                    }
                `,
                variables: newForm,
            }),
            invalidatesTags: ['Forms']
        }),

        getForm: builder.query<{form: Form}, string>({
            query: (id) => ({
                document: gql `
                    query GetForm($id: ID!) {
                        form(id: $id) {
                            id
                            title
                            description
                            questions {
                                id
                                title
                                type
                                options
                            }
                        }
                    }
                `,
                variables: { id }
            })
        }),

        submitResponse: builder.mutation<{id: string}, {formId: string, answers: Answer[]}>({
            query: ({formId, answers}) => ({
                document: gql `
                    mutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {
                        submitResponse(formId: $formId, answers: $answers) {
                            id
                        }
                    }
                `,
                variables: {formId, answers},
            })
        }),

        getResponses: builder.query<FormResponse[], string>({
            query: (formId) => ({
                document: gql `
                    query GetResponses($formId: ID!) {
                        responses(formId: $formId) {
                            id
                            submittedAt
                            answers {
                                questionId
                                value
                            }
                        }
                    }
                `,
                variables: {formId}
            }),
            transformResponse: (response: {responses: FormResponse[]}) => response.responses
        })
    }),
});

export const { useGetFormsQuery, useCreateFormMutation, useGetFormQuery, useSubmitResponseMutation, useGetResponsesQuery } = formApi;
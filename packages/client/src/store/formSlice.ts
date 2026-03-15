import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {Question} from '../types/questions.ts';
import type {Form} from '../types/form.ts';
import type {FormResponse} from '../types/response.ts';

interface FormState {
    currentForm: Omit<Form, 'id'>;
    forms: Form[];
    responses: FormResponse[];
}

const initialState: FormState = {
    currentForm: {title: '', description: '', questions: []},
    forms: [],
    responses: [],
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        saveCurrentForm: (state) => {
            state.forms.push({
                id: Date.now().toString(),
                ...state.currentForm
            });

            state.currentForm = {title: '', description: '', questions: []}
        },

        updateField: (state, action: PayloadAction<{ field: 'title' | 'description', value: string}>) => {
            state.currentForm[action.payload.field] = action.payload.value;
        },

        addQuestions: (state, action: PayloadAction<Question>) => {
            state.currentForm.questions.push(action.payload);
        },

        removeQuestion: (state, action: PayloadAction<number>) => {
            state.currentForm.questions = state.currentForm.questions.filter(q => q.id !== action.payload)
        },

        updateQuestion: (state, action: PayloadAction<{ id: number; updates: Partial<Question> }>) => {
            const question = state.currentForm.questions.find(q => q.id === action.payload.id);
            if (question) {
                Object.assign(question, action.payload.updates);
            }
        },


        addResponse: (state, action: PayloadAction<Omit<FormResponse, 'id' | 'submittedAt'>>) => {
            const newResponse: FormResponse = {
                id: Date.now().toString(),
                submittedAt: new Date().toString(),
                ...action.payload
            }
            state.responses.push(newResponse);
        }
    }
});

export const { updateField, addQuestions, saveCurrentForm , removeQuestion, updateQuestion, addResponse} = formSlice.actions;
export default formSlice.reducer;
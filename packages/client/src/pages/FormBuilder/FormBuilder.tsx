import {useDispatch, useSelector} from "react-redux";
import { updateField, addQuestions, saveCurrentForm, removeQuestion, updateQuestion} from "../../store/formSlice.ts";
import {useNavigate} from "react-router-dom";
import type {RootState} from "../../store";
import Button from "../../components/ui/Button/Button.tsx";
import styles from './FormBuilder.module.scss';
import Input from "../../components/ui/Input/Input.tsx";
import QuestionItem from "./components/QuestionItem/QuestionItem.tsx";
import type {Question, QuestionsType} from "../../types/questions.ts";

import {useCreateFormMutation} from '../../api/formApi.ts';


const FormBuilder = () => {
    const dispatch = useDispatch();

    const currentForm = useSelector((state: RootState) => state.forms.currentForm);
    const title = currentForm.title;
    const description = currentForm.description;
    const questions = currentForm.questions;

    const navigate = useNavigate();

    const [createForm] = useCreateFormMutation();

    const handleAddQuestion = (type: QuestionsType) => {
        const typeWithOptions = ['TEXT', 'MULTIPLE_CHOICE', 'CHECKBOX', 'DATE']
        const newQuestion: Question = {
            id: Date.now(),
            title: '',
            type,
            options: typeWithOptions.includes(type) ? [''] : [],
            required: false
        };

        dispatch(addQuestions(newQuestion));
    }

    const handleSaveForm = async () => {
        if(title === ''){
            alert('Add title to form!')
            return;
        }

        try {
            await createForm({
                title,
                description: description || '',
                questions: questions.length > 0 ? questions.map(q => ({
                    id: String(q.id),
                    title: q.title,
                    type: q.type,
                    options: q.options
                })) : []
            }).unwrap();

            dispatch(saveCurrentForm());
            navigate('/')
        } catch (e) {
            console.error(e)
        }

    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.builder_container}>
                <div className={styles.header}>

                    <Input
                        value={title}
                        placeholder='Title'
                        onChange={(e) => dispatch(updateField({field: 'title', value: e.target.value }))}
                    />

                    <Input
                        value={description}
                        placeholder='Description'
                        className={styles.description}
                        onChange={(e) => dispatch(updateField({field: 'description', value: e.target.value }))}
                    />

                </div>


                {questions.map((q) => (
                    <QuestionItem
                        key={q.id}
                        question={q}
                        onDelete={(id) => dispatch(removeQuestion(id))}
                        onUpdate={(id, updates) => dispatch(updateQuestion({id, updates}))}
                    />
                ))}

                <Button
                    variant="primary"
                    onClick={() => handleAddQuestion('TEXT')}
                >
                    + Add question
                </Button>
                <Button variant="outline" size='md' onClick={handleSaveForm}>Save form</Button>

            </div>
        </div>
    );
};

export default FormBuilder;
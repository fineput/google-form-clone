import styles from './FormFiller.module.scss';
import {useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import Input from "../../components/ui/Input/Input.tsx";
import Button from "../../components/ui/Button/Button.tsx";

import type {AnswerValue} from '../../types/questions.ts';
import {useGetFormQuery, useSubmitResponseMutation} from "../../api/formApi.ts";


const FormFiller = () => {
    const { id } = useParams<{id: string}>();
    const {data, isLoading, error} = useGetFormQuery(id!);
    const [submitResponse] = useSubmitResponseMutation();
    const navigate = useNavigate();
    const [responses, setResponses] = useState<Record<number, AnswerValue>>({});

    if (isLoading) return <div>Завантаження форм...</div>
    if (error) return <div>Помилка завантаження форм!</div>

    const form = data?.form;

    if (!form) return <div>Form not found.</div>


    const handleInputChange = (questionId: number, value: AnswerValue) => {
        setResponses(prev => ({
            ...prev,
            [questionId]: value
        }))
    }



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formattedAnswers = Object.entries(responses).map(([id, value]) => ({
            questionId: id,
            value: Array.isArray(value) ? value.join(',') : String(value)
        }));

        try {
            await submitResponse({formId: id!, answers: formattedAnswers}).unwrap();
            alert('Thank you! Your response has been saved.');
            navigate('/')
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>{form.title}</h1>
                <p>{form.description}</p>
            </div>

            <form onSubmit={handleSubmit}>
                {form.questions.map((q) => (
                    <div key={q.id} className={styles.questionCard}>
                        <label className={styles.questionTitle}>
                            {q.title}
                        </label>

                        <div className={styles.answerArea}>
                            {q.type === 'TEXT' && (
                                <Input
                                    type='text'
                                    placeholder='Your answer'
                                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                                />
                            )}

                            {q.type === 'MULTIPLE_CHOICE' && q.options?.map((opt: string, index: number) => (
                                <div key={index} className={styles.optionRow}>
                                    <Input
                                        type='radio'
                                        name={`question-${q.id}`}
                                        className={styles.radioInput}
                                        id={`opt-${q.id}-${index}`}
                                        onChange={() => handleInputChange(q.id, opt)}
                                    />
                                    <label htmlFor={`opt-${q.id}-${index}`} className={styles.optionLabel}>
                                        {opt}
                                    </label>
                                </div>
                            ))}

                            {q.type === 'CHECKBOX' && q.options?.map((opt: string, index: number) => (
                                <div key={index} className={styles.optionRow}>
                                    <Input
                                        type='checkbox'
                                        className={styles.checkboxInput}
                                        onChange={(e) => {
                                            const currentAnswer = Array.isArray(responses[q.id])
                                                ? (responses[q.id] as string[])
                                                : [];

                                            const newAnswer = e.target.checked
                                                ? [...currentAnswer, opt]
                                                : currentAnswer.filter((a) => a !== opt);
                                            handleInputChange(q.id, newAnswer);
                                        }}
                                    />
                                    <label htmlFor={`check-${q.id}-${index}`} className={styles.optionLabel}>
                                        {opt}
                                    </label>
                                </div>
                            ))}

                            {q.type === 'DATE' && (
                                <Input
                                    type='date'
                                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                                />
                            )}
                        </div>
                    </div>
                ))}

                <div className={styles.footer}>
                    <Button type='submit' variant='primary'>Submit</Button>
                </div>
            </form>
        </div>
    );
};

export default FormFiller;
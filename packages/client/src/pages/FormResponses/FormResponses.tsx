import {useParams} from "react-router-dom";
import {useGetFormQuery, useGetResponsesQuery} from '../../api/formApi.ts';
import type { FormResponse } from '../../types/response.ts';
import styles from './FormResponses.module.scss'


const FormResponses = () => {
    const {id} = useParams<{id: string}>();
    const {data: formData} = useGetFormQuery(id!);
    const {data: responses = [], isLoading} = useGetResponsesQuery(id!);

    if(isLoading) return <div>Завантаження відповідей...</div>

    const form = formData?.form;
    if(!form) return <div>Form not found.</div>

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Responses for: {form.title}</h1>
                <p>Total responses: <strong>{responses.length}</strong></p>
            </div>

            {responses.length === 0 ? (
                <div className={styles.emptyState}>No responses yet.</div>
            ) : (
                <div className={styles.list}>
                    {responses.map((resp: FormResponse) => (
                        <div key={resp.id} className={styles.responseCard}>
                            <div className={styles.cardHeader}>
                                <span>📅 {new Date(resp.submittedAt).toLocaleString()}</span>
                                <span className={styles.respId}>ID: {resp.id.slice(-5)}</span>
                            </div>

                            <div className={styles.answers}>
                                {form.questions.map((q) => (
                                    <div key={q.id} className={styles.answerItem}>
                                        <p className={styles.questionlabel}>{q.title}</p>
                                        <p className={styles.answerValue}>
                                            {(() => {
                                                const answerItem = resp.answers.find(a => String(a.questionId) === String(q.id));

                                                if (!answerItem) {
                                                    return <span className={styles.noAnswer}>No answer</span>;
                                                }

                                                return answerItem.value;
                                            })()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FormResponses;
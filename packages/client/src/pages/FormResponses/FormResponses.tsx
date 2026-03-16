import {useParams} from "react-router-dom";
import {useGetFormQuery, useGetResponsesQuery} from '../../api/formApi.ts';
import {ResponseCard} from '../../components/ResponseCard/ResponseCard.tsx'
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
                    {responses.map((resp) => (
                        <ResponseCard
                            key={resp.id}
                            response={resp}
                            questions={form.questions}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FormResponses;
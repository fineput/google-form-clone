import type {FormResponse} from "../../types/response.ts";
import type {Question} from "../../types/questions.ts";
import {useAnswerFinder} from "../../hooks/useAnswerFinder.ts";
import styles from '../../pages/FormResponses/FormResponses.module.scss';

interface Props {
    response: FormResponse;
    questions: Question[];
}

export const ResponseCard = ({response, questions}: Props) => {
    const findAnswer = useAnswerFinder(response.answers);

    return(
        <div className={styles.responseCard}>
            <div className={styles.cardHeader}>
                <span>📅 {new Date(response.submittedAt).toLocaleString()}</span>
                <span>ID: {response.id.slice(-5)}</span>
            </div>
            <div className={styles.answers}>
                {questions.map((q) => (
                    <div key={q.id} className={styles.answerItem}>
                        <p className={styles.questionLabel}>{q.title}</p>
                        <p className={styles.answerValue}>
                            {findAnswer(q.id) ?? <span className={styles.noAnswer}>No answer</span>}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
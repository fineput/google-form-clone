import styles from './QuestionItem.module.scss';
import Input from "../../../../components/ui/Input/Input.tsx";
import Button from "../../../../components/ui/Button/Button.tsx";

export type QuestionsType = 'TEXT' | 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'DATE';

export interface Questions {
    id: number;
    title: string;
    type: QuestionsType;
    options?: string[];
    required: boolean;
}

interface QuestionItemProps {
    question: Questions;
    onDelete: (id: number) => void;
    onUpdate: (id: number, updates: Partial<Questions>) => void;
}

const QuestionItem = ({ question, onDelete, onUpdate}: QuestionItemProps)  => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <Input
                    value={question.title}
                    placeholder='Question'
                    className={styles.question_title}
                    onChange={(e) => onUpdate(question.id, {title: e.target.value})}
                />

                <select
                    value={question.type}
                    className={styles.typeSelect}
                    onChange={(e) => onUpdate(question.id, {type: e.target.value as QuestionsType})}
                >
                    <option value='TEXT'>Text</option>
                    <option value='MULTIPLE_CHOICE'>One of the list</option>
                    <option value='CHECKBOX'>Multiple from the list</option>
                    <option value='DATE'>Date</option>
                </select>
            </div>

            <div className={styles.body}>
                {question.type === 'MULTIPLE_CHOICE' && (
                    <div className={styles.optionList}>
                        {question.options?.map((opt, index) => (
                            <div key={index} className={styles.optionItem}>
                                <input type='radio' disabled/>
                                <input
                                    value={opt}
                                    placeholder={`Variant ${index + 1}`}
                                    onChange={(e) => {
                                        const newOptions = [...question.options!];
                                        newOptions[index] = e.target.value;
                                        onUpdate(question.id, { options: newOptions});
                                    }}
                                />
                            </div>
                        ))}
                        <Button
                            onClick={() => {
                                const newOptions = [...(question.options! || []), ''];
                                onUpdate(question.id, {options: newOptions})
                            }}
                        >+ Add variant</Button>
                    </div>
                )}

                {question.type === 'CHECKBOX' && (
                    <div className={styles.optionList}>
                        {question.options?.map((opt, index) => (
                            <div key={index} className={styles.optionItem}>
                                <input type='checkbox' disabled/>
                                <input
                                    value={opt}
                                    placeholder={`Variant ${index + 1}`}
                                    onChange={(e) => {
                                        const newOptions = [...question.options!];
                                        newOptions[index] = e.target.value;
                                        onUpdate(question.id, { options: newOptions});
                                    }}
                                />
                            </div>
                        ))}
                        <Button
                            onClick={() => {
                                const newOptions = [...(question.options! || []), ''];
                                onUpdate(question.id, {options: newOptions})
                            }}
                        >+ Add variant</Button>
                    </div>
                )}

                {question.type === 'DATE' && (
                    <input type='date' className={styles.datePicker} disabled />
                )}

                {question.type === 'TEXT' && (
                    <input type='text' placeholder='Answer' className={styles.datePicker} disabled />
                )}

                <div className={styles.footer}>
                    <Button
                        variant='primary'
                        onClick={() => onDelete(question.id)}
                    >🗑️</Button>
                </div>
            </div>
        </div>
    );
};

export default QuestionItem;
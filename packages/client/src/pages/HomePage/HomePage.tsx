import styles from './HomePage.module.scss';
import {Link} from "react-router-dom";
import Button from "../../components/ui/Button/Button.tsx";
import {useGetFormsQuery} from "../../api/formApi.ts";


const HomePage = () => {
    const {data, isLoading, error} = useGetFormsQuery();
    if (isLoading) return <div>Завантаження форм...</div>
    if (error) return <div>Помилка завантаження форм!</div>

    const forms = data?.forms || [];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Forms List</h1>
                <Link to='/forms/new'>
                    <Button size='lg'>Create new form</Button>
                </Link>
            </div>

            <div className={styles.formsList}>
                {forms.length === 0 ? (
                    <p>No forms created yet.</p>
                ) : (
                    forms.map((form: any) => (
                        <div key={form.id} className={styles.formCard}>
                            <div>
                                <h3>{form.title || "Untitled Form"}</h3>
                                <p>{form.description || "No description provided."}</p>
                            </div>
                            <div className={styles.actions}>
                                <Link to={`/forms/${form.id}/fill`}>
                                    <Button variant="outline">Fill Form</Button>
                                </Link>
                                <Link to={`/forms/${form.id}/responses`}>
                                    <Button variant="outline">View responses</Button>
                                </Link>
                            </div>
                        </div>

                    ))
                )}
            </div>
        </div>


    );
};

export default HomePage;
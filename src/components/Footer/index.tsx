import styles from './styles.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <a href="">Entnenda como funciona a tecnica pomodoro</a>
            <a href="">Geb Pomodoro &copy; {new Date().getFullYear()} - Feito com 💚</a>
        </footer>
    );
}
import { useEffect, useState } from 'react';
import styles from './ScrollTop.module.css';

const ScrollTop = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 400);
        window.addEventListener('scroll', onScroll);
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (!show) return null;

    return (
        <button
            className={styles.fab}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            title="Scroll to top"
        >
            ↑
        </button>
    );
};

export default ScrollTop;

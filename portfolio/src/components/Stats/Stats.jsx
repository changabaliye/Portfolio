/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import styles from './Stats.module.css';

const Stats = () => {
    const [isVisible, setIsVisible] = useState(false);
    const statsRef = useRef(null);

    useEffect(() => {
        const el = statsRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (el) {
            observer.observe(el);
        }

        return () => {
            if (el) {
                observer.unobserve(el);
            }
        };
    }, []);

    const Counter = ({ end, suffix = '', duration = 2000 }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            if (!isVisible) return;

            let startTime = null;
            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);

                setCount(Math.floor(progress * end));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }, [isVisible, end, duration]);

        return <span>{count}{suffix}</span>;
    };

    return (
        <section className={styles.container} ref={statsRef}>
            <div className={styles.statsGrid}>
                <div className={`${styles.statCard} ${isVisible ? styles.fadeIn : ''}`}>
                    <div className={styles.statIcon}>💼</div>
                    <h3 className={styles.statNumber}>
                        <Counter end={15} suffix="+" />
                    </h3>
                    <p className={styles.statLabel}>Projects Completed</p>
                </div>

                <div className={`${styles.statCard} ${isVisible ? styles.fadeIn : ''}`} style={{ animationDelay: '0.2s' }}>
                    <div className={styles.statIcon}>🚀</div>
                    <h3 className={styles.statNumber}>
                        <Counter end={500} suffix="+" />
                    </h3>
                    <p className={styles.statLabel}>GitHub Contributions</p>
                </div>

                <div className={`${styles.statCard} ${isVisible ? styles.fadeIn : ''}`} style={{ animationDelay: '0.4s' }}>
                    <div className={styles.statIcon}>⭐</div>
                    <h3 className={styles.statNumber}>
                        <Counter end={10} suffix="+" />
                    </h3>
                    <p className={styles.statLabel}>Technologies Mastered</p>
                </div>

                <div className={`${styles.statCard} ${isVisible ? styles.fadeIn : ''}`} style={{ animationDelay: '0.6s' }}>
                    <div className={styles.statIcon}>🏆</div>
                    <h3 className={styles.statNumber}>
                        <Counter end={100} suffix="%" />
                    </h3>
                    <p className={styles.statLabel}>Client Satisfaction</p>
                </div>
            </div>
        </section>
    );
};

export default Stats;

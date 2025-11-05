/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import styles from './ProjectModal.module.css';
import { getImageUrl } from '../../utils';

const ProjectModal = ({ open, onClose, project }) => {
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    if (!open) return null;

    const { title, imageSrc, description, highlights = [], skills = [], demo, source, category, year } = project || {};

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.close} onClick={onClose} aria-label="Close">
                    ✕
                </button>
                <div className={styles.header}>
                    <img src={getImageUrl(imageSrc)} alt={`${title} screenshot`} />
                    <div className={styles.meta}>
                        <h3>{title}</h3>
                        <div className={styles.badges}>
                            {category && <span className={styles.badge}>{category}</span>}
                            {year && <span className={styles.badge}>{year}</span>}
                        </div>
                    </div>
                </div>

                <p className={styles.description}>{description}</p>

                {highlights.length > 0 && (
                    <div className={styles.section}>
                        <h4>Highlights</h4>
                        <ul>
                            {highlights.map((h, i) => (
                                <li key={i}>{h}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {skills.length > 0 && (
                    <div className={styles.section}>
                        <h4>Tech Stack</h4>
                        <div className={styles.stack}>
                            {skills.map((s, i) => (
                                <span key={i} className={styles.stackChip}>{s}</span>
                            ))}
                        </div>
                    </div>
                )}

                <div className={styles.actions}>
                    {demo && (
                        <a className={styles.btnPrimary} href={demo} target="_blank" rel="noreferrer">Live Demo</a>
                    )}
                    {source && (
                        <a className={styles.btnGhost} href={source} target="_blank" rel="noreferrer">Source Code</a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;

/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { getImageUrl } from '../../utils'
import styles from './ProjectCard.module.css';
import ProjectModal from './ProjectModal';
import Tilt from 'react-parallax-tilt';

const ProjectCard = ({ Project: { title, imageSrc, description, skills = [], demo, source, category, year, highlights = [] }, index = 0 }) => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        io.disconnect();
      }
    }, { threshold: 0.2 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={ref} className={`${styles.container} ${visible ? styles.inView : ''}`} style={{ animationDelay: `${index * 0.12}s` }}>
        <Tilt
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          perspective={1000}
          glareEnable={true}
          glareMaxOpacity={0.3}
          glarePosition="all"
          scale={1.01}
          transitionSpeed={400}
          style={{ width: '100%', height: '100%' }}
        >
          <div className={styles.media}>
            {!loaded && <div className={styles.skeleton} />}
            <img
              loading="lazy"
              src={getImageUrl(imageSrc)}
              alt={`${title} Image`}
              className={`${styles.image} ${loaded ? styles.imageVisible : ''}`}
              onLoad={() => setLoaded(true)}
            />
            {(category || year) && (
              <div className={styles.badges}>
                {category && <span className={styles.badge}>{category}</span>}
                {year && <span className={styles.badge}>{year}</span>}
              </div>
            )}
          </div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <ul className={styles.skills}>
            {skills.map((skill, id) => (
              <li key={id} className={styles.skill}>{skill}</li>
            ))}
          </ul>
          <div className={styles.links}>
            {demo && <a href={demo} className={styles.link} target="_blank" rel="noreferrer">Demo</a>}
            {source && <a href={source} className={styles.link} target="_blank" rel="noreferrer">Source</a>}
            <button className={styles.detailsBtn} onClick={() => setOpen(true)}>View Details</button>
          </div>
        </Tilt>
      </div>

      <ProjectModal
        open={open}
        onClose={() => setOpen(false)}
        project={{ title, imageSrc, description, highlights, skills, demo, source, category, year }}
      />
    </>
  )
}

export default ProjectCard;
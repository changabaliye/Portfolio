import { getImageUrl } from '../../utils'
import styles from './Hero.module.css'
import all from '../all.module.css'
import { TypeAnimation } from 'react-type-animation';
import animationData from './TypeFun';
import { useEffect, useState } from 'react';


export const Hero = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20; // Reduced for smoother effect
    const y = (clientY / window.innerHeight - 0.5) * 20;
    setOffset({ x, y });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.titles}>
          <TypeAnimation
            className={styles.title}
            sequence={animationData.sequence}
            speed={animationData.speed}
            style={animationData.style}
            repeat={animationData.repeat}
          />
        </div>
        <p className={styles.description}>I&apos;m a MERN-stack developer with passion for building scalable web applications. Reach out if you&apos;d like to work together!</p>
        <div className={styles.btnGroup}>
          <a href="mailto:chandransu.work.01@gmail.com" className={`${styles.contactBtn} ${all.btn}`}> Contact me </a>
          <a href="/resume.pdf" download className={`${styles.resumeBtn} ${all.btn}`}> Download Resume </a>
        </div>
      </div>

      <div className={styles.imgs}>
        <img
          src={getImageUrl('hero/heroImage.webp')}
          alt='Hero Image of me'
          className={styles.heroImg}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
      </div>

      <div className={styles.topBlur}></div>
      <div className={styles.bottomBlur}></div>
    </section>
  )
}

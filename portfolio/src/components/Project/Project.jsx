/* eslint-disable react/prop-types */
import { useMemo, useState } from 'react';
import styles from './Project.module.css'
import Projects from '../../data/projects.json'
import ProjectCard from './ProjectCard'

export const Project = () => {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const tags = useMemo(() => {
    const t = new Set();
    Projects.forEach(p => (p.skills || []).forEach(s => t.add(s)));
    return ['All', ...Array.from(t).sort()];
  }, []);

  const filtered = useMemo(() => {
    return Projects.filter(p => {
      const matchesTag = activeTag === 'All' || (p.skills || []).includes(activeTag);
      const q = search.trim().toLowerCase();
      const matchesSearch = !q || [p.title, p.description, ...(p.skills || [])].join(' ').toLowerCase().includes(q);
      return matchesTag && matchesSearch;
    });
  }, [activeTag, search]);

  return (
    <section className={styles.container} id='projects'>
      <h2 className={styles.title}>Projects</h2>

      <div className={styles.toolbar}>
        <div className={styles.chips}>
          {tags.map(tag => (
            <button
              key={tag}
              className={`${styles.chip} ${activeTag === tag ? styles.chipActive : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <input
          className={styles.search}
          type="text"
          placeholder="Search projects, tech, features..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 && (
        <div className={styles.empty}>
          <p>No projects found. Try a different tag or search.</p>
        </div>
      )}

      <div className={styles.projects}>
        {filtered.map((project, id) => (
          <ProjectCard key={`${project.title}-${id}`} Project={project} index={id} />
        ))}
      </div>
    </section>
  )
}

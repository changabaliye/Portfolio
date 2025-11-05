import styles from "./App.module.css";
import { Hero } from "./components/Hero/Hero";
import { Navbar } from "./components/navbar/Navbar";
import About from "./components/About/About.jsx";
import Experience from "./components/Experience/Experience.jsx";
import { Project } from "./components/Project/Project.jsx";
import { Contact } from "./components/Contact/Contact.jsx";
import ScrollTop from "./components/ScrollTop/ScrollTop.jsx";
import Stats from "./components/Stats/Stats.jsx";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress.jsx";


const App = () => {
  return (
    <div className={styles.App}>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Experience />
      <Project />
      <Contact />
      <ScrollTop />
    </div>
  )
}

export default App
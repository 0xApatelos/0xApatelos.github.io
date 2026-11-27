import Introduction from '../components/Introduction';
import Skills from '../components/Skills';
import Education from '../components/Education';
import LatestPosts from '../components/LatestPosts';
import Projects from '../components/Projects';
import { SORTED_POSTS } from '../data/posts';

export default function Home() {
  return (
    <>
      <Introduction />
      <Projects />
      <Skills />
      <LatestPosts posts={SORTED_POSTS.slice(0, 3)} />
      <Education />
    </>
  );
}

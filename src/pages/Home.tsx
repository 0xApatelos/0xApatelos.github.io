import Introduction from '../components/Introduction';
import Skills from '../components/Skills';
import Education from '../components/Education';
import LatestPosts from '../components/LatestPosts';
import Projects from '../components/Projects';
import { SORTED_POSTS } from '../data/posts';
import { useGitHubRepos } from '../hooks/useGitHubRepos';

const FEATURED_COUNT = 3;

export default function Home() {
  const { repos, loading, error, refetch } = useGitHubRepos();

  return (
    <>
      <Introduction />
      <Projects repos={repos.slice(0, FEATURED_COUNT)} loading={loading} error={error} onRetry={refetch} />
      <Skills />
      <LatestPosts posts={SORTED_POSTS.slice(0, 3)} />
      <Education />
    </>
  );
}

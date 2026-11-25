import Introduction from '../components/Introduction';
import Skills from '../components/Skills';
import Education from '../components/Education';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import LatestPosts from '../components/LatestPosts';
import Projects from '../components/Projects';
import { SORTED_POSTS } from '../data/posts';

const FEATURED_COUNT = 3;

export default function Home() {
  const { repos, loading, error, refetch } = useGitHubRepos();
  const latestPosts = SORTED_POSTS.slice(0, FEATURED_COUNT);

  return (
    <>
      <Introduction />
      <Skills />
      <Projects repos={repos.slice(0, FEATURED_COUNT)} loading={loading} error={error} onRetry={refetch} />
      <LatestPosts posts={latestPosts} />
      <Education />
    </>
  );
}

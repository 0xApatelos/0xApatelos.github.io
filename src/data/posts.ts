import { BlogPost } from '../types';

/** English editions of the existing articles. IDs, publication dates, and tags stay stable. */
export const POSTS: BlogPost[] = [
  {
    id: 1,
    title: "My Introduction to AI & Prompt Engineering",
    description: "How I became interested in AI, and how clearer prompts changed the way I learn and work.",
    date: "2026-11-18",
    readTime: "5 min read",
    tags: ["AI", "Prompt Engineering"],
    content: `My introduction to AI began in my third semester, when I first tried ChatGPT. It made me realize how much the quality of an answer depends on how clearly I explain the problem.

## What is prompt engineering?

Prompt engineering means designing instructions that give an AI model enough context, constraints, and a useful output format. It is more than asking a question and accepting the first response.

The principles I return to most often are:

- **Provide context** — explain the background and goal.
- **Specify the format** — ask for a comparison, a short list, or a structured explanation.
- **Include an example** — a concrete example can communicate expectations better than a long instruction.
- **Iterate** — review the output and refine the request.

## Comparing models

I started experimenting with GPT, Gemini, and Claude. Different models interpret the same context differently, so comparing responses helps me choose an approach rather than assume one tool is always best.

> Compare responses to the same task, then check the claims against documentation or an actual test.

## AI as a coding partner

AI can help with boilerplate, debugging ideas, and discussing architecture. I still need to understand and review the changes.

\`\`\`text
My workflow:
1. Describe the problem and project context.
2. Ask for two or three approaches.
3. Choose an approach and implement it.
4. Review the changes and explain the trade-offs.
\`\`\`

I want to keep exploring applied AI, especially where it can support practical work without hiding the reasoning or verification.`,
  },
  {
    id: 2,
    title: "Building a Portfolio with React & TypeScript",
    description: "A practical introduction to this portfolio’s React, TypeScript, Vite, and Tailwind CSS stack.",
    date: "2026-10-02",
    readTime: "8 min read",
    tags: ["Web", "React", "Tutorial"],
    content: `A portfolio gives a developer a place to explain their projects, decisions, and interests. It should make the work easy to inspect, not just display a list of technologies.

## The stack I use

- **React 18 and TypeScript** for components and type checking.
- **Vite** for the development server and production build.
- **Tailwind CSS** for consistent styling.
- **React Router** for client-side navigation.
- **GitHub Pages** for static hosting.

## Why Vite?

Create React App is no longer the recommended starting point for new projects. Vite provides a fast development loop, hot module replacement, and a straightforward production build.

\`\`\`bash
npm create vite@latest my-portfolio -- --template react-ts
cd my-portfolio
npm install
npm run dev
\`\`\`

## What makes a useful portfolio?

- Show real projects and explain your contribution.
- Write a specific, honest introduction.
- Make the layout usable on smaller screens.
- Provide clear links to source code, documentation, and a CV.
- Use motion sparingly and respect reduced-motion preferences.

A dark theme can be useful, but it is not a substitute for readable contrast, clear navigation, or good content.

## Performance and discoverability

Page titles, descriptions, and optimized images deserve attention too. A client-rendered application also has indexing and social-preview limitations that static meta tags alone do not solve.

This portfolio is an opportunity to practice those decisions. Its source is public, including the setup instructions and quality-check commands.`,
  },
  {
    id: 3,
    title: "Getting Started with Data Science in Python",
    description: "Notes from learning Python, pandas, and scikit-learn through exploratory clustering work.",
    date: "2026-08-14",
    readTime: "6 min read",
    tags: ["Data Science", "Python"],
    content: `One of the courses that stayed with me was Introduction to Data Science, where I worked with Python to explore and process data.

## The main tools

- **Python** as the programming language.
- **pandas** for data manipulation.
- **scikit-learn** for machine learning algorithms.
- **Matplotlib** for visualization.

## A repeatable workflow

1. **Collect** data from a file, API, or database.
2. **Clean** missing values, duplicates, and inconsistent entries.
3. **Explore** the data with descriptive statistics and plots.
4. **Model** using a method appropriate to the question.
5. **Communicate** the findings and their limitations.

## K-Means clustering

Clustering was an interesting way to explore structure without predefined labels.

\`\`\`python
from sklearn.cluster import KMeans

# scaled_data must be prepared before fitting.
kmeans = KMeans(n_clusters=3, random_state=42)
clusters = kmeans.fit_predict(scaled_data)
\`\`\`

Choosing the number of clusters should not be an arbitrary decision. The elbow method and silhouette score can inform the choice, but domain interpretation still matters.

## The main lesson

Data preparation can take a substantial part of a project. A more sophisticated model does not compensate for unclear definitions or inconsistent input.

> Better data and a clear question often matter more than a complicated algorithm.

An exploratory clustering result is not automatically a validated classification system. That distinction is important when explaining a learning project.`,
  },
  {
    id: 4,
    title: "Git Fundamentals for Informatics Students",
    description: "Branches, merges, rebases, and pull requests: a workflow for coursework and personal projects.",
    date: "2026-06-20",
    readTime: "7 min read",
    tags: ["Git", "Developer Tools"],
    content: `It is easy to memorize git add and git commit without understanding what they do. A useful starting point is the relationship between the working directory, staging area, and repository history.

## The three areas

\`\`\`bash
git status                    # inspect changes
git add .                     # stage changes after reviewing them
git commit -m "Describe change" # save a snapshot
\`\`\`

The staging area lets me choose what belongs in a commit rather than save every unrelated change together.

## Small branches help

A branch does not need to contain a large feature. It can hold a documentation fix, pagination change, or focused refactor.

- A small scope is easier to review.
- Unsuccessful work is easier to set aside.
- The reason for a change is easier to explain.

## Merge and rebase

**Merge** preserves the existing branch history. **Rebase** replays commits onto another base, producing a more linear history but rewriting commit identities.

My practical rule is to avoid rebasing shared history without coordinating with the people using it.

## Pull requests that are easier to review

1. Keep commits focused and clearly named.
2. Explain **why** the change is needed, not just what changed.
3. Include tests or manual verification steps.
4. Avoid combining unrelated refactoring and features.

A good Git workflow is a communication tool as much as a way to preserve code.`,
  },
  {
    id: 5,
    title: "Understanding REST APIs and HTTP Semantics",
    description: "Resource-oriented endpoints, HTTP methods, idempotency, and useful error responses.",
    date: "2026-04-11",
    readTime: "6 min read",
    tags: ["Backend", "API"],
    content: `Most web projects eventually need to exchange data through an API. The term REST is common, but naming an endpoint does not by itself make an API RESTful.

## REST is not a framework

REST is an architectural style. Resource-oriented URLs, stateless requests, and meaningful HTTP behavior are useful starting points.

- Prefer resource names such as /articles over action names such as /getArticles.
- Include the information needed to process each request.
- Choose methods according to their semantics.

## Methods and idempotency

- **GET** reads a representation and should not change server state.
- **POST** commonly creates a resource or submits an operation; it is not inherently idempotent.
- **PUT** replaces the state at a target and is idempotent.
- **PATCH** makes a partial change; whether it is idempotent depends on the operation.
- **DELETE** is idempotent in its intended state change, even if repeated response codes differ.

Idempotency matters when a client retries after a timeout.

\`\`\`text
GET    /api/articles       -> list articles
GET    /api/articles/42    -> retrieve one article
POST   /api/articles       -> create an article
DELETE /api/articles/42    -> delete an article
\`\`\`

## Useful error responses

Do not turn every failure into a 500 response. Distinguish invalid input, missing authentication, insufficient permission, missing resources, and rate limits.

Working with the GitHub API in this portfolio is a practical reminder: a client can respond more clearly when the server provides meaningful status codes.`,
  },
  {
    id: 6,
    title: "Building a Consistent Learning Routine",
    description: "Small practice sessions, concrete projects, and choosing a focus instead of chasing every trend.",
    date: "2026-02-27",
    readTime: "5 min read",
    tags: ["Career", "Learning"],
    content: `I used to set large learning goals at the beginning of a year, only to lose momentum later. A smaller routine turned out to be easier to sustain.

## A system matters more than motivation

Motivation changes from day to day. A routine provides a place to return to.

- **Practice in small sessions.** A manageable daily habit is easier to maintain than an occasional marathon.
- **Learn through a project.** A real task exposes gaps that a tutorial can hide.
- **Choose one focus at a time.** Switching tools constantly makes it hard to develop depth.

## Build something useful

Instead of only watching lessons, I try to apply them to a small need. A portfolio page or a simple automation script gives the learning a concrete goal.

## Write notes in my own words

If I cannot explain a concept clearly, I probably need to revisit it. Writing is a way to discover the parts I only thought I understood.

## Accept getting stuck

Learning a new tool includes a period of confusion. Breaking the task into smaller questions helps more than switching to another course immediately.

> Does this technology solve a problem I am currently facing?

That question helps me decide what to study now and what to save for later. A trend can wait; understanding the underlying concept will usually remain useful.`,
  },
  {
    id: 7,
    title: "Docker for Beginners: Towards Reproducible Environments",
    description: "Containers, images, and the commands that make development environments easier to reproduce.",
    date: "2025-12-08",
    readTime: "7 min read",
    tags: ["DevOps", "Docker"],
    content: `“It works on my machine” usually means important parts of the environment have not been documented or reproduced. Containers can help make those dependencies explicit.

## Containers and virtual machines

A virtual machine runs a guest operating system. Containers isolate application processes while sharing a kernel with their host environment. Neither is automatically the right answer for every workload.

## Three core concepts

1. An **image** packages a filesystem and configuration.
2. A **container** is a running instance of an image.
3. A **Dockerfile** describes how to build an image.

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
\`\`\`

This is a development example, not a production deployment recipe. Exclude node_modules and secrets with a .dockerignore file.

## Useful commands

\`\`\`bash
docker build -t my-app .
docker run --rm -p 127.0.0.1:5173:5173 my-app
docker ps
docker logs -f <container>
docker compose up -d
\`\`\`

## Multiple services

Docker Compose can describe an application and its database together. Keep credentials out of committed configuration and make persistent storage and teardown behavior explicit.

## When Docker is unnecessary

A short script with simple dependencies may not need containers. Start with the simplest environment that another person can reproduce, then add tooling when it solves a specific problem.`,
  },
  {
    id: 8,
    title: "Reading Developer Job Listings: Signal and Noise",
    description: "How to distinguish essential requirements from optional tools and turn a job description into a learning plan.",
    date: "2025-10-19",
    readTime: "6 min read",
    tags: ["Career", "Tips"],
    content: `A long list of technologies can make a job listing look intimidating. I find it more useful to identify the problem the team needs someone to solve.

## Read beyond the tool list

- Repeated **must-have** requirements usually indicate core responsibilities.
- **Nice-to-have** items are useful context, not necessarily a reason to rule myself out.
- A long stack list may describe a team’s environment rather than the daily work of one person.

## Signals worth checking

1. **How the team explains its problems.** Specific responsibilities are more useful than a page of buzzwords.
2. **The interview process.** Clear stages and expectations help both sides prepare.
3. **Compensation and work arrangements.** Transparency makes it easier to assess whether a role is a fit.

## Let the portfolio provide evidence

A relevant project is easier to discuss when it has:

- A working demo or reproducible setup instructions.
- A clearly stated problem and scope.
- Readable code and documented error handling.
- An explanation of personal contribution and remaining limitations.

> An interviewer does not need proof that I know everything. They need evidence of how I learn and approach a problem.

## One useful next step

Choose a listing, compare its main responsibilities with the work in the portfolio, and identify three gaps to work on. The goal is direction, not a checklist of every technology mentioned.`,
  },
  {
    id: 9,
    title: "Practical Algorithms and Data Structures in Small Projects",
    description: "Lookup tables, debouncing, binary search, and tree traversal beyond interview exercises.",
    date: "2025-08-05",
    readTime: "6 min read",
    tags: ["Computer Science", "Tips"],
    content: `Algorithm analysis can feel separate from everyday application development. In practice, familiar patterns appear in simple features such as search, navigation, and data lookup.

## Hash maps for repeated lookups

If I repeatedly need an item by ID, indexing once can be clearer and more efficient than scanning the full list on every request.

\`\`\`javascript
const byId = new Map(items.map(item => [item.id, item]));
const target = byId.get(42);
\`\`\`

Hash-map lookups are typically constant time on average, with a memory trade-off.

## Debouncing search input

A small delay after the last keystroke can prevent unnecessary requests. The right delay depends on the interaction; it is not a universal performance fix.

## Binary search

Binary search is useful when the data or predicate has the required ordering. Without that assumption, dividing the search space does not guarantee a correct result.

## Traversing hierarchies

Folders, navigation trees, and nested data often lead to depth-first or breadth-first traversal. A recursive implementation also needs sensible limits for very deep input.

## Choose according to the problem

Not every project needs a specialized tree or dynamic-programming solution. Understanding the access pattern and data size should come first.

> Algorithms are a way to reason about efficiency, not just material to memorize for interviews.

Recognizing a repeated linear scan or an unnecessary request is already a useful application of that reasoning.`,
  },
  {
    id: 10,
    title: "End-of-Semester Notes: Learning and Next Steps",
    description: "A reflection on learning habits, unfinished work, and choosing a smaller set of priorities.",
    date: "2025-06-15",
    readTime: "4 min read",
    tags: ["Career", "Learning"],
    content: `At the end of a semester, I try to set aside time for an honest review. The aim is not to make the period look productive, but to understand which habits are worth keeping.

## What helped

- **Writing regularly** made it easier to notice gaps in my understanding.
- **Finishing a project through deployment** taught more than moving between half-finished ideas.
- **Asking questions** was usually more useful than staying silent when something was unclear.

## What did not help

- **Too many tutorials at once.** One resource connected to one project is a better starting point.
- **Postponing debugging.** Recording the reproduction steps immediately prevents losing the context.
- **Ignoring rest and exercise.** Concentration depends on more than technical knowledge.

## Priorities for the next learning cycle

1. **Depth over breadth.** Understand one stack before adding another.
2. **Small open-source contributions.** Documentation and focused issue reports are useful ways to start.
3. **Clear written communication.** Practice explaining changes through notes, pull requests, and technical documentation.

## A reminder

> Ship small, review the result, and improve the next iteration.

These are learning goals, not claims that everything is already complete. Keeping the list short makes progress easier to inspect and adjust.`,
  },
 ];

/** Shared newest-first order for Home, Blog, and route titles. */
export const SORTED_POSTS: BlogPost[] = [...POSTS].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export const ALL_TAGS: string[] = Array.from(
  new Set(POSTS.flatMap(post => post.tags))
).sort();

/** Explicit English locale, independent of the visitor's browser language. */
export function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
}

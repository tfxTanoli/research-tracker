/**
 * Seed library. Loaded once, the first time the app runs on a device;
 * after that the user's own saved data takes over (see utils/storage.js).
 */
export const SAMPLE_RESEARCH = [
  {
    id: 'res-001',
    title: 'Future of Generative AI in Software Development',
    description:
      'How generative models are reshaping day-to-day engineering work, and where they still fall short.',
    notes:
      'Strongest gains show up in code review, test generation and migration work rather than greenfield feature building. Two consistent findings across the studies I read: review latency drops sharply, but defect escape rate only improves when a human still signs off. Worth tracking whether the productivity numbers hold once teams pass the novelty period — most of the published data covers the first 90 days only. Open question for the write-up: how much of the gain is model quality vs. better tooling around the model?',
    url: 'https://arxiv.org/abs/2302.06590',
    tags: ['Artificial Intelligence', 'Development', 'Engineering'],
    priority: 'Critical',
    status: 'In Progress',
    sourceType: 'Paper',
    readingTime: 22,
    favorite: true,
    createdAt: '2026-06-14T09:20:00.000Z',
    updatedAt: '2026-08-28T16:45:00.000Z',
  },
  {
    id: 'res-002',
    title: 'React Server Components vs Client Components',
    description:
      'When to reach for server components, and the real cost of getting the boundary wrong.',
    notes:
      'The mental model that finally stuck: server components are about where the data lives, not about interactivity. Push the boundary as far down the tree as possible — a single "use client" near the root drags the whole subtree into the bundle. Measured a 38% payload reduction on the docs prototype by moving the layout shell to the server and keeping only the command palette on the client. Still need to test streaming behaviour on slow 3G before recommending this to the team.',
    url: 'https://react.dev/reference/rsc/server-components',
    tags: ['React', 'Development', 'Engineering'],
    priority: 'High',
    status: 'Reviewing',
    sourceType: 'Documentation',
    readingTime: 15,
    favorite: true,
    createdAt: '2026-05-02T11:05:00.000Z',
    updatedAt: '2026-08-25T10:12:00.000Z',
  },
  {
    id: 'res-003',
    title: 'Modern SaaS Pricing Strategies',
    description:
      'Comparing seat-based, usage-based and hybrid pricing across mid-market B2B products.',
    notes:
      'Hybrid pricing (a small seat fee plus metered usage) is winning in tooling categories because it keeps the entry price low without capping expansion revenue. The trap is billing predictability — teams churn when invoices swing month to month, so successful hybrids ship spend caps and forecasts alongside the meter. Collected pricing pages from 14 comparable products; the median free tier now caps on volume, not features. Next step: build the comparison table for the pricing memo.',
    url: 'https://www.paddle.com/resources/saas-pricing-models',
    tags: ['SaaS', 'Business', 'Market Research'],
    priority: 'High',
    status: 'In Progress',
    sourceType: 'Article',
    readingTime: 18,
    favorite: false,
    createdAt: '2026-04-18T08:40:00.000Z',
    updatedAt: '2026-08-21T14:30:00.000Z',
  },
  {
    id: 'res-004',
    title: 'Remote Work Productivity Research',
    description:
      'What the longitudinal studies actually say about distributed teams and output.',
    notes:
      'The headline effect is much smaller than either side of the debate claims — roughly flat on individual output, with the variance concentrated in onboarding and cross-team collaboration. Hybrid schedules with fixed anchor days outperform both fully remote and fully in-office arrangements in the studies with the cleanest controls. Useful counterpoint: self-reported productivity consistently overstates measured productivity by a wide margin, so survey-only studies need discounting.',
    url: 'https://www.nber.org/papers/w31515',
    tags: ['Remote Work', 'Productivity', 'Psychology'],
    priority: 'Medium',
    status: 'Completed',
    sourceType: 'Paper',
    readingTime: 30,
    favorite: false,
    createdAt: '2026-03-09T13:15:00.000Z',
    updatedAt: '2026-07-30T09:05:00.000Z',
  },
  {
    id: 'res-005',
    title: 'AI Agents and Autonomous Workflows',
    description:
      'Architectures for multi-step agents: planning loops, tool use, and where they break.',
    notes:
      'Failure modes cluster around three things: no ground truth for "done", unbounded retry loops, and tool outputs that silently exceed the context budget. The designs that hold up in production keep the agent narrow, checkpoint state outside the model, and make every tool call idempotent. Bookmarked two reference implementations to read line by line. I want a short internal doc on this by the end of the month.',
    url: 'https://lilianweng.github.io/posts/2023-06-23-agent/',
    tags: ['Artificial Intelligence', 'Development', 'Productivity'],
    priority: 'Critical',
    status: 'To Research',
    sourceType: 'Article',
    readingTime: 26,
    favorite: true,
    createdAt: '2026-07-22T15:50:00.000Z',
    updatedAt: '2026-08-30T11:40:00.000Z',
  },
  {
    id: 'res-006',
    title: 'Behavioral Psychology in Product Design',
    description:
      'Using habit loops and friction deliberately — without drifting into dark patterns.',
    notes:
      'The useful distinction is between reducing friction on the path someone already intended to take and manufacturing compulsion. Progress indicators, sensible defaults and completion cues are legitimate; artificial scarcity and confirm-shaming are not, and they measurably erode trust over longer horizons. Sketching a short internal checklist so design reviews can name the difference rather than argue about it.',
    url: 'https://www.nirandfar.com/how-to-manufacture-desire/',
    tags: ['Psychology', 'Design', 'Productivity'],
    priority: 'Medium',
    status: 'Reviewing',
    sourceType: 'Article',
    readingTime: 12,
    favorite: false,
    createdAt: '2026-05-27T10:00:00.000Z',
    updatedAt: '2026-08-12T17:20:00.000Z',
  },
  {
    id: 'res-007',
    title: 'Firebase vs Supabase for Startup MVPs',
    description:
      'Trade-offs in data modelling, pricing curve and lock-in for a small team shipping fast.',
    notes:
      'Supabase wins when the data is genuinely relational and you want an exit path — it is Postgres underneath, so migrating later is a normal database migration. Firebase wins on realtime ergonomics and mobile SDK maturity. The decision usually comes down to whether the team already knows SQL. Cost crossover in the spreadsheet lands around 40k monthly active users; below that the difference is noise.',
    url: 'https://supabase.com/alternatives/supabase-vs-firebase',
    tags: ['Development', 'SaaS', 'Engineering'],
    priority: 'Low',
    status: 'Completed',
    sourceType: 'Article',
    readingTime: 10,
    favorite: false,
    createdAt: '2026-02-11T07:30:00.000Z',
    updatedAt: '2026-06-18T08:55:00.000Z',
  },
  {
    id: 'res-008',
    title: 'Micro SaaS Market Opportunities',
    description:
      'Where small, focused products still beat incumbents — and how to size those niches.',
    notes:
      'The repeatable pattern is a workflow that a large platform serves at 70% quality because it sits outside their core loop. Distribution matters more than the product here: every profitable example I looked at was attached to an existing marketplace, community or app ecosystem. Building a shortlist of 12 candidate niches with rough demand signals from search volume and forum activity.',
    url: 'https://www.indiehackers.com/products',
    tags: ['SaaS', 'Business', 'Market Research'],
    priority: 'Medium',
    status: 'Idea',
    sourceType: 'Report',
    readingTime: 14,
    favorite: false,
    createdAt: '2026-08-05T12:25:00.000Z',
    updatedAt: '2026-08-19T13:10:00.000Z',
  },
  {
    id: 'res-009',
    title: 'Mobile UX Design Patterns',
    description:
      'Thumb reach, bottom sheets and navigation patterns for comfortable one-handed use.',
    notes:
      'Primary actions belong in the lower third of the screen — reach data has been consistent on this for a decade and most dashboards still ignore it. Bottom sheets outperform centred dialogs on phones for anything with a form inside. Note for our own build: 44px minimum touch targets, and never place a destructive action adjacent to a common one without spacing between them.',
    url: 'https://m3.material.io/foundations/layout/applying-layout/window-size-classes',
    tags: ['Design', 'UX', 'Productivity'],
    priority: 'High',
    status: 'To Research',
    sourceType: 'Documentation',
    readingTime: 16,
    favorite: false,
    createdAt: '2026-07-01T09:45:00.000Z',
    updatedAt: '2026-08-27T15:05:00.000Z',
  },
  {
    id: 'res-010',
    title: 'Search Experience Optimization',
    description:
      'Ranking, typo tolerance and empty states in product search interfaces.',
    notes:
      'Three cheap wins before anyone touches ranking: typo tolerance, synonym mapping for domain jargon, and a genuinely useful zero-results state that suggests a next step. Instant search below ~120ms feels like filtering; above ~300ms it feels like waiting, and people stop typing to look at the results. Debounce is a blunt instrument — prefer keeping the query fast enough not to need one.',
    url: 'https://www.algolia.com/doc/guides/managing-results/relevance-overview/',
    tags: ['UX', 'Design', 'Development'],
    priority: 'Low',
    status: 'Archived',
    sourceType: 'Documentation',
    readingTime: 11,
    favorite: false,
    createdAt: '2026-01-24T14:00:00.000Z',
    updatedAt: '2026-05-14T10:35:00.000Z',
  },
  {
    id: 'res-011',
    title: 'Design Systems at Scale',
    description:
      'Keeping tokens, components and documentation in sync across several product teams.',
    notes:
      'Adoption fails on governance, not on tooling. The systems that stick have a named owner, a visible contribution path, and a deprecation policy people actually trust. Token layering (primitive to semantic to component) is what makes theming survive a rebrand. Want to compare how three public systems handle versioning before proposing ours.',
    url: 'https://designsystemsrepo.com/design-systems/',
    tags: ['Design', 'Engineering', 'Productivity'],
    priority: 'Medium',
    status: 'Idea',
    sourceType: 'Article',
    readingTime: 13,
    favorite: false,
    createdAt: '2026-08-16T08:10:00.000Z',
    updatedAt: '2026-08-16T08:10:00.000Z',
  },
  {
    id: 'res-012',
    title: 'Vector Databases for Semantic Retrieval',
    description:
      'Index types, recall trade-offs, and when a plain keyword search is still the right answer.',
    notes:
      'HNSW is the sensible default; IVF only pays off at very large collections where memory is the binding constraint. The consistent lesson across the benchmarks: hybrid retrieval (keyword plus vector, fused) beats either alone on real product queries, because exact identifiers and product names are precisely where embeddings are weakest. Chunking strategy moves recall more than the index choice does.',
    url: 'https://www.pinecone.io/learn/vector-database/',
    tags: ['Artificial Intelligence', 'Engineering', 'Development'],
    priority: 'High',
    status: 'In Progress',
    sourceType: 'Article',
    readingTime: 19,
    favorite: false,
    createdAt: '2026-06-29T16:35:00.000Z',
    updatedAt: '2026-08-31T09:15:00.000Z',
  },
]

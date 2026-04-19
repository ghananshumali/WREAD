export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  coverImage: string;
  author: Author;
  publishDate: string;
  readTime: number;
  tags: string[];
  likes: number;
  comments: number;
  bookmarked?: boolean;
}

export const authors: Author[] = [
  { id: "1", name: "Elena Voss", avatar: "", bio: "Writer exploring the intersection of technology and human experience.", followers: 2340, following: 180 },
  { id: "2", name: "Marcus Chen", avatar: "", bio: "Software engineer turned essayist. Thinking about systems, design, and craft.", followers: 5120, following: 95 },
  { id: "3", name: "Aria Nakamura", avatar: "", bio: "Researcher in AI ethics. Writing about the future we're building.", followers: 8900, following: 210 },
  { id: "4", name: "James Whitfield", avatar: "", bio: "Productivity coach and minimalist living advocate.", followers: 3200, following: 150 },
];

export const articles: Article[] = [
  {
    id: "1",
    title: "The Quiet Art of Paying Attention",
    subtitle: "In a world of infinite distractions, the ability to focus is becoming the most valuable skill.",
    content: `<p>We live in an age of abundance — abundant information, abundant choices, abundant noise. And yet, something essential feels scarce: our attention.</p>
<p>The ability to sit with a single thought, to read deeply, to listen without formulating a response — these are becoming rare acts. Not because we've lost the capacity, but because we've built environments that constantly pull us away.</p>
<h2>The Cost of Fragmented Focus</h2>
<p>Every notification, every tab, every scroll is a micro-decision. And each micro-decision costs something. Cognitive scientists call it "attention residue" — the mental fog that lingers when you switch between tasks.</p>
<blockquote>The irony of our time is that we have more tools for productivity than ever, yet we feel less productive than ever.</blockquote>
<p>Consider this: the average knowledge worker checks email 74 times per day and switches tasks every 3 minutes. Each switch carries a cost — not just in time, but in depth of thought.</p>
<h2>Reclaiming Depth</h2>
<p>The solution isn't to reject technology wholesale. It's to become intentional about how we deploy our attention. Here are three principles that have helped:</p>
<ul>
<li><strong>Single-tasking</strong> — Do one thing at a time. Not as a productivity hack, but as a practice of respect for the work.</li>
<li><strong>Environmental design</strong> — Remove friction from focus. Put your phone in another room. Close unnecessary tabs. Create physical and digital spaces that support depth.</li>
<li><strong>Scheduled distraction</strong> — Instead of taking breaks from distraction, take breaks from focus. Schedule times when you'll check email, social media, and news.</li>
</ul>
<p>Attention is not just a resource — it's the lens through which we experience life. Where we place it determines who we become.</p>`,
    coverImage: "",
    author: authors[0],
    publishDate: "2025-03-15",
    readTime: 6,
    tags: ["Mindfulness", "Productivity"],
    likes: 342,
    comments: 28,
  },
  {
    id: "2",
    title: "Building Software That Lasts",
    subtitle: "Why the best code is the code you don't have to think about.",
    content: `<p>There's a particular kind of software that feels invisible. You use it every day without noticing it. It doesn't crash, it doesn't confuse, it simply works.</p><p>Building that kind of software is an act of empathy.</p>`,
    coverImage: "",
    author: authors[1],
    publishDate: "2025-03-10",
    readTime: 8,
    tags: ["Programming", "Software Design"],
    likes: 521,
    comments: 45,
  },
  {
    id: "3",
    title: "What AI Can't Replace",
    subtitle: "As machines get smarter, the uniquely human skills become more valuable — not less.",
    content: `<p>The conversation about AI replacing jobs is missing something important.</p>`,
    coverImage: "",
    author: authors[2],
    publishDate: "2025-03-08",
    readTime: 10,
    tags: ["AI", "Technology", "Future"],
    likes: 1205,
    comments: 89,
  },
  {
    id: "4",
    title: "The Minimalist Morning",
    subtitle: "A case for doing less before 9 AM.",
    content: `<p>Most morning routine advice adds complexity. Here's a different approach.</p>`,
    coverImage: "",
    author: authors[3],
    publishDate: "2025-03-05",
    readTime: 5,
    tags: ["Lifestyle", "Productivity"],
    likes: 198,
    comments: 15,
  },
  {
    id: "5",
    title: "Design Systems Are Gardens",
    subtitle: "They need tending, pruning, and patience to flourish.",
    content: `<p>A design system is not a project with a start and end date. It's a living thing.</p>`,
    coverImage: "",
    author: authors[1],
    publishDate: "2025-02-28",
    readTime: 7,
    tags: ["Design", "Technology"],
    likes: 410,
    comments: 33,
  },
  {
    id: "6",
    title: "Learning in Public",
    subtitle: "Why sharing your process matters more than sharing your results.",
    content: `<p>We celebrate expertise but rarely the messy path to get there.</p>`,
    coverImage: "",
    author: authors[0],
    publishDate: "2025-02-20",
    readTime: 4,
    tags: ["Education", "Growth"],
    likes: 278,
    comments: 22,
  },
];

export const topics = [
  "Technology", "Programming", "AI", "Startups", "Productivity",
  "Lifestyle", "Science", "Education", "Design", "Writing",
  "Philosophy", "Health",
];

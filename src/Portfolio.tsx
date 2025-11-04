import React, { useState, useMemo } from 'react';

// --- MOCK DATA ---
// We'll define our project types and mock data here.

type ProjectCategory = 'Video' | 'Design';

interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  posterUrl: string;
  hoverUrl: string; // This will be used for the hover-play effect
  aspect: 'portrait' | 'landscape';
}

// Using placehold.co for clean, fast placeholders
const mockProjects: Project[] = [
  {
    id: 1,
    title: 'Project Alpha',
    category: 'Video',
    posterUrl: 'https://placehold.co/900x1600/111111/f8f8f8?text=Project+Alpha',
    hoverUrl: 'https://placehold.co/900x1600/0070F3/ffffff?text=Alpha+PLAY',
    aspect: 'portrait',
  },
  {
    id: 2,
    title: 'Project Bravo',
    category: 'Video',
    posterUrl: 'https://placehold.co/900x1600/111111/f8f8f8?text=Project+Bravo',
    hoverUrl: 'https://placehold.co/900x1600/0070F3/ffffff?text=Bravo+PLAY',
    aspect: 'portrait',
  },
  {
    id: 3,
    title: 'Project Charlie',
    category: 'Design',
    posterUrl: 'https://placehold.co/900x1600/111111/f8f8f8?text=Project+Charlie',
    hoverUrl: 'https://placehold.co/900x1600/0070F3/ffffff?text=Charlie+PLAY',
    aspect: 'portrait',
  },
  {
    id: 4,
    title: 'Project Delta',
    category: 'Video',
    posterUrl: 'https://placehold.co/900x1600/111111/f8f8f8?text=Project+Delta',
    hoverUrl: 'https://placehold.co/900x1600/0070F3/ffffff?text=Delta+PLAY',
    aspect: 'portrait',
  },
  {
    id: 5,
    title: 'Project Echo',
    category: 'Design',
    posterUrl: 'https://placehold.co/1600x900/111111/f8f8f8?text=Project+Echo',
    hoverUrl: 'https://placehold.co/1600x900/0070F3/ffffff?text=Echo+PLAY',
    aspect: 'landscape',
  },
  {
    id: 6,
    title: 'Project Foxtrot',
    category: 'Video',
    posterUrl: 'https://placehold.co/1600x900/111111/f8f8f8?text=Project+Foxtrot',
    hoverUrl: 'https://placehold.co/1600x900/0070F3/ffffff?text=Foxtrot+PLAY',
    aspect: 'landscape',
  },
  {
    id: 7,
    title: 'Project Golf',
    category: 'Design',
    posterUrl: 'https://placehold.co/1600x900/111111/f8f8f8?text=Project+Golf',
    hoverUrl: 'https://placehold.co/1600x900/0070F3/ffffff?text=Golf+PLAY',
    aspect: 'landscape',
  },
  {
    id: 8,
    title: 'Project Hotel',
    category: 'Video',
    posterUrl: 'https://placehold.co/1600x900/111111/f8f8f8?text=Project+Hotel',
    hoverUrl: 'https://placehold.co/1600x900/0070F3/ffffff?text=Hotel+PLAY',
    aspect: 'landscape',
  },
];

// --- HELPER COMPONENTS ---
// We define smaller, reusable components here.

// Social Media Icons (Simple SVGs)
const IconMail = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconLinkedin = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const IconInstagram = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// --- PROJECT CARD COMPONENT ---

interface ProjectCardProps {
  project: Project;
  isFilmstrip?: boolean; // To handle the 9:16 aspect ratio
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isFilmstrip = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    backgroundImage: `url(${isHovered ? project.hoverUrl : project.posterUrl})`,
  };

  const aspectClass = isFilmstrip
    ? 'aspect-[9/16] w-60' // Portrait for filmstrip
    : 'aspect-video'; // Landscape for main gallery

  return (
    <a
      href="#"
      className={`group relative ${aspectClass} flex-shrink-0 overflow-hidden rounded-lg bg-cover bg-center transition-all duration-300 ease-in-out`}
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20 transition-all duration-300 group-hover:bg-opacity-0"></div>
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="font-heading text-lg font-bold text-white shadow-black [text-shadow:_0_1px_4px_rgb(0_0_0_/_50%)]">
          {project.title}
        </h3>
        <span className="rounded-full bg-black bg-opacity-50 px-2 py-0.5 text-xs font-medium text-white">
          {project.category}
        </span>
      </div>
    </a>
  );
};

// --- MAIN PAGE COMPONENTS ---

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <a href="#" className="font-heading text-2xl font-bold text-text">
          Your Name
        </a>
        <div className="flex items-center gap-6">
          <a
            href="#work"
            className="hidden text-sm font-medium text-text/70 transition-colors hover:text-text sm:block"
          >
            Work
          </a>
          <a
            href="#about"
            className="hidden text-sm font-medium text-text/70 transition-colors hover:text-text sm:block"
          >
            About
          </a>
          <a
            href="#contact"
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
};

const Hero: React.FC = () => {
  // Filter for the 4-5 featured projects (portrait ones)
  const featuredProjects = mockProjects
    .filter((p) => p.aspect === 'portrait')
    .slice(0, 5);

  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-24">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 -z-10 h-96 w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 to-transparent"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl font-bold text-text sm:text-6xl">
            Video Editor & Motion Designer
          </h1>
          <p className="mt-6 text-lg leading-8 text-text/70">
            Crafting cinematic stories that captivate, inspire, and drive
            results. From concept to final cut, I bring your vision to life with
            precision and passion.
          </p>
        </div>
      </div>

      {/* Cinematic Filmstrip */}
      <div className="mt-16 sm:mt-24">
        <div className="flex gap-4 overflow-x-auto pb-4 pl-6 lg:pl-8">
          {/* We add a spacer at the beginning */}
          <div className="w-1 flex-shrink-0 md:w-2 lg:w-4"></div>
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} isFilmstrip={true} />
          ))}
          {/* We add a spacer at the end */}
          <div className="w-1 flex-shrink-0 md:w-2 lg:w-4"></div>
        </div>
      </div>
    </section>
  );
};

const WorkGallery: React.FC = () => {
  type Filter = 'All' | ProjectCategory;
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const filters: Filter[] = ['All', 'Video', 'Design'];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return mockProjects.filter((p) => p.aspect === 'landscape'); // Only show landscape in main gallery
    }
    return mockProjects.filter(
      (p) => p.category === activeFilter && p.aspect === 'landscape'
    );
  }, [activeFilter]);

  const FilterButton: React.FC<{ filter: Filter }> = ({ filter }) => {
    const isActive = activeFilter === filter;
    return (
      <button
        onClick={() => setActiveFilter(filter)}
        className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
          isActive
            ? 'bg-accent text-white'
            : 'bg-gray-800 text-text/70 hover:bg-gray-700'
        }`}
      >
        {filter}
      </button>
    );
  };

  return (
    <section id="work" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-text sm:text-4xl">
          All Work
        </h2>

        {/* Filter Buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          {filters.map((f) => (
            <FilterButton key={f} filter={f} />
          ))}
        </div>

        {/* Project Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="border-t border-white/10 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12">
          <h2 className="font-heading text-4xl font-bold text-text sm:text-5xl">
            Let's create something.
          </h2>
          <a
            href="mailto:hello@yourname.com"
            className="flex items-center gap-3 rounded-full bg-accent px-6 py-3 text-lg font-medium text-white transition-opacity hover:opacity-80"
          >
            <IconMail />
            <span>hello@yourname.com</span>
          </a>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-text/50 transition-colors hover:text-accent"
            >
              <span className="sr-only">LinkedIn</span>
              <IconLinkedin />
            </a>
            <a
              href="#"
              className="text-text/50 transition-colors hover:text-accent"
            >
              <span className="sr-only">Instagram</span>
              <IconInstagram />
            </a>
          </div>
          <p className="text-sm text-text/50">
            &copy; {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- APP COMPONENT ---

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background font-sans text-text">
      <Header />
      <main>
        <Hero />
        <WorkGallery />
        {/* You can add an 'About' section here if you like */}
      </main>
      <Footer />
    </div>
  );
};

export default App;

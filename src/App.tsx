import React, { useState, useRef, useEffect } from 'react'; // Added useEffect
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  // Grid, // Removed Grid v1
  Card,
  // CardMedia, // Removed unused import
  CardContent,
  GlobalStyles,
  ToggleButtonGroup,
  ToggleButton,
  Link,
  IconButton,
  TextField, // For Admin Form
  Select, // For Admin Form
  MenuItem, // For Admin Form
  FormControl, // For Admin Form
  InputLabel, // For Admin Form
  Paper, // For Admin Panel
} from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2'; // Import Grid v2
import Grid from '@mui/material/GridLegacy'; // Import Grid v2 (Corrected Path)
import {
  Instagram
} from '@mui/icons-material';

// --- MOCK DATA ---
// Renamed to mockProjects, this is now a fallback
const mockProjects = [
  {
    id: 1,
    title: 'Ghost',
    category: 'video',
    posterUrl: 'https://cdn.jsdelivr.net/gh/swayamjain/folio_videos/assets/thumbnails/phantomtext.jpg',
    hoverUrl: 'https://cdn.jsdelivr.net/gh/swayamjain/folio_videos/assets/videos/phantomtextdraft003-web.mp4',
    aspectRatio: '9/16',
  },
  {
    id: 2,
    title: 'Jack of all Trades', // Changed back from Google Post
    category: 'video',
    posterUrl: 'https://cdn.jsdelivr.net/gh/swayamjain/folio_videos/assets/thumbnails/adayinlife.jpg',
    hoverUrl: 'https://cdn.jsdelivr.net/gh/swayamjain/folio_videos/assets/videos/jackofalltrades001-web.mp4',
    aspectRatio: '16/9',
  },
  {
    id: 3,
    title: 'NOISE',
    category: 'video',
    posterUrl: 'https://cdn.jsdelivr.net/gh/swayamjain/folio_videos/assets/thumbnails/noise.jpg',
    hoverUrl: 'https://cdn.jsdelivr.net/gh/swayamjain/folio_videos/assets/videos/duplicates001-web.mp4',
    aspectRatio: '16/9',
  },
  {
    id: 4,
    title: 'A day in Life',
    category: 'video',
    posterUrl: 'https://cdn.jsdelivr.net/gh/swayamjain/folio_videos/assets/thumbnails/adayinlife.jpg',
    hoverUrl: 'https://cdn.jsdelivr.net/gh/swayamjain/folio_videos/assets/videos/finallyaday-in-life-web.mp4',
    aspectRatio: '9/16',
  },
  {
    id: 5,
    title: 'The Youth Project',
    category: 'design',
    posterUrl: 'https://cdn.jsdelivr.net/gh/swayamjain/folio_videos/assets/thumbnails/BlackBackground_TheYouthProjectLogo003_FULLSIZE_inJPEG.jpg',
    hoverUrl: 'https://cdn.jsdelivr.net/gh/swayamjain/folio_videos/assets/videos/theyouthproject-web.mp4',
    aspectRatio: '16/9',
  },
  {
    id: 6,
    title: 'Upcoming',
    category: 'video',
    posterUrl: 'https://placehold.co/900x1600/111111/F8F8F8?text=Could be \\nYours',
    hoverUrl: 'null',
    aspectRatio: '16/9',
  },
];
// --- END MOCK DATA ---


// --- MUI THEME (Replaces tailwind.config.js) ---
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0070F3', // Electric Blue
    },
    background: {
      default: '#111111', // Off-black
      paper: '#1a1a1a', // Slightly lighter for cards/header
    },
    text: {
      primary: '#F8F8F8', // Off-white
      secondary: '#aaaaaa', // Lighter gray for descriptions
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Manrope", "Helvetica", "Arial", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Manrope", "Helvetica", "Arial", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Manrope", "Helvetica", "Arial", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Manrope", "Helvetica", "Arial", sans-serif', fontWeight: 700 },
    h5: { fontFamily: '"Manrope", "Helvetica", "Arial", sans-serif', fontWeight: 700 },
    h6: { fontFamily: '"Manrope", "Helvetica", "Arial", sans-serif', fontWeight: 700 },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: 'none',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 20px rgba(0, 112, 243, 0.2)', // Subtle blue glow on hover
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: '#aaaaaa',
          borderColor: '#333333',
          '&.Mui-selected': {
            color: '#F8F8F8',
            backgroundColor: '#333333',
            '&:hover': {
              backgroundColor: '#444444',
            },
          },
        },
      },
    },
  },
});
// --- END THEME ---

// --- COMPONENTS ---

// Header Component
function Header() {
  return (
    <AppBar position="static" sx={{ bgcolor: 'background.default', boxShadow: 'none', borderBottom: '1px solid', borderColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '0.5px' }}>
            Swayam Jain
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Link href="#work" color="text.primary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
              Work
            </Link>
            <Link href="#about" color="text.primary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
              About
            </Link>
            <Button variant="contained" color="primary" href="#contact" sx={{ ml: 2 }}>
              Contact
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// Project Card Component
interface Project {
  id: number;
  title: string;
  category: string;
  posterUrl: string;
  hoverUrl: string;
  aspectRatio: string;
}

interface ProjectCardProps {
  project: Project;
  isActive: boolean; // New prop to control playback
}

function ProjectCard({ project, isActive }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // This effect hook handles all the play/pause logic
  useEffect(() => {
    // Check for touch-screen. 'coarse' pointer usually means touch.
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    
    let shouldPlay = false;
    if (isMobile) {
      // On mobile, only play if 'isActive' (snapped to center)
      shouldPlay = isActive;
    } else {
      // On desktop, play if hovered
      shouldPlay = isHovered;
    }

    if (shouldPlay) {
      // Added a catch block for potential browser autoplay errors
      videoRef.current?.play().catch(e => console.error("Video play failed:", e));
    } else {
      videoRef.current?.pause();
    }
    // No 'videoRef' in dependency array, it's a ref.
  }, [isActive, isHovered]);
  
  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ 
        bgcolor: 'background.paper', 
        height: '100%', // Ensure card fills parent box's height
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Container for the media (video or embed) */}
      <Box sx={{ 
        flexGrow: 1, 
        minHeight: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#000',
      }}>
        <video
          ref={videoRef}
          src={project.hoverUrl}
          poster={project.posterUrl}
          muted
          loop
          playsInline
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain',
            backgroundColor: '#000',
          }}
        />
      </Box>
      <CardContent sx={{ flexShrink: 0 }}>
        <Typography variant="h6" component="div" sx={{ fontFamily: 'Manrope' }}>
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
          {project.category}
        </Typography>
      </CardContent>
    </Card>
  );
}

// --- New Gallery Item Component for "All Work" ---
function GalleryItem({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Card
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => videoRef.current?.pause()}
      sx={{ 
        aspectRatio: '16/9', 
        position: 'relative', 
        borderRadius: 3,
        overflow: 'hidden',
        transform: 'translateZ(0)',
      }}
    >
      <video
        ref={videoRef}
        src={project.hoverUrl}
        poster={project.posterUrl}
        muted
        loop
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          '&:hover': {
            opacity: 1,
          },
        }}
      >
        <Typography variant="h5" component="div" sx={{ fontFamily: 'Manrope' }}>
          {project.title}
        </Typography>
        <Typography variant="body1" sx={{ textTransform: 'capitalize', color: '#ccc' }}>
          {project.category}
        </Typography>
      </Box>
    </Card>
  );
}

// --- NEW: Admin Project Form ---
function AddProjectForm({ onProjectAdded }: { onProjectAdded: () => void }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('video');
  const [posterUrl, setPosterUrl] = useState('');
  const [hoverUrl, setHoverUrl] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16/9');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !posterUrl || !hoverUrl) {
      console.error('Please fill out all fields.');
      return;
    }

    const newProject: Project = {
      id: Date.now(),
      title,
      category,
      posterUrl,
      hoverUrl,
      aspectRatio,
    };

    // Add to localStorage
    const storedProjects = JSON.parse(localStorage.getItem('myProjects') || '[]');
    const updatedProjects = [...storedProjects, newProject];
    localStorage.setItem('myProjects', JSON.stringify(updatedProjects));

    // Reset form and notify parent
    setTitle('');
    setCategory('video');
    setPosterUrl('');
    setHoverUrl('');
    setAspectRatio('16/9');
    onProjectAdded();
  };

  return (
    <Paper sx={{ p: 4, mt: 5, mb: 10, bgcolor: 'background.paper', borderRadius: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Add New Project</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr' }, gap: 2 }}>
        <TextField
          label="Project Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ gridColumn: 'span 2' }}
        />
        
        <TextField
          label="Poster URL"
          variant="outlined"
          fullWidth
          value={posterUrl}
          onChange={(e) => setPosterUrl(e.target.value)}
          placeholder="https://.../poster.jpg"
          sx={{ gridColumn: 'span 2' }}
        />
        <TextField
          label="Video URL"
          variant="outlined"
          fullWidth
          value={hoverUrl}
          onChange={(e) => setHoverUrl(e.target.value)}
          placeholder="https://.../video.mp4"
          sx={{ gridColumn: 'span 2' }}
        />
        
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="video">Video</MenuItem>
            <MenuItem value="design">Design</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl fullWidth>
          <InputLabel>Aspect Ratio</InputLabel>
          <Select
            value={aspectRatio}
            label="Aspect Ratio"
            onChange={(e) => setAspectRatio(e.target.value)}
          >
            <MenuItem value="16/9">16:9 (Horizontal)</MenuItem>
            <MenuItem value="4/5">4:5 (Square-ish)</MenuItem>
            <MenuItem value="9/16">9:16 (Vertical)</MenuItem>
            <MenuItem value="1/1">1:1 (Square)</MenuItem>
          </Select>
        </FormControl>
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ gridColumn: 'span 2', mt: 2 }}
        >
          Add Project
        </Button>
      </Box>
    </Paper>
  );
}

// --- NEW: Admin Page Component ---
function AdminPage({ onProjectAdded, onResetProjects }: { onProjectAdded: () => void, onResetProjects: () => void }) {
  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h2">
          Admin Panel
        </Typography>
        <Button variant="outlined" href="#">
          &larr; Back to Portfolio
        </Button>
      </Box>
      <AddProjectForm onProjectAdded={onProjectAdded} />
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 10 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={onResetProjects}
        >
          Reset to Default Projects
        </Button>
      </Box>
    </Container>
  );
}


// --- NEW: Portfolio Page Component ---
// (Contains all the portfolio sections)
function PortfolioPage({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('all');
  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false); // State for "See More"
  const [activeFilmstripId, setActiveFilmstripId] = useState<number | null>(null);

  // Refs for the intersection observer
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // --- FIX 1: Explicitly type the Map's value as HTMLDivElement ---
  const videoCardRefs = useRef(new Map<number, HTMLDivElement>());
  const intersectionRatios = useRef(new Map<number, number>());
  const isScrollInitialized = useRef(false); // Ref to track initial scroll

  const handleFilterChange = (
    // --- FIX 4: Prefix unused 'event' param with _ ---
    _event: React.MouseEvent<HTMLElement>,
    newFilter: string | null,
  ) => {
    if (newFilter !== null) {
      setFilter(newFilter);
      setIsGalleryExpanded(false); // Reset gallery expansion on filter change
    }
  };

  // Get all projects for the current filter, *excluding* the first 3 featured projects
  const categoryFilteredProjects = projects.slice(3).filter(project => 
    filter === 'all' || project.category === filter
  );

  // Decide which projects to display (first 3 or all)
  const displayedProjects = isGalleryExpanded 
    ? categoryFilteredProjects 
    : categoryFilteredProjects.slice(0, 3);

  // Changed to slice(0, 3)
  const featuredProjects = projects.slice(0, 3); // First 3 projects for the filmstrip

  // This effect sets up the IntersectionObserver to find the "active" video
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Clear maps on re-run
    intersectionRatios.current.clear();

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // This logic only runs on user scroll, not on the initial programmatic scroll
      if (!isScrollInitialized.current) return;

      let maxRatio = -1;
      let mostVisibleId: number | null = null;

      // Update ratios for all visible entries
      entries.forEach(entry => {
        const targetElement = entry.target as HTMLDivElement;
        const id = parseInt(targetElement.dataset.id || '0', 10);
        if (!id) return;
        
        intersectionRatios.current.set(id, entry.intersectionRatio);
      });

      // Find the ID with the highest visibility ratio
      intersectionRatios.current.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          mostVisibleId = id;
        }
      });

      // Only set as "active" if it's at least 50% visible (i.e., mostly centered)
      if (maxRatio > 0.5) {
        setActiveFilmstripId(mostVisibleId);
      } else {
        // If nothing is centered, don't have an active one
        setActiveFilmstripId(null);
      }
    };

    // Create the observer
    const observer = new IntersectionObserver(observerCallback, {
      root: scrollContainer, // Observe scrolling within this container
      threshold: [0, 0.25, 0.5, 0.75, 1.0], // Fire at different visibility levels
      rootMargin: '0px',
    });

    // Observe all the video cards
    const cardMap = videoCardRefs.current;
    cardMap.forEach((cardElement) => {
      observer.observe(cardElement);
    });

    // --- NEW INITIAL SCROLL LOGIC ---
    // Check if we're on mobile (approximated by < 900px, the 'md' breakpoint)
    const isMobile = window.innerWidth < theme.breakpoints.values.md; 
    
    // Check if featured projects exist and cardMap has the 2nd project's ID
    const secondProjectId = featuredProjects[1]?.id;

    if (!isScrollInitialized.current && secondProjectId && cardMap.has(secondProjectId)) {
      if (isMobile) {
        // On mobile, scroll card 2 into view
        const cardElement = cardMap.get(secondProjectId);
        if (cardElement) {
            const timer = setTimeout(() => {
                cardElement.scrollIntoView({
                    behavior: 'auto', // 'auto' for instant snap
                    inline: 'center',
                    block: 'nearest'
                });
                setActiveFilmstripId(secondProjectId); // Manually set active state
                
                // Set initialized *after* a delay to allow the observer to ignore this scroll
                setTimeout(() => {
                  isScrollInitialized.current = true;
                }, 300);
            }, 100); // 100ms delay for layout calculation

            // Cleanup function
            return () => {
                clearTimeout(timer);
                cardMap.forEach((cardElement) => {
                  // --- FIX 1 (applied here too): cardElement is now correctly typed ---
                  observer.unobserve(cardElement);
                });
            };
        }
      } else {
        // On desktop, just set card 2 as active (for hover, though it won't autoplay)
        // and mark as initialized
        setActiveFilmstripId(secondProjectId);
        isScrollInitialized.current = true;
      }
    } else if (!isScrollInitialized.current) {
        // Fallback if projects are empty or logic fails
        isScrollInitialized.current = true;
    }
    // --- END INITIAL SCROLL LOGIC ---


    // Cleanup on unmount
    return () => {
      cardMap.forEach((cardElement) => {
        observer.unobserve(cardElement);
      });
    };
  }, [featuredProjects, theme.breakpoints.values.md]); // Re-run if featured projects change or theme loads

  return (
    <>
      {/* --- Header --- */}
      <Header />

      <Box component="main" sx={{ overflow: 'hidden' }}>
        {/* --- Hero Section --- */}
        <Container maxWidth="lg" sx={{ py: { xs: 10, md: 15 }, textAlign: 'center' }}>
          <Typography variant="h1" sx={{ fontSize: { xs: '3rem', sm: '4.5rem', md: '6rem' }, mb: 2 }}>
            Video Editor &
            <br />
            Motion Designer
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', margin: 'auto' }}>
            Crafting cinematic stories that captivate, inspire, and convert.
            Welcome to my creative portfolio.
          </Typography>
        </Container>

        {/* --- Hero "Cinematic Filmstrip" --- */}
        <Box
          ref={scrollContainerRef} // Add ref to scroll container
          sx={{
            display: 'flex',
            gap: 3,
            py: 4,

            // --- MOBILE (and < md) STYLES ---
            overflowX: { xs: 'auto', md: 'hidden' },
            scrollSnapType: { xs: 'x mandatory', md: 'none' },
            // 150px = half of card width (300px)
            paddingX: { xs: 'calc(50% - 150px)', md: 0 }, 
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none', // Firefox
            '-ms-overflow-style': 'none', // IE/Edge

            // --- DESKTOP (md+) STYLES ---
            justifyContent: { md: 'center' }, // Center the 3 cards as a group
          }}
        >
          {featuredProjects.map((project) => {
            // Card widths are now consistent for all cards in the filmstrip
            const cardWidths = { min: { xs: 270, sm: 300 }, max: 300 }; 

            return (
              <Box 
                key={project.id}
              ref={(el: HTMLDivElement | null) => {
                if (el) videoCardRefs.current.set(project.id, el);
                else videoCardRefs.current.delete(project.id);
              }}
              data-id={project.id}
              sx={{
                minWidth: cardWidths.min,
                maxWidth: cardWidths.max,
                scrollSnapAlign: { xs: 'center', md: 'none' },
              }}
            >
                <ProjectCard
                  project={project}
                  isActive={project.id === activeFilmstripId} // Pass active state
                />
              </Box>
            );
          })}
        </Box>

        {/* --- Main Project Gallery --- */}
        <Container maxWidth="lg" sx={{ py: { xs: 10, md: 15 } }} id="work">
          {/* Gallery Filters */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={handleFilterChange}
              aria-label="project filter"
            >
              <ToggleButton value="all" aria-label="all projects">
                All
              </ToggleButton>
              <ToggleButton value="video" aria-label="video projects">
                Video
              </ToggleButton>
              <ToggleButton value="design" aria-label="design projects">
                Design
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* --- ROOT CAUSE FIX: Added `container` prop (for Grid v1) --- */}
          <Grid container spacing={3}>
            {/* Map over displayedProjects instead */}
            {displayedProjects.map((project) => (
              // --- ROOT CAUSE FIX: Added `item` prop (for Grid v1) ---
              <Grid item key={project.id} xs={12} sm={6} md={4}>
                {/* --- Use new GalleryItem component --- */}
                <GalleryItem project={project} />
              </Grid>
            ))}
          </Grid>

          {/* "See More" / "See Less" Button */}
          {/* Only show button if there are more projects than the initial 3 */}
          {categoryFilteredProjects.length > 3 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => setIsGalleryExpanded(prev => !prev)}
              >
                {isGalleryExpanded ? 'See Less' : 'See More'}
              </Button>
            </Box>
          )}

        </Container>

        {/* --- About Section (Refactored) --- */}
        <Box component="section" sx={{ py: { xs: 10, md: 15 }, bgcolor: 'background.default' }} id="about">
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ textAlign: 'center', mb: 3 }}>
              About Me
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
              I'm a passionate video editor and motion designer, turning raw footage into compelling cinematic narratives.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto', mb: 5 }}>
              My expertise lies in crafting stories that not only look beautiful but also resonate deeply with audiences. Whether it's a high-energy commercial, a corporate brand story, or a complex motion graphics piece, I bring a meticulous eye for detail and a deep understanding of pacing, rhythm, and sound design to every project.
            </Typography>
            
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Button variant="contained" color="primary" href="#contact">
                  Let's Talk
                </Button>
            </Box>

            <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
              Services
            </Typography>
            {/* --- ROOT CAUSE FIX: Added `container` prop (for Grid v1) --- */}
            <Grid container spacing={3} justifyContent="center">
              {[
                'Video Editing',
                'Motion Graphics',
                'Color Grading',
                'Sound Design',
              ].map((service) => (
                // --- ROOT CAUSE FIX: Added `item` prop (for Grid v1) ---
                <Grid item key={service} xs={6} sm={3}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    flexDirection: 'column', 
                    textAlign: 'center',
                    p: { xs: 2, sm: 3 },
                    border: '1px solid',
                    borderColor: 'background.paper', // Use paper for border
                    borderRadius: 3,
                    height: '100%',
                    bgcolor: 'background.paper' // Use paper for the card background
                  }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Manrope', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                      {service}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* --- Footer --- */}
        <Box component="footer" sx={{ py: 10, bgcolor: 'background.default', textAlign: 'center' }} id="contact">
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ mb: 3 }}>
              Let's create something.
            </Typography>
            <Link
              href="mailto:jswayam234@gmail.com"
              variant="h5"
              color="primary"
              sx={{
                textDecoration: 'none',
                display: 'inline-block',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  transform: 'scaleX(0.5)',
                  height: '2px',
                  bottom: 0,
                  left: 0,
                  backgroundColor: 'primary.main',
                  transformOrigin: 'bottom center',
                  transition: 'transform 0.3s ease-out',
                },
                '&:hover:after': {
                  transform: 'scaleX(1)',
                  transformOrigin: 'bottom center',
                },
              }}
            >
              jswayam234@gmail.com
            </Link>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <IconButton href="https://instagram.com/sw4y4mj4in" target="_blank" color="primary">
                <Instagram />
              </IconButton>
            </Box>
            {/* Admin Toggle Button REMOVED */}
          </Container>
        </Box>

      </Box>
    </>
  );
}


// --- MAIN APP COMPONENT (NOW A ROUTER) ---

export default function App() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [route, setRoute] = useState(window.location.hash); // Get initial hash

  // Function to load projects from storage or set defaults
  const loadProjects = () => {
    const storedProjects = localStorage.getItem('myProjects');
    if (storedProjects) {
      setAllProjects(JSON.parse(storedProjects));
    } else {
      // First load, set mock data
      setAllProjects(mockProjects);
      localStorage.setItem('myProjects', JSON.stringify(mockProjects));
    }
  };

  // Run on first load
  useEffect(() => {
    loadProjects();
  }, []);

  // Listen for hash changes to update the 'route'
  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleResetProjects = () => {
    // Use confirm for simplicity, as window.confirm is available
    if (confirm('Are you sure you want to delete all custom projects and reset to defaults?')) {
      localStorage.removeItem('myProjects');
      loadProjects(); // This will now load the mock data
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Global styles for smooth scrolling */}
      <GlobalStyles styles={{
        'html': { scrollBehavior: 'smooth' },
        '::-webkit-scrollbar': { width: '8px', height: '8px' },
        '::-webkit-scrollbar-track': { background: '#111111' },
        '::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '4px' },
        '::-webkit-scrollbar-thumb:hover': { background: '#555555' },
      }} />

      {/* --- Conditional Page Rendering --- */}
      {route === '#admin' ? (
        <AdminPage 
          onProjectAdded={loadProjects} 
          onResetProjects={handleResetProjects} 
        />
      ) : (
        <PortfolioPage projects={allProjects} />
      )}

    </ThemeProvider>
  );
}


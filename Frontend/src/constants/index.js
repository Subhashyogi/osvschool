import {
  FaPaintBrush,
  FaFlask,
  FaBook,
  FaGlobe,
  FaCalculator,
  FaCode,
  FaPenNib,
  FaTheaterMasks,
  FaRunning,
  FaPalette,
} from "react-icons/fa";


export const testimonials = [
  {
    quote:
      "This school didn't just teach me subjects; it taught me how to think. The supportive community and dedicated teachers were instrumental in my success.",
    name: "Jessica Miller",
    title: "Class of 2022, Stanford University",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    quote:
      "The extracurricular activities, especially the science fair and coding club, sparked my passion for technology. I'm forever grateful.",
    name: "David Chen",
    title: "Class of 2021, Software Engineer at Google",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    quote:
      "As a parent, I was consistently impressed by the open communication and the genuine care the staff showed for my child's development.",
    name: "Sarah Thompson",
    title: "Parent",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
];

// export const academicPrograms = [
//   {
//     title: "Science & Robotics",
//     category: "Science",
//     description:
//       "Explore the frontiers of science, from robotics to environmental studies.",
//     icon: FaFlask,
//   },
//   {
//     title: "Fine Arts",
//     category: "Arts",
//     description:
//       "Unleash your creativity in our state-of-the-art studios for painting, music, and drama.",
//     icon: FaPaintBrush,
//   },
//   {
//     title: "Computer Science",
//     category: "Science",
//     description:
//       "Dive into algorithms, data structures, and software development with our CS track.",
//     icon: FaCode,
//   },
//   {
//     title: "Humanities & Literature",
//     category: "Humanities",
//     description:
//       "Dive deep into history, literature, and philosophy to understand the human experience.",
//     icon: FaBook,
//   },
//   {
//     title: "Global Studies & Languages",
//     category: "Humanities",
//     description:
//       "Develop a global perspective through language immersion and cultural exchange programs.",
//     icon: FaGlobe,
//   },
//   {
//     title: "Advanced Mathematics",
//     category: "Science",
//     description:
//       "Challenge yourself with advanced topics in calculus, statistics, and number theory.",
//     icon: FaCalculator,
//   },
//   {
//     title: "Creative Writing",
//     category: "Arts",
//     description:
//       "Hone your storytelling skills in poetry, fiction, and non-fiction workshops.",
//     icon: FaPenNib,
//   },
//   {
//     title: "Performing Arts",
//     category: "Arts",
//     description:
//       "Take the stage in our award-winning theater and dance programs.",
//     icon: FaTheaterMasks,
//   },
// ];

export const galleryItems = [
  {
    type: "image",
    src: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    thumbnail:
      "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=800",
    width: 1260,
    height: 750,
    alt: "Students in a library.",
    span: "col-span-2 md:col-span-2",
  },
  {
    type: "image",
    src: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800",
    thumbnail:
      "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400",
    width: 800,
    height: 1200,
    alt: "Student writing on a chalkboard.",
    span: "row-span-1 md:row-span-2",
  },
  {
    type: "video",
    width: 1280,
    height: 720,
    poster:
      "https://images.pexels.com/photos/8474063/pexels-photo-8474063.jpeg?auto=compress&cs=tinysrgb&w=400",
    sources: [
      {
        src: "https://videos.pexels.com/video-files/8474063/8474063-hd_1280_720_25fps.mp4",
        type: "video/mp4",
      },
    ],
    alt: "Science experiment.",
  },
  {
    type: "image",
    src: "https://images.pexels.com/photos/1329295/pexels-photo-1329295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    thumbnail:
      "https://images.pexels.com/photos/1329295/pexels-photo-1329295.jpeg?auto=compress&cs=tinysrgb&w=400",
    width: 1260,
    height: 750,
    alt: "Graduation ceremony.",
  },
  {
    type: "image",
    src: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    thumbnail:
      "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800",
    width: 1260,
    height: 750,
    alt: "Group of diverse students.",
    span: "col-span-1 md:col-span-2",
  },
  {
    type: "image",
    src: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    thumbnail:
      "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400",
    width: 1260,
    height: 750,
    alt: "Teacher explaining at whiteboard.",
  },
  {
    type: "image",
    src: "https://images.pexels.com/photos/8617963/pexels-photo-8617963.jpeg?auto=compress&cs=tinysrgb&w=800",
    thumbnail:
      "https://images.pexels.com/photos/8617963/pexels-photo-8617963.jpeg?auto=compress&cs=tinysrgb&w=400",
    width: 800,
    height: 1200,
    alt: "Student focused on a laptop.",
  },
  {
    type: "video",
    width: 1280,
    height: 720,
    poster:
      "https://images.pexels.com/photos/8549971/pexels-photo-8549971.jpeg?auto=compress&cs=tinysrgb&w=400",
    sources: [
      {
        src: "https://videos.pexels.com/video-files/8549971/8549971-hd_1280_720_24fps.mp4",
        type: "video/mp4",
      },
    ],
    alt: "Students walking in hallway.",
  },
];

// export const principal = {
//   name: "Dr. Evelyn Reed",
//   title: "Principal, OSVSR School",
//   image: "https://i.pravatar.cc/150?img=20",
//   welcomeMessage:
//     "Welcome! Our mission is to foster a vibrant community of learners prepared to take on the challenges of the future. Here, we believe in nurturing not just academic excellence, but also character, creativity, and resilience. We invite you to explore what makes our school special.",
// };

// export const facultyMembers = [
//   {
//     name: "Mr. Robert Foster",
//     title: "Head of Science Department",
//     image: "https://i.pravatar.cc/150?img=60",
//     bio: "With 15 years of experience, Mr. Foster makes physics and chemistry accessible and exciting for all students.",
//   },
//   {
//     name: "Ms. Angela Vance",
//     title: "Head of Arts & Humanities",
//     image: "https://i.pravatar.cc/150?img=32",
//     bio: "An accomplished artist, Ms. Vance inspires students to explore history, literature, and their own creativity.",
//   },
//   {
//     name: "Mr. David Lee",
//     title: "Mathematics & CS Department",
//     image: "https://i.pravatar.cc/150?img=51",
//     bio: "Mr. Lee is passionate about problem-solving and prepares students for the logical challenges of a tech-driven world.",
//   },
// ];

export const achievers = [
  {
    name: "Alex Johnson",
    image: "https://i.pravatar.cc/150?img=11",
    achievement: "National Science Olympiad",
    award: "Gold Medalist",
  },
  {
    name: "Samantha Lee",
    image: "https://i.pravatar.cc/150?img=25",
    achievement: "International Debate Championship",
    award: "World Champion",
  },
  {
    name: "Michael Chen",
    image: "https://i.pravatar.cc/150?img=33",
    achievement: "State-Level Art Competition",
    award: "First Place",
  },
  {
    name: "Emily Rodriguez",
    image: "https://i.pravatar.cc/150?img=45",
    achievement: "National Robotics Challenge",
    award: "Innovation Award",
  },
];

export const timelineEvents = [
  {
    year: "1985",
    title: "Foundation of OSVSR",
    description: "Our school was founded with a vision to provide unparalleled education and foster future leaders.",
  },
  {
    year: "1998",
    title: "First Graduating Class",
    description: "We celebrated our first cohort of graduates, who went on to attend prestigious universities worldwide.",
  },
  {
    year: "2005",
    title: "Science & Innovation Wing Opened",
    description: "A new state-of-the-art facility was inaugurated to enhance our STEM curriculum and research capabilities.",
  },
  {
    year: "2016",
    title: "National Debate Champions",
    description: "Our debate team achieved national recognition, bringing home the championship trophy.",
  },
  {
    year: "Today",
    title: "A Legacy of Excellence",
    description: "Continuing our commitment to shaping compassionate, intelligent, and responsible global citizens.",
  },
];

export const academicPrograms = [
  {
    title: "Science & Robotics",
    category: "Science",
    description:
      "Our comprehensive Science & Robotics program provides students with a robust foundation in physics, chemistry, and biology, culminating in advanced practical experience with modern robotics and automation technologies.",
    icon: FaFlask,
    outcomes: [
      "Advanced Laboratory Skills",
      "Robotics Programming (Python/C++)",
      "Critical Scientific Analysis",
    ],
    departmentHead: {
      name: "Mr. Robert Foster",
      image: "https://i.pravatar.cc/150?img=60",
    },
  },
  {
    title: "Fine Arts",
    category: "Arts",
    description:
      "Students explore a wide range of artistic mediums, from classical painting and sculpture to digital art and photography, guided by professional artists to develop their unique creative voice.",
    icon: FaPaintBrush,
    outcomes: [
      "Portfolio Development",
      "Art History Mastery",
      "Digital Illustration Techniques",
    ],
    departmentHead: {
      name: "Ms. Angela Vance",
      image: "https://i.pravatar.cc/150?img=32",
    },
  },
  {
    title: "Computer Science",
    category: "Science",
    description:
      "Dive deep into the world of software development. Our curriculum covers fundamental algorithms, data structures, web development, and an introduction to machine learning principles.",
    icon: FaCode,
    outcomes: [
      "Full-Stack Web Development",
      "Algorithmic Problem-Solving",
      "Software Design Principles",
    ],
    departmentHead: {
      name: "Mr. David Lee",
      image: "https://i.pravatar.cc/150?img=51",
    },
  },
  {
    title: "Humanities & Literature",
    category: "Humanities",
    description:
      "This program challenges students to analyze classic and contemporary literature, explore pivotal historical events, and engage in philosophical debate to understand the human condition.",
    icon: FaBook,
    outcomes: [
      "Critical Essay Writing",
      "Historical Research Methods",
      "Literary Analysis",
    ],
    departmentHead: {
      name: "Ms. Angela Vance",
      image: "https://i.pravatar.cc/150?img=32",
    },
  },
];

export const principal = {
  name: "Dr. Evelyn Reed",
  title: "Principal, OSVSR School",
  image: "https://i.pravatar.cc/400?img=20",
  welcomeMessage:
    "Welcome to OSVSR! Our mission is to foster a vibrant community of learners prepared to take on the challenges of the future. Here, we believe in nurturing not just academic excellence, but also character, creativity, and resilience.",
};

// --- NEW DATA FOR THE PAGE ---
export const facultyStats = [
  { number: 35, label: "Total Educators", suffix: "" },
  { number: 15, label: "Avg. Years Experience", suffix: "+" },
  { number: 85, label: "With Advanced Degrees", suffix: "%" },
  { number: 12, label: "National Award Winners", suffix: "" },
];

export const featuredFaculty = {
  name: "Ms. Angela Vance",
  title: "Head of Arts & Humanities",
  department: "Arts & Humanities",
  image: "https://i.pravatar.cc/400?img=32",
  quote:
    "My goal is to open a door to the past, so students can confidently build a better future. Creativity and critical thinking are the keys.",
  socials: { linkedin: "#", twitter: "#" },
};
// --- END NEW DATA ---

export const facultyMembers = [
  // ... (Your existing facultyMembers array with departments is perfect)
  // Example:
  {
    name: "Mr. Robert Foster",
    title: "Head of Science Department",
    department: "Science",
    image: "https://i.pravatar.cc/400?img=60",
    bio: "With 15 years of experience, Mr. Foster makes physics and chemistry accessible and exciting for all students.",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Ms. Angela Vance",
    title: "Head of Arts & Humanities",
    department: "Arts & Humanities",
    image: "https://i.pravatar.cc/400?img=32",
    bio: "An accomplished artist, Ms. Vance inspires students to explore history, literature, and their own creativity.",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Mr. David Lee",
    title: "Mathematics & CS Department",
    department: "Mathematics & CS",
    image: "https://i.pravatar.cc/400?img=51",
    bio: "Mr. Lee is passionate about problem-solving and prepares students for the logical challenges of a tech-driven world.",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Dr. Olivia Chen",
    title: "Biology Teacher",
    department: "Science",
    image: "https://i.pravatar.cc/400?img=25",
    bio: "Dr. Chen's passion for the natural world inspires a new generation of biologists and environmental stewards.",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Mr. Samuel Jones",
    title: "History Teacher",
    department: "Arts & Humanities",
    image: "https://i.pravatar.cc/400?img=15",
    bio: "Mr. Jones brings history to life, connecting past events to present-day issues with engaging storytelling.",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Ms. Isabella Rossi",
    title: "Music Director",
    department: "Arts & Humanities",
    image: "https://i.pravatar.cc/400?img=45",
    bio: "An award-winning composer, Ms. Rossi leads our orchestra and choir to new heights of performance.",
    socials: { linkedin: "#", twitter: "#" },
  },
];

export const heroPillars = [
  {
    icon: FaBook,
    title: "Academics",
    description:
      "Fostering intellectual curiosity and a passion for lifelong learning.",
  },
  {
    icon: FaPalette,
    title: "The Arts",
    description: "Unleashing creativity and self-expression in every student.",
  },
  {
    icon: FaRunning,
    title: "Athletics",
    description:
      "Building character, discipline, and teamwork on and off the field.",
  },
];

// export const galleryItems = [
//   {
//     type: "image",
//     src: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     thumbnail:
//       "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=800",
//     alt: "The Grand Library",
//     description:
//       "A quiet haven for study and research, housing thousands of volumes.",
//     position: { top: "20%", left: "25%" },
//   },
//   {
//     type: "image",
//     src: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     thumbnail:
//       "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400",
//     alt: "Science & Innovation Wing",
//     description:
//       "Where students engage in hands-on experiments and cutting-edge research.",
//     position: { top: "45%", left: "60%" },
//   },
//   {
//     type: "image",
//     src: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     thumbnail:
//       "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800",
//     alt: "The Main Courtyard",
//     description:
//       "The social heart of our campus, where friendships and ideas blossom.",
//     position: { top: "70%", left: "35%" },
//   },
//   {
//     type: "video",
//     poster:
//       "https://images.pexels.com/photos/8474063/pexels-photo-8474063.jpeg?auto=compress&cs=tinysrgb&w=400",
//     sources: [
//       {
//         src: "https://videos.pexels.com/video-files/8474063/8474063-hd_1280_720_25fps.mp4",
//         type: "video/mp4",
//       },
//     ],
//     alt: "Athletic Fields",
//     description:
//       "Home to our championship-winning sports teams and athletic programs.",
//     position: { top: "55%", left: "85%" },
//   },
// ];
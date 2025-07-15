// src/constants/index.js

import {
  FaPaintBrush,
  FaFlask,
  FaBook,
  FaGlobe,
  FaCalculator,
  FaCode,
  FaPenNib,
  FaTheaterMasks,
} from "react-icons/fa";

// Testimonials data (you can keep this here for the Testimonials section)
export const testimonials = [
  {
    quote:
      "OSVSR School didn't just teach me subjects; it taught me how to think. The supportive community and dedicated teachers were instrumental in my success.",
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

// --- ACADEMIC PROGRAMS DATA ---
export const academicPrograms = [
  {
    title: "Science & Robotics",
    category: "Science",
    description:
      "Explore the frontiers of science, from robotics to environmental studies.",
    icon: FaFlask, // <-- Storing the component reference, not the element
  },
  {
    title: "Fine Arts",
    category: "Arts",
    description:
      "Unleash your creativity in our state-of-the-art studios for painting, music, and drama.",
    icon: FaPaintBrush,
  },
  {
    title: "Computer Science",
    category: "Science",
    description:
      "Dive into algorithms, data structures, and software development with our CS track.",
    icon: FaCode,
  },
  {
    title: "Humanities & Literature",
    category: "Humanities",
    description:
      "Dive deep into history, literature, and philosophy to understand the human experience.",
    icon: FaBook,
  },
  {
    title: "Global Studies & Languages",
    category: "Humanities",
    description:
      "Develop a global perspective through language immersion and cultural exchange programs.",
    icon: FaGlobe,
  },
  {
    title: "Advanced Mathematics",
    category: "Science",
    description:
      "Challenge yourself with advanced topics in calculus, statistics, and number theory.",
    icon: FaCalculator,
  },
  {
    title: "Creative Writing",
    category: "Arts",
    description:
      "Hone your storytelling skills in poetry, fiction, and non-fiction workshops.",
    icon: FaPenNib,
  },
  {
    title: "Performing Arts",
    category: "Arts",
    description:
      "Take the stage in our award-winning theater and dance programs.",
    icon: FaTheaterMasks,
  },
];

export const galleryItems = [
  // Large landscape image
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
  // Portrait image that takes more vertical space
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
  // Standard square-ish video
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
  // Standard landscape image
  {
    type: "image",
    src: "https://images.pexels.com/photos/1329295/pexels-photo-1329295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    thumbnail:
      "https://images.pexels.com/photos/1329295/pexels-photo-1329295.jpeg?auto=compress&cs=tinysrgb&w=400",
    width: 1260,
    height: 750,
    alt: "Graduation ceremony.",
  },
  // Another large landscape image
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
  // Standard landscape
  {
    type: "image",
    src: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    thumbnail:
      "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400",
    width: 1260,
    height: 750,
    alt: "Teacher explaining at whiteboard.",
  },
  // Standard portrait
  {
    type: "image",
    src: "https://images.pexels.com/photos/8617963/pexels-photo-8617963.jpeg?auto=compress&cs=tinysrgb&w=800",
    thumbnail:
      "https://images.pexels.com/photos/8617963/pexels-photo-8617963.jpeg?auto=compress&cs=tinysrgb&w=400",
    width: 800,
    height: 1200,
    alt: "Student focused on a laptop.",
  },
  // Another video
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

export const principal = {
  name: "Dr. Evelyn Reed",
  title: "Principal, OSVSR School",
  image: "/principal.jpg", // Replace with actual photo
  welcomeMessage:
    "Welcome to OSVSR School! Our mission is to foster a vibrant community of learners prepared to take on the challenges of the future. Here, we believe in nurturing not just academic excellence, but also character, creativity, and resilience. We invite you to explore what makes our school a special place to learn and grow.",
};

export const facultyMembers = [
  {
    name: "Mr. Robert Foster",
    title: "Head of Science Department",
    image: "https://i.pravatar.cc/150?img=60",
    bio: "With 15 years of experience, Mr. Foster makes physics and chemistry accessible and exciting for all students.",
  },
  {
    name: "Ms. Angela Vance",
    title: "Head of Arts & Humanities",
    image: "https://i.pravatar.cc/150?img=32",
    bio: "An accomplished artist, Ms. Vance inspires students to explore history, literature, and their own creativity.",
  },
  {
    name: "Mr. David Lee",
    title: "Mathematics & CS Department",
    image: "https://i.pravatar.cc/150?img=51",
    bio: "Mr. Lee is passionate about problem-solving and prepares students for the logical challenges of a tech-driven world.",
  },
  // ... add more faculty members
];

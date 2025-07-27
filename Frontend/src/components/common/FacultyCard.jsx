// import { motion } from "framer-motion";
// import VanillaTilt from "react-vanilla-tilt";
// import { FaLinkedin, FaTwitter, FaUser } from "react-icons/fa";

// const FacultyCard = ({ member, index }) => {
//   const tiltOptions = {
//     max: 15,
//     speed: 400,
//     glare: true,
//     "max-glare": 0.5,
//     scale: 1.05,
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.3 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//     >
//       <VanillaTilt options={tiltOptions} style={{}}>
//         <div className="relative rounded-2xl overflow-hidden shadow-2xl group h-96">
//           {member.image ? (
//             <img
//               src={member.image}
//               alt={member.name}
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 e.target.style.display = "none";
//                 e.target.nextSibling.style.display = "flex";
//               }}
//             />
//           ) : null}
//           <div
//             className={`w-full h-full ${
//               member.image ? "hidden" : "flex"
//             } items-center justify-center bg-gray-300`}
//           >
//             <FaUser className="text-6xl text-gray-500" />
//           </div>
//           <div className="absolute inset-0 bg-gradient-to-t from-brand-nav via-brand-nav/70 to-transparent"></div>
//           <div className="absolute bottom-0 left-0 right-0 p-6">
//             <div className="p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:bg-black/50">
//               <div>
//                 <h3 className="text-2xl font-bold text-brand-accent">
//                   {member.name}
//                 </h3>
//                 <p className="text-brand-accent font-medium mb-3">
//                   {member.title || "Faculty Member"}
//                 </p>
//                 {member.department && (
//                   <p className="text-brand-nav-muted text-sm">
//                     {member.department}
//                   </p>
//                 )}
//               </div>
//               {(member.bio ||
//                 (member.socials &&
//                   (member.socials.linkedin || member.socials.twitter))) && (
//                 <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-4 transition-all duration-300 overflow-hidden">
//                   {member.bio && (
//                     <p className="text-brand-nav-muted text-sm mb-4">
//                       {member.bio}
//                     </p>
//                   )}
//                   {member.socials &&
//                     (member.socials.linkedin || member.socials.twitter) && (
//                       <div className="flex space-x-4">
//                         {member.socials.linkedin && (
//                           <a
//                             href={member.socials.linkedin}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-brand-nav-muted hover:text-brand-accent transition-colors"
//                           >
//                             <FaLinkedin size={20} />
//                           </a>
//                         )}
//                         {member.socials.twitter && (
//                           <a
//                             href={member.socials.twitter}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-brand-nav-muted hover:text-brand-accent transition-colors"
//                           >
//                             <FaTwitter size={20} />
//                           </a>
//                         )}
//                       </div>
//                     )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </VanillaTilt>
//     </motion.div>
//   );
// };

// export default FacultyCard;

// Renovated FacultyCard.jsx (Light Theme)
import { motion } from "framer-motion";
import { FaUser, FaLinkedin, FaTwitter } from "react-icons/fa";

const FacultyCard = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative rounded-2xl overflow-hidden group h-96"
    >
      {/* --- Card Border with Hover Glow Effect (Key to matching the site) --- */}
      <div className="absolute inset-0 rounded-2xl border-2 border-gray-800 group-hover:border-blue-500 transition-all duration-300"></div>

      {/* --- Background Image & Placeholder --- */}
      {member.image ? (
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-800">
          <FaUser className="text-6xl text-gray-600" />
        </div>
      )}

      {/* --- Bottom Gradient for Text Readability --- */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

      {/* --- Content with Frosted Glass Effect --- */}
      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-gray-900/40 backdrop-blur-md border border-white/10 transition-all duration-300 group-hover:bg-gray-900/60 group-hover:border-white/20">
        <h3 className="text-xl font-bold text-white">{member.name}</h3>
        <p className="text-blue-400 font-semibold">
          {member.title || "Professor"}
        </p>

        {/* --- Social Links (Optional) --- */}
        {(member.socials?.linkedin || member.socials?.twitter) && (
          <div className="flex space-x-3 mt-3">
            {member.socials.linkedin && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
            )}
            {member.socials.twitter && (
              <a
                href={member.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <FaTwitter size={20} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FacultyCard;

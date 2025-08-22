import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const FloatingWhatsApp = () => {
  // Replace with your school's phone number, including country code, without '+' or spaces.
  const phoneNumber = "911234567890";
  const message = encodeURIComponent(
    "Hello! I'm interested in learning more about OSVSR School."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 120 }}
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp size={36} />
    </motion.a>
  );
};

export default FloatingWhatsApp;

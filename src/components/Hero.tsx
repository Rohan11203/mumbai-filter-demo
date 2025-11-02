import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Users,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Navigation } from "./Navigation";
import { NewNavbar } from "./ConstantNavbar/newNavbar";
import { useNavigate } from "react-router-dom";

// --- Mock Components for standalone running ---
const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg font-semibold ${className}`}
    {...props}
  >
    {children}
  </button>
);
// --- End Mock Components ---

// Updated stats with more corporate icons
const heroStats = [
  {
    icon: Briefcase,
    value: "25+ Years",
    label: "of Market Leadership",
    bgColor: "bg-blue-900/50",
  },
  {
    icon: Users,
    value: "1,200+ Clients",
    label: "Served Globally",
    bgColor: "bg-sky-800/60",
  },
  {
    icon: Globe,
    value: "Growth in 50+ Countries",
    label: "Expanding Our Reach",
    bgColor: "bg-blue-900/50",
  },
];
type PageType =
  | "home"
  | "products"
  | "product-details"
  | "contact"
  | "quote"
  | "search"
  | "admin-dashboard"
  | "admin-products"
  | "admin-add-product"
  | "admin-edit-product";

// Main Hero Component
export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600880292203-942bb68b2432?q=80&w=1887&auto=format&fit=crop",
  ];
  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  const prevImage = () =>
    setCurrentImageIndex(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length
    );
  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate()

  return (
    <div className="font-sans">
      <section className="relative h-screen min-h-[800px] w-full text-white overflow-hidden flex flex-col">
        <NewNavbar />

        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-blue-950/70" />

        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/20 rounded-full hover:bg-black/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          {" "}
          <ChevronLeft className="w-6 h-6" />{" "}
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/20 rounded-full hover:bg-black/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          {" "}
          <ChevronRight className="w-6 h-6" />{" "}
        </button>
        <div className="relative pt-18 z-10 flex-grow flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
                style={{
                  textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
                  fontFamily:
                    " Roboto, sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                PRECISION FILTERATION FOR{" "}
                <span className="text-sky-400">DEMANDING INDUSTRIES</span>
              </h1>
              <p
                className="mt-8 text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed"
                style={{
                  textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
                  fontFamily:
                    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                }}
              >
                We engineer high-performance filtration solutions that enhance
                purity, efficiency, and reliability for India's leading
                industrial sectors.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                  onClick={() => { navigate("/products") }}
                  className="group cursor-pointer flex items-center justify-center w-full sm:w-auto bg-sky-600 hover:bg-sky-500 text-white shadow-lg rounded-md px-8 py-4 text-base font-semibold transition-all duration-300">
                    Explore Our Products{" "}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="group cursor-pointer flex items-center justify-center w-full sm:w-auto bg-transparent border-2 border-white/80 hover:bg-white hover:text-sky-600 text-white rounded-md px-8 py-4 text-base font-semibold transition-all duration-300">
                    Talk to an Engineer
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="max-w-full mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 text-center"
            >
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className={`p-8 backdrop-blur-sm border-t-2 border-white/10 ${stat.bgColor}`}
                >
                  <stat.icon className="w-10 h-10 mx-auto mb-4 text-sky-300" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-slate-300">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

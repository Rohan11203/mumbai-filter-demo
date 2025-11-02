import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Droplets,
  Wind,
  Zap,
  Search,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

// --- Mock Components to resolve dependencies ---
const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg font-semibold ${className}`}
    {...props}
  >
    {children}
  </button>
);

const useTheme = () => ({
  colors: {
    primary: "#0D47A1", // Dark Blue
    secondary: "#29B6F6", // Light Blue
    background: "#FFFFFF",
    textPrimary: "#111827",
    textSecondary: "#6B7281",
    border: "#E5E7EB",
  },
});
// --- End Mocks ---

// --- Mega Menu Data ---
const megaMenuData = {
  products: {
    title: "Our Products & Solutions",
    sections: [
      {
        title: "Water Treatment",
        icon: Droplets,
        items: [
          {
            name: "Industrial Cartridge Filters",
            description: "High-efficiency filtration",
          },
          {
            name: "Membrane Filter Systems",
            description: "Advanced membrane tech",
          },
          {
            name: "Bag Filter Systems",
            description: "Large capacity filtration",
          },
        ],
      },
      {
        title: "Air Filtration",
        icon: Wind,
        items: [
          { name: "HEPA Filters", description: "99.97% efficiency" },
          { name: "Carbon Filters", description: "Odor and vapor removal" },
          {
            name: "Dust Collectors",
            description: "Industrial dust collection",
          },
        ],
      },
      {
        title: "Oil & Chemical",
        icon: Zap,
        items: [
          {
            name: "Oil Separation Systems",
            description: "Efficient oil-water separation",
          },
          { name: "Chemical Filters", description: "Corrosion resistant" },
          { name: "Process Filters", description: "Custom process filtration" },
        ],
      },
    ],
    featured: {
      title: "Featured Solution",
      name: "Smart Filtration IoT",
      description:
        "Monitor and optimize your filtration systems with real-time data analytics.",
      image:
        "https://images.unsplash.com/photo-1585366958403-bacb4c36a1a9?q=80&w=1080&auto=format&fit=crop",
    },
  },
};

function MegaMenuContent({ onClose }) {
  const { colors } = useTheme();
  const menuData = megaMenuData.products;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-xl shadow-2xl mt-4 overflow-hidden"
      style={{
        backgroundColor: colors.background,
        border: `1px solid ${colors.border}`,
      }}
    >
      <div
        className="mx-auto p-8"
        style={{ width: "1100px", maxWidth: "90vw" }}
      >
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <h3
              className="text-lg font-semibold mb-6"
              style={{ color: colors.textPrimary }}
            >
              {menuData.title}
            </h3>
            <div className="grid grid-cols-3 gap-x-12">
              {menuData.sections.map((section, idx) => (
                <div key={idx}>
                  <div className="flex items-center mb-4">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${colors.secondary}20` }}
                    >
                      <section.icon
                        className="w-4 h-4"
                        style={{ color: colors.secondary }}
                      />
                    </div>
                    <h4
                      className="font-medium"
                      style={{ color: colors.textPrimary }}
                    >
                      {section.title}
                    </h4>
                  </div>
                  <div className="space-y-1">
                    {section.items.map((item, itemIdx) => (
                      <Link
                        to="/products"
                        key={itemIdx}
                        className="block group p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 w-full text-left"
                        onClick={onClose}
                      >
                        <div className="font-medium text-gray-800 group-hover:text-sky-600 transition-colors duration-200">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-4 bg-gray-50 rounded-xl p-6">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img
                src={menuData.featured.image}
                alt={menuData.featured.name}
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">
              {menuData.featured.name}
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              {menuData.featured.description}
            </p>
            <Link
              to="/products"
              className="text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors duration-200"
              onClick={onClose}
            >
              Learn More →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MegaMenuDropdown({ isScrolled }) {
  const { colors } = useTheme();
  const [activeMenu, setActiveMenu] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(false), 200);
  };

  const navItemColor = isScrolled ? colors.textPrimary : "white";

  return (
    <div
      onMouseLeave={handleMouseLeave}
      className="flex items-center space-x-2 h-full"
    >
      <div
        onMouseEnter={handleMouseEnter}
        className="relative h-full flex items-center"
      >
        <button
          className="flex items-center space-x-1 cursor-pointer py-2 px-3 font-medium transition-all duration-200 group rounded-lg hover:bg-black/10"
          style={{ color: navItemColor }}
        >
          <span>Products</span>
          <motion.div animate={{ rotate: activeMenu ? 180 : 0 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>
      </div>

      <button
        className="flex items-center space-x-1 cursor-pointer py-2 px-3 font-medium transition-all duration-200 rounded-lg hover:bg-black/10"
        style={{ color: navItemColor }}
      >
        <span>Company</span>
      </button>

       <button
        className="flex items-center space-x-1 cursor-pointer py-2 px-3 font-medium transition-all duration-200 rounded-lg hover:bg-black/10"
        style={{ color: navItemColor }}
      >
        <span>Solutions</span>
      </button>
      <AnimatePresence>
        {activeMenu && (
          <div
            onMouseEnter={() => clearTimeout(timeoutRef.current)}
            className="absolute top-full z-50 pt-2"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              width: "auto",
            }}
          >
            <MegaMenuContent onClose={() => setActiveMenu(false)} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function NewNavbar() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const navTextColor = isScrolled ? "black" : "white";
  const searchBorderColor = isScrolled ? "gray" : "rgba(255, 255, 255, 0.4)";
  const searchBgColor = isScrolled ? "transparent" : "rgba(255, 255, 255, 0.1)";
  const placeholderColor = isScrolled ? "black" : "rgba(255,255,255,0.7)";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow  duration-300 ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <style>{`.placeholder-color::placeholder { color: ${placeholderColor}; }`}</style>
      <nav
        className="w-full  transition-all shadow-sm duration-300"
        style={{
          backgroundColor: isScrolled
            ? "rgba(255, 255, 255, 0.8)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(10px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(10px)" : "none",
          borderBottom: `1px solid ${
            isScrolled ? colors.border : "transparent"
          }`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between items-center transition-all duration-300 ${
              isScrolled ? "h-16" : "h-20"
            }`}
          >
            <motion.div className="flex-shrink-0" whileHover={{ scale: 1.02 }}>
              <Link to="/">
                <img
                  width={200}
                  src={
                    "https://mumbaifilter.com/wp-content/uploads/2023/06/Mumbai-Filter-Logo-PNG.png"
                  }
                  alt="Mumbai Filter Corp Logo"
                />
              </Link>
            </motion.div>

            <div className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full">
              <MegaMenuDropdown isScrolled={isScrolled} />
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <form
                onSubmit={handleSearchSubmit}
                className="hidden sm:flex relative items-center"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-40 md:w-48 py-2 border rounded-md px-8 pl-9 focus:outline-none focus:ring-2 ring-sky-400 transition-all duration-300 placeholder-color"
                  style={{
                    borderColor: searchBorderColor,
                    backgroundColor: searchBgColor,
                    color: navTextColor,
                  }}
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                >
                  <Search
                    className="h-4 w-4 transition-colors duration-300"
                    style={{ color: navTextColor }}
                  />
                </button>
              </form>

              <Link to="/quote">
                <Button
                  className="group cursor-pointer hidden sm:flex items-center justify-center text-white transition-all duration-300 hover:opacity-90 shadow-lg rounded-full px-5 py-2"
                  style={{
                    backgroundColor: isScrolled
                      ? colors.secondary
                      : "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    border: `1px solid ${
                      isScrolled ? "transparent" : "rgba(255, 255, 255, 0.8)"
                    }`,
                  }}
                >
                  Get Quote
                  <ArrowRight className="w-4 h-4 ml-1.5 transform transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>

              <button
                className="lg:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" style={{ color: navTextColor }} />
                ) : (
                  <Menu className="h-6 w-6" style={{ color: navTextColor }} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile menu would be implemented here */}
    </header>
  );
}

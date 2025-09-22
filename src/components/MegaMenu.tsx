import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./ThemeProvider";
import { ChevronDown, Droplets, Wind, Zap, Factory, Users, Award, FileText, Phone, Mail } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const megaMenuData = {
  products: {
    title: "Products & Solutions",
    sections: [
      {
        title: "Water Treatment",
        icon: Droplets,
        items: [
          { name: "Industrial Cartridge Filters", description: "High-efficiency filtration systems" },
          { name: "Membrane Filter Systems", description: "Advanced membrane technology" },
          { name: "Bag Filter Systems", description: "Large capacity filtration" },
          { name: "RO Systems", description: "Reverse osmosis solutions" }
        ]
      },
      {
        title: "Air Filtration", 
        icon: Wind,
        items: [
          { name: "HEPA Filters", description: "99.97% efficiency filtration" },
          { name: "Carbon Filters", description: "Odor and vapor removal" },
          { name: "Dust Collectors", description: "Industrial dust collection" },
          { name: "Clean Room Solutions", description: "Pharmaceutical grade air" }
        ]
      },
      {
        title: "Oil & Chemical",
        icon: Zap,
        items: [
          { name: "Oil Separation Systems", description: "Efficient oil-water separation" },
          { name: "Chemical Filters", description: "Corrosion resistant solutions" },
          { name: "Process Filters", description: "Custom process filtration" },
          { name: "Coalescence Systems", description: "Advanced separation technology" }
        ]
      }
    ],
    featured: {
      title: "Featured Solution",
      name: "Smart Filtration IoT",
      description: "Monitor and optimize your filtration systems with real-time data analytics",
      image: "https://images.unsplash.com/photo-1585366958403-bacb4c36a1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxwcmVjaXNpb24lMjBlbmdpbmVlcmluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU3NTk0Njk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  },
  solutions: {
    title: "Industries & Applications",
    sections: [
      {
        title: "By Industry",
        icon: Factory,
        items: [
          { name: "Pharmaceutical", description: "FDA compliant filtration" },
          { name: "Food & Beverage", description: "Safe processing solutions" },
          { name: "Chemical Processing", description: "Corrosion resistant systems" },
          { name: "Oil & Gas", description: "Heavy-duty industrial filters" }
        ]
      },
      {
        title: "Applications",
        icon: Award,
        items: [
          { name: "Process Water", description: "Clean water for manufacturing" },
          { name: "Wastewater Treatment", description: "Environmental compliance" },
          { name: "Air Quality Control", description: "Clean air solutions" },
          { name: "Product Recovery", description: "Maximize yield efficiency" }
        ]
      }
    ],
    cta: {
      title: "Custom Solutions",
      description: "Need a tailored filtration solution? Our engineers design custom systems for unique requirements.",
      buttonText: "Consult Our Engineers"
    }
  },
  company: {
    title: "About Mumbai Filter Corp",
    sections: [
      {
        title: "Company",
        icon: Users,
        items: [
          { name: "Our Story", description: "25+ years of filtration excellence" },
          { name: "Leadership Team", description: "Industry experts and innovators" },
          { name: "Certifications", description: "ISO certified quality systems" },
          { name: "Global Presence", description: "Serving customers worldwide" }
        ]
      },
      {
        title: "Resources",
        icon: FileText,
        items: [
          { name: "Technical Library", description: "White papers and case studies" },
          { name: "Installation Guides", description: "Step-by-step instructions" },
          { name: "Maintenance Tips", description: "Optimize system performance" },
          { name: "Training Programs", description: "Operator certification courses" }
        ]
      }
    ],
    contact: {
      phone: "+91 22 1234 5678",
      email: "info@mumbaifilter.com",
      address: "123 Industrial Area, Mumbai"
    }
  }
};

interface MegaMenuProps {
  isOpen: boolean;
  menuType: string;
  onClose: () => void;
  onNavigate?: (page: string) => void;
}

function MegaMenuContent({ isOpen, menuType, onClose, onNavigate }: MegaMenuProps) {
  const { colors } = useTheme();
  
  if (!isOpen || !megaMenuData[menuType as keyof typeof megaMenuData]) return null;
  
  const menuData = megaMenuData[menuType as keyof typeof megaMenuData];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-xl shadow-2xl mt-2 overflow-hidden"
      style={{ 
        backgroundColor: colors.background,
        border: `1px solid ${colors.border}`
      }}
    >
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-8">
            <h3 className="text-xl font-semibold mb-6" style={{ color: colors.textPrimary }}>{menuData.title}</h3>
            
            <div className="grid grid-cols-2 gap-8">
              {menuData.sections.map((section, idx) => {
                const IconComponent = section.icon;
                return (
                  <div key={idx}>
                    <div className="flex items-center mb-4">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                        style={{ backgroundColor: `${colors.secondary}20` }}
                      >
                        <IconComponent className="w-4 h-4" style={{ color: colors.secondary }} />
                      </div>
                      <h4 className="font-medium" style={{ color: colors.textPrimary }}>{section.title}</h4>
                    </div>
                    <div className="space-y-3">
                      {section.items.map((item, itemIdx) => (
                        <motion.button
                          key={itemIdx}
                          className="block group p-3 rounded-lg transition-colors duration-200 w-full text-left"
                          style={{ 
                            ':hover': { backgroundColor: colors.hover }
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = colors.hover;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                          onClick={() => {
                            onNavigate?.('products');
                            onClose();
                          }}
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.15 }}
                        >
                          <div 
                            className="font-medium transition-colors duration-200"
                            style={{ 
                              color: colors.textPrimary,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = colors.secondary;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = colors.textPrimary;
                            }}
                          >
                            {item.name}
                          </div>
                          <div className="text-sm" style={{ color: colors.textSecondary }}>{item.description}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="col-span-4">
            {menuType === 'products' && 'featured' in menuData && (
              <div className="bg-gradient-to-br from-[#007BFF]/5 to-[#1A237E]/5 rounded-xl p-6">
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <ImageWithFallback
                    src={menuData.featured.image}
                    alt={menuData.featured.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                <h4 className="font-semibold text-[#1A237E] mb-2">{menuData.featured.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{menuData.featured.description}</p>
                <motion.button
                  className="text-sm font-medium text-[#007BFF] hover:text-[#0056b3] transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onNavigate?.('products');
                    onClose();
                  }}
                >
                  Learn More →
                </motion.button>
              </div>
            )}

            {menuType === 'solutions' && 'cta' in menuData && (
              <div className="bg-gradient-to-br from-[#007BFF] to-[#1A237E] rounded-xl p-6 text-white">
                <h4 className="font-semibold mb-2">{menuData.cta.title}</h4>
                <p className="text-sm text-blue-100 mb-4">{menuData.cta.description}</p>
                <motion.button
                  className="bg-white text-[#007BFF] px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onNavigate?.('contact');
                    onClose();
                  }}
                >
                  {menuData.cta.buttonText}
                </motion.button>
              </div>
            )}

            {menuType === 'company' && 'contact' in menuData && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-[#1A237E] mb-4">Get in Touch</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-[#007BFF] mr-3" />
                    <span className="text-sm text-gray-700">{menuData.contact.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-[#007BFF] mr-3" />
                    <span className="text-sm text-gray-700">{menuData.contact.email}</span>
                  </div>
                  <div className="flex items-start">
                    <Factory className="w-4 h-4 text-[#007BFF] mr-3 mt-0.5" />
                    <span className="text-sm text-gray-700">{menuData.contact.address}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function MegaMenu({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const { colors } = useTheme();
  const [activeMenu, setActiveMenu] = useState<string>("");
  const timeoutRef = useRef<NodeJS.Timeout>();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu("");
    }, 200);
  };

  const handleMenuMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMenuMouseLeave = () => {
    setActiveMenu("");
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex items-center space-x-8">
        {[
          { key: 'products', label: 'Products' },
          { key: 'solutions', label: 'Solutions' },
          { key: 'company', label: 'Company' }
        ].map((item) => (
          <div
            key={item.key}
            className="relative"
            onMouseEnter={() => handleMouseEnter(item.key)}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className="flex items-center space-x-1 py-2 px-3 font-medium transition-all duration-200 group rounded-lg"
              style={{ 
                color: colors.textPrimary,
                ':hover': { color: colors.secondary, backgroundColor: colors.hover }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.secondary;
                e.currentTarget.style.backgroundColor = colors.hover;
              }}
              onMouseLeave={(e) => {
                if (activeMenu !== item.key) {
                  e.currentTarget.style.color = colors.textPrimary;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
              onClick={() => {
                if (item.key === 'products') onNavigate?.('products');
                else if (item.key === 'company') onNavigate?.('contact');
                setActiveMenu("");
              }}
            >
              <span>{item.label}</span>
              <motion.div
                animate={{ rotate: activeMenu === item.key ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 transition-colors duration-200" />
              </motion.div>
            </button>
          </div>
        ))}
      </div>

      {/* Megamenu Content */}
      <AnimatePresence>
        {activeMenu && (
          <div
            onMouseEnter={handleMenuMouseEnter}
            onMouseLeave={handleMenuMouseLeave}
            className="absolute top-full z-50"
            style={{ 
              left: '-300px',
              width: '1200px',
              maxWidth: '100vw'
            }}
          >
            <MegaMenuContent
              isOpen={true}
              menuType={activeMenu}
              onClose={() => setActiveMenu("")}
              onNavigate={onNavigate}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
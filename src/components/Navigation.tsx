import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { MegaMenu } from "./MegaMenu";
import { ThemeSelector } from "./ThemeSelector";
import { useTheme } from "./ThemeProvider";
import { Search, Menu, X, Phone, Mail, User, ShoppingCart, Heart, Globe } from "lucide-react";

interface NavigationProps {
  onNavigate?: (page: string) => void;
  onSearch?: (query: string) => void;
}

export function Navigation({ onNavigate, onSearch }: NavigationProps) {
  const { colors } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  

  const navItems = [
    { label: "Home", onClick: () => onNavigate?.('home') },
    { label: "Products", onClick: () => onNavigate?.('products') },
    { label: "Contact", onClick: () => onNavigate?.('contact') },
    { label: "Admin", onClick: () => onNavigate?.('admin-dashboard') }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <>
      {/* Top Bar */}
      <div className="py-2 text-sm" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-white">
                <Phone className="w-3 h-3 mr-2" />
                <span>+91 22 1234 5678</span>
              </div>
              <div className="hidden sm:flex items-center text-white">
                <Globe className="w-3 h-3 mr-2" />
                <span>ISO 9001:2015 Certified</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="hidden sm:inline text-white opacity-90">24/7 Technical Support</span>
              <button 
                className="text-blue-200 hover:text-white transition-colors duration-200"
                onClick={() => onNavigate?.('contact')}
              >
                Support Portal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="border-b sticky top-0 z-50 shadow-sm backdrop-blur-sm" 
           style={{ 
             backgroundColor: `${colors.background}f5`,
             borderColor: colors.border
           }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => onNavigate?.('home')}
            >
              <div className="flex items-center">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                  style={{
                    background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`
                  }}
                >
                  <span className="text-white font-bold text-lg">MF</span>
                </div>
                <div>
                  <h1 className="font-bold text-xl tracking-tight" style={{ color: colors.textPrimary }}>
                    Mumbai Filter Corporation
                  </h1>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    Industrial Filtration Solutions
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <MegaMenu onNavigate={onNavigate} />
            </div>

            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <form onSubmit={handleSearch} className="hidden sm:flex relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                  style={{ 
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                    color: colors.textPrimary,
                    '--tw-ring-color': colors.secondary
                  } as any}
                />
                <button 
                  type="submit" 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 hover:opacity-70 transition-opacity duration-200"
                >
                  <Search className="h-4 w-4" style={{ color: colors.secondary }} />
                </button>
              </form>

              {/* Theme Selector */}
              <div className="hidden lg:block">
                <ThemeSelector />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hidden sm:flex hover:bg-opacity-10"
                  style={{ color: colors.textSecondary }}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hidden sm:flex hover:bg-opacity-10"
                  style={{ color: colors.textSecondary }}
                >
                  <ShoppingCart className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hidden sm:flex hover:bg-opacity-10"
                  style={{ color: colors.textSecondary }}
                  onClick={() => onNavigate?.('admin-dashboard')}
                >
                  <User className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  className="text-white transition-all duration-200 hover:opacity-90 shadow-lg"
                  style={{ backgroundColor: colors.secondary }}
                  onClick={() => onNavigate?.('quote')}
                >
                  Get Quote
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{ color: colors.textPrimary }}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t"
            style={{ 
              backgroundColor: colors.background,
              borderColor: colors.border
            }}
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="flex sm:hidden relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ 
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                    color: colors.textPrimary,
                    '--tw-ring-color': colors.secondary
                  } as any}
                />
                <button 
                  type="submit" 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 hover:opacity-70 transition-opacity duration-200"
                >
                  <Search className="h-4 w-4" style={{ color: colors.secondary }} />
                </button>
              </form>
              
              {/* Mobile Navigation Items */}
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Button 
                    key={item.label}
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => {
                      item.onClick();
                      setIsMenuOpen(false);
                    }}
                    style={{ color: colors.textPrimary }}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>

              {/* Mobile Theme Selector */}
              <div className="pt-4 border-t" style={{ borderColor: colors.border }}>
                <div className="mb-4">
                  <ThemeSelector />
                </div>
                <Button 
                  className="w-full text-white"
                  style={{ backgroundColor: colors.secondary }}
                  onClick={() => {
                    onNavigate?.('quote');
                    setIsMenuOpen(false);
                  }}
                >
                  Get Quote
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
}
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "./ThemeProvider";
import { Play, CheckCircle, ArrowRight, Award, Users, Globe } from "lucide-react";

const heroStats = [
  { icon: Award, value: "25+", label: "Years Experience", color: "text-blue-600" },
  { icon: Users, value: "500+", label: "Projects Delivered", color: "text-green-600" },
  { icon: Globe, value: "15+", label: "Countries Served", color: "text-purple-600" }
];

const heroFeatures = [
  "ISO 9001:2015 Certified Quality",
  "24/7 Technical Support",
  "Custom Engineering Solutions",
  "Worldwide Service Network"
];

export function Hero() {
  const { colors } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [
    "https://images.unsplash.com/photo-1583737097428-af53774819a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWFudWZhY3R1cmluZyUyMG1vZGVybiUyMGZhY2lsaXR5fGVufDF8fHx8MTc1NzU5NDY5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1585366958403-bacb4c36a1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxwcmVjaXNpb24lMjBlbmdpbmVlcmluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU3NTk0Njk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1564605504543-1833fef7c1c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmlsdHJhdGlvbiUyMGZhY2lsaXR5JTIwY2xlYW4lMjBtb2Rlcm58ZW58MXx8fHwxNzU3NTk0MDU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section 
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom right, ${colors.surfaceLight}, ${colors.background}, ${colors.surfaceLight})`
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23000000' fill-opacity='0.1'%3e%3ccircle cx='30' cy='30' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center bg-blue-50 border border-blue-100 rounded-full px-4 py-2 text-sm font-medium text-blue-700"
            >
              <Award className="w-4 h-4 mr-2" />
              India's Leading Filtration Solutions Provider
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              >
                <span className="text-[#1A237E]">Precision</span>
                <br />
                <span className="text-[#1A237E]">Meets</span>
                <br />
                <span className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] bg-clip-text text-transparent">
                  Performance
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-xl text-gray-600 leading-relaxed max-w-xl"
              >
                Advanced industrial filtration systems engineered for maximum efficiency, 
                reliability, and performance across diverse industrial applications.
              </motion.p>
            </div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-2 gap-3"
            >
              {heroFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] hover:from-[#0056b3] hover:to-[#004494] text-white shadow-xl group px-8 py-4"
                >
                  Explore Solutions
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-lg hover:border-[#007BFF] hover:text-[#007BFF] transition-all duration-200 group shadow-lg"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Visual Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative">
              <motion.div 
                className="relative overflow-hidden rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-w-4 aspect-h-3">
                  <ImageWithFallback
                    src={heroImages[currentImageIndex]}
                    alt="Advanced filtration facility"
                    className="w-full h-96 lg:h-[500px] object-cover"
                  />
                </div>
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                
                {/* Floating Stats Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="grid grid-cols-3 gap-4">
                      {heroStats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                            className="text-center"
                          >
                            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 mb-2`}>
                              <IconComponent className={`w-4 h-4 ${stat.color}`} />
                            </div>
                            <div className="font-bold text-gray-900">{stat.value}</div>
                            <div className="text-xs text-gray-600">{stat.label}</div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#007BFF]/20 to-[#1A237E]/20 rounded-full"
              />
              
              <motion.div
                animate={{ 
                  rotate: -360,
                  scale: [1, 0.9, 1]
                }}
                transition={{ 
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-[#1A237E]/10 to-[#007BFF]/10 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
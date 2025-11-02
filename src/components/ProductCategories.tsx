import { useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Wind, Zap, ArrowRight, TrendingUp, Shield, Clock } from "lucide-react";

// --- Mock Components for standalone demonstration ---
const Card = ({ className, children }) => <div className={`rounded-xl ${className}`}>{children}</div>;
const CardContent = ({ className, children }) => <div className={className}>{children}</div>;
const Button = ({ children, className, ...props }) => (
    <button className={`px-4 py-2 rounded-lg font-semibold flex items-center justify-center ${className}`} {...props}>
        {children}
    </button>
);
const ImageWithFallback = ({ src, alt, className }) => <img src={src} alt={alt} className={className} />;
const useTheme = () => ({
    colors: {
        primary: '#0D47A1', // Dark Blue
        secondary: '#29B6F6', // Light Blue
        accent: '#039BE5', // A slightly darker blue
        background: '#FFFFFF',
        surfaceLight: '#F3F4F6', // Light Gray
        textPrimary: '#111827', // Almost Black
        textSecondary: '#6B7281', // Medium Gray
    }
});
// --- End Mocks ---

const categories = [
  {
    id: 1,
    name: "Water Treatment Systems",
    shortDesc: "Pure water for industrial excellence",
    description: "Advanced multi-stage filtration systems for demanding water treatment applications across pharmaceutical, food & beverage, and manufacturing industries.",
    image: "https://images.unsplash.com/photo-1654220691341-be23a137bd0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHRyZWF0bWVudCUyMGZpbHRlciUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTc1OTQwNTh8MA",
    products: 24,
    icon: Droplets,
    features: ["99.9% Filtration Efficiency", "FDA Compliant", "IoT Monitoring"]
  },
  {
    id: 2,
    name: "Air Filtration Solutions",
    shortDesc: "Clean air for optimal environments",
    description: "Precision-engineered HEPA and ULPA filtration systems for cleanrooms, laboratories, and industrial environments requiring superior air quality control.",
    image: "https://images.unsplash.com/photo-1655039353512-ab38d6a37a92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxhaXIlMjBmaWx0cmF0aW9uJTIwc3lzdGVtJTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NTc1OTQwNjF8MA",
    products: 18,
    icon: Wind,
    features: ["99.97% HEPA Efficiency", "Energy Optimized", "Long Service Life"]
  },
  {
    id: 3,
    name: "Oil & Chemical Processing",
    shortDesc: "Specialized filtration for heavy industry",
    description: "Robust filtration solutions for oil refining, petrochemical processing, and heavy industrial applications with superior chemical superior air resistance.",
    image: "https://images.unsplash.com/photo-1509886246223-cd7fd68f5372?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjBmaWx0cmF0aW9uJTIwaW5kdXN0cmlhbCUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTc1OTQwNjR8MA",
    products: 15,
    icon: Zap,
    features: ["Chemical Resistant", "High Temperature", "Explosion Proof"]
  }
];

export  function ProductCategories() {
  const { colors } = useTheme();
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section 
      className="py-24" 
      id="products"
      style={{
        background: `linear-gradient(to bottom, ${colors.background}, ${colors.surfaceLight})`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full bg-sky-100 text-sky-700 px-4 py-2 mb-6">
            <Shield className="w-4 h-4 mr-2" />
            <span className="font-medium">Industry-Leading Solutions</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: colors.textPrimary }}>
            Engineered for <span style={{ color: colors.primary }}>Excellence</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: colors.textSecondary }}>
            Three decades of innovation in industrial filtration technology, delivering uncompromising quality and performance across critical applications worldwide.
          </p>
        </motion.div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredCard(category.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group"
            >
              <Card className="h-full border border-gray-200/80 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <motion.div
                    animate={{ scale: hoveredCard === category.id ? 1.05 : 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <ImageWithFallback src={category.image} alt={category.name} className="w-full h-56 object-cover"/>
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-950/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center text-white text-sm font-medium">
                        <TrendingUp className="w-4 h-4 mr-1.5" />
                        {category.products} Products
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.5)'}}>{category.name}</h3>
                    <p className="text-white/90 text-sm" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>{category.shortDesc}</p>
                  </div>
                </div>
                <CardContent className="p-6 space-y-5 flex flex-col flex-grow">
                    <p className="leading-relaxed flex-grow" style={{ color: colors.textSecondary }}>
                        {category.description}
                    </p>
                    <div className="space-y-2 pt-2 border-t border-gray-200">
                        {category.features.map((feature) => (
                            <div key={feature} className="flex items-center text-sm">
                                <div className="w-2 h-2 rounded-full bg-sky-500 mr-3" />
                                <span className="font-medium" style={{ color: colors.textPrimary }}>{feature}</span>
                            </div>
                        ))}
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
                        <Button className="w-full cursor-pointer text-white group bg-sky-600 hover:bg-sky-500 shadow-lg rounded-md py-3 text-base font-bold transition-all duration-300">
                            Explore Solutions <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </Button>
                    </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center rounded-2xl p-8 lg:p-12 text-white"
          style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">Need a Tailored Filtration Solution?</h3>
            <p className="mb-8 text-lg text-blue-100">
              Our engineering team designs custom filtration systems for unique industrial requirements. From concept to commissioning, we deliver solutions that exceed expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full sm:w-auto bg-white hover:bg-gray-100 text-blue-700 shadow-lg rounded-md px-8 py-3 text-base font-bold transition-all duration-300">
                        Consult Our Engineers
                    </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full sm:w-auto bg-transparent border-2 border-white/80 hover:bg-white hover:text-blue-700 text-white rounded-md px-8 py-3 text-base font-bold transition-all duration-300">
                        Download Catalog
                    </Button>
                </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

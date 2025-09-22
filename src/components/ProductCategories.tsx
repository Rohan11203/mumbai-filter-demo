import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "./ThemeProvider";
import { Droplets, Wind, Zap, ArrowRight, TrendingUp, Shield, Clock } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Water Treatment Systems",
    shortDesc: "Pure water for industrial excellence",
    description: "Advanced multi-stage filtration systems engineered for demanding water treatment applications across pharmaceutical, food & beverage, and manufacturing industries.",
    image: "https://images.unsplash.com/photo-1654220691341-be23a137bd0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHRyZWF0bWVudCUyMGZpbHRlciUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTc1OTQwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    products: 24,
    icon: Droplets,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
    features: ["99.9% Filtration Efficiency", "FDA Compliant", "IoT Monitoring"]
  },
  {
    id: 2,
    name: "Air Filtration Solutions",
    shortDesc: "Clean air for optimal environments",
    description: "Precision-engineered HEPA and ULPA filtration systems designed for cleanrooms, laboratories, and industrial environments requiring superior air quality control.",
    image: "https://images.unsplash.com/photo-1655039353512-ab38d6a37a92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxhaXIlMjBmaWx0cmF0aW9uJTIwc3lzdGVtJTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NTc1OTQwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    products: 18,
    icon: Wind,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    borderColor: "border-green-200",
    features: ["99.97% HEPA Efficiency", "Energy Optimized", "Long Service Life"]
  },
  {
    id: 3,
    name: "Oil & Chemical Processing",
    shortDesc: "Specialized filtration for heavy industry",
    description: "Robust filtration solutions engineered for oil refining, petrochemical processing, and heavy industrial applications with superior chemical resistance.",
    image: "https://images.unsplash.com/photo-1509886246223-cd7fd68f5372?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjBmaWx0cmF0aW9uJTIwaW5kdXN0cmlhbCUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTc1OTQwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    products: 15,
    icon: Zap,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
    borderColor: "border-orange-200",
    features: ["Chemical Resistant", "High Temperature", "Explosion Proof"]
  }
];

export function ProductCategories() {
  const { colors } = useTheme();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
          <div 
            className="inline-flex items-center rounded-full px-4 py-2 mb-6"
            style={{ backgroundColor: `${colors.secondary}10` }}
          >
            <Shield className="w-4 h-4 mr-2" style={{ color: colors.secondary }} />
            <span className="font-medium" style={{ color: colors.secondary }}>Industry-Leading Solutions</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: colors.textPrimary }}>
            Engineered for
            <span 
              className="block bg-gradient-to-r bg-clip-text text-transparent"
              style={{ 
                backgroundImage: `linear-gradient(to right, ${colors.secondary}, ${colors.accent})`
              }}
            >
              Excellence
            </span>
          </h2>
          
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: colors.textSecondary }}>
            Three decades of innovation in industrial filtration technology, delivering uncompromising 
            quality and performance across critical applications worldwide.
          </p>
        </motion.div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredCard(category.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group"
              >
                <Card 
                  className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                  style={{ backgroundColor: colors.background }}
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <motion.div
                      animate={{ 
                        scale: hoveredCard === category.id ? 1.1 : 1 
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="aspect-w-16 aspect-h-10"
                    >
                      <ImageWithFallback
                        src={category.image}
                        alt={category.name}
                        className="w-full h-56 object-cover"
                      />
                    </motion.div>
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`} />
                    
                    {/* Icon & Stats */}
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                        <div className="flex items-center text-white text-sm font-medium">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {category.products} Products
                        </div>
                      </div>
                    </div>
                    
                    {/* Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {category.name}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {category.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Content Section */}
                  <CardContent className="p-6 space-y-4">
                    <p className="leading-relaxed" style={{ color: colors.textSecondary }}>
                      {category.description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-2">
                      {category.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center text-sm"
                        >
                          <div className={`w-2 h-2 rounded-full ${category.bgColor.replace('bg-', 'bg-')} mr-3`} />
                          <span className="font-medium" style={{ color: colors.textPrimary }}>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="pt-4"
                    >
                      <Button 
                        className="w-full text-white group shadow-lg"
                        style={{ 
                          background: `linear-gradient(to right, ${colors.secondary}, ${colors.accent})`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `linear-gradient(to right, ${colors.accent}, ${colors.primary})`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = `linear-gradient(to right, ${colors.secondary}, ${colors.accent})`;
                        }}
                      >
                        Explore Solutions
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center rounded-2xl p-8 lg:p-12 text-white"
          style={{ 
            background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
          }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 mr-2" />
              <span className="font-medium">Custom Solutions Available</span>
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Need a Tailored Filtration Solution?
            </h3>
            
            <p className="mb-8 text-lg" style={{ color: `${colors.background}CC` }}>
              Our engineering team designs custom filtration systems for unique industrial requirements. 
              From concept to commissioning, we deliver solutions that exceed expectations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="shadow-lg"
                  style={{ 
                    backgroundColor: colors.background, 
                    color: colors.primary 
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.surfaceLight;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.background;
                  }}
                >
                  Consult Our Engineers
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white shadow-lg"
                  style={{ 
                    borderColor: colors.background, 
                    color: colors.background
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.background;
                    e.currentTarget.style.color = colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = colors.background;
                  }}
                >
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
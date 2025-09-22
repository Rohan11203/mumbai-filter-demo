import { useState } from "react";
import { motion } from "motion/react";
import { Award, Lightbulb, Users, Shield, Zap, Globe, ChevronRight, CheckCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useTheme } from "./ThemeProvider";

const mainValues = [
  {
    icon: Award,
    title: "Uncompromising Quality",
    description: "Every filtration system undergoes rigorous testing protocols and quality assurance processes to ensure peak performance in the most demanding industrial environments.",
    features: ["ISO 9001:2015 Certified", "Third-party Testing", "Premium Materials"],
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50"
  },
  {
    icon: Lightbulb,
    title: "Innovation Excellence",
    description: "Our R&D team continuously develops cutting-edge filtration technologies, incorporating IoT monitoring, smart diagnostics, and energy-efficient designs.",
    features: ["Smart IoT Integration", "Energy Optimization", "Predictive Maintenance"],
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-50"
  },
  {
    icon: Users,
    title: "Expert Partnership",
    description: "Three decades of industry expertise backed by certified engineers who understand your unique challenges and deliver tailored solutions that exceed expectations.",
    features: ["25+ Years Experience", "Certified Engineers", "24/7 Support"],
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50"
  }
];

const additionalBenefits = [
  { icon: Shield, title: "Guaranteed Performance", description: "2-year comprehensive warranty" },
  { icon: Zap, title: "Rapid Deployment", description: "Quick installation & commissioning" },
  { icon: Globe, title: "Global Reach", description: "Worldwide service network" }
];

const stats = [
  { value: "99.8%", label: "System Uptime", sublabel: "Proven reliability" },
  { value: "500+", label: "Projects Delivered", sublabel: "Successful implementations" },
  { value: "15+", label: "Countries Served", sublabel: "Global presence" },
  { value: "24/7", label: "Technical Support", sublabel: "Always available" }
];

export function ValueProposition() {
  const { colors } = useTheme();
  const [activeValue, setActiveValue] = useState(0);

  return (
    <section 
      className="py-24"
      style={{
        background: `linear-gradient(to bottom, ${colors.surfaceLight}, ${colors.background})`
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
            style={{ backgroundColor: `${colors.primary}10` }}
          >
            <Award className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
            <span className="font-medium" style={{ color: colors.primary }}>Why Industry Leaders Choose Us</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: colors.textPrimary }}>
            Built on 
            <span 
              className="block bg-gradient-to-r bg-clip-text text-transparent"
              style={{ 
                backgroundImage: `linear-gradient(to right, ${colors.secondary}, ${colors.accent})`
              }}
            >
              Trust & Excellence
            </span>
          </h2>
          
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: colors.textSecondary }}>
            When precision matters, industry leaders trust Mumbai Filter Corporation to deliver 
            filtration solutions that set the standard for reliability and performance.
          </p>
        </motion.div>

        {/* Main Value Props */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {mainValues.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                onHoverStart={() => setActiveValue(index)}
                className="group"
              >
                <Card 
                  className="h-full p-8 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                  style={{ backgroundColor: colors.background }}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div 
                      className={`w-16 h-16 ${value.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      animate={{ 
                        rotate: activeValue === index ? [0, 5, -5, 0] : 0 
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className={`w-8 h-8 bg-gradient-to-r ${value.color} bg-clip-text text-transparent`} />
                    </motion.div>

                    {/* Content */}
                    <h3 
                      className="text-2xl font-bold mb-4 transition-colors duration-300"
                      style={{ color: colors.textPrimary }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = colors.secondary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = colors.textPrimary;
                      }}
                    >
                      {value.title}
                    </h3>
                    
                    <p className="leading-relaxed mb-6" style={{ color: colors.textSecondary }}>
                      {value.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3">
                      {value.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="font-medium" style={{ color: colors.textPrimary }}>{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Learn More Link */}
                    <motion.div
                      className="mt-6 pt-6 border-t border-gray-100"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button 
                        className="flex items-center font-medium transition-colors duration-200"
                        style={{ color: colors.secondary }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = colors.accent;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = colors.secondary;
                        }}
                      >
                        Learn More 
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                      </button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-2xl p-8 lg:p-12 mb-16"
          style={{ 
            background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
          }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Proven Track Record
            </h3>
            <p className="text-lg" style={{ color: `${colors.background}CC` }}>
              Numbers that speak to our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div 
                  className="text-4xl lg:text-5xl font-bold text-white mb-2"
                  animate={{ 
                    scale: [1, 1.05, 1] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: index * 0.5 
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="font-medium mb-1" style={{ color: `${colors.background}CC` }}>{stat.label}</div>
                <div className="text-sm" style={{ color: `${colors.background}99` }}>{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {additionalBenefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group"
                style={{ backgroundColor: colors.background }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ 
                    background: `linear-gradient(to bottom right, ${colors.secondary}10, ${colors.primary}10)`
                  }}
                >
                  <IconComponent className="w-6 h-6" style={{ color: colors.secondary }} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: colors.textPrimary }}>{benefit.title}</h4>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-white rounded-2xl p-8 lg:p-12 shadow-lg"
        >
          <h3 className="text-3xl font-bold text-[#1A237E] mb-4">
            Ready to Experience the Difference?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who trust us with their critical filtration needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] hover:from-[#0056b3] hover:to-[#004494] text-white shadow-lg">
                Start Your Project
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#1A237E] text-[#1A237E] hover:bg-[#1A237E] hover:text-white shadow-lg"
              >
                Schedule Consultation
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
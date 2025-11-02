import { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Award, Lightbulb, Users, Shield, Zap, Globe, ChevronRight, CheckCircle } from "lucide-react";

// --- Mock Components for standalone demonstration ---
const Card = ({ className, children }) => <div className={`rounded-xl ${className}`}>{children}</div>;
const CardContent = ({ className, children }) => <div className={className}>{children}</div>;
const Button = ({ children, className, ...props }) => (
    <button className={`px-4 py-2 rounded-lg font-semibold flex items-center justify-center ${className}`} {...props}>
        {children}
    </button>
);
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

const mainValues = [
  {
    icon: Award,
    title: "Uncompromising Quality",
    description: "Every filtration system undergoes rigorous testing protocols and quality assurance processes to ensure peak performance in the most demanding industrial environments.",
    features: ["ISO 9001:2015 Certified", "Third-party Testing", "Premium Materials"],
  },
  {
    icon: Lightbulb,
    title: "Innovation Excellence",
    description: "Our R&D team continuously develops cutting-edge filtration technologies, incorporating IoT monitoring, smart diagnostics, and energy-efficient designs.",
    features: ["Smart IoT Integration", "Energy Optimization", "Predictive Maintenance"],
  },
  {
    icon: Users,
    title: "Expert Partnership",
    description: "Three decades of industry expertise backed by certified engineers who understand your unique challenges and deliver tailored solutions that exceed expectations.",
    features: ["25+ Years Experience", "Certified Engineers", "24/7 Support"],
  }
];

const stats = [
  { value: "99.8%", label: "System Uptime", sublabel: "Proven reliability" },
  { value: "500+", label: "Projects Delivered", sublabel: "Successful implementations" },
  { value: "15+", label: "Countries Served", sublabel: "Global presence" },
  { value: "24/7", label: "Technical Support", sublabel: "Always available" }
];

// Component to animate counting numbers
function AnimatedCounter({ to, suffix }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView && ref.current) {
            const node = ref.current;
            const controls = animate(0, to, {
                duration: 2,
                ease: "easeOut",
                onUpdate(value) {
                    // Handle decimals vs integers
                    if (String(to).includes('.')) {
                        node.textContent = value.toFixed(1);
                    } else {
                        node.textContent = Math.round(value).toString();
                    }
                }
            });
            return () => controls.stop();
        }
    }, [isInView, to]);

    return (
        <>
            <span ref={ref} />
            {suffix}
        </>
    );
}


export function ValueProposition() {
  const { colors } = useTheme();

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
          <div className="inline-flex items-center rounded-full bg-sky-100 text-sky-700 px-4 py-2 mb-6">
            <Award className="w-4 h-4 mr-2" />
            <span className="font-medium">Why Industry Leaders Choose Us</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: colors.textPrimary }}>
            Built on <span style={{ color: colors.primary }}>Trust & Excellence</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: colors.textSecondary }}>
            When precision matters, industry leaders trust Mumbai Filter Corporation to deliver filtration solutions that set the standard for reliability and performance.
          </p>
        </motion.div>

        {/* Main Value Props */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {mainValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card 
                className="h-full p-8 border border-gray-200/80 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden bg-white"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 bg-sky-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-sky-200 transition-all duration-300">
                    <value.icon className="w-8 h-8" style={{ color: colors.primary }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: colors.textPrimary }}>
                    {value.title}
                  </h3>
                  <p className="leading-relaxed mb-6 flex-grow" style={{ color: colors.textSecondary }}>
                    {value.description}
                  </p>
                  <div className="space-y-3 pt-6 border-t border-gray-200">
                    {value.features.map((feature) => (
                      <div key={feature} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-sky-500 mr-3 flex-shrink-0" />
                        <span className="font-medium" style={{ color: colors.textPrimary }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-2xl p-8 lg:p-12"
          style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Our Proven Track Record
            </h3>
            <p className="text-lg text-blue-100">
              Numbers that speak to our commitment to excellence.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
                const numericValue = parseFloat(stat.value);
                const suffix = stat.value.replace(String(numericValue), '');

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                        {isNaN(numericValue) ? stat.value : <AnimatedCounter to={numericValue} suffix={suffix} />}
                    </div>
                    <div className="font-medium mb-1 text-blue-100">{stat.label}</div>
                    <div className="text-sm text-blue-200/80">{stat.sublabel}</div>
                  </motion.div>
                );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


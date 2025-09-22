import { motion } from "motion/react";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube, Award, Download, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const quickLinks = [
  { name: "About Us", href: "#about" },
  { name: "Our Story", href: "#story" },
  { name: "Leadership", href: "#leadership" },
  { name: "Careers", href: "#careers" },
  { name: "News & Events", href: "#news" }
];

const productLinks = [
  { name: "Water Treatment", href: "#water" },
  { name: "Air Filtration", href: "#air" },
  { name: "Oil & Chemical", href: "#oil" },
  { name: "Custom Solutions", href: "#custom" },
  { name: "IoT Systems", href: "#iot" }
];

const supportLinks = [
  { name: "Technical Support", href: "#support" },
  { name: "Documentation", href: "#docs" },
  { name: "Training", href: "#training" },
  { name: "Warranty", href: "#warranty" },
  { name: "Service Network", href: "#service" }
];

const certifications = [
  "ISO 9001:2015",
  "ISO 14001:2015",
  "OHSAS 18001",
  "CE Certified"
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#1A237E] to-[#0F1654] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.1'%3e%3ccircle cx='30' cy='30' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-12 border-b border-white/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-blue-200">
                Get the latest industry insights, product updates, and technical resources delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-[#007BFF]"
              />
              <Button className="bg-[#007BFF] hover:bg-[#0056b3] text-white shadow-lg">
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">MF</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Mumbai Filter</h3>
                <p className="text-blue-200 text-sm">Industrial Solutions</p>
              </div>
            </div>
            
            <p className="text-blue-100 mb-6 leading-relaxed">
              India's premier industrial filtration solutions provider, delivering precision-engineered 
              systems that set industry standards for over 25 years.
            </p>

            {/* Certifications */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 flex items-center">
                <Award className="w-4 h-4 mr-2" />
                Certifications
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {certifications.map((cert, index) => (
                  <div key={index} className="text-xs bg-white/10 rounded px-2 py-1 text-center">
                    {cert}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#facebook" },
                { icon: Twitter, href: "#twitter" },
                { icon: Linkedin, href: "#linkedin" },
                { icon: Youtube, href: "#youtube" }
              ].map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-blue-200 hover:text-white hover:bg-[#007BFF] transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a 
                    href={link.href} 
                    className="text-blue-200 hover:text-white transition-colors duration-200 flex items-center group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <motion.a 
                    href={link.href} 
                    className="text-blue-200 hover:text-white transition-colors duration-200 flex items-center group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Support & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3 mb-6">
              {supportLinks.slice(0, 3).map((link, index) => (
                <li key={index}>
                  <motion.a 
                    href={link.href} 
                    className="text-blue-200 hover:text-white transition-colors duration-200 flex items-center group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start">
                <Phone className="w-4 h-4 mr-3 text-[#007BFF] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">+91 22 1234 5678</div>
                  <div className="text-blue-200 text-xs">24/7 Technical Support</div>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-4 h-4 mr-3 text-[#007BFF] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">info@mumbaifilter.com</div>
                  <div className="text-blue-200 text-xs">Sales & Inquiries</div>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 text-[#007BFF] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Mumbai, Maharashtra</div>
                  <div className="text-blue-200 text-xs">Headquarters & Manufacturing</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-white/10 py-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-blue-200 text-sm">
                © 2024 Mumbai Filter Corporation. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <a href="#privacy" className="text-blue-200 hover:text-white text-sm transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#terms" className="text-blue-200 hover:text-white text-sm transition-colors duration-200">
                  Terms of Service
                </a>
                <a href="#cookies" className="text-blue-200 hover:text-white text-sm transition-colors duration-200">
                  Cookie Policy
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                className="flex items-center text-blue-200 hover:text-white text-sm transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Catalog
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
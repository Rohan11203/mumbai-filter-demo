import { useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form@7.55.0";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { Calculator, FileText, Upload, Download, CheckCircle, Plus, X } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface QuoteFormData {
  // Company Information
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  industry: string;
  
  // Project Details
  projectName: string;
  projectDescription: string;
  applicationArea: string;
  flowRate: string;
  pressure: string;
  temperature: string;
  
  // Filtration Requirements
  filtrationType: string[];
  particleSize: string;
  mediaType: string;
  efficiency: string;
  
  // Technical Specifications
  connectionSize: string;
  housingMaterial: string;
  certifications: string[];
  
  // Project Information
  quantity: string;
  budget: string;
  timeline: string;
  installation: boolean;
  maintenance: boolean;
  training: boolean;
  
  // Additional
  additionalRequirements: string;
  urgentQuote: boolean;
  terms: boolean;
}

const industries = [
  "Pharmaceutical", "Food & Beverage", "Chemical Processing", "Oil & Gas",
  "Water Treatment", "Manufacturing", "Power Generation", "Mining", "Other"
];

const applicationAreas = [
  "Water Treatment", "Process Liquids", "Air Filtration", "Oil Filtration",
  "Chemical Processing", "Wastewater Treatment", "Product Recovery", "Other"
];

const filtrationTypes = [
  "Cartridge Filters", "Bag Filters", "Membrane Filters", "HEPA Filters",
  "Carbon Filters", "Coalescing Filters", "Reverse Osmosis", "Ultrafiltration"
];

const mediaTypes = [
  "Polypropylene", "Polyester", "Cellulose", "PTFE", "Stainless Steel",
  "Ceramic", "Carbon", "Membrane", "Other"
];

const housingMaterials = [
  "Stainless Steel 316L", "Stainless Steel 304", "Carbon Steel", "PVC",
  "Polypropylene", "Hastelloy", "Monel", "Titanium", "Other"
];

const certificationOptions = [
  "FDA Approved", "NSF Certified", "CE Marking", "ASME", "3A Sanitary",
  "ISO 9001", "cGMP Compliant", "WRAS Approved", "Other"
];

export function QuoteRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFiltrationTypes, setSelectedFiltrationTypes] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<QuoteFormData>();

  const toggleFiltration = (type: string) => {
    const newTypes = selectedFiltrationTypes.includes(type)
      ? selectedFiltrationTypes.filter(t => t !== type)
      : [...selectedFiltrationTypes, type];
    setSelectedFiltrationTypes(newTypes);
    setValue("filtrationType", newTypes);
  };

  const toggleCertification = (cert: string) => {
    const newCerts = selectedCertifications.includes(cert)
      ? selectedCertifications.filter(c => c !== cert)
      : [...selectedCertifications, cert];
    setSelectedCertifications(newCerts);
    setValue("certifications", newCerts);
  };

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Quote request submitted:", data);
    toast.success("Quote request submitted! We'll send you a detailed proposal within 24 hours.");
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto "
      >
        <Card className="text-center p-8 border-0 shadow-lg">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-8 h-8 text-green-600" />
          </motion.div>
          
          <h3 className="text-2xl font-bold text-[#1A237E] mb-4">Quote Request Submitted!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for your detailed requirements. Our engineering team will analyze your specifications 
            and prepare a comprehensive proposal including technical recommendations and pricing.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-[#1A237E] mb-2">What's Next?</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Technical review within 4 hours</li>
                <li>• Detailed proposal within 24 hours</li>
                <li>• Engineering consultation call</li>
              </ul>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-[#1A237E] mb-2">Your Reference</h4>
              <p className="text-sm text-gray-600 mb-2">Quote ID: #MFC{Date.now().toString().slice(-6)}</p>
              <Button size="sm" variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Summary
              </Button>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white"
            >
              Submit Another Quote
            </Button>
            
            <Button className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white">
              <FileText className="w-4 h-4 mr-2" />
              Download Catalog
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pt-30">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center bg-[#007BFF]/10 rounded-full px-4 py-2 mb-4">
          <Calculator className="w-4 h-4 text-[#007BFF] mr-2" />
          <span className="text-[#007BFF] font-medium">Custom Quote Request</span>
        </div>
        
        <h2 className="text-3xl font-bold text-[#1A237E] mb-4">
          Get Your Custom Filtration Solution Quote
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Provide us with your detailed requirements and our engineering team will design 
          a custom filtration solution with comprehensive pricing and technical specifications.
        </p>
      </motion.div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-xl text-[#1A237E]">
            <FileText className="w-5 h-5 mr-2" />
            Technical Specifications Form
          </CardTitle>
          <p className="text-gray-600">
            Complete this form to receive an accurate quote tailored to your specific needs.
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Company Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-[#1A237E] mb-4 pb-2 border-b border-gray-200">
                1. Company Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    {...register("companyName", { required: "Company name is required" })}
                    className="mt-2"
                    placeholder="Your Company Name"
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    {...register("contactPerson", { required: "Contact person is required" })}
                    className="mt-2"
                    placeholder="Full Name"
                  />
                  {errors.contactPerson && (
                    <p className="text-red-500 text-sm mt-1">{errors.contactPerson.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="mt-2"
                    placeholder="email@company.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    {...register("phone", { required: "Phone is required" })}
                    className="mt-2"
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="address">Complete Address</Label>
                  <Textarea
                    id="address"
                    {...register("address")}
                    className="mt-2"
                    placeholder="Complete company address with pincode"
                  />
                </div>
                
                <div>
                  <Label htmlFor="industry">Industry *</Label>
                  <Select onValueChange={(value) => setValue("industry", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.industry && (
                    <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-[#1A237E] mb-4 pb-2 border-b border-gray-200">
                2. Project Details
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="projectName">Project Name *</Label>
                    <Input
                      id="projectName"
                      {...register("projectName", { required: "Project name is required" })}
                      className="mt-2"
                      placeholder="Project or Installation Name"
                    />
                    {errors.projectName && (
                      <p className="text-red-500 text-sm mt-1">{errors.projectName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="applicationArea">Application Area *</Label>
                    <Select onValueChange={(value) => setValue("applicationArea", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select application" />
                      </SelectTrigger>
                      <SelectContent>
                        {applicationAreas.map((area) => (
                          <SelectItem key={area} value={area}>
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.applicationArea && (
                      <p className="text-red-500 text-sm mt-1">{errors.applicationArea.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="projectDescription">Project Description *</Label>
                  <Textarea
                    id="projectDescription"
                    {...register("projectDescription", { required: "Description is required" })}
                    className="mt-2 min-h-24"
                    placeholder="Detailed description of your filtration requirements, process conditions, and objectives..."
                  />
                  {errors.projectDescription && (
                    <p className="text-red-500 text-sm mt-1">{errors.projectDescription.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="flowRate">Flow Rate *</Label>
                    <Input
                      id="flowRate"
                      {...register("flowRate", { required: "Flow rate is required" })}
                      className="mt-2"
                      placeholder="e.g., 100 LPM"
                    />
                    {errors.flowRate && (
                      <p className="text-red-500 text-sm mt-1">{errors.flowRate.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="pressure">Operating Pressure</Label>
                    <Input
                      id="pressure"
                      {...register("pressure")}
                      className="mt-2"
                      placeholder="e.g., 6 bar"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="temperature">Operating Temperature</Label>
                    <Input
                      id="temperature"
                      {...register("temperature")}
                      className="mt-2"
                      placeholder="e.g., 80°C"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Filtration Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-[#1A237E] mb-4 pb-2 border-b border-gray-200">
                3. Filtration Requirements
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label>Filtration Type Required *</Label>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                    {filtrationTypes.map((type) => (
                      <div
                        key={type}
                        onClick={() => toggleFiltration(type)}
                        className={`cursor-pointer border rounded-lg p-3 text-center text-sm transition-all duration-200 ${
                          selectedFiltrationTypes.includes(type)
                            ? 'border-[#007BFF] bg-[#007BFF]/10 text-[#007BFF]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                  {selectedFiltrationTypes.length === 0 && (
                    <p className="text-red-500 text-sm mt-1">Please select at least one filtration type</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="particleSize">Particle Size to Remove</Label>
                    <Input
                      id="particleSize"
                      {...register("particleSize")}
                      className="mt-2"
                      placeholder="e.g., 10 microns"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="mediaType">Preferred Media Type</Label>
                    <Select onValueChange={(value) => setValue("mediaType", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select media" />
                      </SelectTrigger>
                      <SelectContent>
                        {mediaTypes.map((media) => (
                          <SelectItem key={media} value={media}>
                            {media}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="efficiency">Required Efficiency</Label>
                    <Input
                      id="efficiency"
                      {...register("efficiency")}
                      className="mt-2"
                      placeholder="e.g., 99.9%"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Technical Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-[#1A237E] mb-4 pb-2 border-b border-gray-200">
                4. Technical Specifications
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="connectionSize">Connection Size</Label>
                  <Input
                    id="connectionSize"
                    {...register("connectionSize")}
                    className="mt-2"
                    placeholder="e.g., 2 inch NPT"
                  />
                </div>
                
                <div>
                  <Label htmlFor="housingMaterial">Housing Material</Label>
                  <Select onValueChange={(value) => setValue("housingMaterial", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      {housingMaterials.map((material) => (
                        <SelectItem key={material} value={material}>
                          {material}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-4">
                <Label>Required Certifications</Label>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                  {certificationOptions.map((cert) => (
                    <div
                      key={cert}
                      onClick={() => toggleCertification(cert)}
                      className={`cursor-pointer border rounded-lg p-3 text-center text-sm transition-all duration-200 ${
                        selectedCertifications.includes(cert)
                          ? 'border-[#007BFF] bg-[#007BFF]/10 text-[#007BFF]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Project Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-[#1A237E] mb-4 pb-2 border-b border-gray-200">
                5. Project Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label htmlFor="quantity">Quantity Required *</Label>
                  <Input
                    id="quantity"
                    {...register("quantity", { required: "Quantity is required" })}
                    className="mt-2"
                    placeholder="e.g., 5 units"
                  />
                  {errors.quantity && (
                    <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select onValueChange={(value) => setValue("budget", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-1l">Under ₹1 Lakh</SelectItem>
                      <SelectItem value="1-5l">₹1-5 Lakhs</SelectItem>
                      <SelectItem value="5-25l">₹5-25 Lakhs</SelectItem>
                      <SelectItem value="25l-1cr">₹25 Lakhs - 1 Crore</SelectItem>
                      <SelectItem value="above-1cr">Above ₹1 Crore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="timeline">Required Timeline *</Label>
                  <Select onValueChange={(value) => setValue("timeline", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (1 week)</SelectItem>
                      <SelectItem value="1-month">Within 1 month</SelectItem>
                      <SelectItem value="1-3-months">1-3 months</SelectItem>
                      <SelectItem value="3-6-months">3-6 months</SelectItem>
                      <SelectItem value="6-plus">6+ months</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.timeline && (
                    <p className="text-red-500 text-sm mt-1">{errors.timeline.message}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Additional Services Required:</h4>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="installation"
                    {...register("installation")}
                  />
                  <Label htmlFor="installation">Installation & Commissioning Services</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="maintenance"
                    {...register("maintenance")}
                  />
                  <Label htmlFor="maintenance">Annual Maintenance Contract (AMC)</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="training"
                    {...register("training")}
                  />
                  <Label htmlFor="training">Operator Training Programs</Label>
                </div>
              </div>
            </motion.div>

            {/* Additional Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-[#1A237E] mb-4 pb-2 border-b border-gray-200">
                6. Additional Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="additionalRequirements">Additional Requirements or Special Conditions</Label>
                  <Textarea
                    id="additionalRequirements"
                    {...register("additionalRequirements")}
                    className="mt-2 min-h-24"
                    placeholder="Any special requirements, environmental conditions, compliance needs, or other considerations..."
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="urgentQuote"
                      {...register("urgentQuote")}
                    />
                    <Label htmlFor="urgentQuote">This is an urgent requirement (Quote needed within 4 hours)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      {...register("terms", { required: "You must accept the terms" })}
                    />
                    <Label htmlFor="terms">
                      I agree to the Terms & Conditions and authorize Mumbai Filter Corporation to contact me regarding this quote *
                    </Label>
                  </div>
                  {errors.terms && (
                    <p className="text-red-500 text-sm">{errors.terms.message}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="pt-6 border-t border-gray-200"
            >
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-[#1A237E] mb-2">What happens next?</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Our technical team will review your requirements within 4 hours</li>
                  <li>• You'll receive a comprehensive proposal with technical specifications</li>
                  <li>• A dedicated engineer will be assigned for consultation calls</li>
                  <li>• Pricing will include equipment, installation, and support options</li>
                </ul>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#007BFF] to-[#0056b3] hover:from-[#0056b3] hover:to-[#004494] text-white py-4 text-lg shadow-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                      Processing Your Request...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Calculator className="w-5 h-5 mr-3" />
                      Submit Quote Request
                    </div>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
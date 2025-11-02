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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Package, 
  Upload, 
  X, 
  Plus, 
  Save, 
  Eye, 
  Image as ImageIcon, 
  FileText, 
  Settings,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ProductFormData {
  // Basic Information
  name: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  subcategory: string;
  sku: string;
  manufacturer: string;
  
  // Pricing
  price: string;
  costPrice: string;
  currency: string;
  taxRate: string;
  
  // Inventory
  stockQuantity: string;
  lowStockThreshold: string;
  trackInventory: boolean;
  
  // Specifications
  specifications: { [key: string]: string };
  
  // Features
  features: string[];
  
  // Applications
  applications: string[];
  
  // Media
  images: string[];
  videos: string[];
  
  // Documents
  documents: Array<{
    name: string;
    type: string;
    url: string;
  }>;
  
  // SEO & Meta
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  
  // Publishing
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  publishDate: string;
}

const categories = [
  "Water Treatment",
  "Air Filtration",
  "Oil & Chemical",
  "Custom Solutions"
];

const subcategories = {
  "Water Treatment": ["Cartridge Filters", "Membrane Systems", "RO Systems", "UV Systems"],
  "Air Filtration": ["HEPA Filters", "Carbon Filters", "Dust Collectors", "Clean Room"],
  "Oil & Chemical": ["Oil Separators", "Chemical Filters", "Process Filters", "Coalescence"],
  "Custom Solutions": ["Engineering Design", "Installation", "Maintenance", "Consulting"]
};

const currencies = ["INR", "USD", "EUR", "GBP"];

const defaultSpecs = [
  "Flow Rate",
  "Filtration Rating",
  "Housing Material",
  "Connection Size",
  "Operating Pressure",
  "Operating Temperature",
  "Dimensions",
  "Weight",
  "Certification"
];

export function ProductForm({ product, onSave, onCancel }: {
  product?: any;
  onSave: (data: ProductFormData) => void;
  onCancel: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [specifications, setSpecifications] = useState<{ [key: string]: string }>(
    product?.specifications || {}
  );
  const [features, setFeatures] = useState<string[]>(product?.features || []);
  const [applications, setApplications] = useState<string[]>(product?.applications || []);
  const [tags, setTags] = useState<string[]>(product?.tags || []);
  const [newFeature, setNewFeature] = useState("");
  const [newApplication, setNewApplication] = useState("");
  const [newTag, setNewTag] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ProductFormData>({
    defaultValues: product || {
      status: 'draft',
      currency: 'INR',
      trackInventory: true,
      featured: false
    }
  });

  const watchedCategory = watch("category");

  const addSpecification = (key: string) => {
    if (key && !specifications[key]) {
      setSpecifications({ ...specifications, [key]: "" });
    }
  };

  const updateSpecification = (key: string, value: string) => {
    setSpecifications({ ...specifications, [key]: value });
  };

  const removeSpecification = (key: string) => {
    const newSpecs = { ...specifications };
    delete newSpecs[key];
    setSpecifications(newSpecs);
  };

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const addApplication = () => {
    if (newApplication.trim() && !applications.includes(newApplication.trim())) {
      setApplications([...applications, newApplication.trim()]);
      setNewApplication("");
    }
  };

  const removeApplication = (index: number) => {
    setApplications(applications.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    
    // Add dynamic data
    data.specifications = specifications;
    data.features = features;
    data.applications = applications;
    data.tags = tags;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Product data:", data);
      toast.success(product ? "Product updated successfully!" : "Product created successfully!");
      
      onSave(data);
    } catch (error) {
      toast.error("Failed to save product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (previewMode) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#1A237E]">Product Preview</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setPreviewMode(false)}
              className="border-gray-300"
            >
              <Settings className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button onClick={() => onCancel()}>
              Close Preview
            </Button>
          </div>
        </div>
        
        {/* Preview Content - You can customize this to match your product display */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center py-12 text-gray-500">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">Preview Mode</h3>
              <p>Product preview would be displayed here matching your site's design.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#1A237E] mb-2">
              {product ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-gray-600">
              {product ? "Update product information and specifications" : "Create a new product with complete details"}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setPreviewMode(true)}
              className="border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="border-gray-300"
            >
              Cancel
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="border-0 shadow-xl">
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-6 rounded-none border-b-2 h-14 border-gray-100 bg-gray-50">
                  <TabsTrigger value="basic" className="py-4 font-medium">
                    <Package className="w-4 h-4 mr-2" />
                    Basic Info
                  </TabsTrigger>
                  <TabsTrigger value="pricing" className="py-4 font-medium">
                    Pricing
                  </TabsTrigger>
                  <TabsTrigger value="specifications" className="py-4 font-medium">
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger value="media" className="py-4 font-medium">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Media
                  </TabsTrigger>
                  <TabsTrigger value="seo" className="py-4 font-medium">
                    SEO & Meta
                  </TabsTrigger>
                  <TabsTrigger value="publishing" className="py-4 font-medium">
                    Publishing
                  </TabsTrigger>
                </TabsList>

                {/* Basic Information */}
                <TabsContent value="basic" className="p-8 space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="name">Product Name *</Label>
                        <Input
                          id="name"
                          {...register("name", { required: "Product name is required" })}
                          className="mt-2"
                          placeholder="Enter product name"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="sku">SKU *</Label>
                        <Input
                          id="sku"
                          {...register("sku", { required: "SKU is required" })}
                          className="mt-2"
                          placeholder="e.g., MFC-WF-2500"
                        />
                        {errors.sku && (
                          <p className="text-red-500 text-sm mt-1">{errors.sku.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Category *</Label>
                          <Select onValueChange={(value) => setValue("category", value)}>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.category && (
                            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="subcategory">Subcategory</Label>
                          <Select 
                            onValueChange={(value) => setValue("subcategory", value)}
                            disabled={!watchedCategory}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select subcategory" />
                            </SelectTrigger>
                            <SelectContent>
                              {watchedCategory && subcategories[watchedCategory as keyof typeof subcategories]?.map((sub) => (
                                <SelectItem key={sub} value={sub}>
                                  {sub}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="manufacturer">Manufacturer</Label>
                        <Input
                          id="manufacturer"
                          {...register("manufacturer")}
                          className="mt-2"
                          placeholder="Mumbai Filter Corporation"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="shortDescription">Short Description *</Label>
                        <Textarea
                          id="shortDescription"
                          {...register("shortDescription", { required: "Short description is required" })}
                          className="mt-2 min-h-20"
                          placeholder="Brief product description for listings..."
                        />
                        {errors.shortDescription && (
                          <p className="text-red-500 text-sm mt-1">{errors.shortDescription.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="longDescription">Detailed Description</Label>
                        <Textarea
                          id="longDescription"
                          {...register("longDescription")}
                          className="mt-2 min-h-32"
                          placeholder="Detailed product description with technical information..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Features Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A237E] mb-4">Product Features</h3>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          placeholder="Add a product feature..."
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                        />
                        <Button type="button" onClick={addFeature} variant="outline">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="pr-1">
                            {feature}
                            <button
                              type="button"
                              onClick={() => removeFeature(index)}
                              className="ml-2 hover:bg-red-100 rounded-full p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Applications Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A237E] mb-4">Applications</h3>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          value={newApplication}
                          onChange={(e) => setNewApplication(e.target.value)}
                          placeholder="Add an application area..."
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addApplication())}
                        />
                        <Button type="button" onClick={addApplication} variant="outline">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {applications.map((application, index) => (
                          <Badge key={index} variant="outline" className="pr-1">
                            {application}
                            <button
                              type="button"
                              onClick={() => removeApplication(index)}
                              className="ml-2 hover:bg-red-100 rounded-full p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Pricing */}
                <TabsContent value="pricing" className="p-8 space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-[#1A237E] mb-4">Pricing Information</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="price">Selling Price *</Label>
                          <Input
                            id="price"
                            {...register("price", { required: "Price is required" })}
                            className="mt-2"
                            placeholder="250000"
                            type="number"
                          />
                          {errors.price && (
                            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="costPrice">Cost Price</Label>
                          <Input
                            id="costPrice"
                            {...register("costPrice")}
                            className="mt-2"
                            placeholder="200000"
                            type="number"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="currency">Currency</Label>
                          <Select onValueChange={(value) => setValue("currency", value)}>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              {currencies.map((currency) => (
                                <SelectItem key={currency} value={currency}>
                                  {currency}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="taxRate">Tax Rate (%)</Label>
                          <Input
                            id="taxRate"
                            {...register("taxRate")}
                            className="mt-2"
                            placeholder="18"
                            type="number"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-[#1A237E] mb-4">Inventory Management</h3>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="trackInventory"
                          {...register("trackInventory")}
                        />
                        <Label htmlFor="trackInventory">Track inventory for this product</Label>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="stockQuantity">Stock Quantity</Label>
                          <Input
                            id="stockQuantity"
                            {...register("stockQuantity")}
                            className="mt-2"
                            placeholder="100"
                            type="number"
                          />
                        </div>

                        <div>
                          <Label htmlFor="lowStockThreshold">Low Stock Alert</Label>
                          <Input
                            id="lowStockThreshold"
                            {...register("lowStockThreshold")}
                            className="mt-2"
                            placeholder="10"
                            type="number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Specifications */}
                <TabsContent value="specifications" className="p-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A237E] mb-4">Technical Specifications</h3>
                    
                    <div className="mb-6">
                      <Label>Quick Add Common Specifications</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {defaultSpecs.map((spec) => (
                          <Button
                            key={spec}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addSpecification(spec)}
                            disabled={!!specifications[spec]}
                            className="text-xs"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            {spec}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {Object.entries(specifications).map(([key, value]) => (
                        <div key={key} className="flex gap-2 items-end">
                          <div className="flex-1">
                            <Label>{key}</Label>
                            <Input
                              value={value}
                              onChange={(e) => updateSpecification(key, e.target.value)}
                              placeholder={`Enter ${key.toLowerCase()}`}
                              className="mt-1"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeSpecification(key)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const key = prompt("Enter specification name:");
                          if (key) addSpecification(key);
                        }}
                        className="w-full border-dashed"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Custom Specification
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Media */}
                <TabsContent value="media" className="p-8 space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-[#1A237E] mb-4">Product Images</h3>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-600 mb-4">Drag and drop images here, or click to select</p>
                        <Button variant="outline" type="button">
                          Select Images
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#1A237E] mb-4">Product Videos</h3>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-600 mb-4">Upload product demonstration videos</p>
                        <Button variant="outline" type="button">
                          Select Videos
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[#1A237E] mb-4">Product Documents</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <FileText className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-600 mb-4">Upload datasheets, manuals, and certificates</p>
                      <Button variant="outline" type="button">
                        Select Documents
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* SEO */}
                <TabsContent value="seo" className="p-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A237E] mb-4">SEO & Meta Information</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="metaTitle">Meta Title</Label>
                        <Input
                          id="metaTitle"
                          {...register("metaTitle")}
                          className="mt-2"
                          placeholder="SEO-optimized title for search engines"
                        />
                        <p className="text-sm text-gray-600 mt-1">Recommended: 50-60 characters</p>
                      </div>

                      <div>
                        <Label htmlFor="metaDescription">Meta Description</Label>
                        <Textarea
                          id="metaDescription"
                          {...register("metaDescription")}
                          className="mt-2 min-h-20"
                          placeholder="Brief description for search engine results"
                        />
                        <p className="text-sm text-gray-600 mt-1">Recommended: 150-160 characters</p>
                      </div>

                      <div>
                        <Label>Tags</Label>
                        <div className="space-y-3 mt-2">
                          <div className="flex gap-2">
                            <Input
                              value={newTag}
                              onChange={(e) => setNewTag(e.target.value)}
                              placeholder="Add tags for better discoverability..."
                              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                            />
                            <Button type="button" onClick={addTag} variant="outline">
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="pr-1">
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => removeTag(index)}
                                  className="ml-2 hover:bg-red-100 rounded-full p-0.5"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Publishing */}
                <TabsContent value="publishing" className="p-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A237E] mb-6">Publishing Options</h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="status">Publication Status</Label>
                          <Select onValueChange={(value) => setValue("status", value as any)}>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">
                                <div className="flex items-center">
                                  <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
                                  Draft
                                </div>
                              </SelectItem>
                              <SelectItem value="published">
                                <div className="flex items-center">
                                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                  Published
                                </div>
                              </SelectItem>
                              <SelectItem value="archived">
                                <div className="flex items-center">
                                  <X className="w-4 h-4 mr-2 text-gray-500" />
                                  Archived
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="publishDate">Publish Date</Label>
                          <Input
                            id="publishDate"
                            {...register("publishDate")}
                            type="datetime-local"
                            className="mt-2"
                          />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="featured"
                            {...register("featured")}
                          />
                          <Label htmlFor="featured">Mark as featured product</Label>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">Publishing Notes</h4>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Draft products are only visible to admins</li>
                            <li>• Published products appear on the website</li>
                            <li>• Featured products show on homepage</li>
                            <li>• Archived products are hidden but data is preserved</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex items-center justify-between mt-8 p-6 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">
              {product ? "Last updated: " + new Date().toLocaleDateString() : "Creating new product"}
            </div>
            
            <div className="flex gap-3">
              <Button 
                type="button"
                variant="outline" 
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              
              <Button 
                type="button"
                variant="outline"
                onClick={() => setValue("status", "draft")}
                disabled={isSubmitting}
                className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
              >
                Save as Draft
              </Button>
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] hover:from-[#0056b3] hover:to-[#004494] text-white"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Save className="w-4 h-4 mr-2" />
                    {product ? "Update Product" : "Create Product"}
                  </div>
                )}
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
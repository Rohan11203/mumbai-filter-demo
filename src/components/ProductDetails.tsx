import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MediaModal, MediaItem } from "./MediaModal";
import { Model3DViewer } from "./Model3DViewer";
import { useTheme } from "./ThemeProvider";
import { 
  Star, 
  Heart, 
  Share2, 
  Download, 
  ShoppingCart, 
  MessageCircle,
  CheckCircle,
  Info,
  Award,
  Truck,
  Clock,
  Play,
  Image as ImageIcon,
  Eye,
  ZoomIn,
  FileText,
  Phone,
  Mail,
  ArrowLeft,
  Box
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock product data with videos
const product = {
  id: 1,
  name: "Industrial Cartridge Filter System MFC-2500",
  shortDescription: "High-performance multi-stage cartridge filtration system for industrial water treatment applications.",
  price: "₹2,50,000",
  rating: 4.8,
  reviews: 24,
  inStock: true,
  category: "Water Treatment",
  sku: "MFC-WF-2500",
  manufacturer: "Mumbai Filter Corporation",
  
  mediaGallery: [
    {
      id: "1",
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1654220691341-be23a137bd0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHx3YXRlciUyMHRyZWF0bWVudCUyMGZpbHRlciUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTc1OTQwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "MFC-2500 Main Unit",
      description: "Complete view of the industrial cartridge filter system showing the stainless steel construction and tri-clamp connections."
    },
    {
      id: "2",
      type: "video" as const,
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail: "https://images.unsplash.com/photo-1655039353512-ab38d6a37a92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxhaXIlMjBmaWx0cmF0aW9uJTIwc3lzdGVtJTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NTc1OTQwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Installation Process Demo",
      description: "Step-by-step video guide showing the complete installation and commissioning process of the MFC-2500 system."
    },
    {
      id: "3",
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1509886246223-cd7fd68f5372?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxvaWwlMjBmaWx0cmF0aW9uJTIwaW5kdXN0cmlhbCUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTc1OTQwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Internal Components",
      description: "Detailed view of the high-quality internal filtration components and cartridge arrangement."
    },
    {
      id: "4",
      type: "video" as const,
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnail: "https://images.unsplash.com/photo-1554475901-e0f9c1f6e1fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmlsdGVyJTIwbWFpbnRlbmFuY2V8ZW58MXx8fHwxNzU3NTk0MDY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Maintenance Tutorial",
      description: "Comprehensive maintenance guide showing cartridge replacement and system cleaning procedures."
    },
    {
      id: "5",
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGlwZXMlMjBhbmQlMjB2YWx2ZXN8ZW58MXx8fHwxNzU3NTk0MDcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Connection Details",
      description: "Close-up view of the tri-clamp connections and pressure gauge mounting options."
    },
    {
      id: "6",
      type: "video" as const,
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1581093458791-9d42e3b16094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmlsdGVyJTIwdGVzdGluZ3xlbnwxfHx8fDE3NTc1OTQwNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Performance Testing",
      description: "Real-time performance testing demonstration showing filtration efficiency and flow rate measurements."
    }
  ] as MediaItem[],
  
  features: [
    "Multi-stage filtration with 5-micron precision",
    "Stainless steel 316L construction",
    "Flow rate: 2500 LPH",
    "Operating pressure: 6 bar max",
    "Temperature range: 5°C to 80°C",
   
  ],
  
  specifications: {
    "Flow Rate": "2500 LPH",
    "Filtration Rating": "5 microns",
    "Housing Material": "Stainless Steel 316L",
    "Connection Size": "2\" Tri-clamp",
    "Operating Pressure": "6 bar max",
    "Operating Temperature": "5°C to 80°C",
    "Cartridge Type": "Pleated Polypropylene",
    "Dimensions": "600 x 300 x 800 mm",
    "Weight": "25 kg",
    "Certification": "FDA, NSF"
  },
  
  applications: [
    "Pharmaceutical water treatment",
    "Food & beverage processing",
    "Chemical pre-filtration",
    "Process water clarification",
    "RO system protection"
  ],
  
  documents: [
    { name: "Product Datasheet", type: "PDF", size: "2.3 MB" },
    { name: "Installation Manual", type: "PDF", size: "5.1 MB" },
    { name: "CAD Drawing", type: "DWG", size: "1.2 MB" },
    { name: "Compliance Certificate", type: "PDF", size: "800 KB" }
  ]
};

export function ProductDetails({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const { colors } = useTheme();
  const [selectedMedia, setSelectedMedia] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [is3DViewerOpen, setIs3DViewerOpen] = useState(false);

  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const navigate = useNavigate()

  return (
    <div className="min-h-screen py-8 " style={{ backgroundColor: colors.surfaceLight }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8" style={{ color: colors.textSecondary }}>
          <button 
            className="flex cursor-pointer items-center transition-colors duration-200 hover:opacity-75"
            style={{ color: colors.secondary }}
            onClick={() => navigate("/products")}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Products
          </button>
          <span>/</span>
          <a href="#" className="transition-colors duration-200 hover:opacity-75" style={{ color: colors.secondary }}>
            {product.category}
          </a>
          <span>/</span>
          <span className="font-medium" style={{ color: colors.textPrimary }}>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Enhanced Media Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Media Display */}
            <div className="relative aspect-square bg-white rounded-xl overflow-hidden shadow-lg group">
              {product.mediaGallery[selectedMedia].type === 'image' ? (
                <ImageWithFallback
                  src={product.mediaGallery[selectedMedia].src}
                  alt={product.mediaGallery[selectedMedia].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="relative w-full h-full">
                  <ImageWithFallback
                    src={product.mediaGallery[selectedMedia].thumbnail || product.mediaGallery[selectedMedia].src}
                    alt={product.mediaGallery[selectedMedia].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center cursor-pointer"
                      onClick={() => openModal(selectedMedia)}
                    >
                      <Play className="w-8 h-8 text-[#007BFF] ml-1" />
                    </motion.div>
                  </div>
                </div>
              )}
              
              {/* Overlay Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-4 right-4 flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openModal(selectedMedia)}
                    className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-700 hover:text-[#007BFF] shadow-lg"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-700 hover:text-[#007BFF] shadow-lg"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>
                
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/90 rounded-lg px-3 py-1 flex items-center space-x-2">
                    {product.mediaGallery[selectedMedia].type === 'image' ? (
                      <ImageIcon className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Play className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-sm font-medium capitalize">
                      {product.mediaGallery[selectedMedia].type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-6 gap-2">
              {product.mediaGallery.map((item, index) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMedia(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 group ${
                    selectedMedia === index 
                      ? 'border-[#007BFF] shadow-lg scale-105' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <ImageWithFallback
                    src={item.thumbnail || item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {item.type === 'video' && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                </motion.button>
              ))}
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{selectedMedia + 1} of {product.mediaGallery.length}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  {product.mediaGallery.filter(item => item.type === 'image').length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      <ImageIcon className="w-3 h-3 mr-1" />
                      {product.mediaGallery.filter(item => item.type === 'image').length} Photos
                    </Badge>
                  )}
                  {product.mediaGallery.filter(item => item.type === 'video').length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      <Play className="w-3 h-3 mr-1" />
                      {product.mediaGallery.filter(item => item.type === 'video').length} Videos
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openModal(selectedMedia)}
                  style={{ 
                    borderColor: colors.secondary,
                    color: colors.secondary
                  }}
                  className="hover:text-white"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.secondary;
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = colors.secondary;
                  }}
                >
                  <ZoomIn className="w-4 h-4 mr-1" />
                  View Full
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIs3DViewerOpen(true)}
                  style={{ 
                    borderColor: colors.accent,
                    color: colors.accent
                  }}
                  className="hover:text-white"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.accent;
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = colors.accent;
                  }}
                >
                  <Box className="w-4 h-4 mr-1" />
                  3D Model
                </Button>
              </div>

              
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-green-50">
              <CardContent className="p-6">
                <h4 className="font-bold text-[#1A237E] mb-4 text-center">Why Choose Mumbai Filter Corporation?</h4>
                <div className="grid grid-cols-3 gap-4">
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Award className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-sm font-bold text-gray-900">2 Year Warranty</div>
                    <div className="text-xs text-gray-600">Comprehensive coverage</div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Truck className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-sm font-bold text-gray-900">Free Installation</div>
                    <div className="text-xs text-gray-600">Within city limits</div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-sm font-bold text-gray-900">24/7 Support</div>
                    <div className="text-xs text-gray-600">Technical assistance</div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Product Information */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="bg-[#007BFF]/10 text-[#007BFF] font-medium">
                  {product.category}
                </Badge>
                <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  In Stock
                </Badge>
                <Badge variant="outline" className="text-blue-600 border-blue-600 bg-blue-50">
                  <Award className="w-3 h-3 mr-1" />
                  ISO Certified
                </Badge>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-[#1A237E] mb-3 leading-tight">
                {product.name}
              </h1>
              
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.shortDescription}
              </p>
              
              <div className="flex items-center mt-4 space-x-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                  <span className="ml-2 text-gray-600 font-medium">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <div className="text-gray-500">
                  SKU: <span className="font-mono text-gray-700">{product.sku}</span>
                </div>
              </div>
            </div>

            {/* Enhanced Price Section */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-white">
              <CardContent className="p-6">
                <div className="flex items-baseline justify-between mb-4">
                  <div className="text-4xl font-bold text-[#1A237E]">
                    {product.price}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Starting from</div>
                    <div className="text-xs text-green-600 font-medium">✓ GST Included</div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-800">
                    <Info className="w-4 h-4 inline mr-1" />
                    Final price may vary based on customization and installation requirements.
                  </p>
                </div>
                
                {/* Quantity and Actions */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center">
                    <label className="text-sm font-medium mr-3">Quantity:</label>
                    <div className="flex items-center border-2 border-gray-200 rounded-lg">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 hover:bg-gray-100 transition-colors duration-200 font-medium"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 border-x-2 border-gray-200 font-medium">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 hover:bg-gray-100 transition-colors duration-200 font-medium"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full bg-gradient-to-r from-[#007BFF] to-[#0056b3] hover:from-[#0056b3] hover:to-[#004494] text-white shadow-lg">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Request Quote
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="outline" 
                      className="w-full border-2 border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Expert
                    </Button>
                  </motion.div>
                </div>
                
                <div className="flex gap-2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
                  >
                    <Button 
                      variant="outline" 
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`w-full border-gray-300 transition-all duration-200 ${
                        isWishlisted 
                          ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                          : 'text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                      {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:border-gray-400">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* Key Features */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-[#1A237E] mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  Key Features & Benefits
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {product.features.map((feature, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            

            {/* Trust Indicators */}
            
          </motion.div>
        </div>

        {/* Enhanced Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-xl border-0">
            <CardContent className="p-0">
              <Tabs defaultValue="specifications" className="w-full">
                <TabsList className="grid w-full  grid-cols-4 rounded-none border-b-2 border-gray-50 h-18">
                  <TabsTrigger value="specifications" className="py-4 font-medium data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#1357a0]">
                    <FileText className="w-4 h-4 mr-2" />
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger value="applications" className="py-4 font-medium data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#1357a0]">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Applications
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="py-4 font-medium data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#1357a0]">
                    <Download className="w-4 h-4 mr-2" />
                    Documents
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="py-4 font-medium data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#1357a0]">
                    <Star className="w-4 h-4 mr-2" />
                    Reviews
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="specifications" className="p-8">
                  <h3 className="text-2xl font-bold text-[#1A237E] mb-6">Technical Specifications</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      {Object.entries(product.specifications).slice(0, 5).map(([key, value]) => (
                        <motion.div 
                          key={key} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg"
                        >
                          <span className="font-semibold text-gray-700">{key}:</span>
                          <span className="text-[#1A237E] font-bold">{value}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      {Object.entries(product.specifications).slice(5).map(([key, value]) => (
                        <motion.div 
                          key={key} 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg"
                        >
                          <span className="font-semibold text-gray-700">{key}:</span>
                          <span className="text-[#1A237E] font-bold">{value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="applications" className="p-8">
                  <h3 className="text-2xl font-bold text-[#1A237E] mb-6">Industrial Applications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {product.applications.map((application, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100"
                      >
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-800 font-medium">{application}</span>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="p-8">
                  <h3 className="text-2xl font-bold text-[#1A237E] mb-6">Product Documentation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.documents.map((doc, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-[#007BFF]/10 rounded-xl flex items-center justify-center mr-4">
                            <FileText className="w-6 h-6 text-[#007BFF]" />
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{doc.name}</div>
                            <div className="text-sm text-gray-600">{doc.type} • {doc.size}</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="p-8">
                  <h3 className="text-2xl font-bold text-[#1A237E] mb-6">Customer Reviews</h3>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl"
                  >
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h4 className="text-xl font-bold text-gray-700 mb-2">No reviews yet</h4>
                    <p className="text-gray-500 mb-6">Be the first to review this exceptional product!</p>
                    <div className="space-y-3">
                      <Button className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white">
                        <Star className="w-4 h-4 mr-2" />
                        Write a Review
                      </Button>
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                        <span>Have questions?</span>
                        <Button variant="link" className="text-[#007BFF] p-0">
                          <Mail className="w-4 h-4 mr-1" />
                          Contact Support
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Media Modal */}
      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        items={product.mediaGallery}
        initialIndex={modalIndex}
      />

      {/* 3D Model Viewer */}
      <Model3DViewer
        isOpen={is3DViewerOpen}
        onClose={() => setIs3DViewerOpen(false)}
        modelTitle={product.name}
        modelDescription="Interactive 3D model showing detailed construction and components"
      />

      
    </div>
  );
}
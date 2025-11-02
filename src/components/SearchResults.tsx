import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "./ThemeProvider";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Star, 
  Heart, 
  Eye, 
  ShoppingCart,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  MapPin,
  Clock
} from "lucide-react";

// Mock search results data
const searchResults = [
  {
    id: 1,
    name: "Industrial Cartridge Filter System MFC-2500",
    shortDescription: "High-performance multi-stage cartridge filtration system",
    price: "₹2,50,000",
    originalPrice: "₹2,75,000",
    rating: 4.8,
    reviews: 24,
    category: "Water Treatment",
    image: "https://images.unsplash.com/photo-1654220691341-be23a137bd0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHRyZWF0bWVudCUyMGZpbHRlciUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTc1OTQwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    featured: true,
    discount: 9,
    specifications: ["Flow Rate: 2500 LPH", "316L Stainless Steel", "5 Micron Rating"]
  },
  {
    id: 2,
    name: "HEPA Air Filtration Unit AF-1200",
    shortDescription: "High-efficiency particulate air filtration for clean rooms",
    price: "₹1,85,000",
    rating: 4.6,
    reviews: 18,
    category: "Air Filtration",
    image: "https://images.unsplash.com/photo-1655039353512-ab38d6a37a92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNzYXJjaHwxfHxhaXIlMjBmaWx0cmF0aW9uJTIwc3lzdGVtJTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NTc1OTQwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    featured: false,
    specifications: ["99.97% Efficiency", "1200 CFM", "Low Noise Operation"]
  },
  {
    id: 3,
    name: "Oil-Water Separator OS-500",
    shortDescription: "Advanced coalescence technology for oil separation",
    price: "₹3,20,000",
    rating: 4.9,
    reviews: 31,
    category: "Oil & Chemical",
    image: "https://images.unsplash.com/photo-1509886246223-cd7fd68f5372?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxvaWwlMjBmaWx0cmF0aW9uJTIwaW5kdXN0cmlhbCUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTc1OTQwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    featured: true,
    specifications: ["500 GPM Capacity", "API Standards", "Automatic Operation"]
  },
  {
    id: 4,
    name: "Reverse Osmosis System RO-1000",
    shortDescription: "Commercial grade reverse osmosis water purification",
    price: "₹4,50,000",
    rating: 4.7,
    reviews: 42,
    category: "Water Treatment",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGlwZXMlMjBhbmQlMjB2YWx2ZXN8ZW58MXx8fHwxNzU3NTk0MDcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: false,
    featured: false,
    specifications: ["1000 LPH Output", "Energy Recovery", "Remote Monitoring"]
  },
  {
    id: 5,
    name: "Dust Collection System DC-3000",
    shortDescription: "Industrial dust collection with pulse-jet cleaning",
    price: "₹2,75,000",
    rating: 4.5,
    reviews: 15,
    category: "Air Filtration",
    image: "https://images.unsplash.com/photo-1581093458791-9d42e3b16094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmlsdGVyJTIwdGVzdGluZ3xlbnwxfHx8fDE3NTc1OTQwNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    featured: false,
    specifications: ["3000 CFM", "Pulse-Jet Cleaning", "Explosion-Proof Option"]
  },
  {
    id: 6,
    name: "Membrane Bioreactor MBR-800",
    shortDescription: "Advanced wastewater treatment with membrane technology",
    price: "₹6,80,000",
    rating: 4.8,
    reviews: 28,
    category: "Water Treatment",
    image: "https://images.unsplash.com/photo-1554475901-e0f9c1f6e1fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmlsdGVyJTIwbWFpbnRlbmFuY2V8ZW58MXx8fHwxNzU3NTk0MDY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    featured: true,
    specifications: ["800 m³/day", "Ultra-low Sludge", "Automated Control"]
  }
];

const categories = ["All Categories", "Water Treatment", "Air Filtration", "Oil & Chemical", "Custom Solutions"];
const priceRanges = ["All Prices", "Under ₹2L", "₹2L - ₹5L", "₹5L - ₹10L", "Above ₹10L"];
const sortOptions = ["Relevance", "Price: Low to High", "Price: High to Low", "Rating", "Newest"];

interface SearchResultsProps {
  searchQuery?: string;
  onProductClick?: (productId: number) => void;
}

export function SearchResults({ searchQuery = "", onProductClick }: SearchResultsProps) {
  const { colors } = useTheme();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
  const [sortBy, setSortBy] = useState("Relevance");
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const filteredResults = searchResults.filter(product => {
    const matchesSearch = localSearchQuery === "" || 
      product.name.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(localSearchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const ResultCard = ({ product, isListView = false }: { product: typeof searchResults[0], isListView?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={`group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
          isListView ? 'flex' : ''
        }`}
        style={{ backgroundColor: colors.background }}
        onClick={() => onProductClick?.(product.id)}
      >
        <div className={`relative ${isListView ? 'w-48 flex-shrink-0' : 'aspect-square'}`}>
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                Featured
              </Badge>
            )}
            {product.discount && (
              <Badge style={{ backgroundColor: colors.error }} className="text-white border-0">
                {product.discount}% OFF
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="destructive">
                Out of Stock
              </Badge>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button size="sm" variant="outline" className="w-8 h-8 p-0 bg-white/90 backdrop-blur-sm">
              <Heart className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="w-8 h-8 p-0 bg-white/90 backdrop-blur-sm">
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <CardContent className={`${isListView ? 'flex-1' : ''} p-4`}>
          <div className="space-y-3">
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <Badge 
                variant="outline" 
                style={{ 
                  borderColor: colors.secondary,
                  color: colors.secondary 
                }}
              >
                {product.category}
              </Badge>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm font-medium" style={{ color: colors.textSecondary }}>
                  {product.rating}
                </span>
                <span className="ml-1 text-sm" style={{ color: colors.textLight }}>
                  ({product.reviews})
                </span>
              </div>
            </div>
            
            {/* Product Name */}
            <h3 
              className="font-bold leading-tight line-clamp-2"
              style={{ color: colors.textPrimary }}
            >
              {product.name}
            </h3>
            
            {/* Description */}
            <p 
              className="text-sm line-clamp-2"
              style={{ color: colors.textSecondary }}
            >
              {product.shortDescription}
            </p>
            
            {/* Specifications */}
            <div className="space-y-1">
              {product.specifications.slice(0, isListView ? 3 : 2).map((spec, index) => (
                <div key={index} className="flex items-center text-xs" style={{ color: colors.textLight }}>
                  <div className="w-1 h-1 rounded-full mr-2" style={{ backgroundColor: colors.secondary }} />
                  {spec}
                </div>
              ))}
            </div>
            
            {/* Price & Actions */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg" style={{ color: colors.textPrimary }}>
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm line-through" style={{ color: colors.textLight }}>
                      {product.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center text-xs mt-1" style={{ color: colors.textLight }}>
                  <MapPin className="w-3 h-3 mr-1" />
                  Mumbai, India
                </div>
              </div>
              
              <Button 
                size="sm"
                disabled={!product.inStock}
                style={{ 
                  backgroundColor: product.inStock ? colors.secondary : colors.textLight,
                  color: 'white'
                }}
                className="hover:opacity-90"
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Quote
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen " style={{ backgroundColor: colors.surfaceLight }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
                Search Results
              </h1>
              {localSearchQuery && (
                <p style={{ color: colors.textSecondary }}>
                  Showing results for "<span className="font-medium">{localSearchQuery}</span>"
                </p>
              )}
              <p className="text-sm mt-1" style={{ color: colors.textLight }}>
                {filteredResults.length} products found
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="flex gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: colors.textLight }} />
                <Input
                  placeholder="Search products..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="pl-10"
                  style={{ 
                    backgroundColor: colors.background,
                    borderColor: colors.border
                  }}
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                style={{ 
                  borderColor: colors.border,
                  color: colors.textSecondary
                }}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Filters Bar */}
          <motion.div
            initial={false}
            animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card style={{ backgroundColor: colors.background }}>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block" style={{ color: colors.textPrimary }}>
                      Category
                    </label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block" style={{ color: colors.textPrimary }}>
                      Price Range
                    </label>
                    <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block" style={{ color: colors.textPrimary }}>
                      Sort By
                    </label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-end">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedCategory("All Categories");
                        setSelectedPriceRange("All Prices");
                        setSortBy("Relevance");
                      }}
                      className="w-full"
                      style={{ 
                        borderColor: colors.border,
                        color: colors.textSecondary
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* View Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                View:
              </span>
              <div className="flex rounded-lg border" style={{ borderColor: colors.border }}>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                  style={viewMode === 'grid' ? { 
                    backgroundColor: colors.secondary, 
                    color: 'white' 
                  } : { color: colors.textSecondary }}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                  style={viewMode === 'list' ? { 
                    backgroundColor: colors.secondary, 
                    color: 'white' 
                  } : { color: colors.textSecondary }}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm" style={{ color: colors.textLight }}>
              <Clock className="w-4 h-4" />
              <span>Last updated: 2 hours ago</span>
            </div>
          </div>
        </div>

        {/* Results Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }>
          {filteredResults.map((product) => (
            <ResultCard 
              key={product.id} 
              product={product} 
              isListView={viewMode === 'list'}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredResults.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Search className="w-16 h-16 mx-auto mb-4" style={{ color: colors.textLight }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
              No products found
            </h3>
            <p style={{ color: colors.textSecondary }}>
              Try adjusting your search criteria or filters
            </p>
            <Button 
              className="mt-4"
              style={{ 
                backgroundColor: colors.secondary,
                color: 'white'
              }}
              onClick={() => {
                setLocalSearchQuery("");
                setSelectedCategory("All Categories");
                setSelectedPriceRange("All Prices");
              }}
            >
              Clear All Filters
            </Button>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredResults.length > 0 && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              style={{ 
                borderColor: colors.border,
                color: colors.textSecondary
              }}
            >
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
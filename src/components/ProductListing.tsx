import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Search, Filter } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Industrial Cartridge Filter ICF-200",
    category: "Water Treatment",
    sku: "ICF-200",
    image: "https://images.unsplash.com/photo-1677491676790-b9f95f69d2d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmlsdGVyJTIwY2FydHJpZGdlJTIwZXF1aXBtZW50fGVufDF8fHx8MTc1NzU5NDEzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "High-efficiency cartridge filter for industrial water treatment applications."
  },
  {
    id: 2,
    name: "Membrane Filter System MFS-500",
    category: "Water Treatment", 
    sku: "MFS-500",
    image: "https://images.unsplash.com/photo-1691519966753-ba6d5294ef99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxtZW1icmFuZSUyMGZpbHRlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU3NTk0MTM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Advanced membrane filtration system for precise water purification."
  },
  {
    id: 3,
    name: "HEPA Air Filter HAF-300",
    category: "Air Filtration",
    sku: "HAF-300", 
    image: "https://images.unsplash.com/photo-1655039353512-ab38d6a37a92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxhaXIlMjBmaWx0cmF0aW9uJTIwc3lzdGVtJTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NTc1OTQwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "99.97% efficiency HEPA filter for clean room environments."
  },
  {
    id: 4,
    name: "Oil Separation Filter OSF-150",
    category: "Oil & Chemical",
    sku: "OSF-150",
    image: "https://images.unsplash.com/photo-1509886246223-cd7fd68f5372?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxvaWwlMjBmaWx0cmF0aW9uJTIwaW5kdXN0cmlhbCUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTc1OTQwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Specialized oil separation filter for chemical processing."
  },
  {
    id: 5,
    name: "Bag Filter System BFS-1000",
    category: "Water Treatment",
    sku: "BFS-1000",
    image: "https://images.unsplash.com/photo-1654220691341-be23a137bd0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHx3YXRlciUyMHRyZWF0bWVudCUyMGZpbHRlciUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTc1OTQwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Large capacity bag filter system for high-volume applications."
  },
  {
    id: 6,
    name: "Carbon Filter Unit CFU-400",
    category: "Air Filtration",
    sku: "CFU-400",
    image: "https://images.unsplash.com/photo-1655039353512-ab38d6a37a92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxhaXIlMjBmaWx0cmF0aW9uJTIwc3lzdGVtJTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NTc1OTQwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Activated carbon filter for odor and chemical vapor removal."
  }
];

const categories = ["All Categories", "Water Treatment", "Air Filtration", "Oil & Chemical"];

export function ProductListing({ onProductClick }: { onProductClick?: (productId: number) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#F7F8FA] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-semibold text-[#1A237E] text-center">Our Products</h1>
          <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Discover our comprehensive range of industrial filtration solutions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
              <h3 className="font-semibold text-[#1A237E] mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Products
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by name or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-w-16 aspect-h-12 overflow-hidden rounded-t-lg">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-[#007BFF] bg-blue-50 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                      <span className="text-xs text-gray-500 font-mono">
                        SKU: {product.sku}
                      </span>
                    </div>
                    <h3 className="font-semibold text-[#1A237E] mb-2 group-hover:text-[#007BFF] transition-colors duration-200">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white transition-all duration-200"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
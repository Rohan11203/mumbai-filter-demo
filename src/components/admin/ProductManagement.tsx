import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { AdminSidebar } from "./AdminSidebar";
import { Search, Plus, Edit, Trash2, Filter } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Industrial Cartridge Filter ICF-200",
    sku: "ICF-200",
    category: "Water Treatment",
    lastUpdated: "2024-01-15",
    status: "Active"
  },
  {
    id: 2,
    name: "Membrane Filter System MFS-500",
    sku: "MFS-500", 
    category: "Water Treatment",
    lastUpdated: "2024-01-14",
    status: "Active"
  },
  {
    id: 3,
    name: "HEPA Air Filter HAF-300",
    sku: "HAF-300",
    category: "Air Filtration",
    lastUpdated: "2024-01-12",
    status: "Active"
  },
  {
    id: 4,
    name: "Oil Separation Filter OSF-150",
    sku: "OSF-150",
    category: "Oil & Chemical",
    lastUpdated: "2024-01-10",
    status: "Draft"
  },
  {
    id: 5,
    name: "Bag Filter System BFS-1000",
    sku: "BFS-1000",
    category: "Water Treatment",
    lastUpdated: "2024-01-08",
    status: "Active"
  }
];

const categories = ["All Categories", "Water Treatment", "Air Filtration", "Oil & Chemical"];

export function ProductManagement({ 
  onNavigate, 
  onAddProduct, 
  onEditProduct 
}: { 
  onNavigate?: (page: string) => void;
  onAddProduct?: () => void;
  onEditProduct?: (product: any) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      <AdminSidebar />
      
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-[#1A237E]">Product Management</h1>
            <p className="text-gray-600 mt-1">Manage your product catalog and inventory</p>
          </div>
          <Button 
            className="bg-[#007BFF] hover:bg-[#0056b3] text-white"
            onClick={onAddProduct}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products by name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
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

        {/* Products Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-[#1A237E]">Products</h2>
              <p className="text-sm text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-[#1A237E]">Product Name</TableHead>
                <TableHead className="font-semibold text-[#1A237E]">SKU</TableHead>
                <TableHead className="font-semibold text-[#1A237E]">Category</TableHead>
                <TableHead className="font-semibold text-[#1A237E]">Status</TableHead>
                <TableHead className="font-semibold text-[#1A237E]">Last Updated</TableHead>
                <TableHead className="font-semibold text-[#1A237E] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <TableCell className="font-medium text-[#1A237E]">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-gray-600 font-mono">
                    {product.sku}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className="bg-blue-50 text-[#007BFF] hover:bg-blue-100"
                    >
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={product.status === 'Active' ? 'default' : 'secondary'}
                      className={product.status === 'Active' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {product.lastUpdated}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-[#007BFF] hover:text-[#0056b3] hover:bg-blue-50"
                        onClick={() => onEditProduct?.(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredProducts.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-2xl font-semibold text-[#007BFF] mb-1">57</div>
            <div className="text-gray-600">Total Products</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-2xl font-semibold text-green-600 mb-1">52</div>
            <div className="text-gray-600">Active Products</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-2xl font-semibold text-yellow-600 mb-1">5</div>
            <div className="text-gray-600">Draft Products</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-2xl font-semibold text-[#1A237E] mb-1">3</div>
            <div className="text-gray-600">Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
}
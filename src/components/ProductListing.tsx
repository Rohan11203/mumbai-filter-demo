import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Home,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { ProductPageNavbar } from "./ConstantNavbar/newNavbar";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

// --- Mock Components for standalone demonstration ---
// const Card = ({ className, children }) => <div className={`rounded-xl ${className}`}>{children}</div>;
// const CardContent = ({ className, children }) => <div className={className}>{children}</div>;
// const Button = ({ children, className, ...props }) => (
//     <button className={`px-4 py-2 rounded-lg font-semibold flex items-center justify-center ${className}`} {...props}>
//         {children}
//     </button>
// );
const Input = ({ className, ...props }) => (
  <input
    className={`w-full p-2 border border-gray-300 rounded-md ${className}`}
    {...props}
  />
);
const ImageWithFallback = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={className} />
);
const useTheme = () => ({
  colors: {
    primary: "#0D47A1", // Dark Blue
    secondary: "#29B6F6", // Light Blue
    accent: "#039BE5",
    background: "#FFFFFF",
    surfaceLight: "#F3F4F6",
    textPrimary: "#111827",
    textSecondary: "#6B7281",
  },
});
// --- End Mocks ---

const products = [
  {
    id: 1,
    name: "Industrial Cartridge Filter ICF-200",
    category: "Water Treatment",
    application: "Pharmaceutical",
    material: "Polypropylene",
    sku: "ICF-200",
    image:
      "https://images.unsplash.com/photo-1677491676790-b9f95f69d2d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxpbmR1c3JyaWFsJTIwZmlsdGVyJTIwY2FydHJpZGdlJTIwZXF1aXBtZW50fGVufDF8fHx8MTc1NzU5NDEzNnww",
    description:
      "High-efficiency cartridge filter for industrial water treatment applications.",
  },
  {
    id: 2,
    name: "Membrane Filter System MFS-500",
    category: "Water Treatment",
    application: "Electronics",
    material: "Stainless Steel",
    sku: "MFS-500",
    image:
      "https://images.unsplash.com/photo-1691519966753-ba6d5294ef99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxtZW1icmFuZSUyMGZpbHRlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU3NTk0MTM5fDA",
    description:
      "Advanced membrane filtration system for precise water purification.",
  },
  {
    id: 3,
    name: "HEPA Air Filter HAF-300",
    category: "Air Filtration",
    application: "Pharmaceutical",
    material: "Fiberglass",
    sku: "HAF-300",
    image:
      "https://images.unsplash.com/photo-1655039353512-ab38d6a37a92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxhaXIlMjBmaWx0cmF0aW9uJTIwc3lzdGVtJTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NTc1OTQwNjF8MA",
    description: "99.97% efficiency HEPA filter for clean room environments.",
  },
  {
    id: 4,
    name: "Oil Separation Filter OSF-150",
    category: "Oil & Chemical",
    application: "Chemical Processing",
    material: "Stainless Steel",
    sku: "OSF-150",
    image:
      "https://images.unsplash.com/photo-1509886246223-cd7fd68f5372?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxvaWwlMjBmaWx0cmF0aW9uJTIwaW5kdXN0cmlhbCUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTc1OTQwNjR8MA",
    description: "Specialized oil separation filter for chemical processing.",
  },
  {
    id: 5,
    name: "Bag Filter System BFS-1000",
    category: "Water Treatment",
    application: "Food & Beverage",
    material: "Polypropylene",
    sku: "BFS-1000",
    image:
      "https://images.unsplash.com/photo-1654220691341-be23a137bd0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHx3YXRlciUyMHRyZWF0bWVudCUyMGZpbHRlciUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTc1OTQwNTh8MA",
    description:
      "Large capacity bag filter system for high-volume applications.",
  },
  {
    id: 6,
    name: "Carbon Filter Unit CFU-400",
    category: "Air Filtration",
    application: "Chemical Processing",
    material: "Fiberglass",
    sku: "CFU-400",
    image:
      "https://images.unsplash.com/photo-1655039353512-ab38d6a37a92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXJjaHwxfHxhaXIlMjBmaWx0cmF0aW9uJTIwc3lzdGVtJTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NTc1OTQwNjF8MA",
    description: "Activated carbon filter for odor and chemical vapor removal.",
  },
];

const categories = [
  "All Categories",
  "Water Treatment",
  "Air Filtration",
  "Oil & Chemical",
];
const applications = [
  "All Applications",
  "Pharmaceutical",
  "Food & Beverage",
  "Chemical Processing",
  "Electronics",
];
const materials = [
  "All Materials",
  "Polypropylene",
  "Stainless Steel",
  "Fiberglass",
];

export function ProductListing({ onProductClick }) {
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedApplication, setSelectedApplication] =
    useState("All Applications");
  const [selectedMaterial, setSelectedMaterial] = useState("All Materials");

  const filteredProducts = products.filter(
    (p) =>
      (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "All Categories" ||
        p.category === selectedCategory) &&
      (selectedApplication === "All Applications" ||
        p.application === selectedApplication) &&
      (selectedMaterial === "All Materials" || p.material === selectedMaterial)
  );

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
    setSelectedApplication("All Applications");
    setSelectedMaterial("All Materials");
  };

  return (
    <div
      className="min-h-screen "
      style={{ backgroundColor: colors.surfaceLight }}
    >
      {/* <ProductPageNavbar /> */}

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-full pl-4 mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center text-sm text-gray-500">
            <Home className="h-4 w-4 mr-2" />
            <a href="/" className="hover:text-sky-600">
              Home
            </a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="font-medium" style={{ color: colors.textPrimary }}>
              Products
            </span>
          </nav>
          <h1
            className="text-4xl font-bold mt-4"
            style={{ color: colors.textPrimary }}
          >
            Product Catalog
          </h1>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 sm:px-6  lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row  gap-8">
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white border border-gray-200/80 rounded-xl p-6 sticky top-28 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3
                  className="font-semibold text-lg flex items-center"
                  style={{ color: colors.primary }}
                >
                  <Filter className="h-5 w-5 mr-2" /> Filter Products
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-xs font-medium text-sky-600 hover:text-sky-800"
                >
                  Reset
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Name or SKU..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    />
                  </div>
                </div>
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="space-y-1">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedCategory(c)}
                        className={`w-full text-left p-2 rounded-md text-sm transition-colors ${
                          selectedCategory === c
                            ? "bg-sky-100 text-sky-700 font-semibold"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Application Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application
                  </label>
                  <div className="space-y-1">
                    {applications.map((a) => (
                      <button
                        key={a}
                        onClick={() => setSelectedApplication(a)}
                        className={`w-full text-left p-2 rounded-md text-sm transition-colors ${
                          selectedApplication === a
                            ? "bg-sky-100 text-sky-700 font-semibold"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Material Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Material
                  </label>
                  <div className="space-y-1">
                    {materials.map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelectedMaterial(m)}
                        className={`w-full text-left p-2 rounded-md text-sm transition-colors ${
                          selectedMaterial === m
                            ? "bg-sky-100 text-sky-700 font-semibold"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                Showing{" "}
                <span
                  className="font-medium"
                  style={{ color: colors.textPrimary }}
                >
                  {filteredProducts.length}
                </span>{" "}
                of {products.length} products
              </p>
            </div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                  transition={{ ease: "easeOut", duration: 0.4 }}
                  className="will-change-transform" // Add this for performance
                >
                  <Card className="group h-full flex flex-col bg-white border border-gray-200/80 hover:shadow-xl hover:-translate-y-1 overflow-hidden transition-transform duration-300">
                    {/*
      NOTE: We removed 'transition-shadow' from the classes above.
      The shadow will now appear instantly on hover, but the card's movement will be buttery smooth.
    */}
                    <div className="relative">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <span className="absolute top-3 right-3 text-xs text-white bg-sky-500/90 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <h3
                        className="font-bold text-lg mb-2"
                        style={{ color: colors.textPrimary }}
                      >
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
                        {product.description}
                      </p>
                      <Button
                        className="w-full cursor-pointer mt-auto bg-transparent border-2 border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white group shadow-sm rounded-md py-2.5 font-bold transition-all duration-300 "
                        onClick={() => onProductClick?.(product.id)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200/80">
                <p className="text-gray-500">
                  No products found matching your criteria.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

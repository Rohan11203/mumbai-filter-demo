import { useState } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { ProductCategories } from "./components/ProductCategories";
import { ValueProposition } from "./components/ValueProposition";
import { Footer } from "./components/Footer";
import { ProductListing } from "./components/ProductListing";
import { ProductDetails } from "./components/ProductDetails";
import { SearchResults } from "./components/SearchResults";
import { Dashboard } from "./components/admin/Dashboard";
import { ProductManagement } from "./components/admin/ProductManagement";
import { ContactForm } from "./components/forms/ContactForm";
import { QuoteRequestForm } from "./components/forms/QuoteRequestForm";
import { ProductForm } from "./components/forms/ProductForm";
import { Toaster } from "./components/ui/sonner";

type PageType = 'home' | 'products' | 'product-details' | 'contact' | 'quote' | 'search' | 'admin-dashboard' | 'admin-products' | 'admin-add-product' | 'admin-edit-product';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setCurrentPage('search');
    }
  };

  const handleProductClick = (productId: number) => {
    // In a real app, you'd fetch the product data
    setSelectedProduct({ id: productId });
    setCurrentPage('product-details');
  };

  const handleAddProduct = () => {
    setCurrentPage('admin-add-product');
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setCurrentPage('admin-edit-product');
  };

  const handleSaveProduct = (productData: any) => {
    console.log('Saving product:', productData);
    // In real app, save to backend
    setCurrentPage('admin-products');
  };



  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="min-h-screen" style={{ backgroundColor: 'var(--theme-background)' }}>
            <Navigation onNavigate={handleNavigate} onSearch={handleSearch} />
            <main>
              <Hero />
              <ProductCategories />
              <ValueProposition />
            </main>
            <Footer />
          </div>
        );
      case 'products':
        return (
          <div className="min-h-screen" style={{ backgroundColor: 'var(--theme-background)' }}>
            <Navigation onNavigate={handleNavigate} onSearch={handleSearch} />
            <ProductListing onProductClick={handleProductClick} />
            <Footer />
          </div>
        );
      case 'product-details':
        return (
          <div className="min-h-screen" style={{ backgroundColor: 'var(--theme-background)' }}>
            <Navigation onNavigate={handleNavigate} onSearch={handleSearch} />
            <ProductDetails onNavigate={handleNavigate} />
            <Footer />
          </div>
        );
      case 'search':
        return (
          <div className="min-h-screen" style={{ backgroundColor: 'var(--theme-background)' }}>
            <Navigation onNavigate={handleNavigate} onSearch={handleSearch} />
            <SearchResults 
              searchQuery={searchQuery} 
              onProductClick={handleProductClick} 
            />
            <Footer />
          </div>
        );
      case 'admin-dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'admin-products':
        return (
          <ProductManagement 
            onNavigate={handleNavigate}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
          />
        );
      case 'admin-add-product':
        return (
          <div className="min-h-screen py-8" style={{ backgroundColor: 'var(--theme-surfaceLight)' }}>
            <ProductForm 
              onSave={handleSaveProduct}
              onCancel={() => setCurrentPage('admin-products')}
            />
          </div>
        );
      case 'admin-edit-product':
        return (
          <div className="min-h-screen py-8" style={{ backgroundColor: 'var(--theme-surfaceLight)' }}>
            <ProductForm 
              product={selectedProduct}
              onSave={handleSaveProduct}
              onCancel={() => setCurrentPage('admin-products')}
            />
          </div>
        );
      case 'contact':
        return (
          <div className="min-h-screen" style={{ backgroundColor: 'var(--theme-background)' }}>
            <Navigation onNavigate={handleNavigate} onSearch={handleSearch} />
            <div className="py-16" style={{ backgroundColor: 'var(--theme-surfaceLight)' }}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--theme-textPrimary)' }}>Contact Us</h1>
                  <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--theme-textSecondary)' }}>
                    Get in touch with our technical experts for personalized filtration solutions
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
            <Footer />
          </div>
        );
      case 'quote':
        return (
          <div className="min-h-screen" style={{ backgroundColor: 'var(--theme-background)' }}>
            <Navigation onNavigate={handleNavigate} onSearch={handleSearch} />
            <div className="py-16" style={{ backgroundColor: 'var(--theme-surfaceLight)' }}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <QuoteRequestForm />
              </div>
            </div>
            <Footer />
          </div>
        );
      default:
        return (
          <div className="min-h-screen" style={{ backgroundColor: 'var(--theme-background)' }}>
            <Navigation onNavigate={handleNavigate} onSearch={handleSearch} />
            <main>
              <Hero />
              <ProductCategories />
              <ValueProposition />
            </main>
            <Footer />
          </div>
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="overflow-x-hidden">
        {renderPage()}
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
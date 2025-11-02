import { BrowserRouter, Routes, Route, useNavigate, useParams, useSearchParams, useLocation, HashRouter } from "react-router-dom";
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

// --- Page Wrapper Components to inject router logic ---

const HomePage = () => (
    <>
        <main>
            <Hero />
            <ProductCategories />
            <ValueProposition />
        </main>
        <Footer />
    </>
);

const ProductsPage = () => {
    const navigate = useNavigate();
    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };
    return (
        <>
            <ProductListing onProductClick={handleProductClick} />
            <Footer />
        </>
    );
};

const ProductDetailsPage = () => {
    const { productId } = useParams();
    // Assuming ProductDetails takes productId as a prop now
    return (
        <>
            <ProductDetails productId={productId} />
            <Footer />
        </>
    );
};

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get('q');
    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };
    return (
        <>
            <SearchResults searchQuery={query} onProductClick={handleProductClick} />
            <Footer />
        </>
    );
};

const ContactPage = () => (
    <>
        <ContactForm />
        <Footer />
    </>
);

const QuotePage = () => (
    <>
        <QuoteRequestForm />
        <Footer />
    </>
);

const AdminProductManagementPage = () => {
    const navigate = useNavigate();
    return (
        <ProductManagement
            onNavigate={(page) => navigate(`/${page}`)}
            onAddProduct={() => navigate('/admin-add-product')}
            onEditProduct={(product) => navigate(`/admin-edit-product/${product.id}`, { state: { product } })}
        />
    );
};

const AdminProductFormPage = ({ isEdit = false }) => {
    const navigate = useNavigate();
    // In a real app, you'd fetch the product if isEdit is true and no state is passed
    const { state } = useLocation(); 

    const handleSaveProduct = (productData) => {
        console.log("Saving product:", productData);
        navigate("/admin-products");
    };

    return (
        <ProductForm
            product={isEdit ? state?.product : null}
            onSave={handleSaveProduct}
            onCancel={() => navigate("/admin-products")}
        />
    );
};

const AppContent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Check if the current path is the homepage
    const isHomePage = location.pathname === '/';

    return (
        <div className={!isHomePage ? 'pt-16' : ''}> {/* Add padding-top to body if nav is present */}
            {/* Conditionally render the Navigation component */}
            {!isHomePage && <Navigation />}
            
            <main className="overflow-x-hidden">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:productId" element={<ProductDetailsPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/quote" element={<QuotePage />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin-dashboard" element={<Dashboard onNavigate={(page) => navigate(`/${page}`)} />} />
                    <Route path="/admin-products" element={<AdminProductManagementPage />} />
                    <Route path="/admin-add-product" element={<AdminProductFormPage />} />
                    <Route path="/admin-edit-product/:productId" element={<AdminProductFormPage isEdit />} />
                </Routes>
            </main>
            <Toaster />
        </div>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <HashRouter>
                {/* The AppContent component now holds all the routing and layout logic */}
                <AppContent />
            </HashRouter>
        </ThemeProvider>
    );
}

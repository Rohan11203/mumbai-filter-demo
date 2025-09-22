import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define color themes
export const themes = {
  default: {
    name: "Mumbai Filter Blue",
    colors: {
      // Brand Colors
      primary: "#1A237E",
      secondary: "#007BFF",
      accent: "#0056b3",
      
      // Background Colors
      background: "#FFFFFF",
      surfaceLight: "#F7F8FA",
      surfaceDark: "#E8E9EB",
      
      // Text Colors
      textPrimary: "#1A237E",
      textSecondary: "#6B7280",
      textLight: "#9CA3AF",
      
      // Status Colors
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#3B82F6",
      
      // Interactive Colors
      hover: "#F3F4F6",
      active: "#E5E7EB",
      focus: "#DBEAFE",
      
      // Border Colors
      border: "#E5E7EB",
      borderLight: "#F3F4F6",
      borderDark: "#D1D5DB"
    }
  },
  blackAndWhite: {
    name: "Black & White",
    colors: {
      primary: "#000000",
      secondary: "#333333",
      accent: "#666666",
      
      background: "#FFFFFF",
      surfaceLight: "#F9F9F9",
      surfaceDark: "#F0F0F0",
      
      textPrimary: "#000000",
      textSecondary: "#333333",
      textLight: "#666666",
      
      success: "#000000",
      warning: "#333333",
      error: "#000000",
      info: "#333333",
      
      hover: "#F5F5F5",
      active: "#E5E5E5",
      focus: "#F0F0F0",
      
      border: "#E0E0E0",
      borderLight: "#F0F0F0",
      borderDark: "#D0D0D0"
    }
  },
  ocean: {
    name: "Ocean Blue",
    colors: {
      primary: "#0F172A",
      secondary: "#0EA5E9",
      accent: "#0284C7",
      
      background: "#FFFFFF",
      surfaceLight: "#F8FAFC",
      surfaceDark: "#E2E8F0",
      
      textPrimary: "#0F172A",
      textSecondary: "#475569",
      textLight: "#64748B",
      
      success: "#059669",
      warning: "#D97706",
      error: "#DC2626",
      info: "#2563EB",
      
      hover: "#F1F5F9",
      active: "#E2E8F0",
      focus: "#DBEAFE",
      
      border: "#CBD5E1",
      borderLight: "#E2E8F0",
      borderDark: "#94A3B8"
    }
  },
  forest: {
    name: "Forest Green",
    colors: {
      primary: "#14532D",
      secondary: "#059669",
      accent: "#047857",
      
      background: "#FFFFFF",
      surfaceLight: "#F0FDF4",
      surfaceDark: "#DCFCE7",
      
      textPrimary: "#14532D",
      textSecondary: "#374151",
      textLight: "#6B7280",
      
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#3B82F6",
      
      hover: "#F0FDF4",
      active: "#DCFCE7",
      focus: "#D1FAE5",
      
      border: "#D1D5DB",
      borderLight: "#E5E7EB",
      borderDark: "#9CA3AF"
    }
  },
  sunset: {
    name: "Sunset Orange",
    colors: {
      primary: "#9A3412",
      secondary: "#EA580C",
      accent: "#DC2626",
      
      background: "#FFFFFF",
      surfaceLight: "#FFF7ED",
      surfaceDark: "#FFEDD5",
      
      textPrimary: "#9A3412",
      textSecondary: "#374151",
      textLight: "#6B7280",
      
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#3B82F6",
      
      hover: "#FFF7ED",
      active: "#FFEDD5",
      focus: "#FED7AA",
      
      border: "#D1D5DB",
      borderLight: "#E5E7EB",
      borderDark: "#9CA3AF"
    }
  }
};

export type ThemeName = keyof typeof themes;

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  colors: typeof themes.default.colors;
  themeName: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('default');

  // Apply theme to CSS variables
  useEffect(() => {
    const theme = themes[currentTheme];
    const root = document.documentElement;
    
    // Apply theme colors to CSS variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });
    
    // Store theme preference
    localStorage.setItem('mumbai-filter-theme', currentTheme);
  }, [currentTheme]);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('mumbai-filter-theme') as ThemeName;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const setTheme = (theme: ThemeName) => {
    setCurrentTheme(theme);
  };

  const value = {
    currentTheme,
    setTheme,
    colors: themes[currentTheme].colors,
    themeName: themes[currentTheme].name
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Theme-aware utility classes
export const getThemeClasses = (colors: typeof themes.default.colors) => ({
  // Text classes
  textPrimary: `text-[${colors.textPrimary}]`,
  textSecondary: `text-[${colors.textSecondary}]`,
  textLight: `text-[${colors.textLight}]`,
  
  // Background classes
  bgPrimary: `bg-[${colors.primary}]`,
  bgSecondary: `bg-[${colors.secondary}]`,
  bgSurface: `bg-[${colors.surfaceLight}]`,
  bgBackground: `bg-[${colors.background}]`,
  
  // Border classes
  borderPrimary: `border-[${colors.border}]`,
  borderSecondary: `border-[${colors.borderLight}]`,
  
  // Button classes
  btnPrimary: `bg-[${colors.secondary}] hover:bg-[${colors.accent}] text-white`,
  btnSecondary: `border-[${colors.secondary}] text-[${colors.secondary}] hover:bg-[${colors.secondary}] hover:text-white`,
  btnOutline: `border-[${colors.border}] text-[${colors.textSecondary}] hover:bg-[${colors.hover}]`,
  
  // Hover states
  hoverBg: `hover:bg-[${colors.hover}]`,
  activeBg: `active:bg-[${colors.active}]`,
  focusBg: `focus:bg-[${colors.focus}]`
});
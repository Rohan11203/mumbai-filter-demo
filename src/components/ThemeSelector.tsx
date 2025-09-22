import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme, themes, ThemeName } from "./ThemeProvider";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Palette, Check, ChevronDown } from "lucide-react";

export function ThemeSelector() {
  const { currentTheme, setTheme, themeName } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 min-w-48"
        style={{
          borderColor: `var(--theme-border)`,
          color: `var(--theme-textSecondary)`
        }}
      >
        <Palette className="w-4 h-4" />
        <span>{themeName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 z-50"
          >
            <Card 
              className="min-w-64 shadow-xl border-0"
              style={{ backgroundColor: `var(--theme-background)` }}
            >
              <CardContent className="p-4">
                <h3 
                  className="font-semibold mb-4"
                  style={{ color: `var(--theme-textPrimary)` }}
                >
                  Choose Theme
                </h3>
                
                <div className="space-y-2">
                  {Object.entries(themes).map(([key, theme]) => (
                    <motion.button
                      key={key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setTheme(key as ThemeName);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200"
                      style={{
                        backgroundColor: currentTheme === key ? `var(--theme-surfaceLight)` : 'transparent'
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        {/* Color Preview */}
                        <div className="flex space-x-1">
                          <div 
                            className="w-4 h-4 rounded-full border"
                            style={{ 
                              backgroundColor: theme.colors.primary,
                              borderColor: `var(--theme-border)`
                            }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full border"
                            style={{ 
                              backgroundColor: theme.colors.secondary,
                              borderColor: `var(--theme-border)`
                            }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full border"
                            style={{ 
                              backgroundColor: theme.colors.surfaceLight,
                              borderColor: `var(--theme-border)`
                            }}
                          />
                        </div>
                        
                        <span 
                          className="font-medium text-left"
                          style={{ color: `var(--theme-textPrimary)` }}
                        >
                          {theme.name}
                        </span>
                      </div>
                      
                      {currentTheme === key && (
                        <Check 
                          className="w-4 h-4"
                          style={{ color: `var(--theme-secondary)` }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
                
                <div 
                  className="mt-4 pt-4 border-t text-xs"
                  style={{ 
                    borderColor: `var(--theme-border)`,
                    color: `var(--theme-textLight)`
                  }}
                >
                  Theme preferences are saved automatically
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
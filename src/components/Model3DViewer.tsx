import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { 
  X, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Move3D, 
  Maximize, 
  Download, 
  Share2,
  Settings,
  Eye,
  Lightbulb,
  Palette,
  Info,
  Fullscreen,
  Minimize
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface Model3DViewerProps {
  isOpen: boolean;
  onClose: () => void;
  modelUrl?: string;
  modelTitle: string;
  modelDescription?: string;
}

// Mock 3D model data
const mockModel = {
  url: "https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf",
  title: "Industrial Filter System MFC-2500",
  description: "Interactive 3D model showing all components and assembly details",
  dimensions: "600 x 300 x 800 mm",
  weight: "25 kg",
  materials: ["Stainless Steel 316L", "PTFE Seals", "Polypropylene"],
  components: [
    { name: "Main Housing", visible: true, color: "#8B9DC3" },
    { name: "Filter Cartridges", visible: true, color: "#DEB887" },
    { name: "Inlet/Outlet Pipes", visible: true, color: "#A0A0A0" },
    { name: "Pressure Gauge", visible: true, color: "#FF6B6B" },
    { name: "Support Frame", visible: true, color: "#4ECDC4" }
  ]
};

export function Model3DViewer({ 
  isOpen, 
  onClose, 
  modelUrl = mockModel.url, 
  modelTitle, 
  modelDescription 
}: Model3DViewerProps) {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [activePanel, setActivePanel] = useState<'info' | 'components' | 'settings' | null>('info');
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [zoom, setZoom] = useState([75]);
  const [lightIntensity, setLightIntensity] = useState([80]);
  const [components, setComponents] = useState(mockModel.components);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Simulate loading time for 3D model
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0, z: 0 });
    setZoom([75]);
  };

  const toggleComponent = (index: number) => {
    setComponents(prev => prev.map((comp, i) => 
      i === index ? { ...comp, visible: !comp.visible } : comp
    ));
  };

  const downloadModel = () => {
    // Simulate model download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${modelTitle.replace(/\s+/g, '_')}_3D_Model.obj`;
    link.click();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
        ref={containerRef}
      >
        <div className="absolute inset-0 flex">
          {/* Main 3D Viewer Area */}
          <div className="flex-1 relative">
            {/* 3D Canvas */}
            <div className="w-full h-full relative" style={{ backgroundColor: colors.background }}>
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-t-transparent rounded-full"
                    style={{ borderColor: colors.secondary }}
                  />
                  <div className="absolute mt-24 text-center">
                    <p className="font-medium" style={{ color: colors.textPrimary }}>
                      Loading 3D Model...
                    </p>
                    <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                      Please wait while we prepare the interactive model
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {/* Mock 3D Model Display */}
                  <motion.div
                    animate={{ 
                      rotateY: rotation.y,
                      rotateX: rotation.x,
                      scale: zoom[0] / 100
                    }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="relative"
                    style={{
                      width: '400px',
                      height: '300px',
                      background: `linear-gradient(45deg, ${colors.secondary}20, ${colors.primary}10)`,
                      borderRadius: '20px',
                      border: `2px solid ${colors.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <div className="text-center">
                      <Move3D 
                        className="w-16 h-16 mx-auto mb-4" 
                        style={{ color: colors.secondary }}
                      />
                      <p className="font-semibold" style={{ color: colors.textPrimary }}>
                        3D Model Viewer
                      </p>
                      <p className="text-sm" style={{ color: colors.textSecondary }}>
                        Interactive model would load here
                      </p>
                    </div>
                    
                    {/* Component Indicators */}
                    {components.filter(comp => comp.visible).map((comp, index) => (
                      <motion.div
                        key={comp.name}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute w-3 h-3 rounded-full"
                        style={{ 
                          backgroundColor: comp.color,
                          top: `${20 + index * 15}%`,
                          left: `${10 + index * 20}%`
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
              )}

              {/* Watermark */}
              <div className="absolute bottom-4 left-4 opacity-50">
                <p className="text-xs" style={{ color: colors.textLight }}>
                  Mumbai Filter Corporation • 3D Interactive Model
                </p>
              </div>
            </div>

            {/* Top Controls */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge style={{ backgroundColor: colors.secondary }} className="text-white">
                  3D Model
                </Badge>
                <Badge variant="outline" style={{ borderColor: colors.border }}>
                  Interactive
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowControls(!showControls)}
                  className="bg-white/90 backdrop-blur-sm"
                >
                  <Settings className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="bg-white/90 backdrop-blur-sm"
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Fullscreen className="w-4 h-4" />}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  className="bg-white/90 backdrop-blur-sm"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Bottom Controls */}
            {showControls && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
              >
                <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetView}
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                      
                      <div className="flex items-center space-x-2">
                        <ZoomOut className="w-4 h-4" style={{ color: colors.textSecondary }} />
                        <Slider
                          value={zoom}
                          onValueChange={setZoom}
                          max={150}
                          min={25}
                          step={5}
                          className="w-24"
                        />
                        <ZoomIn className="w-4 h-4" style={{ color: colors.textSecondary }} />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Lightbulb className="w-4 h-4" style={{ color: colors.textSecondary }} />
                        <Slider
                          value={lightIntensity}
                          onValueChange={setLightIntensity}
                          max={100}
                          min={20}
                          step={10}
                          className="w-24"
                        />
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadModel}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Side Panel */}
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            className="w-80 border-l"
            style={{ 
              backgroundColor: colors.background,
              borderColor: colors.border
            }}
          >
            <div className="h-full flex flex-col">
              {/* Panel Header */}
              <div className="p-4 border-b" style={{ borderColor: colors.border }}>
                <h3 className="font-bold text-lg" style={{ color: colors.textPrimary }}>
                  {modelTitle}
                </h3>
                <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                  {modelDescription || "Interactive 3D model with detailed components"}
                </p>
                
                {/* Panel Tabs */}
                <div className="flex mt-4 rounded-lg border" style={{ borderColor: colors.border }}>
                  {[
                    { key: 'info', icon: Info, label: 'Info' },
                    { key: 'components', icon: Eye, label: 'Parts' },
                    { key: 'settings', icon: Settings, label: 'View' }
                  ].map(({ key, icon: Icon, label }) => (
                    <button
                      key={key}
                      onClick={() => setActivePanel(activePanel === key ? null : key as any)}
                      className={`flex-1 px-3 py-2 text-sm font-medium rounded ${
                        activePanel === key ? 'text-white' : ''
                      }`}
                      style={{
                        backgroundColor: activePanel === key ? colors.secondary : 'transparent',
                        color: activePanel === key ? 'white' : colors.textSecondary
                      }}
                    >
                      <Icon className="w-4 h-4 mx-auto mb-1" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Panel Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <AnimatePresence mode="wait">
                  {activePanel === 'info' && (
                    <motion.div
                      key="info"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="font-semibold mb-2" style={{ color: colors.textPrimary }}>
                          Specifications
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span style={{ color: colors.textSecondary }}>Dimensions:</span>
                            <span style={{ color: colors.textPrimary }}>{mockModel.dimensions}</span>
                          </div>
                          <div className="flex justify-between">
                            <span style={{ color: colors.textSecondary }}>Weight:</span>
                            <span style={{ color: colors.textPrimary }}>{mockModel.weight}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2" style={{ color: colors.textPrimary }}>
                          Materials
                        </h4>
                        <div className="space-y-1">
                          {mockModel.materials.map((material, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <div 
                                className="w-2 h-2 rounded-full mr-2"
                                style={{ backgroundColor: colors.secondary }}
                              />
                              <span style={{ color: colors.textSecondary }}>{material}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-4 space-y-2">
                        <Button 
                          className="w-full"
                          style={{ 
                            backgroundColor: colors.secondary,
                            color: 'white'
                          }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Technical Drawing
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share 3D Model
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {activePanel === 'components' && (
                    <motion.div
                      key="components"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-3"
                    >
                      <h4 className="font-semibold" style={{ color: colors.textPrimary }}>
                        Model Components
                      </h4>
                      
                      {components.map((component, index) => (
                        <div 
                          key={component.name}
                          className="flex items-center justify-between p-3 rounded-lg border"
                          style={{ borderColor: colors.border }}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: component.color }}
                            />
                            <span className="font-medium" style={{ color: colors.textPrimary }}>
                              {component.name}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => toggleComponent(index)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                              component.visible ? 'text-white' : ''
                            }`}
                            style={{
                              backgroundColor: component.visible ? colors.secondary : colors.surfaceLight,
                              color: component.visible ? 'white' : colors.textSecondary
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setComponents(prev => prev.map(comp => ({ ...comp, visible: true })))}
                        >
                          Show All Components
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {activePanel === 'settings' && (
                    <motion.div
                      key="settings"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <h4 className="font-semibold" style={{ color: colors.textPrimary }}>
                        View Settings
                      </h4>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                          Zoom Level: {zoom[0]}%
                        </label>
                        <Slider
                          value={zoom}
                          onValueChange={setZoom}
                          max={150}
                          min={25}
                          step={5}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                          Light Intensity: {lightIntensity[0]}%
                        </label>
                        <Slider
                          value={lightIntensity}
                          onValueChange={setLightIntensity}
                          max={100}
                          min={20}
                          step={10}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                          Rotation Controls
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setRotation(prev => ({ ...prev, y: prev.y - 45 }))}
                          >
                            ↺ Left
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setRotation(prev => ({ ...prev, y: prev.y + 45 }))}
                          >
                            ↻ Right
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setRotation(prev => ({ ...prev, x: prev.x - 30 }))}
                          >
                            ↑ Up
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setRotation(prev => ({ ...prev, x: prev.x + 30 }))}
                          >
                            ↓ Down
                          </Button>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={resetView}
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset to Default View
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Paintbrush, Type, Eye } from "lucide-react";

interface ThemeEditorProps {
  onThemeChange?: (theme: ThemeConfig) => void;
  initialTheme?: ThemeConfig;
}

interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  fontSize: number;
  borderRadius: number;
}

const ThemeEditor = ({
  onThemeChange = () => {},
  initialTheme = {
    primaryColor: "#FF0000",
    secondaryColor: "#000000",
    fontFamily: "Helvetica",
    fontSize: 16,
    borderRadius: 4,
  },
}: ThemeEditorProps) => {
  const [theme, setTheme] = useState<ThemeConfig>(initialTheme);

  const handleThemeChange = (updates: Partial<ThemeConfig>) => {
    const newTheme = { ...theme, ...updates };
    setTheme(newTheme);
    onThemeChange(newTheme);
  };

  return (
    <Card className="p-6 bg-white w-full max-w-2xl shadow-lg rounded-2xl border-gray-200/50">
      <div className="space-y-8">
        {/* Color Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Paintbrush className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Colors</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  id="primaryColor"
                  value={theme.primaryColor}
                  onChange={(e) =>
                    handleThemeChange({ primaryColor: e.target.value })
                  }
                  className="w-12 h-12 p-1"
                />
                <Input
                  type="text"
                  value={theme.primaryColor}
                  onChange={(e) =>
                    handleThemeChange({ primaryColor: e.target.value })
                  }
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  id="secondaryColor"
                  value={theme.secondaryColor}
                  onChange={(e) =>
                    handleThemeChange({ secondaryColor: e.target.value })
                  }
                  className="w-12 h-12 p-1"
                />
                <Input
                  type="text"
                  value={theme.secondaryColor}
                  onChange={(e) =>
                    handleThemeChange({ secondaryColor: e.target.value })
                  }
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Typography Controls */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Typography</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fontFamily">Font Family</Label>
              <Select
                value={theme.fontFamily}
                onValueChange={(value) =>
                  handleThemeChange({ fontFamily: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select font family" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Helvetica">Helvetica</SelectItem>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="System UI">System UI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Font Size ({theme.fontSize}px)</Label>
              <Slider
                value={[theme.fontSize]}
                min={12}
                max={24}
                step={1}
                onValueChange={(value) =>
                  handleThemeChange({ fontSize: value[0] })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Border Radius ({theme.borderRadius}px)</Label>
              <Slider
                value={[theme.borderRadius]}
                min={0}
                max={20}
                step={1}
                onValueChange={(value) =>
                  handleThemeChange({ borderRadius: value[0] })
                }
              />
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Preview</h3>
          </div>

          <div
            className="p-4 rounded-lg border"
            className="p-4 rounded-xl border shadow-sm hover:shadow-md transition-shadow"
            style={{
              fontFamily: theme.fontFamily,
              fontSize: `${theme.fontSize}px`,
              "--border-radius": `${theme.borderRadius}px`,
            }}
          >
            <div
              className="p-4 rounded"
              className="p-4 rounded-xl transition-colors hover:opacity-90"
              style={{ backgroundColor: theme.primaryColor, color: "white" }}
            >
              Primary Color Block
            </div>
            <div
              className="p-4 mt-2 rounded-xl transition-colors hover:opacity-90"
              style={{ backgroundColor: theme.secondaryColor, color: "white" }}
            >
              Secondary Color Block
            </div>
            <p className="mt-2">Sample text with selected typography</p>
          </div>
        </div>

        <Button
          className="w-full rounded-xl hover:shadow-md transition-all"
          onClick={() => onThemeChange(theme)}
        >
          Apply Theme
        </Button>
      </div>
    </Card>
  );
};

export default ThemeEditor;

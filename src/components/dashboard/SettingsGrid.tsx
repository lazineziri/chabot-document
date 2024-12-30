import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle, Clock, WifiOff, Save } from "lucide-react";

interface SettingsGridProps {
  onSettingsChange?: (settings: SettingsState) => void;
  initialSettings?: Partial<SettingsState>;
}

interface SettingsState {
  greetingEnabled: boolean;
  greetingMessage: string;
  responseDelay: number;
  offlineMode: boolean;
}

const SettingsGrid = ({
  onSettingsChange = () => {},
  initialSettings = {
    greetingEnabled: true,
    greetingMessage: "Hello! How can I help you today?",
    responseDelay: 1000,
    offlineMode: false,
  },
}: SettingsGridProps) => {
  const [settings, setSettings] = React.useState<SettingsState>({
    greetingEnabled: initialSettings.greetingEnabled ?? true,
    greetingMessage:
      initialSettings.greetingMessage ?? "Hello! How can I help you today?",
    responseDelay: initialSettings.responseDelay ?? 1000,
    offlineMode: initialSettings.offlineMode ?? false,
  });

  const handleSettingChange = (key: keyof SettingsState, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <Card className="p-6 bg-white w-full max-w-2xl mx-auto shadow-lg rounded-2xl border-gray-200/50">
      <div className="space-y-6">
        <div className="grid gap-6">
          {/* Greeting Message Settings */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-gray-500" />
                <Label htmlFor="greeting-toggle">Enable Greeting Message</Label>
              </div>
              <Switch
                id="greeting-toggle"
                checked={settings.greetingEnabled}
                onCheckedChange={(checked) =>
                  handleSettingChange("greetingEnabled", checked)
                }
              />
            </div>

            {settings.greetingEnabled && (
              <Input
                placeholder="Enter greeting message"
                value={settings.greetingMessage}
                onChange={(e) =>
                  handleSettingChange("greetingMessage", e.target.value)
                }
                className="w-full"
              />
            )}
          </div>

          {/* Response Delay Settings */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <Label>Response Delay (ms)</Label>
            </div>
            <div className="flex items-center space-x-4">
              <Slider
                value={[settings.responseDelay]}
                onValueChange={(value) =>
                  handleSettingChange("responseDelay", value[0])
                }
                max={3000}
                step={100}
                className="flex-1"
              />
              <span className="w-16 text-sm text-gray-500">
                {settings.responseDelay}ms
              </span>
            </div>
          </div>

          {/* Offline Mode Settings */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <WifiOff className="w-5 h-5 text-gray-500" />
              <Label htmlFor="offline-toggle">Offline Mode</Label>
            </div>
            <Switch
              id="offline-toggle"
              checked={settings.offlineMode}
              onCheckedChange={(checked) =>
                handleSettingChange("offlineMode", checked)
              }
            />
          </div>
        </div>

        {/* Save Button */}
        <Button
          className="w-full rounded-xl hover:shadow-md transition-all"
          onClick={() => onSettingsChange(settings)}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </Card>
  );
};

export default SettingsGrid;

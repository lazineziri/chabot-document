import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Upload, X } from "lucide-react";

interface ChatbotCustomizationProps {
  onSave?: (config: {
    name: string;
    description: string;
    avatar: string | null;
  }) => void;
  initialConfig?: {
    name: string;
    description: string;
    avatar: string | null;
  };
}

const ChatbotCustomization = ({
  onSave = () => {},
  initialConfig = {
    name: "My Chatbot",
    description: "A helpful AI assistant",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=default-bot",
  },
}: ChatbotCustomizationProps) => {
  const [name, setName] = useState(initialConfig.name);
  const [description, setDescription] = useState(initialConfig.description);
  const [avatar, setAvatar] = useState<string | null>(initialConfig.avatar);
  const [dragActive, setDragActive] = useState(false);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatar(null);
  };

  return (
    <Card className="p-6 bg-white w-full max-w-2xl shadow-lg rounded-2xl border-gray-200/50">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div
            className="relative group cursor-pointer"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
              id="avatar-upload"
            />
            <label
              htmlFor="avatar-upload"
              className={`relative block w-32 h-32 rounded-full overflow-hidden border-2 shadow-md transition-transform hover:scale-105 ${
                dragActive ? "border-primary" : "border-gray-200"
              } hover:border-primary transition-colors`}
            >
              <Avatar className="w-full h-full">
                <AvatarImage src={avatar || ""} alt={name} />
                <AvatarFallback className="bg-gray-100">
                  <Upload className="w-8 h-8 text-gray-400" />
                </AvatarFallback>
              </Avatar>
              {avatar && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-0 right-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={removeAvatar}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </label>
          </div>

          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bot-name">Chatbot Name</Label>
              <Input
                id="bot-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter chatbot name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bot-description">Description</Label>
              <Textarea
                id="bot-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your chatbot's purpose"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => onSave({ name, description, avatar })}
            className="w-full md:w-auto"
          >
            Save Changes
          </Button>
        </div>

        {/* Live Preview */}
        <div className="mt-8 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-sm font-medium text-gray-500 mb-4">
            Live Preview
          </h3>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
            <Avatar className="w-10 h-10">
              <AvatarImage src={avatar || ""} alt={name} />
              <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium text-gray-900">{name}</h4>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatbotCustomization;

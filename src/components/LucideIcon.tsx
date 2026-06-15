import React from "react";
import {
  Code2,
  Palette,
  Cpu,
  Gauge,
  Zap,
  Server,
  Database,
  Gamepad2,
  Wrench,
  Braces,
  Sparkles,
  FolderGit2,
  Clock,
  Activity,
  MessageSquareText,
  Mail,
  Github,
  Instagram,
  ArrowUpRight,
  Menu,
  X,
  Heart,
  Copy,
  Check,
  ChevronRight,
  Phone,
  MapPin,
  User,
  ExternalLink,
  Milestone
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  Code2,
  Palette,
  Cpu,
  Gauge,
  Zap,
  Server,
  Database,
  Gamepad2,
  Wrench,
  Braces,
  Sparkles,
  FolderGit2,
  Clock,
  Activity,
  MessageSquareText,
  Mail,
  Github,
  Instagram,
  ArrowUpRight,
  Menu,
  X,
  Heart,
  Copy,
  Check,
  ChevronRight,
  Phone,
  MapPin,
  User,
  ExternalLink,
  Milestone
};

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function LucideIcon({ name, className = "w-5 h-5", size }: LucideIconProps) {
  const IconComponent = iconMap[name] || Code2;
  return <IconComponent className={className} size={size} />;
}

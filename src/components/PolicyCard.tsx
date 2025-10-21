import { useState } from "react";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PolicyCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

const PolicyCard = ({ title, description, icon: Icon, delay = 0 }: PolicyCardProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <Card
      className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-hover border-border"
      onClick={() => setIsRevealed(!isRevealed)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background overlay with reveal animation */}
      <div
        className={`absolute inset-0 bg-gradient-primary transition-all duration-700 ${
          isRevealed ? "translate-x-full" : "translate-x-0"
        }`}
      />

      {/* Content */}
      <div className="relative p-6 min-h-[200px] flex flex-col">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>

        <p
          className={`text-muted-foreground transition-opacity duration-500 ${
            isRevealed ? "opacity-100" : "opacity-0"
          }`}
        >
          {description}
        </p>

        {!isRevealed && (
          <div className="absolute bottom-6 left-6 right-6 text-sm text-muted-foreground italic">
            Klik for at læse mere
          </div>
        )}
      </div>
    </Card>
  );
};

export default PolicyCard;

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
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="perspective-1000 h-[280px]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`relative w-full h-full transition-all duration-700 transform-style-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of card */}
        <Card
          className="absolute inset-0 backface-hidden overflow-hidden group hover:shadow-glow transition-all duration-300 border-border bg-gradient-to-br from-card to-card/80 backdrop-blur-sm"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="relative h-full p-6 flex flex-col justify-between">
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-elegant">
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                {title}
              </h3>
            </div>

            <div className="relative z-10 flex items-center text-sm text-muted-foreground italic group-hover:text-primary transition-colors">
              <span>Klik for at læse mere</span>
              <svg 
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Card>

        {/* Back of card */}
        <Card
          className="absolute inset-0 backface-hidden overflow-hidden border-border bg-gradient-primary shadow-glow"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="relative h-full p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center">
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-4">
                {title}
              </h3>
              <p className="text-primary-foreground/90 leading-relaxed">
                {description}
              </p>
            </div>

            <div className="flex items-center text-sm text-primary-foreground/80 italic">
              <svg 
                className="w-4 h-4 mr-2 rotate-180" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span>Klik for at lukke</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PolicyCard;

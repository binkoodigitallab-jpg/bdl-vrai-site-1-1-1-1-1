import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimelineItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

interface ScrollTimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const ScrollTimeline: React.FC<ScrollTimelineProps> = ({ items, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2">
        <motion.div 
          className="absolute top-0 left-0 w-full bg-primary origin-top"
          style={{ height: lineHeight }}
        />
        
        {/* Glowing ball that follows scroll */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_4px_rgba(239,68,68,0.6)]"
          style={{ top: glowY }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-primary"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 0.4, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>

      {/* Timeline items */}
      <div className="space-y-12 md:space-y-16 lg:space-y-20">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={cn(
              "relative grid grid-cols-2 gap-4 md:gap-8 items-center"
            )}
          >
            {/* Content - Alternating on all screen sizes */}
            <div className={cn(
              "space-y-3 md:space-y-4",
              // Alternating sides for all screens
              index % 2 === 0 ? "col-start-1 pr-4 md:pr-12 text-right" : "col-start-2 pl-4 md:pl-12 text-left"
            )}>
              {item.icon && (
                <div className={cn(
                  "inline-block",
                  index % 2 === 0 ? "ml-auto" : ""
                )}>
                  {item.icon}
                </div>
              )}
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold break-words">{item.title}</h3>
              <p className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed break-words">
                {item.description}
              </p>
              {item.action && (
                <div className={cn(
                  "pt-2",
                  index % 2 === 0 ? "flex justify-end" : ""
                )}>
                  {item.action}
                </div>
              )}
            </div>

            {/* Center dot */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg"
              />
            </div>

            {/* Empty space for opposite side - all screens */}
            <div className={cn(
              index % 2 === 0 ? "col-start-2" : "col-start-1"
            )} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
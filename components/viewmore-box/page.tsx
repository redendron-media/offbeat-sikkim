"use client";
import { cn } from "@/lib/utils";
import React, {  useLayoutEffect, useRef, useState } from "react";

interface DestinationDetailsProps {
  title: string;
  text: string;
  content: {
    intro?: string;
    steps?: { step: string; substeps?: string[] }[];
    conclusion?: string;
  };
}


const ViewMore: React.FC<DestinationDetailsProps> = ({
  title,
  content,
  text,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null); 
 

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useLayoutEffect(() => {
    if (contentRef.current) {
      const isContentOverflowing = contentRef.current.scrollHeight > contentRef.current.clientHeight;
      setIsOverflowing(isContentOverflowing);
    }
  }, [content]);

  return (
    <div className="flex flex-col gap-6">
      {content && (
        <section className="flex flex-col pt-12 pb-8 md:pt-[76px] md:pb-[32px] gap-4 md:gap-9 bg-[#E4EAE3] rounded-lg px-4">
          <h2 className="text-secondary-oncontainer headlines md:displays lg:displaym">
            {text} {title}
          </h2>

          <div
           ref={contentRef}
            className={cn(
              "bodys md:bodym lg:bodyl flex flex-col gap-4",
              !isExpanded && "line-clamp-5"
            )}>
            {
              content.intro && (
                <h4 className="titles md:titlel text-[#171D19]">{content.intro}</h4>
              )
            }
            {
              content.steps && (
                <ol className="list-decimal space-y-2 px-6  py-2">
                  {content.steps.map((step,index) => (
                    <li className="titles md:titlel text-balance text-[#171D19]" key={index}>
                      {step.step}
                      {step.substeps && (
                        <ul className="space-y-2 py-1 list-disc pl-4">
                          {step.substeps.map((substep,idx)=>(
                            <li className="bodys md:bodyl text-balance" key={idx}>{substep}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ol>
              )
            }
            {
              content.conclusion && (
                <p>{content.conclusion}</p>
              )
            }
          </div>

          
          {isOverflowing && (
            <button
              className="bodys md:bodym lg:bodyl self-center text-[#0010ee] font-medium cursor-pointer"
              onClick={toggleExpand}
            >
              {isExpanded ? "View Less" : "View More"}
            </button>
          )}
        </section>
      )}
    </div>
  );
};

export default ViewMore;

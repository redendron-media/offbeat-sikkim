"use client";
import { PortableText, PortableTextComponents } from "next-sanity";
import React, { useEffect, useRef, useState } from "react";

interface DestinationDetailsProps {
  title: string;
  text: string;
  content: any;
}

const serializers: PortableTextComponents = {
  list: {
    number: ({ children }) => (
      <ol className="list-decimal pl-5 space-y-2">{children}</ol>
    ),
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 space-y-2">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="space-y-2 list-inside">{children}</li>,
    number: ({ children }) => <li className="space-y-1">{children}</li>,
  },
};

const ViewMore: React.FC<DestinationDetailsProps> = ({
  title,
  content,
  text,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsToggle, setNeedsToggle] = useState(false); // State to check if we need a toggle
  const contentRef = useRef<HTMLParagraphElement>(null); 

  const charLimit = 300;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (contentRef.current) {
      const current = contentRef.current;
      const maxHeight = parseFloat(getComputedStyle(current).lineHeight) * 5; // Maximum height for 5 lines
      if (current.scrollHeight > maxHeight) {
        setNeedsToggle(true); // Show "View More" button if content exceeds 5 lines
      } else {
        setNeedsToggle(false); // No button if content fits within 5 lines
      }
    }
  }, [content]);

  return (
    <div className="flex flex-col gap-6">
      {content && (
        <section className="flex flex-col pt-12 pb-8 md:pt-[76px] md:pb-[32px] gap-4 md:gap-9 bg-[#E4EAE3] rounded-lg px-4">
          <h2 className="text-secondary-oncontainer headlines md:displays lg:displaym">
            {text} {title}
          </h2>

          <p
           ref={contentRef}
            className={`bodys md:bodym lg:bodyl overflow-hidden ${isExpanded ? "" : "line-clamp-5"}`}
          >
            <PortableText value={content} components={serializers} />
          </p>

          {needsToggle && (
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

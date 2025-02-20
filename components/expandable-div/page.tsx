import React, { useState, useRef, useEffect, ReactNode } from 'react';

interface ExpandableContentProps {
  children: ReactNode; // Any content: JSX, text, images, etc.
  maxHeight?: number; // Maximum height before overflow
  className?: string; // Custom styles
}

const ExpandableContent: React.FC<ExpandableContentProps> = ({ 
  children, 
  maxHeight = 150, 
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Check if content overflows
  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight > maxHeight);
    }
  }, [children]); // Runs when content changes

  return (
    <div className={`relative ${className}`}>
      {/* Content Wrapper */}
      <div
      className='space-y-4'
        ref={contentRef}
        style={{
          maxHeight: isExpanded ? 'none' : `${maxHeight}px`,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-in-out',
        }}
      >
        {children}
      </div>

      {/* Show "View More" only if content overflows */}
      {isOverflowing && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-blue-500 hover:underline mx-auto focus:outline-none"
        >
          
          {isExpanded ? 'View Less' : 'View More'}
        </button>
      )}
    </div>
  );
};

export default ExpandableContent;

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import useThemeStore from "../store/themeStore";
import { memo } from "react";

const TagsScroller = ({
  tags,
  selectedTag,
  onTagSelect,
  isLoading,
  error,
  allowDeselect,
}) => {
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const [hoverZone, setHoverZone] = useState(null); // "left" | "right" | null
  const dark = useThemeStore((s) => s.dark);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollButtons);
      return () =>
        scrollContainer.removeEventListener("scroll", checkScrollButtons);
    }
  }, [tags]);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -220, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 220, behavior: "smooth" });
  };

  const handleTagClick = (tag) => {
    if (selectedTag === tag && allowDeselect) {
      onTagSelect?.(null);
    } else {
      onTagSelect?.(tag);
    }
  };

  return (
    <div
      className="relative pt-0.5 w-full max-w-4xl"
      onMouseMove={(e) => {
        const { clientX, currentTarget } = e;
        const { left, width } = currentTarget.getBoundingClientRect();
        const zoneSize = 60; // px area near edges
        if (clientX - left < zoneSize) {
          setHoverZone("left");
        } else if (left + width - clientX < zoneSize) {
          setHoverZone("right");
        } else {
          setHoverZone(null);
        }
      }}
      onMouseLeave={() => setHoverZone(null)}
    >
      {/* Left Button */}
      {showLeftButton && (
        <button
          onClick={scrollLeft}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-md shadow-md p-1.5 transition-all duration-200
            ${
              dark
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gray-100 border border-gray-600"
                : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200"
            }
            ${
              hoverZone === "left"
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          aria-label="Scroll left"
        >
          <ChevronLeft size={18} />
        </button>
      )}

      {/* Right Button */}
      {showRightButton && (
        <button
          onClick={scrollRight}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-md shadow-md p-1.5 transition-all duration-200
            ${
              dark
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gray-100 border border-gray-600"
                : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200"
            }
            ${
              hoverZone === "right"
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          aria-label="Scroll right"
        >
          <ChevronRight size={18} />
        </button>
      )}

      {/* Tags Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-2 py-0 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {isLoading ? (
          <div
            className={`flex items-center gap-2 px-2
            ${dark ? "text-gray-400" : "text-gray-500"}`}
          >
            <Loader2 size={16} className="animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        ) : error ? (
          <div
            className={`flex items-center gap-2 px-2
            ${dark ? "text-red-400" : "text-red-500"}`}
          >
            <AlertCircle size={16} />
            <span className="text-sm">Failed to load</span>
          </div>
        ) : tags.length === 0 ? (
          <div
            className={`text-sm px-2
            ${dark ? "text-gray-500" : "text-gray-400"}`}
          >
            No tags
          </div>
        ) : (
          tags.map((tag, index) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={`${tag}-${index}`}
                onClick={() => handleTagClick(tag)}
                className={`shrink-0 px-4 py-1.5 rounded-md text-sm font-medium border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                  ${
                    isSelected
                      ? dark
                        ? "bg-blue-600 hover:bg-blue-500 border-blue-500 text-white shadow-md"
                        : "bg-blue-500 hover:bg-blue-400 border-blue-400 text-white shadow-md"
                      : dark
                      ? "bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 hover:border-gray-500 hover:text-gray-100"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900"
                  }`}
              >
                #{tag}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default memo(TagsScroller);

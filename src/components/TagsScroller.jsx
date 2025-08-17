import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import useThemeStore from "../store/themeStore";

const TagsScroller = ({
  tags = [],
  selectedTag,
  onTagSelect,
  isLoading = false,
  error = null,
  allowDeselect = true,
}) => {
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const dark = useThemeStore(s=>s.dark);
  const [showRightButton, setShowRightButton] = useState(false);
  const [hoverZone, setHoverZone] = useState(null); // "left" | "right" | null

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
      className="relative lg:w-xl"
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
          className={`absolute left-2 top-1/2 -translate-y-1/2 shadow-sm p-1.5 text-gray-600 hover:bg-gray-100 transition
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
          className={`absolute right-2 top-1/2 -translate-y-1/2 shadow-sm p-1.5 text-gray-600 hover:bg-gray-100 transition
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
          <div className="flex items-center gap-2 text-gray-500 px-2">
            <Loader2 size={16} className="animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 text-red-500 px-2">
            <AlertCircle size={16} />
            <span className="text-sm">Failed to load</span>
          </div>
        ) : tags.length === 0 ? (
          <div className="text-gray-400 text-sm px-2">No tags</div>
        ) : (
          tags.map((tag, index) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={`${tag}-${index}`}
                onClick={() => handleTagClick(tag)}
                className={`shrink-0 px-4 py-1.5 rounded-md text-sm font-medium border transition
                  ${
                    isSelected
                      ? "bg-blue-300 hover:bg-blue-300 border-gray-300 text-gray-900"
                      : "bg-white border-gray-300 text-gray-700"
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

export default TagsScroller;

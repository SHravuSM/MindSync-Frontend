import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function SortDropdownButton({ 
  sortBy = "Top",
  onSortChange,
  disabled = false,
  variant = "default",
  className = ""
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const dropdownRef = useRef(null);
  const sortOptions = ["Top", "Recent"];

  const variants = {
    default: {
      text: "text-black",
      lightText: "text-gray-600",
      border: "border-gray-300",
      icon: "text-gray-600",
      dropdown: "bg-white border-gray-200 shadow-lg",
      option: "hover:bg-gray-50 text-gray-900"
    },
    dark: {
      text: "text-white",
      lightText: "text-gray-400",
      border: "border-gray-600",
      icon: "text-gray-400",
      dropdown: "bg-gray-800 border-gray-600 shadow-xl",
      option: "hover:bg-gray-700 text-gray-100"
    }
  };

  const styles = variants[variant];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isExpanded]);

  const handleToggle = () => {
    if (!disabled) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleOptionSelect = (option) => {
    onSortChange?.(option);
    setIsExpanded(false);
  };

  return (
    <div className="relative my-1.5" ref={dropdownRef}>
      <button
        aria-expanded={isExpanded}
        aria-label="Sort order dropdown button"
        className={`
          flex items-center w-full border-0 bg-transparent p-0 cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:opacity-80 transition-opacity
          ${className}
        `}
        type="button"
        tabIndex={disabled ? -1 : 0}
        onClick={handleToggle}
        disabled={disabled}
      >
        {/* Divider Line */}
        <hr className={`flex-grow border-t ${styles.border} mr-2 my-0`} />
        
        {/* Content */}
        <div className={`flex items-center ${styles.text}`}>
          <span className={`text-xs ${styles.lightText} font-normal`}>
            Sort by:
          </span>
          <span className="text-xs font-bold mx-1">
            {sortBy}
          </span>
          <ChevronDown 
            size={16}
            className={`${styles.icon} transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isExpanded && (
        <div className={`
          absolute right-0 top-full mt-1 w-32 rounded-md border z-50
          ${styles.dropdown}
        `}>
          {sortOptions.map((option) => (
            <button
              key={option}
              className={`
                w-full px-3 py-2 text-left text-xs font-medium rounded-md
                ${option === sortBy ? 'bg-blue-50 text-blue-600' : styles.option}
                ${variant === 'dark' && option === sortBy ? 'bg-blue-900 text-blue-300' : ''}
              `}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortDropdownButton;

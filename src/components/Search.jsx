import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Search,
  X,
  User,
  FileText,
  Users,
  Calendar,
  Newspaper,
  Hash,
  Building,
  MapPin,
  TrendingUp,
  Clock,
  Heart,
  MessageCircle,
  Eye,
  Loader2,
} from "lucide-react";
import api from "../utils/api1";
import useThemeStore from "../store/themeStore";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [searchResults, setSearchResults] = useState({
    posts: [],
    profiles: [],
    investors: [],
    pitches: [],
    tags: [],
  });
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const dark = useThemeStore((s) => s.dark);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [counts, setCounts] = useState({
    posts: 0,
    profiles: 0,
    investors: 0,
    pitches: 0,
    tags: 0,
    total: 0,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    hasMore: false,
  });
  const [sortBy, setSortBy] = useState("relevance");

  const debounceTimer = useRef(null);
  const searchController = useRef(null);
  const scrollContainerRef = useRef(null);
  const lastSearchQuery = useRef("");
  const searchBarRef = useRef(null);

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      if (searchController.current) {
        searchController.current.abort();
      }
    };
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback((searchQuery, category = "all") => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (searchQuery.length >= 2) {
        performSearch(searchQuery, category);
      }
    }, 300);
  }, []);

  // Main search function
  const performSearch = async (
    searchQuery,
    category = activeTab,
    page = 1,
    append = false
  ) => {
    if (!searchQuery.trim()) return;

    // Cancel previous request
    if (searchController.current) {
      searchController.current.abort();
    }

    searchController.current = new AbortController();

    if (page === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const params = new URLSearchParams({
        q: searchQuery.trim(),
        category: category === "all" ? "all" : category,
        page: page.toString(),
        limit: "10",
        sortBy,
      });

      const response = await api.get(`/posts/search?${params}`, {
        signal: searchController.current.signal,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;

      if (data && data.success) {
        // Ensure all result categories exist with defaults
        const newResults = {
          posts: data.results?.posts || [],
          profiles: data.results?.profiles || [],
          investors: data.results?.investors || [],
          pitches: data.results?.pitches || [],
          tags: data.results?.tags || [],
        };

        // Ensure all counts exist with defaults
        const newCounts = {
          posts: data.counts?.posts || 0,
          profiles: data.counts?.profiles || 0,
          investors: data.counts?.investors || 0,
          pitches: data.counts?.pitches || 0,
          tags: data.results?.tags?.length || 0,
          total: data.counts?.total || 0,
        };

        // Ensure pagination exists with defaults
        const newPagination = {
          page: data.pagination?.page || 1,
          limit: data.pagination?.limit || 10,
          hasMore: data.pagination?.hasMore || false,
        };

        if (append && page > 1) {
          // Append new results to existing ones
          setSearchResults((prevResults) => ({
            posts: [...(prevResults.posts || []), ...newResults.posts],
            profiles: [...(prevResults.profiles || []), ...newResults.profiles],
            investors: [
              ...(prevResults.investors || []),
              ...newResults.investors,
            ],
            pitches: [...(prevResults.pitches || []), ...newResults.pitches],
            tags: [...(prevResults.tags || []), ...newResults.tags],
          }));
        } else {
          // Replace results for new search
          setSearchResults(newResults);
        }

        setCounts(newCounts);
        setPagination(newPagination);
        lastSearchQuery.current = searchQuery;
      } else {
        console.error("Search failed:", data?.message || "Unknown error");
        // Reset to empty state
        resetSearchState();
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Search error:", error);
        // Reset to empty state on error
        resetSearchState();
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Reset search state helper
  const resetSearchState = () => {
    setSearchResults({
      posts: [],
      profiles: [],
      investors: [],
      pitches: [],
      tags: [],
    });
    setCounts({
      posts: 0,
      profiles: 0,
      investors: 0,
      pitches: 0,
      tags: 0,
      total: 0,
    });
    setPagination({
      page: 1,
      limit: 10,
      hasMore: false,
    });
  };

  // Load more results
  const loadMoreResults = useCallback(() => {
    if (!loadingMore && pagination.hasMore && lastSearchQuery.current) {
      performSearch(
        lastSearchQuery.current,
        activeTab,
        pagination.page + 1,
        true
      );
    }
  }, [loadingMore, pagination.hasMore, pagination.page, activeTab]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || loadingMore || !pagination.hasMore)
      return;

    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;
    const scrolledToBottom = scrollHeight - scrollTop <= clientHeight + 100; // 100px threshold

    if (scrolledToBottom) {
      loadMoreResults();
    }
  }, [loadMoreResults, loadingMore, pagination.hasMore]);

  // Attach scroll listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // Get search suggestions
  const getSuggestions = async (searchQuery) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await api.get(
        `/posts/suggestions?q=${encodeURIComponent(searchQuery.trim())}`
      );
      const data = response.data;
      setSuggestions(data?.suggestions || []);
    } catch (error) {
      console.error("Suggestions error:", error);
      setSuggestions([]);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);

    if (value.trim().length >= 2) {
      setShowSuggestions(true);
      getSuggestions(value);
      debouncedSearch(value);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
      resetSearchState();
    }
  };

  // Handle tab change
  const handleTabChange = (category) => {
    setActiveTab(category);
    setShowSuggestions(false);
    if (query.trim().length >= 2) {
      performSearch(query, category);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    performSearch(suggestion.text, activeTab);
  };

  // Handle sort change
  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    if (query.trim().length >= 2) {
      performSearch(query, activeTab);
    }
  };

  // Clear search
  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
    setShowSuggestions(false);
    resetSearchState();
    setSuggestions([]);
    setActiveTab("posts");
    setSortBy("relevance");
    lastSearchQuery.current = "";
    if (searchController.current) {
      searchController.current.abort();
    }
  };

  // Format time ago
  const timeAgo = (date) => {
    if (!date) return "Unknown";

    try {
      const now = new Date();
      const past = new Date(date);
      const diffInHours = Math.floor((now - past) / (1000 * 60 * 60));

      if (diffInHours < 1) return "Just now";
      if (diffInHours < 24) return `${diffInHours}h`;
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) return `${diffInDays}d`;
      return past.toLocaleDateString();
    } catch (error) {
      return "Unknown";
    }
  };

  // Safe number formatting
  const formatCount = (count) => {
    if (typeof count !== "number") return "0";
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  // Category definitions with counts
  const categories = [
    {
      key: "posts",
      label: "Posts",
      icon: FileText,
      count: counts.posts || 0,
    },
    {
      key: "pitches",
      label: "Pitches",
      icon: FileText,
      count: counts.pitches || 0,
    },
    {
      key: "tags",
      label: "Tags",
      icon: Hash,
      count: counts.tags || 0,
    },
    {
      key: "investors",
      label: "Investors",
      icon: Users,
      count: counts.investors || 0,
    },
    {
      key: "profiles",
      label: "People",
      icon: User,
      count: counts.profiles || 0,
    },
  ];

  // Generate safe avatar URL
  const getAvatarUrl = (
    photo,
    name,
    background = dark ? "374151" : "e5e7eb",
    color = dark ? "e5e7eb" : "374151"
  ) => {
    if (photo && typeof photo === "string" && photo.trim()) return photo;
    const safeName = name && typeof name === "string" ? name : "User";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      safeName
    )}&background=${background}&color=${color}&size=128`;
  };

  // Render functions for each category
  const renderPostResults = () => {
    const posts = searchResults.posts || [];

    return (
      <div className="space-y-2">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
            to={`../feed/${post._id}`}
              key={post._id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                dark
                  ? "hover:bg-gray-900/50 border-gray-800"
                  : "hover:bg-gray-50 border-gray-100"
              }`}
            >
              <div className="flex space-x-3">
                <img
                  src={getAvatarUrl(post.author?.photo, post.author?.name)}
                  alt={post.author?.name || "User"}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                  onError={(e) => {
                    e.target.src = getAvatarUrl(
                      null,
                      post.author?.name || "User"
                    );
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
                    <span
                      className={`font-medium text-sm truncate ${
                        dark ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      {post.author?.name || "Unknown User"}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-xs ${
                          dark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {timeAgo(post.createdAt)}
                      </span>
                      {post.author?.role === "investor" && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            dark
                              ? "bg-blue-900/50 text-blue-300"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          Investor
                        </span>
                      )}
                    </div>
                  </div>
                  <h4
                    className={`font-medium text-sm mt-1 line-clamp-1 ${
                      dark ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    {post.title || "Untitled Post"}
                  </h4>
                  <p
                    className={`text-sm mt-1 line-clamp-2 ${
                      dark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {post.content || "No content available"}
                  </p>
                  <div
                    className={`flex items-center space-x-4 mt-2 text-xs ${
                      dark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      <Heart size={12} />
                      <span>{formatCount(post.likesCount || 0)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle size={12} />
                      <span>{formatCount(post.commentsCount || 0)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye size={12} />
                      <span>{formatCount(post.impressionsCount || 0)}</span>
                    </div>
                  </div>
                  {post.tags &&
                    Array.isArray(post.tags) &&
                    post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className={`text-xs px-2 py-1 rounded-full ${
                              dark
                                ? "bg-gray-700 text-gray-300"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              dark
                                ? "bg-gray-700 text-gray-300"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            +{post.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-4 text-center">
            <p className={dark ? "text-gray-400" : "text-gray-500"}>
              No posts found
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderProfileResults = () => {
    const profiles = searchResults.profiles || [];

    return (
      <div className="space-y-3">
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <div
              key={profile._id}
              className={`p-3 rounded-lg cursor-pointer transition-colors border-b last:border-b-0 ${
                dark
                  ? "hover:bg-gray-900/50 border-gray-800"
                  : "hover:bg-gray-50 border-gray-100"
              }`}
            >
              <div className="flex space-x-3">
                <img
                  src={getAvatarUrl(profile.photo, profile.name)}
                  alt={profile.name || "User"}
                  className="w-12 h-12 rounded-full flex-shrink-0"
                  onError={(e) => {
                    e.target.src = getAvatarUrl(null, profile.name || "User");
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h4
                    className={`font-medium text-sm truncate ${
                      dark ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    {profile.name || "Unknown User"}
                  </h4>
                  <p
                    className={`text-sm line-clamp-2 ${
                      dark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {profile.bio || "No bio available"}
                  </p>
                  <div
                    className={`flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-1 sm:space-y-0 mt-1 text-xs ${
                      dark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {profile.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin size={12} />
                        <span className="truncate">{profile.location}</span>
                      </div>
                    )}
                    <span>
                      {formatCount(profile.stats?.totalPosts || 0)} posts
                    </span>
                    <span>Rank: {profile.rank || 0}</span>
                  </div>
                  {profile.tags &&
                    Array.isArray(profile.tags) &&
                    profile.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {profile.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className={`text-xs px-2 py-1 rounded-full ${
                              dark
                                ? "bg-green-900/50 text-green-300"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center">
            <p className={dark ? "text-gray-400" : "text-gray-500"}>
              No people found
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderInvestorResults = () => {
    const investors = searchResults.investors || [];

    return (
      <div className="space-y-3">
        {investors.length > 0 ? (
          investors.map((investor) => (
            <div
              key={investor._id}
              className={`p-3 rounded-lg cursor-pointer transition-colors border-b last:border-b-0 ${
                dark
                  ? "hover:bg-gray-900/50 border-gray-800"
                  : "hover:bg-gray-50 border-gray-100"
              }`}
            >
              <div className="flex space-x-3">
                <img
                  src={getAvatarUrl(
                    investor.photo,
                    investor.name,
                    "f59e0b",
                    "ffffff"
                  )}
                  alt={investor.name || "Investor"}
                  className="w-12 h-12 rounded-full flex-shrink-0"
                  onError={(e) => {
                    e.target.src = getAvatarUrl(
                      null,
                      investor.name || "Investor",
                      "f59e0b",
                      "ffffff"
                    );
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h4
                    className={`font-medium text-sm truncate ${
                      dark ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    {investor.name || "Unknown Investor"}
                  </h4>
                  <p
                    className={`text-sm font-medium truncate ${
                      dark ? "text-amber-400" : "text-amber-600"
                    }`}
                  >
                    {investor.stats?.organization || "Independent Investor"}
                  </p>
                  <p
                    className={`text-sm line-clamp-2 ${
                      dark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {investor.bio || "No bio available"}
                  </p>
                  <div
                    className={`flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-1 sm:space-y-0 mt-1 text-xs ${
                      dark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {investor.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin size={12} />
                        <span className="truncate">{investor.location}</span>
                      </div>
                    )}
                    <span>
                      {formatCount(investor.stats?.totalFunded || 0)}{" "}
                      investments
                    </span>
                  </div>
                  {investor.stats?.interests &&
                    Array.isArray(investor.stats.interests) &&
                    investor.stats.interests.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {investor.stats.interests
                          .slice(0, 3)
                          .map((interest, index) => (
                            <span
                              key={index}
                              className={`text-xs px-2 py-1 rounded-full ${
                                dark
                                  ? "bg-amber-900/50 text-amber-300"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {interest}
                            </span>
                          ))}
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center">
            <p className={dark ? "text-gray-400" : "text-gray-500"}>
              No investors found
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderPitchResults = () => {
    const pitches = searchResults.pitches || [];

    return (
      <div className="space-y-3">
        {pitches.length > 0 ? (
          pitches.map((pitch) => (
            <div
              key={pitch._id}
              className={`p-3 rounded-lg cursor-pointer transition-colors border-b last:border-b-0 ${
                dark
                  ? "hover:bg-gray-900/50 border-gray-800"
                  : "hover:bg-gray-50 border-gray-100"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4
                    className={`font-medium text-sm truncate flex-1 ${
                      dark ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    {pitch.summary?.startup ||
                      pitch.startup ||
                      "Unnamed Startup"}
                  </h4>
                  <span
                    className={`text-xs ml-2 ${
                      dark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {timeAgo(pitch.createdAt)}
                  </span>
                </div>
                <p
                  className={`text-sm line-clamp-2 ${
                    dark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {pitch.summary?.oneLiner ||
                    pitch.oneLiner ||
                    "No description available"}
                </p>
                <div
                  className={`flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-1 sm:space-y-0 text-xs ${
                    dark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <span className="truncate">
                    By: {pitch.summary?.founder || pitch.founder || "Unknown"}
                  </span>
                  {pitch.summary?.fundingAsk && (
                    <span
                      className={`px-2 py-1 rounded-full ${
                        dark
                          ? "bg-green-900/50 text-green-300"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      Seeking: {pitch.summary.fundingAsk}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {pitch.summary?.hasWebsite && (
                    <span
                      className={`px-2 py-1 rounded-full ${
                        dark
                          ? "bg-blue-900/50 text-blue-300"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      Website
                    </span>
                  )}
                  {pitch.summary?.hasPitchDeck && (
                    <span
                      className={`px-2 py-1 rounded-full ${
                        dark
                          ? "bg-purple-900/50 text-purple-300"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      Pitch Deck
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center">
            <p className={dark ? "text-gray-400" : "text-gray-500"}>
              No pitches found
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderTagResults = () => {
    const tags = searchResults.tags || [];

    return (
      <div className="space-y-2">
        {tags.length > 0 ? (
          tags.map((tagData, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg cursor-pointer transition-colors border-b last:border-b-0 ${
                dark
                  ? "hover:bg-gray-900/50 border-gray-800"
                  : "hover:bg-gray-50 border-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <Hash
                    size={16}
                    className={dark ? "text-blue-400" : "text-blue-600"}
                  />
                  <span
                    className={`font-medium text-sm truncate ${
                      dark ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    {tagData.tag || "unknown"}
                  </span>
                </div>
                <div
                  className={`text-xs flex space-x-2 ml-2 ${
                    dark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <span>{formatCount(tagData.postCount || 0)} posts</span>
                  <span>•</span>
                  <span>{formatCount(tagData.userCount || 0)} users</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center">
            <p className={dark ? "text-gray-400" : "text-gray-500"}>
              No tags found
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderResults = () => {
    switch (activeTab) {
      case "posts":
        return renderPostResults();
      case "profiles":
        return renderProfileResults();
      case "investors":
        return renderInvestorResults();
      case "pitches":
        return renderPitchResults();
      case "tags":
        return renderTagResults();
      default:
        return renderPostResults();
    }
  };

  return (
    <div
      className="w-full max-w-4xl mx-auto m-2 px-2 relative"
      ref={searchBarRef}
    >
      {/* Search Input */}
      <div className="relative">
        <div className="flex items-center">
          <Search
            size={18}
            className={`absolute left-3 ${
              dark ? "text-gray-400" : "text-gray-400"
            }`}
          />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            placeholder="Search posts, people, investors, startups..."
            className={`w-full pl-10 pr-10 py-3 text-sm sm:text-base border rounded-md focus:outline-none hover:border-orange-500 focus:border-orange-500 transition-colors duration-200 ${
              dark
                ? "bg-black border-gray-800 text-gray-200 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
          />
          {query && (
            <button
              onClick={clearSearch}
              className={`absolute right-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1 transition-colors ${
                dark
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          className={`absolute top-full left-0 right-0 mt-1 m-2 border rounded-sm shadow-xl z-50 max-h-64 overflow-y-auto ${
            dark ? "bg-black border-gray-800" : "bg-white border-gray-200"
          }`}
        >
          <div className="py-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  handleSuggestionClick(suggestion);
                  setIsOpen(true);
                }}
                className={`w-full text-left px-4 py-2 flex items-center space-x-2 transition-colors ${
                  dark ? "hover:bg-gray-900/50" : "hover:bg-gray-50"
                }`}
              >
                <Search
                  size={14}
                  className={dark ? "text-gray-400" : "text-gray-400"}
                />
                <span
                  className={`text-sm flex-1 truncate ${
                    dark ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  {suggestion.text || ""}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    dark
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {suggestion.type || ""}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results Dropdown */}
      {isOpen && !showSuggestions && query.length >= 2 && (
        <div
          className={`absolute top-full m-2 left-0 right-0 mt-1 h-[800px] border rounded-sm z-40 ${
            dark ? "bg-black border-gray-800" : "bg-white border-gray-200"
          }`}
          style={{
            maxHeight: "min(80vh, 800px)",
            minHeight: "200px",
          }}
        >
          {/* Header with sort options */}
          {activeTab === "posts" && (
            <div
              className={`border-b px-4 py-2 ${
                dark ? "border-gray-800" : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm font-medium ${
                    dark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className={`text-sm border-none bg-transparent focus:outline-none cursor-pointer ${
                    dark ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  <option value="relevance">Relevance</option>
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
          )}

          {/* Category Tabs */}
          <div className={`px-2 py-2 `}>
            <div className="flex overflow-x-auto scrollbar-hide gap-1">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.key}
                    onClick={() => handleTabChange(category.key)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === category.key
                        ? dark
                          ? "bg-blue-900/50 text-blue-300"
                          : "bg-blue-100 text-blue-700"
                        : dark
                        ? "text-gray-400 hover:text-gray-200 hover:bg-gray-900/50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {Icon && <Icon size={14} />}
                    <span>{category.label}</span>
                    {category.count > 0 && (
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-xs ${
                          dark
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {formatCount(category.count)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Content with Infinite Scroll */}
          <div
            ref={scrollContainerRef}
            className="overflow-y-auto"
            style={{
              maxHeight: "min(68vh, 800px)",
            }}
          >
            {loading ? (
              <div className="p-4 text-center">
                <div className="inline-flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span
                    className={`text-sm ${
                      dark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Searching...
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="p-1">{renderResults()}</div>

                {/* Loading More Indicator */}
                {loadingMore && (
                  <div
                    className={`p-4 text-center border-t ${
                      dark ? "border-gray-800" : "border-gray-200"
                    }`}
                  >
                    <div className="inline-flex items-center space-x-2">
                      <Loader2
                        size={16}
                        className="animate-spin text-blue-600"
                      />
                      <span
                        className={`text-sm ${
                          dark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Loading more...
                      </span>
                    </div>
                  </div>
                )}

                {/* End of Results Indicator */}
                {!loadingMore &&
                  !pagination.hasMore &&
                  searchResults[activeTab]?.length > 0 && (
                    <div
                      className={`p-4 text-center border-t ${
                        dark ? "border-gray-800" : "border-gray-200"
                      }`}
                    >
                      <span
                        className={`text-xs ${
                          dark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        No more results to load
                      </span>
                    </div>
                  )}
              </>
            )}
          </div>

          {/* Pagination indicator */}
          {/* {pagination.hasMore && !loadingMore && (
            <div
              className={`border-t px-4 py-2 text-center ${
                dark ? "border-gray-800" : "border-gray-200"
              }`}
            >
              <span
                className={`text-xs ${
                  dark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Showing page {pagination.page} • Scroll down for more results
              </span>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

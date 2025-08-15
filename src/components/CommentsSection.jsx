import { useState, useCallback } from "react";
import { Lightbulb, User, Send, Loader2 } from "lucide-react";

const CommentsSection = ({ 
  open, 
  Post, 
  suggestions, 
  setSuggestions,
  setPost,
  user, 
  dark, 
  timeAgo 
}) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      const res = await api.post(`user/posts/suggestions/${Post._id}`, {
        userId: user?.id || user?._id,
        content: newComment.trim(),
      });

      // Update suggestions
      setSuggestions(res.data.suggestions || []);
      
      // Update post comments count
      setPost(prev => ({
        ...prev,
        comments: res.data.suggestions || []
      }));

      // Clear input
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [newComment, isSubmitting, Post._id, user, setSuggestions, setPost]);

  if (!open) return null;

  return (
    <div className="mt-6 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
        <Lightbulb className="w-4 h-4 text-blue-500" />
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Suggestions ({suggestions.length})
        </h3>
      </div>

      {/* Comments List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {suggestions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No suggestions yet. Share your thoughts!
            </p>
          </div>
        ) : (
          suggestions.map((comment) => (
            <div key={comment._id} className="flex gap-3">
              {comment.photo ? (
                <img
                  src={comment.photo}
                  alt={comment.name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {comment.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {timeAgo(comment.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {comment.comment}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Comment Form - Always Visible */}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex gap-3">
          {user?.photo ? (
            <img
              src={user.photo}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-gray-500" />
            </div>
          )}
          
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              disabled={isSubmitting}
              className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-colors ${
                dark 
                  ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400" 
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-400"
              } focus:outline-none focus:ring-2 focus:ring-blue-400/20 disabled:opacity-50`}
            />
            
            <button
              type="submit"
              disabled={!newComment.trim() || isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentsSection;
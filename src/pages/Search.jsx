import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts } from "../store/postsSelectors";
import { fetchAllPosts } from "../store/postsThunk";
import { Sparkles, Search as SearchIcon, Loader2 } from "lucide-react";
import aiService from "../services/ai.js";
import { cosineSimilarity } from "../utils/cosineSimilarity.js";
import { PostCard } from "../components/index.js";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const dispatch = useDispatch();
  const allPosts = useSelector(selectAllPosts);
  const isFetched = useSelector((state) => state.posts.isFetched);

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchAllPosts());
    }
  }, [dispatch, isFetched]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);

    const queryEmbedding = await aiService.generateEmbedding(query);
    if (!queryEmbedding) {
      setLoading(false);
      return;
    }

    const scored = allPosts
      .filter((post) => post.embedding)
      .map((post) => {
        const postEmbedding = JSON.parse(post.embedding);
        const score = cosineSimilarity(queryEmbedding, postEmbedding);
        return { ...post, score };
      });

    scored.sort((a, b) => b.score - a.score);
    setResults(scored.slice(0, 7));
    setLoading(false);
  };

  return (
    <div className="min-h-[70vh] py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs sm:text-sm font-medium">
            <Sparkles size={14} className="animate-pulse" />
            AI-Powered Semantic Search
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Find Blogs by Meaning, Not Just Words
          </h1>
          <p className="text-sm:text-base text-gray-800 mt-2">
            Ask naturally — we match ideas, not just keywords.
          </p>
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 mb-10"
        >
          <div className="relative flex-1">
            <SearchIcon
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. how to stay motivated working from home"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300
                                       focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent
                                       shadow-sm transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl font-medium text-white
                                   bg-gradient-to-r from-purple-600 to-blue-600
                                   hover:from-purple-700 hover:to-blue-700
                                   disabled:opacity-60 transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Search
              </>
            )}
          </button>
        </form>

        {/* Results */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-52 rounded-xl bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {results.map((post) => (
              <div key={post.$id} className="relative group">
                <span
                  className="absolute top-2 right-2 z-10 text-[10px] font-semibold
                                                   px-2 py-0.5 rounded-full bg-black/70 text-white backdrop-blur-sm"
                >
                  {Math.round(post.score * 100)}% match
                </span>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}

        {!loading && hasSearched && results.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <SearchIcon size={40} className="mx-auto mb-3 opacity-30" />
            <p>No matching posts found. Try phrasing it differently.</p>
          </div>
        )}

        {!hasSearched && (
          <div className="text-center py-16 text-gray-400 text-sm">
            Try something like{" "}
            <span className="italic">"tips for beginner developers"</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;

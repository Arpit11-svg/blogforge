import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Sparkles, RefreshCw, AlertCircle } from "lucide-react";
import appwriteService from "../appwrite/config";
import aiService from "../services/ai";

export default function AISummary({ post }) {
  const userData = useSelector((state) => state.auth.userData);
  const userId = userData?.$id;

  const [existingRow, setExistingRow] = useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setIsChecking(false);
      return;
    }

    (async () => {
      const row = await appwriteService.getPostSummary(post.$id, userId);
      setExistingRow(row);
      
      setIsChecking(false);
    })();
  }, [post.$id, userId]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    const result = await aiService.generateSummary(post.content, userId);

    if (!result.success) {
      setError(result.error);
      setIsGenerating(false);
      return;
    }

    try {
      if (existingRow) {
        await appwriteService.updatePostSummaryRow(
          existingRow.$id,
          result.summary,
        );
        setExistingRow({ ...existingRow, summary: result.summary });
      } else {
        const newRow = await appwriteService.createPostSummary(
          post.$id,
          userId,
          result.summary,
        );
        setExistingRow({ ...newRow, summary: result.summary });

      }
    } catch (err) {
      setError("Summary generated, but failed to save. Please try again.");
    }

    setIsGenerating(false);
  };

  if (!userId) return null;
  if (isChecking) return null; // brief flash while checking cache — could add a skeleton later

  const hasSummary = Boolean(existingRow?.summary);

  return (
    <div className="relative rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-blue-50 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
          <Sparkles size={15} className="text-white" />
        </div>
        <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          AI Summary
        </span>
      </div>

      {hasSummary && !isGenerating && (
        <div className="bg-violet-50 border-l-4 border-violet-500 rounded-r-lg px-4 py-3 mb-4">
          <p className="font-inter text-gray-800 leading-7 italic">
            {existingRow.summary}
          </p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 mb-3">
          <AlertCircle size={15} />
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
      >
        {isGenerating ? (
          <>
            <RefreshCw size={14} className="animate-spin" />
            Generating...
          </>
        ) : hasSummary ? (
          <>
            <RefreshCw size={14} />
            Regenerate Summary
          </>
        ) : (
          <>
            <Sparkles size={14} />
            Generate Summary
          </>
        )}
      </button>
    </div>
  );
}

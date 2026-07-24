class AIService {
    async generateEmbedding(text) {
        try {
            const response = await fetch("/api/generate-embedding", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text })
            });

            const result = await response.json();
            return result.success ? result.embedding : null;

        } catch (error) {
            console.error("generateEmbedding error:", error);
            return null;
        }
    }

    async generateSummary(content, userId) {
        try {
            const response = await fetch("/api/generate-summary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content, userId })
            });

            const result = await response.json();
            if (result.success) {
                return { success: true, summary: result.summary };
            }

            return { success: false, error: result.error || "Failed to generate summary" };

        } catch (error) {
            console.error("generateSummary error:", error);
            return { success: false, error: "Something went wrong. Please try again." };
        }
    }
}

const aiService = new AIService();
export default aiService;
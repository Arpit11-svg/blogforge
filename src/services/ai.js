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
}

const aiService = new AIService();
export default aiService;
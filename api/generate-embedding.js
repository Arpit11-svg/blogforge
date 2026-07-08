
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ success: false, message: "No text provided" });
        }

        const apiKey = process.env.GEMINI_API_KEY;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "models/gemini-embedding-001",
                    content: { parts: [{ text }] }
                })
            }
        );

        const data = await response.json();

        if (!data.embedding) {
            return res.status(500).json({ success: false, message: "Embedding generation failed" });
        }

        return res.status(200).json({ success: true, embedding: data.embedding.values });

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
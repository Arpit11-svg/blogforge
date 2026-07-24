const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-3.5-flash-lite";

async function checkUserAllowance(userId) {
    return { allowed: true, reason: null };
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { content, userId } = req.body;

    if (!content || typeof content !== "string") {
        return res.status(400).json({ error: "Missing or invalid 'content'" });
    }

    const allowance = await checkUserAllowance(userId);
    if (!allowance.allowed) {
        return res.status(403).json({ error: allowance.reason || "Not allowed" });
    }

    try {
        const prompt = `Summarize the following blog post in 2-3 concise sentences, capturing the key point for someone deciding whether to read the full article. Do not use markdown formatting.\n\nPost content:\n${content}`;

        const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                }),
            }
        );

        if (!geminiRes.ok) {
            const errText = await geminiRes.text();
            console.error("Gemini API error:", errText);
            return res.status(502).json({  success: false, error: "Failed to generate summary" });
        }

        const data = await geminiRes.json();
        const summary = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        if (!summary) {
            return res.status(502).json({  success: false, error: "Empty response from Gemini" });
        }

        return res.status(200).json({  success: true, summary });
    } catch (err) {
        console.error("generate-summary error:", err);
        return res.status(500).json({  success: false, error: "Internal server error" });
    }
}
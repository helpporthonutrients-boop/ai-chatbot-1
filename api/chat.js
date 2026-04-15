export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ message: "API is working ✅" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const message = body?.message || "Hello";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a Shilajit sales assistant. Be persuasive and short.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "No response",
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

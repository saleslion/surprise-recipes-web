import { type VercelRequest, type VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: `
Give me 4 creative recipe suggestions in JSON format.
Each should include: title, description, and url.
Respond ONLY with valid JSON, like:
{
  "recipes": [
    { "title": "...", "description": "...", "url": "https://..." }
  ]
}
          `,
        },
      ],
    });

    const reply = chat.choices[0].message?.content ?? '{}';

    // 👇 Add safety logs in case of invalid JSON
    console.log("GPT raw reply:", reply);

    const json = JSON.parse(reply);
    res.status(200).json(json);
  } catch (err) {
    console.error("OpenAI function error:", err);
    res.status(500).json({ error: 'Failed to generate recipes.' });
  }
}

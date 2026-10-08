import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY not set' }, { status: 500 });
    }

    const { resume, companyName, roleTitle, deck } = await req.json();

    if (!resume || resume.trim().length < 50) {
      return NextResponse.json({ error: 'Resume too short or missing' }, { status: 400 });
    }

    // Extract key themes from the deck to align resume with pitch narrative
    const deckSummary = deck?.slides
      ? (deck.slides as Array<{ title: string; content: string; bullets?: string[] }>)
          .slice(0, 5)
          .map((s: { title: string; content: string; bullets?: string[] }) => `${s.title}: ${s.content}`)
          .join('\n')
      : '';

    const r = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2500,
      system: `You are an expert resume writer and career coach specialising in UX and product design roles.
Your job is to rewrite a candidate's resume to be highly tailored for a specific company and role.

Rules:
- Keep ALL real experience and facts — never invent jobs, skills, or achievements
- Reorder and reframe existing content to highlight what matters most for THIS role
- Mirror the language and values from the pitch deck themes
- Use action verbs and quantify impact wherever the original resume suggests it
- Keep the same general format but sharpen every bullet point
- Focus on transferable skills that map to the identified UX opportunities
- Output the full tailored resume as plain text, ready to copy`,
      messages: [{
        role: 'user',
        content: `Tailor this resume for a ${roleTitle} position at ${companyName}.

The candidate has already built a UX pitch deck for this company with these themes:
${deckSummary}

Align the resume to reinforce those themes — this person should look like the natural author of that pitch.

ORIGINAL RESUME:
${resume}

Output the complete tailored resume as plain text.`,
      }],
    });

    const tailoredResume = (r.content[0] as { text: string }).text;
    return NextResponse.json({ tailoredResume });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Tailoring failed' }, { status: 500 });
  }
}

import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function ask(system: string, user: string): Promise<string> {
  const r = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    system,
    messages: [{ role: 'user', content: user }],
  });
  return (r.content[0] as { text: string }).text;
}

function parseJSON<T>(text: string): T {
  return JSON.parse(text.replace(/```json\n?|```\n?/g, '').trim());
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY not set in .env.local' }, { status: 500 });
    }

    const body = await req.json();
    if (!body.jobDescription || body.jobDescription.trim().length < 50) {
      return NextResponse.json({ error: 'Job description too short' }, { status: 400 });
    }

    // Agent 1: Extract
    const companyRaw = await ask(
      'You are a job description parser. Respond ONLY with valid JSON, no markdown fences.',
      `Extract from this job description:
{"name":"company name","industry":"industry","roleTitle":"job title","businessModel":"how they make money","targetAudience":"who uses the product","valueProposition":"problem they solve","productDescription":"what the product does","responsibilities":["..."],"requirements":["..."]}

Job description:
${body.jobDescription}
Company URL: ${body.companyUrl || 'not provided'}`
    );
    const company = parseJSON<Record<string, unknown>>(companyRaw);

    // Agents 2 & 3 in parallel
    const [auditRaw, sentimentRaw] = await Promise.all([
      ask(
        'You are a senior UX strategist. Use constructive language — "opportunity", "hypothesis", never "bad UX". Respond ONLY with valid JSON.',
        `UX audit for ${company.name} (${company.industry}). Product: ${company.productDescription}. Audience: ${company.targetAudience}.
Return: {"strengths":["..."],"opportunities":["..."],"heuristicFindings":["..."],"competitorInsights":"paragraph"}`
      ),
      ask(
        'You are a user research analyst. Respond ONLY with valid JSON.',
        `Synthesise user sentiment for ${company.name} targeting "${company.targetAudience}".
Return: {"positives":["..."],"complaints":["..."],"requests":["..."]}`
      ),
    ]);

    const audit = parseJSON<Record<string, unknown>>(auditRaw);
    const sentiment = parseJSON<Record<string, unknown>>(sentimentRaw);

    // Agent 4: Opportunities
    const oppsRaw = await ask(
      'You are a UX strategist identifying high-impact product opportunities. Use "may improve", "could increase", "worth exploring". Respond ONLY with a valid JSON array.',
      `Generate 5 UX opportunities for ${company.name}.
Role: ${company.roleTitle}. Product: ${company.productDescription}. Audience: ${company.targetAudience}.
UX opportunities: ${(audit.opportunities as string[]).join(', ')}.
User complaints: ${(sentiment.complaints as string[]).join(', ')}.

Return array:
[{"id":"opp-1","title":"short title","evidence":["point 1","point 2","point 3"],"businessImpact":"High|Medium|Low","confidenceScore":75,"estimatedEffort":"Low|Medium|High","whyItMatters":"2-3 sentence rationale"}]`
    );
    const opportunities = parseJSON<unknown[]>(oppsRaw);

    return NextResponse.json({ company, audit, sentiment, opportunities });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Research failed' }, { status: 500 });
  }
}

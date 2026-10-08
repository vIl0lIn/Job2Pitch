import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { company, selectedOpportunities, designerName } = await req.json();
    const primary = selectedOpportunities[0];
    const allOpps = selectedOpportunities.map((o: { title: string; whyItMatters: string }) => `• ${o.title}: ${o.whyItMatters}`).join('\n');

    const r = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 3000,
      system: `You are a senior UX strategist writing a pitch deck. Use constructive, hypothesis-driven language. Never say "bad UX". Use "opportunity", "hypothesis", "may improve". Respond ONLY with valid JSON.`,
      messages: [{
        role: 'user',
        content: `Generate a 7-slide pitch deck for ${designerName} applying to ${company.name} for ${company.roleTitle}.

Primary opportunity: ${primary.title} — ${primary.whyItMatters}
All selected: ${allOpps}
Product: ${company.productDescription}. Audience: ${company.targetAudience}.

Return:
{
  "slides": [
    {"slideNumber":1,"title":"Exploring Opportunities at ${company.name}","content":"Subtitle/tagline","bullets":["${designerName}","${company.roleTitle}","Strategic UX Pitch"]},
    {"slideNumber":2,"title":"Understanding the Product","content":"2-3 sentences on what they do and who they serve","bullets":["user insight 1","user insight 2","key business goal"]},
    {"slideNumber":3,"title":"Observed Opportunity","content":"Problem framed constructively","bullets":["evidence 1","evidence 2","evidence 3"]},
    {"slideNumber":4,"title":"The Hypothesis","hypothesis":"If we [improvement], we may see [outcome], because [reasoning]","content":"Rationale for the hypothesis","bullets":["assumption to test 1","assumption 2","key risk"]},
    {"slideNumber":5,"title":"Suggested Direction","content":"Conceptual solution approach","bullets":["direction detail 1","direction detail 2","how it connects to ${company.name}'s goals"]},
    {"slideNumber":6,"title":"Potential Impact","content":"Metrics worth watching if this direction is validated","metrics":["Activation Rate: rationale","Conversion Rate: rationale","Task Completion: rationale","Retention: rationale","NPS: rationale"]},
    {"slideNumber":7,"title":"How I Would Validate This","content":"Research and validation approach","bullets":["research method 1","experiment idea 2","success metric 3","timeline"]}
  ],
  "companyName":"${company.name}",
  "roleTitle":"${company.roleTitle}",
  "designerName":"${designerName}"
}`
      }],
    });

    const text = (r.content[0] as { text: string }).text;
    const deck = JSON.parse(text.replace(/```json\n?|```\n?/g, '').trim());
    return NextResponse.json(deck);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Deck generation failed' }, { status: 500 });
  }
}

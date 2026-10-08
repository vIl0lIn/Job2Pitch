'use client';
import { AppStep } from '../app/page';
import { JobInput, ResearchResult, PitchDeck } from '../types';

export default function PreviewPanel({ step, jobInput, research, deck }: {
  step: AppStep;
  jobInput: JobInput | null;
  research: ResearchResult | null;
  deck: PitchDeck | null;
}) {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#555', marginBottom: 16 }}>
        Live preview
      </div>

      {step === 'input' && (
        <div className="terminal" style={{ opacity: jobInput ? 1 : 0.5 }}>
          <div className="t-comment"># awaiting input</div>
          <br />
          {jobInput ? (
            <>
              <div><span className="t-key">job_desc: </span><span className="t-green">✓ received</span></div>
              <div><span className="t-key">chars:    </span><span className="t-val">{jobInput.jobDescription.length}</span></div>
              {jobInput.companyUrl && <div><span className="t-key">url:      </span><span className="t-val">{jobInput.companyUrl.replace('https://', '')}</span></div>}
            </>
          ) : (
            <>
              <div className="t-comment"># paste a job description</div>
              <div className="t-comment"># to begin research</div>
            </>
          )}
        </div>
      )}

      {step === 'research' && (
        <div className="terminal">
          <div className="t-comment"># agents running</div>
          <br />
          <div><span className="t-key">agent_1: </span><span className="t-val pulse">company_researcher</span></div>
          <div><span className="t-key">agent_2: </span><span className="t-val pulse">ux_auditor</span></div>
          <div><span className="t-key">agent_3: </span><span className="t-val pulse">sentiment_analyst</span></div>
          <div><span className="t-key">agent_4: </span><span className="t-val pulse">opp_generator</span></div>
          <br />
          <div className="t-comment"># processing…</div>
        </div>
      )}

      {step === 'opportunities' && research && (
        <div className="terminal">
          <div className="t-comment"># research complete</div>
          <br />
          <div><span className="t-key">company:  </span><span className="t-green">{research.company.name}</span></div>
          <div><span className="t-key">industry: </span><span className="t-val">{research.company.industry}</span></div>
          <div><span className="t-key">role:     </span><span className="t-val">{research.company.roleTitle}</span></div>
          <br />
          <div className="t-comment"># opportunities found</div>
          {research.opportunities.map((o, i) => (
            <div key={o.id}>
              <span className="t-key">opp_{i + 1}: </span>
              <span className="t-val" style={{ fontSize: 11 }}>{o.title.substring(0, 28)}{o.title.length > 28 ? '…' : ''}</span>
              <span style={{ color: o.businessImpact === 'High' ? 'var(--red)' : o.businessImpact === 'Medium' ? '#f59e0b' : '#4ade80', marginLeft: 6, fontSize: 10 }}>
                [{o.businessImpact}]
              </span>
            </div>
          ))}
        </div>
      )}

      {step === 'deck' && deck && (
        <div className="terminal">
          <div className="t-comment"># deck generated</div>
          <br />
          <div><span className="t-key">company:  </span><span className="t-green">{deck.companyName}</span></div>
          <div><span className="t-key">slides:   </span><span className="t-val">{deck.slides.length}</span></div>
          <div><span className="t-key">designer: </span><span className="t-val">{deck.designerName}</span></div>
          <br />
          {deck.slides.map(s => (
            <div key={s.slideNumber}>
              <span className="t-key">slide_{s.slideNumber}: </span>
              <span className="t-val" style={{ fontSize: 11 }}>{s.title.substring(0, 26)}{s.title.length > 26 ? '…' : ''}</span>
            </div>
          ))}
        </div>
      )}

      {step === 'deck' && !deck && (
        <div className="terminal">
          <div className="t-comment"># generating…</div>
          <div className="t-val pulse">writing slides</div>
        </div>
      )}
    </div>
  );
}

import React from 'react';
import ProjectPage from './ProjectPage';

export default function AIHedgeFund() {
  return (
    <ProjectPage title="AI Hedge Fund">
      <section>
        <p>
          <b>Overview:</b><br />
          A proof-of-concept hedge fund where the analysts are <b>AI agents</b>. Each agent embodies a
          famous investor's philosophy — a Warren Buffett agent hunting durable value, a Cathie Wood
          agent chasing disruptive growth — and they debate their way to trading decisions. The system
          runs from both a command-line interface and a web application. <i>Educational simulation
          only: it does not place real trades.</i>
        </p>

        <h3>Multi-Agent Architecture</h3>
        <ol>
          <li>
            <b>Persona agents:</b> each investor agent receives the same market data but evaluates it
            through its own prompt-engineered investment philosophy — moats, margins, and valuation
            for the value investor; innovation curves and TAM expansion for the growth investor.
          </li>
          <li>
            <b>Signal generation:</b> every agent emits a bullish/bearish signal with a confidence
            level and a written rationale, so each decision comes with a paper trail.
          </li>
          <li>
            <b>Risk management:</b> a risk agent reviews the combined signals, checking position
            sizing and exposure before anything reaches the portfolio.
          </li>
          <li>
            <b>Portfolio decisions:</b> a final manager layer weighs the agents' arguments and
            produces the buy/sell/hold action for the simulated book.
          </li>
        </ol>

        <h3>Key Features</h3>
        <ul>
          <li>Multiple investor-persona agents with distinct, prompt-defined philosophies</li>
          <li>Explainable decisions — every trade carries each agent's reasoning</li>
          <li>Risk-management layer between raw signals and portfolio actions</li>
          <li>CLI for scripted runs plus a web app for interactive exploration</li>
        </ul>

        <h3>Why It's Interesting</h3>
        <p>
          Pointing one LLM at a stock and asking "buy or sell?" produces mush. Splitting the problem
          into <b>opinionated specialists that disagree</b> produces something closer to how real
          investment committees work — and makes the output auditable, because you can read exactly
          why the Buffett agent objected. It's a study in multi-agent orchestration as much as in
          finance.
        </p>

        <h3>Tech Stack</h3>
        <ul>
          <li>Python, LLM-driven agents, agent orchestration</li>
          <li>CLI + web application front ends</li>
        </ul>

        <h3>What I Learned</h3>
        <ul>
          <li>Agent disagreement is a feature: consensus systems hide risk, debating systems surface it.</li>
          <li>Personas need guardrails — without structured output, philosophy drifts into vibes.</li>
          <li>Explainability is the real product; the trades are just the demo.</li>
        </ul>
      </section>
    </ProjectPage>
  );
}

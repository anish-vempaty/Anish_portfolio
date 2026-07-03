import React from 'react';
import ProjectPage from './ProjectPage';

export default function JobSeekAgent() {
  return (
    <ProjectPage title="JobSeek Agent">
      <section>
        <p>
          <b>Overview:</b><br />
          An AI agent that automates the grind of a job search: it finds relevant postings, tailors
          the resume to each one, drafts the cover letter, and assembles a complete application
          package. Job hunting is a pipeline problem — repetitive, parallelizable, and mostly
          text transformation — which makes it a natural fit for LLM agents.
        </p>

        <h3>Agent Pipeline</h3>
        <ol>
          <li>
            <b>Search:</b> the agent gathers job postings matching target roles and filters them
            for genuine fit rather than keyword coincidence.
          </li>
          <li>
            <b>Job-description analysis:</b> each posting is parsed into required skills,
            responsibilities, and keywords — building a profile of what this specific reviewer (and
            their ATS filter) is looking for.
          </li>
          <li>
            <b>Resume tailoring:</b> the agent maps the candidate's real experience onto the posting's
            priorities, reordering emphasis and mirroring the JD's terminology. Grounded in the actual
            master resume — the agent reframes experience, it does not invent it.
          </li>
          <li>
            <b>Cover letter generation:</b> drafts a letter connecting concrete past work to the
            company's stated needs, replacing template filler.
          </li>
          <li>
            <b>Package assembly:</b> outputs the tailored resume, cover letter, and posting details
            as one ready-to-submit application bundle.
          </li>
        </ol>

        <h3>Key Features</h3>
        <ul>
          <li>End-to-end automation from posting discovery to finished application package</li>
          <li>Per-posting resume tailoring tuned for both human reviewers and ATS keyword screens</li>
          <li>Cover letters grounded in real experience, not generic templates</li>
          <li>Human-in-the-loop by design: the agent drafts, the candidate reviews and submits</li>
        </ul>

        <h3>Design Principles</h3>
        <ul>
          <li>
            <b>Truthfulness constraint:</b> the hardest engineering problem was keeping generation
            anchored to the master resume — an agent that embellishes experience is worse than no
            agent at all.
          </li>
          <li>
            <b>Volume with quality:</b> tailoring every application is what people skip when applying
            manually; automating it means the hundredth application is as sharp as the first.
          </li>
        </ul>

        <h3>Tech Stack</h3>
        <ul>
          <li>Python, LLM-driven agents, structured prompt pipelines</li>
          <li>Document parsing and generation (resume / cover letter / application bundle)</li>
        </ul>

        <h3>What I Learned</h3>
        <ul>
          <li>Agents excel at pipelines with clear stages and checkable outputs — job applications are exactly that.</li>
          <li>Constraining an LLM to a source of truth is harder, and more important, than making it fluent.</li>
          <li>Automation should raise the floor of quality, not replace the human decision at the end.</li>
        </ul>
      </section>
    </ProjectPage>
  );
}

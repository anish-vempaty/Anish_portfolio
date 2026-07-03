import React from 'react';
import ProjectPage from './ProjectPage';

export default function CustomCybersecurityLLM() {
  return (
    <ProjectPage title="Custom Cybersecurity LLM">
      <section>
        <p>
          <b>Overview:</b><br />
          Fine-tuned a <b>Qwen2.5 7B</b> model on curated cybersecurity datasets to build a
          domain-specialized assistant for <b>threat analysis and secure code review</b>. General-purpose
          LLMs hedge, hallucinate CVE details, and miss vulnerability patterns that a security engineer
          spots instantly — this project closes that gap by teaching the model the language of the
          security domain, then serving it through an optimized GPU-accelerated inference pipeline with
          quantized deployment.
        </p>

        <h3>Fine-Tuning Pipeline</h3>
        <ol>
          <li>
            <b>Dataset curation:</b> assembled and cleaned cybersecurity corpora — threat write-ups,
            vulnerability descriptions, and secure/insecure code examples — and normalized everything
            into instruction–response pairs suited to analyst-style Q&amp;A and code review.
          </li>
          <li>
            <b>Training:</b> fine-tuned Qwen2.5 7B with the HuggingFace ecosystem on CUDA GPUs,
            iterating on data mixture and hyperparameters against a held-out security evaluation set.
          </li>
          <li>
            <b>Quantization:</b> compressed the tuned model for deployment, trading a negligible
            quality loss for a fraction of the VRAM footprint — the difference between needing a
            data-center GPU and running on accessible hardware.
          </li>
          <li>
            <b>Serving:</b> wired the quantized model into a GPU-accelerated inference pipeline for
            low-latency interactive use.
          </li>
        </ol>

        <h3>Key Features</h3>
        <ul>
          <li>Domain-tuned responses for threat analysis, triage-style reasoning, and CVE-adjacent questions</li>
          <li>Secure code analysis: flags injection risks, unsafe crypto usage, and dangerous API patterns</li>
          <li>Quantized deployment for practical, self-hosted inference — no data leaves the machine</li>
          <li>GPU-accelerated pipeline tuned for interactive latency</li>
        </ul>

        <h3>Why Self-Hosted Matters for Security</h3>
        <p>
          Security teams often can't paste incident details or proprietary source code into a cloud
          LLM. A self-hosted, domain-tuned 7B model keeps sensitive context on-premises while still
          giving analysts a capable assistant — a deliberate trade of raw model size for
          confidentiality and control.
        </p>

        <h3>Tech Stack</h3>
        <ul>
          <li>Qwen2.5 7B, HuggingFace Transformers, PyTorch</li>
          <li>CUDA, Python, quantized model deployment</li>
        </ul>

        <h3>What I Learned</h3>
        <ul>
          <li>Dataset quality dominates: careful curation moved results more than any hyperparameter.</li>
          <li>Evaluating a security LLM needs domain-specific tests — generic benchmarks miss what matters.</li>
          <li>Quantization decisions are deployment decisions: pick the target hardware first.</li>
        </ul>
      </section>
    </ProjectPage>
  );
}

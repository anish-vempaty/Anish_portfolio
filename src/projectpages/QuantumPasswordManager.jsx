import React from 'react';
import ProjectPage from './ProjectPage';

export default function QuantumPasswordManager() {
  return (
    <ProjectPage title="Quantum-Resistant Password Manager">
      <section>
        <p>
          <b>Overview:</b><br />
          A password manager written in <b>Rust</b> whose vault is protected by <b>hybrid post-quantum
          cryptography</b>: ML-KEM (the NIST-standardized Kyber lattice scheme) layered with AES-GCM,
          with keys derived via Argon2. Everything is stored locally — there is no cloud component, no
          account, and no telemetry.
        </p>

        <h3>Why Post-Quantum?</h3>
        <p>
          The threat isn't a quantum computer appearing tomorrow — it's <b>"harvest now, decrypt
          later"</b>: adversaries recording encrypted data today to break it once large-scale quantum
          machines exist. Long-lived secrets like password vaults are exactly the data worth harvesting.
          The fix is to encrypt with an algorithm believed quantum-resistant <i>now</i>, and the safe
          way to adopt young cryptography is a <b>hybrid</b>: an attacker must break <i>both</i> the
          classical layer (AES-GCM) and the post-quantum layer (ML-KEM) to read anything.
        </p>

        <h3>Security Architecture</h3>
        <ol>
          <li>
            <b>Key derivation:</b> the master password is stretched with <b>Argon2</b> — a
            memory-hard KDF that makes GPU/ASIC brute-force attacks expensive by design.
          </li>
          <li>
            <b>Key encapsulation:</b> <b>ML-KEM</b> establishes the vault's encryption keys, so the
            key material itself is protected by lattice cryptography rather than RSA/ECC, which
            Shor's algorithm would break.
          </li>
          <li>
            <b>Payload encryption:</b> vault entries are sealed with <b>AES-256-GCM</b>, whose
            authentication tags double as tamper detection — a modified vault fails loudly instead of
            decrypting to garbage.
          </li>
          <li>
            <b>At rest:</b> a single encrypted local vault file. Nothing is synced, transmitted, or
            recoverable without the master password.
          </li>
        </ol>

        <h3>Key Features</h3>
        <ul>
          <li>Hybrid post-quantum encryption (ML-KEM + AES-GCM) — both layers must fall to expose data</li>
          <li>Argon2 memory-hard key derivation against offline cracking</li>
          <li>Authenticated encryption: any vault tampering is detected on open</li>
          <li>Zero cloud dependency — fully offline threat model</li>
          <li>Rust implementation: memory safety without a garbage collector, and secrets zeroized after use</li>
        </ul>

        <h3>Why Rust</h3>
        <p>
          Password managers die by memory bugs — buffer over-reads and use-after-frees that leak key
          material. Rust's ownership model eliminates those classes at compile time, and its ecosystem
          provides audited implementations of the primitives, so the project's job is composing them
          correctly rather than reimplementing crypto.
        </p>

        <h3>Tech Stack</h3>
        <ul>
          <li>Rust, ML-KEM (Kyber), AES-256-GCM, Argon2</li>
        </ul>

        <h3>What I Learned</h3>
        <ul>
          <li>Hybrid constructions are how real systems migrate cryptography — never a hard cutover.</li>
          <li>The KDF is the real wall between a stolen vault file and every password in it.</li>
          <li>Authenticated encryption isn't optional: integrity and confidentiality must travel together.</li>
        </ul>
      </section>
    </ProjectPage>
  );
}

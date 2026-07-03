import React from 'react';
import ProjectPage from './ProjectPage';

export default function AINotesApp() {
  return (
    <ProjectPage title="AI Notes App">
      <section>
        <p>
          <b>Overview:</b><br />
          A Python application that listens to your microphone and turns speech into a structured
          <b> Markdown</b> file as you talk. It pairs <b>faster-whisper</b> (a CTranslate2-optimized
          Whisper implementation) for transcription with <b>webrtcvad</b> for voice-activity
          detection, so it transcribes speech — not silence — in near real time, entirely on-device.
        </p>

        <h3>How It Works</h3>
        <ol>
          <li>
            <b>Capture:</b> a stream reads raw audio frames from the microphone continuously.
          </li>
          <li>
            <b>Voice-activity detection:</b> <b>webrtcvad</b> classifies each small frame as speech or
            silence; consecutive speech frames are grouped into utterances and silence is dropped,
            which both cuts latency and prevents the model from hallucinating text from background noise.
          </li>
          <li>
            <b>Transcription:</b> each utterance is fed to <b>faster-whisper</b>, whose CTranslate2
            backend runs Whisper several times faster than the reference implementation on the same
            hardware — the difference that makes live use practical.
          </li>
          <li>
            <b>Notes:</b> transcribed segments are appended to a Markdown file, ready to drop into
            Obsidian, a wiki, or a repo.
          </li>
        </ol>

        <h3>Key Features</h3>
        <ul>
          <li>Real-time speech-to-Markdown transcription</li>
          <li>VAD-gated pipeline: no wasted compute or phantom text from silence</li>
          <li>Fully local processing — audio never leaves the machine, so meetings stay private</li>
          <li>Plain Markdown output that composes with any note-taking system</li>
        </ul>

        <h3>Design Choices</h3>
        <ul>
          <li>
            <b>Why faster-whisper:</b> same Whisper accuracy, a fraction of the inference cost —
            latency is the whole product in live transcription.
          </li>
          <li>
            <b>Why VAD first:</b> Whisper transcribes whatever you give it, including hum and
            keyboard noise; gating input on detected speech is the cheapest accuracy win available.
          </li>
          <li>
            <b>Why Markdown:</b> notes should outlive the app that made them. Plain text wins.
          </li>
        </ul>

        <h3>Tech Stack</h3>
        <ul>
          <li>Python, faster-whisper (CTranslate2), webrtcvad</li>
          <li>Streaming microphone capture, Markdown output</li>
        </ul>

        <h3>What I Learned</h3>
        <ul>
          <li>Real-time audio is a buffering problem before it's an ML problem.</li>
          <li>Chunking strategy (where you cut utterances) affects transcript quality as much as model size.</li>
          <li>Local-first AI tools are viable now — and for private audio, they're the right default.</li>
        </ul>
      </section>
    </ProjectPage>
  );
}

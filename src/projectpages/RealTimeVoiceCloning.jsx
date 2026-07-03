import React from 'react';
import ProjectPage from './ProjectPage';

export default function RealTimeVoiceCloning() {
  return (
    <ProjectPage title="Real-Time Voice Cloning">
      <section>
        <p>
          <b>Overview:</b><br />
          An implementation of <b>transfer learning from speaker verification to multispeaker
          text-to-speech</b> (SV2TTS): give the system a few seconds of someone's voice, and it
          synthesizes arbitrary new sentences in that voice — with a vocoder fast enough to run in
          real time. The pipeline turns a voice into a compact numerical fingerprint, then uses that
          fingerprint to condition speech generation.
        </p>

        <h3>Three-Stage Architecture</h3>
        <ol>
          <li>
            <b>Speaker encoder:</b> a network trained on a speaker-verification objective distills a
            short reference clip into a fixed-size <b>speaker embedding</b> — capturing the timbre and
            character of the voice, independent of what words were spoken.
          </li>
          <li>
            <b>Synthesizer:</b> a sequence-to-sequence model (Tacotron-style) takes text plus the
            speaker embedding and generates a <b>mel spectrogram</b> — the acoustic blueprint of the
            sentence in the target voice.
          </li>
          <li>
            <b>Vocoder:</b> a neural vocoder converts the spectrogram into an audible waveform,
            optimized to synthesize faster than playback — which is what makes the system interactive
            rather than batch.
          </li>
        </ol>

        <h3>Key Features</h3>
        <ul>
          <li>Voice cloning from just a few seconds of reference audio</li>
          <li>Multispeaker synthesis: one trained system, unlimited voices via embeddings</li>
          <li>Real-time vocoder for interactive generation</li>
          <li>Clean separation of stages — each model can be retrained or swapped independently</li>
        </ul>

        <h3>Workflow</h3>
        <ol>
          <li>Record or load a short reference clip of the target speaker.</li>
          <li>Encode it into a speaker embedding.</li>
          <li>Type any text; the synthesizer renders it as a spectrogram in that voice.</li>
          <li>The vocoder streams the waveform out in real time.</li>
        </ol>

        <h3>The Security Angle</h3>
        <p>
          As someone working in security, this project cuts both ways by design: building it is the
          best way to understand <b>audio deepfakes</b> — how little reference audio is needed, what
          artifacts synthesis leaves behind, and why voice alone is no longer an authentication
          factor. It pairs directly with my DeepFake Detection work on the defensive side.
        </p>

        <h3>Tech Stack</h3>
        <ul>
          <li>Python, PyTorch, deep learning (SV2TTS: encoder / synthesizer / vocoder)</li>
          <li>Audio processing: mel spectrograms, streaming waveform synthesis</li>
        </ul>

        <h3>What I Learned</h3>
        <ul>
          <li>Embedding spaces are transferable: a verification model's features can drive generation.</li>
          <li>Real-time constraints change architecture choices more than accuracy targets do.</li>
          <li>Voice biometrics are effectively broken as a sole factor — plan authentication accordingly.</li>
        </ul>
      </section>
    </ProjectPage>
  );
}

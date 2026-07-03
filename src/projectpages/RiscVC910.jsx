import React from 'react';
import ProjectPage from './ProjectPage';

export default function RiscVC910() {
  return (
    <ProjectPage title="RISC-V C910 Microarchitecture Redesign for x86 Compatibility">
      <section>
        <p>
          <b>Overview:</b><br />
          Redesigned the open-source <b>XuanTie C910</b> RISC-V core to introduce microarchitectural
          changes that improve execution compatibility and performance for <b>x86-targeted software
          workloads</b>. The goal: make binary-translated x86 software run efficiently on RISC-V
          hardware instead of paying the usual heavy translation penalty — a step toward reducing
          dependence on the x86 ISA without giving up its software ecosystem.
        </p>

        <h3>Motivation</h3>
        <p>
          RISC-V is open and royalty-free, but the world's software is still overwhelmingly compiled
          for x86. Running that software on RISC-V today means dynamic binary translation (QEMU,
          Rosetta-style layers), and the translated instruction streams hit patterns the stock C910
          pipeline handles poorly — flag computations, complex addressing, and instruction sequences
          that x86 encodes in one op but RISC-V expands into several. This project attacks the problem
          from the <b>hardware side</b>: reshape the microarchitecture so translated x86 code stops
          being a worst case.
        </p>

        <h3>What I Changed</h3>
        <ul>
          <li>
            <b>Instruction Decode Unit (IDU):</b> modified the decode logic to recognize and fuse
            instruction sequences that binary translators emit for common x86 idioms, dispatching them
            as fewer internal operations.
          </li>
          <li>
            <b>ALU datapath:</b> extended the ALU to compute x86-style condition-flag results
            alongside normal arithmetic, removing the multi-instruction flag-emulation sequences that
            dominate translated code.
          </li>
          <li>
            <b>Hardware interfaces:</b> adjusted the instruction-handling paths between fetch, decode,
            and execute so the new fused operations flow through the existing pipeline without
            disturbing standard RISC-V execution.
          </li>
        </ul>

        <h3>Verification & Co-Simulation</h3>
        <ol>
          <li>
            <b>Unit level:</b> implemented the ALU and IDU modifications in <b>Verilog</b> and
            verified them with <b>Icarus Verilog (iverilog)</b> testbenches against the unmodified
            core's behavior.
          </li>
          <li>
            <b>System level:</b> ran <b>QEMU-based co-simulation</b>, using x86 binaries translated to
            RISC-V as workloads, to compare instruction counts and effective execution speed between
            the stock and modified cores.
          </li>
          <li>
            <b>Regression:</b> re-ran native RISC-V test suites after every change to confirm the
            redesign never breaks standard ISA behavior.
          </li>
        </ol>

        <h3>Results</h3>
        <ul>
          <li>
            Improved effective x86-workload execution speed on the C910 core by <b>~40%</b> in
            QEMU-based co-simulation.
          </li>
          <li>
            Reduced the instruction expansion overhead of translated x86 binaries by enabling more
            efficient execution and translation of x86-oriented sequences directly in hardware.
          </li>
          <li>Standard RISC-V code paths remain fully functional and unaffected.</li>
        </ul>

        <h3>Tech Stack</h3>
        <ul>
          <li>Verilog, XuanTie C910 (open-source RISC-V core)</li>
          <li>Icarus Verilog (iverilog) for simulation and testbenches</li>
          <li>QEMU for binary translation and co-simulation</li>
          <li>RISC-V &amp; x86 ISA internals, GTKWave for waveform debugging</li>
        </ul>

        <h3>What This Project Demonstrates</h3>
        <ul>
          <li>Comfort working below the software stack: pipelines, decode logic, and datapaths.</li>
          <li>Hardware verification discipline — testbenches, co-simulation, and regression runs.</li>
          <li>
            The same systems mindset behind my security work: understand how the machine actually
            executes things, then bend it to your advantage.
          </li>
        </ul>
      </section>
    </ProjectPage>
  );
}

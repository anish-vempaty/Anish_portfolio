import React from 'react';

export default function Resume({ show }) {
  return (
    <article className={`resume${show ? ' active' : ''}`} data-page="resume">
      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <span role="img" aria-label="Education">🎓</span>
          </div>
          <h3 className="h3">Education</h3>
        </div>
        <ol className="timeline-list">
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">New York University (MS, Cybersecurity)</h4>
            <span>2023 – 2025 | CGPA: 3.7/4</span>
            <p className="timeline-text">
              Awards: Volcano Project Security Self-Assessment, NYU Scholarship, Gyandhan Scholarship
            </p>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">SRMIST, Chennai (B.Tech, CSE)</h4>
            <span>2019 – 2023 | CGPA: 9.27/10</span>
          </li>
        </ol>
      </section>
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <span role="img" aria-label="Experience">💼</span>
          </div>
          <h3 className="h3">Experience</h3>
        </div>
        <ol className="timeline-list">
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Robotics Security & Operations Engineer, GreyOrange / ROBO</h4>
            <span>Atlanta, GA | Feb 2026 – Present</span>
            <p className="timeline-text">
              • Conduct network penetration testing and implement regression-testing automation frameworks using Bash and Python to secure robot-to-cloud communication and prevent unauthorized access to AMR fleets.<br />
              • Vulnerability management: review and debug robot code in Python, Java, and C++ to identify security flaws and ensure robust, bug-free software deployment.<br />
              • AI-driven operations: utilize AI-assisted analytics and telemetry logs to detect system anomalies and forecast operational risks, ensuring high reliability at the SAMs ATL site.<br />
              • Develop backend utilities and scripts using Bash to automate diagnostics, integrate robotic systems with Warehouse Management Systems, and build CI/CD pipelines for continuous deployment.
            </p>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Data Scientist & Team Co-Leader, Delta Rising Foundation</h4>
            <span>Remote | Aug 2025 – Feb 2026</span>
            <p className="timeline-text">
              • Co-led a 6-member team to quantify per-plot Giant Sequoia carbon sequestration, engineering proprietary datasets with Google Earth Engine and multi-source satellite imagery — the foundation for accurate carbon estimates across the study area.<br />
              • Developed robust ML models using TensorFlow and Scikit-learn and built an interactive C# frontend that let users visualize predictions and explore carbon estimation tools.
            </p>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Data Engineer Intern, SRMIST</h4>
            <span>Chennai, India | Jun 2022 – Dec 2022</span>
            <p className="timeline-text">
              • Automated alumni data collection using Python/Selenium orchestrated through SLURM job scheduling, processing 30+ years of records.<br />
              • Designed and implemented ETL pipelines in Python (Pandas, SQL) deployed via AWS CDK with CI/CD, increasing dataset accuracy and reliability for analytics.
            </p>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Cybersecurity Intern, Foxmula Corp</h4>
            <span>Bengaluru, India | Dec 2020 – Feb 2021</span>
            <p className="timeline-text">
              • Developed AES + chaos-based image encryption reducing runtime by 10%.<br />
              • Led a 4-member team improving throughput and performance by 5%.
            </p>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">AI Engineer Intern, Verzeo Tech</h4>
            <span>Bengaluru, India | Apr 2020 – Jun 2020</span>
            <p className="timeline-text">
              • Built a YOLOv3-based accident detection app improving accuracy from 84% to 93%.<br />
              • Designed a Flask dashboard with async logging to ensure high system uptime.
            </p>
          </li>
        </ol>
      </section>
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <span role="img" aria-label="Certifications">📜</span>
          </div>
          <h3 className="h3">Certifications</h3>
        </div>
        <ol className="timeline-list">
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">CompTIA Security+</h4>
            <span>2025</span>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">MTA: Security Fundamentals</h4>
            <span>Microsoft, 2021</span>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">PadhAI Deep Learning</h4>
            <span>OneFourth Labs, 2021</span>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Building Web Apps in PHP</h4>
            <span>University of Michigan, 2022</span>
          </li>
        </ol>
      </section>
      <section className="skill">
        <h3 className="h3 skills-title">Skills</h3>
        <ul className="skills-list content-card">
          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Python, Flask, FastAPI, Docker, AWS</h5>
              <data value="95">95%</data>
            </div>
            <div className="skill-progress-bg">
              <div className="skill-progress-fill" style={{ width: '95%' }}></div>
            </div>
          </li>
          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Cybersecurity (Pentesting, Threat Modeling, Risk Assessment)</h5>
              <data value="90">90%</data>
            </div>
            <div className="skill-progress-bg">
              <div className="skill-progress-fill" style={{ width: '90%' }}></div>
            </div>
          </li>
          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Machine Learning (PyTorch, TensorFlow, OpenCV)</h5>
              <data value="85">85%</data>
            </div>
            <div className="skill-progress-bg">
              <div className="skill-progress-fill" style={{ width: '85%' }}></div>
            </div>
          </li>
        </ul>
      </section>
    </article>
  );
}

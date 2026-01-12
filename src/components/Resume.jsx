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
            <h4 className="h4 timeline-item-title">Data Scientist, Delta Rising Foundation</h4>
            <span>Aug 2025 – Present</span>
            <p className="timeline-text">
              • Developed AI Models (Random Forest, XGBoost) to accurately quantify per-tree carbon sequestration, supporting proposals and donor engagement.<br />
              • Engineered a proprietary forest carbon dataset by combining LiDAR scans with soil and climate data, enabling scalable carbon modeling.<br />
              • Processed 3D laser scans to extract tree height, diameter, and volume, converting raw data into actionable forest metrics.<br />
              • Designed robust data pipelines (pandas, GeoPandas, Shapely, PDAL) for scalable and reproducible AI workflows.<br />
              • Integrated ecology and forestry research findings to refine models, boosting precision and scientific legitimacy.
            </p>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Data Engineering Intern, SRMIST</h4>
            <span>Chennai, India | Jun 2022 – Dec 2022</span>
            <p className="timeline-text">
              • Developed automated web scraping tools to collect alumni data (Name, Phone, Address) from LinkedIn for graduates (1985–2015).<br />
              • Designed ETL pipeline to clean, extract, and organize large datasets for institutional outreach.<br />
              • Enhanced data collection efficiency by implementing robust error handling and batch processing.
            </p>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Cybersecurity Engineer Intern, Foxmula Corp</h4>
            <span>Bengaluru, India | Dec 2020 – Feb 2021</span>
            <p className="timeline-text">
              • Developed Confidential Image Communication System (Python, AES, chaos encryption).<br />
              • Led a team of 4; improved pipeline efficiency by 10%.<br />
              • Upgraded processing with multithreading and efficient I/O.
            </p>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">AI Engineer Intern, Verzeo Tech</h4>
            <span>Bengaluru, India | Apr 2020 – Jun 2020</span>
            <p className="timeline-text">
              • Real-time Traffic/Pedestrian Detection using Python, OpenCV, YOLOv3.<br />
              • Deployed Flask dashboard; improved detection accuracy to 93%.<br />
              • Implemented async logging to reduce downtime.
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

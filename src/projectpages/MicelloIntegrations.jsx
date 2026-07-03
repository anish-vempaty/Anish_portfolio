import React from "react";
import { useNavigate } from 'react-router-dom';

export default function MicelloIntegrations() {
  const navigate = useNavigate();
  return (
    <article className="project-detail active">
        <button
        className="back-btn"
        onClick={() => navigate('/')}
        style={{
          background: 'none',
          color: '#00ff41',
          border: 'none',
          fontSize: '1.1rem',
          cursor: 'pointer',
          marginBottom: '2rem',
          textDecoration: 'underline',
        }}
      >
        ← Back to Portfolio
      </button>
      <header>
        <h2 className="h2">Micello Integrations</h2>
      </header>
      <section>
        <p>
          <b>Overview:</b><br />
          Engineered custom integrations between <b>Micello’s indoor mapping SDK</b> and real-time APIs such as <b>FlightStats</b> and <b>Uber</b>. Enabled seamless in-building navigation, live arrival/departure info, and external service overlays for users in airports and other large venues. Enhanced both user experience and operational efficiency by bringing live, actionable data directly into interactive maps.
        </p>
        <h3>Key Features</h3>
        <ul>
          <li>Indoor navigation with Micello’s mapping SDK</li>
          <li>Live flight status and ETA overlays via FlightStats</li>
          <li>Uber ride time/cost estimates based on user location</li>
          <li>Dynamic UI widgets updating in real time</li>
        </ul>
        <h3>Tech Stack</h3>
        <ul>
          <li>JavaScript, Node.js, Micello JavaScript SDK, Uber API, FlightStats API</li>
        </ul>
        <h3>How It Works</h3>
        <ol>
          <li>
            Detects user’s current position using Micello’s map events.
          </li>
          <li>
            On location or gate selection, makes API calls to <b>Uber</b> and <b>FlightStats</b> for live ETAs and flight info.
          </li>
          <li>
            Displays the results (e.g., “Uber 4 min away” or “Flight AA101: On Time”) directly in the map overlay.
          </li>
          <li>
            UI widgets automatically refresh as the user moves or flight/Uber data updates.
          </li>
        </ol>
        <h3>Sample Code Snippets</h3>
        <b>1. Micello SDK Location Event Listener:</b>
        <pre>{`
micello.map.on('locationSelected', (location) => {
  const { latitude, longitude } = location;
  fetchUberEstimate(latitude, longitude);
  fetchFlightStatusWidget(location.nearestGate);
});
`}</pre>
        <b>2. Fetching Uber ETA from User Location:</b>
        <pre>{`
function fetchUberEstimate(lat, lon) {
  fetch(\`https://api.uber.com/v1.2/estimates/time?start_latitude=\${lat}&start_longitude=\${lon}\`, {
    headers: { Authorization: "Bearer " + UBER_TOKEN }
  })
  .then(res => res.json())
  .then(data => {
    // Show ETA in custom map widget
    updateUberWidget(data.times[0].estimate);
  });
}
`}</pre>
        <b>3. Overlay Flight Status Info via FlightStats API:</b>
        <pre>{`
function fetchFlightStatusWidget(gate) {
  // Get flight number for the selected gate/location
  const flightId = getFlightForGate(gate);
  fetch(\`https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/\${flightId}?appId=XXX&appKey=YYY\`)
    .then(res => res.json())
    .then(data => updateFlightWidget(data.flightStatuses[0]));
}
`}</pre>
        <b>4. Live Widget UI Update (Pseudo-JSX):</b>
        <pre>{`
<UberWidget eta={uberEta} />
<FlightStatusWidget flight={flightData} />
`}</pre>
        <h3>Result</h3>
        <ul>
          <li>Real-time Uber/flight info overlays on interactive venue maps</li>
          <li>Enhanced user navigation and planning within complex buildings</li>
          <li>Plug-and-play integrations for multiple external data providers</li>
        </ul>
      </section>
      <button
        className="back-btn"
        onClick={() => navigate('/')}
        style={{
          background: 'none',
          color: '#00ff41',
          border: 'none',
          fontSize: '1.1rem',
          cursor: 'pointer',
          marginBottom: '2rem',
          textDecoration: 'underline',
        }}
      >
        ← Back to Portfolio
      </button>
    </article>
  );
}

import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss'
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Career History</h1>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid  white' }}
            date="06.2025 - present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Frontend Developer</h3>
            <h4 className="vertical-timeline-element-subtitle">Proweb.az | Rəqəmsal Həllər</h4>
            <p>
              Web Development | HTML, CSS, JavaScript, Next.js, Bootstrap
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="12.2024 - 05.2025"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Frontend Developer</h3>
            <h4 className="vertical-timeline-element-subtitle">Project Management Systems LLC</h4>
            <p>
              Web Development | HTML, CSS, Sass, JavaScript, React.js
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="04.2024 - 12.2024"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Frontend intern</h3>
            <h4 className="vertical-timeline-element-subtitle">LNQ Company</h4>
            <p>
              Web Development | HTML, CSS, Sass, Chakra UI, JavaScript, React.js
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
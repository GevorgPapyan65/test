import { Button } from '@mui/material';
import './section.scss';

const SectionTwo = () => {
  return (
    <section className="section-two">
      <div className="container">
        <div className="section-two-wrapper">
          <div className="section-two-left">
            {/* <img src="./section-2-help.webp" alt="" /> */}
          </div>
          <div className="section-two-right">
            <h4>Don't have time to research?</h4>
            <h3>Let us find a RightOne for you</h3>
            <p>
              Our AI assistant guide you through the process of finding an
              attorney for you.
            </p>
            <p>
              Just tell us your query, and we'll connect you with an attorney
              who's practice of area is aligning with your specific dispute.
            </p>
            <Button className="call-btn" variant="contained">Call AI</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTwo;

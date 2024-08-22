import introImg from './section-1-photo.webp';
import './section.scss';

const SectionOne = () => {
  return (
    <section className="section-one">
      <div className="container">
        <div className="left-side">
          <h1>Connect with attorneys.</h1>
          <h2>Solve your legal issues.</h2>
          <p>
            <span>
              RightAid is a digital platform that connects individuals in need
              of legal assistance with a network of qualified experts, including
              lawyers, advocates, and legal specialists.
            </span>
            <span>
              Our mission is to make justice accessible to all, regardless of
              financial means.
            </span>
          </p>
        </div>

        <div className="right-side">
          <img src={introImg} alt="Right aid introduction picture" />
        </div>
      </div>
    </section>
  );
};

export default SectionOne;

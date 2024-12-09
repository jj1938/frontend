import doubleRight from "../../assets/double-right.svg";
import down from "../../assets/down.svg";
import logo from "../../images/logo.png";
import background1 from "../../videos/background-1.mp4";
import "./getStarted.css";

const GetStarted = () => {
  const handleScrollToCenter = () => {
    window.scrollTo({
      top: document.body.scrollHeight / 2,
      behavior: "smooth",
    });
  };
  return (
    <div className="container">
      <video autoPlay loop muted className="background-1-video">
        <source src={background1} type="video/mp4" />
      </video>
      <div className="get-started-container">
        <img src={logo} alt="" className="logo" />
        <h1>TRUMP COIN GIVEAWAY</h1>
        <p>
          Learn more about Giveaway &nbsp;
          <img src={down} alt="down" className="down-icon" />
        </p>
        <button onClick={handleScrollToCenter}>
          GET STARTED
          <img
            src={doubleRight}
            alt="double-right"
            className="double-right-icon"
          />
        </button>
      </div>
    </div>
  );
};

export default GetStarted;

import axios from "axios";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import confetty from "../../images/confetty.png";
import gift from "../../images/gift.png";
import flagBackground from "../../videos/background-2.mp4";
import coin from "../../videos/coin.mp4";
import "./form.css";

const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryData = response.data.map((country) => ({
          name: country.name.common,
          code: country.cca2.toLowerCase(),
          callingCode: country.idd?.root
            ? `${country.idd.root}${country.idd.suffixes?.[0] || ""}`
            : "",
        }));
        setCountries(countryData);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountries();
  }, []);

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(regex.test(value));
  };

  const validatePhone = (value) => {
    const regex = /^[0-9]{6,15}$/; // Modify as needed for validation rules
    setIsPhoneValid(regex.test(value.replace(/\D/g, ""))); // Remove non-digits for validation
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000", {
        firstName,
        lastName,
        email,
        phone,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Register failed!");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");

    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleClick = () => {
    window.open("https://t.me/+PfPvMUdVTlo4ZGU5", "_blank");
  };

  return (
    <div className="details">
      <video autoPlay loop muted className="background-flag-video">
        <source src={flagBackground} type="video/mp4" />
      </video>
      <div className="form-container">
        <h1>Enter the Trump Coin Giveaway</h1>
        <p>Exclusive only for true Patriots!</p>
        <video autoPlay loop muted className="coin">
          <source src={coin} type="video/mp4" />
        </video>
        <h4>
          To enter the Coin Giveaway, you must complete the following form
        </h4>

        <form onSubmit={handleSubmit}>
          <label>
            First Name:<span style={{ color: "red" }}> *</span>
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            required
          />
          <br />

          <label htmlFor="lastName">
            Last Name:<span style={{ color: "red" }}> *</span>
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
            required
          />
          <br />

          <label htmlFor="email">
            Email:<span style={{ color: "red" }}> *</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            placeholder="Enter your email"
            required
          />
          {!isEmailValid && (
            <p style={{ color: "red", fontSize: "12px" }}>
              Invalid email format. Please check again.
            </p>
          )}
          <br />

          <label>
            Phone Number:<span style={{ color: "red" }}> *</span>
          </label>
          <PhoneInput
            country={"us"}
            value={phone}
            onChange={(value) => {
              setPhone(value);
              validatePhone(value);
            }}
            placeholder="Enter phone number"
            enableSearch
            required
            inputStyle={{
              width: "257px",
              height: "30px",
              border: "1px solid grey",
              borderRadius: "0px",
              paddingLeft: "50px",
            }}
            buttonStyle={{
              border: "1px solid grey",
              borderRadius: "0",
            }}
            containerStyle={{
              margin: "5px 70px",
              marginTop: "5px",
            }}
            dropdownStyle={{
              width: "300px",
            }}
            searchStyle={{
              width: "170px",
              height: "20px",
            }}
          />
          {!isPhoneValid && (
            <p
              style={{
                color: "red",
                fontSize: "16px",
                fontStyle: "normal",
                textAlign: "center",
              }}
            >
              Invalid phone number. Please check again!
            </p>
          )}

          <br />

          <button
            type="submit"
            className="submit-button"
            disabled={!isPhoneValid || !isEmailValid || !firstName || !lastName}
          >
            Enter The Giveaway
          </button>

          <p
            style={{
              color: "red",
              fontSize: "16px",
              fontStyle: "normal",
              textAlign: "center",
            }}
          >
            {message}
          </p>
        </form>

        {showAlert && (
          <div style={styles.alertBox} className="alert">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={styles.alertTitle}>
                Success!
                <img
                  src={confetty}
                  style={{
                    width: "40px",
                    display: "inline",
                    verticalAlign: "middle",
                  }}
                />
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p style={styles.alertTitle}>
                You're officially entered into the Giveaway!
                <img
                  src={gift}
                  style={{
                    padding: "5px",
                    width: "40px",
                    display: "inline",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </p>
            </div>

            <button
              style={styles.closeButton}
              onClick={() => setShowAlert(false)}
            >
              Close
            </button>
          </div>
        )}
      </div>
      <div className="link-button-container">
        <button type="submit" onClick={handleClick} className="link-button">
          Enter The Giveaway
        </button>
      </div>
    </div>
  );
};

const styles = {
  submitButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  alertBox: {
    position: "absolute",
    top: "400px",
    left: "540px",
    backgroundColor: "#faedc3",

    color: "red",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    height: "200px",
    margin: "20px auto",
    textAlign: "center",
    border: "1px solid red",
  },
  alertTitle: {
    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    justifyContent: "center",
    margin: "5px 5px",
    fontSize: "23px",
    padding: "5px",
  },
  alertMessage: {
    marginBottom: "20px",
    fontSize: "16px",
  },
  closeButton: {
    backgroundColor: "red",
    position: "absolute",
    top: "190px",
    right: "15px",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "14px",
    borderRadius: "3px",
  },
};

export default Form;

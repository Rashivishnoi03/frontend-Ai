import { useState } from "react";
import "../Components/banner.css"; 
import bg  from "../../src/images/background.jpg";

export default function Example(props) {
  const [searchKey, setSearchKey] = useState("");

  const postData = async () => {
    const url = `${process.env.REACT_APP_URI}/api/v1/history/create`; // Replace with your API endpoint
    console.log(url);
    console.log(searchKey);
    const data = {
      query: searchKey,
    }; // Replace with the data you want to send

    try {
      const response = await fetch(url, {
        method: "POST", // Use POST method
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json", // Set the content type to JSON
          authToken: localStorage.getItem("token"),
        },
        credentials: "include",
        body: JSON.stringify(data), // Convert the data to JSON string
      });
      const result = await response.json();
      console.log(result);
    } catch (err) {
      // Set the error state
      console.log(err.message);
    }
  };

  const submitHandler = () => {
    postData();
    console.log("submitted");
    props.onSubmitting(searchKey);
    setSearchKey("");
    document.querySelector("#email-address").value = "";
    window.scrollBy({
      top: window.outerHeight * 0.7,
      left: 0,
      behavior: "smooth",
    });
  };

  const inputHandler = (e) => {
    setSearchKey(e.target.value);
    console.log(searchKey);
  };

  return (
    <div className="login-page"  style={{ backgroundImage: `url(${bg})` }}  >
      <div className="login-container" style={{ backgroundImage: `url(${bg})` }}>
        <h2 className="heading" >
          Generate Your Image here
        </h2>
        <p className="description">
        Create stunning visuals effortlessly with our advanced AI technology. Generate unique images in seconds!
        </p>
        <div className="input-fields">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            onChange={inputHandler}
            className="input"
            placeholder="Enter Input to Generate Image"
          />
          <button
            type="submit"
            onClick={submitHandler}
            className="btn"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}

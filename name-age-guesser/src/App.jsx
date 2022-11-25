import { useState, useEffect } from "react";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import style from "./styles/main.module.scss";
import API_URL from "./constants/api";
import regEx from "./constants/regEx";

function App() {
  //* STATE
  const [data, setData] = useState({
    value: "",
    guesses: 0,
    results: [],
  });

  //* HANDLING CONTROLLED INPUT, CHECKING FOR NUMBERS & SPECIAL CHARACTERS IN INPUT

  const inputHandler = (e) => {
    if (!regEx.test(e.target.value)) {
      alert("Enter a letters only please");
    } else {
      setData((prevState) => {
        return {
          ...prevState,
          value: e.target.value,
        };
      });
    }
  };

  //* HANDLING GUESSES COUNT
  useEffect(() => {
    const g = () => {
      setData((prevState) => {
        return {
          ...prevState,
          guesses: prevState.guesses,
        };
      });
    };

    return () => {
      g();
    };
  }, [data.guesses, data.results]);
  const guessHandler = () => {
    setData((prevState) => {
      return {
        ...prevState,
        guesses: prevState.guesses + 1,
      };
    });
  };

  //* HANDLING RESULTS
  const resultsHandler = (data) => {
    setData((prevState) => {
      return {
        ...prevState,
        results: [...prevState.results, data],
      };
    });
  };

  //* HANDLING FETCHED DATA WITH SOME VALIDATION
  const name = `${API_URL}${data.value}`;
  const fetchHandler = async () => {
    if (data.value.length <= 1) {
      alert("Name should contain at least 2 charaters or more");
    } else if (data.results.map((item) => item.name).includes(data.value)) {
      alert("Enter another name, don't be greedy...");
    } else {
      try {
        const response = await fetch(name);
        const data = await response.json();
        resultsHandler(data);
      } catch (error) {
        alert("ERROR FETCHING DATA!!!");
      }
    }
  };

  const submitHandler = () => {
    fetchHandler();
    guessHandler();
    //reset input value
    setData((prevData) => {
      return {
        ...prevData,
        value: "",
      };
    });
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Name Age Guesser</h1>
      <span className={style.subtitle}>Total guesses: {data.guesses}</span>
      {data.guesses % 2 !== 0 && (
        <span className={style.message}>What an odd number of guesses!</span>
      )}
      <div className={style.wrapper}>
        <Input value={data.value} onChange={inputHandler} />
        <Button onClick={submitHandler} />
      </div>
      <div className={style.results}>
        <p>All guesses:</p>
        <ul>
          {data.results.map((item) => (
            <li key={item.name}>
              {item.name} -{" "}
              <span style={{ backgroundColor: "aquamarine" }}>{item.age}</span>{" "}
              years
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

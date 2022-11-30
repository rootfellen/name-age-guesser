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
    api: "",
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

  //* HANDLING AGE FETCHED DATA WITH SOME VALIDATION
  const name = `${API_URL.name}${data.value}`;
  const fetchAgeHandler = async () => {
    if (data.value.length <= 1) {
      alert("Name should contain at least 2 charaters or more");
      return;
    } else if (data.results.map((item) => item.name).includes(data.value)) {
      alert("Enter another name, don't be greedy...");
      return;
    } else {
      try {
        const response = await fetch(name);
        const data = await response.json();
        resultsHandler(data);
        guessHandler();
      } catch (error) {
        alert("ERROR FETCHING DATA!!!");
      }
    }
  };

  //*   //* HANDLING FETCHED COCKTAIL DATA WITH SOME VALIDATION
  const ingridient = `${API_URL.cocktail}${data.value}`;
  const fetchCocktailHandler = async () => {
    try {
      const response = await fetch(ingridient);
      const data = await response.json();
      resultsHandler(data.drinks);
      guessHandler();
    } catch (error) {
      console.log(error);
    }
  };
  const submitHandler = (api) => {
    api === "cocktail" ? fetchCocktailHandler() : fetchAgeHandler();
    //reset input value
    setData((prevData) => {
      return {
        ...prevData,
        value: "",
      };
    });
  };

  console.log(data);
  return (
    <div className={style.container}>
      <h1 className={style.title}>Name Age Guesser</h1>
      <span className={style.subtitle}>Total guesses: {data.guesses}</span>
      {data.guesses % 2 !== 0 && (
        <span className={style.message}>What an odd number of guesses!</span>
      )}
      <div className={style.wrapper}>
        <div style={{ marginBottom: "1rem" }}>
          <Button
            onClick={() => {
              setData((prev) => {
                return { ...prev, api: "age" };
              });
            }}
            text="Name Age Guesser API"
          >
            Name Age Guesser API
          </Button>
          <Button
            onClick={() => {
              setData((prev) => {
                return { ...prev, api: "cocktail" };
              });
            }}
            text="Cocktail API"
          >
            Cocktail API
          </Button>
        </div>

        <Input value={data.value} onChange={inputHandler} />
        <Button text="Submit" onClick={() => submitHandler(data.api)} />
      </div>
      <div className={style.results}>
        <p>All guesses:</p>
        <ul>
          {data && data.api === "age"
            ? data.results.map((item) => (
                <li key={item.name}>
                  {item.name} -{" "}
                  <span style={{ backgroundColor: "aquamarine" }}>
                    {item.age}
                  </span>{" "}
                  years
                </li>
              ))
            : data.results.map((item) => (
                <li key={item[0].idDrink}>
                  {item[0].strIngredient1} -{" "}
                  <span style={{ backgroundColor: "aquamarine" }}>
                    {item[0].strDrink}
                  </span>{" "}
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

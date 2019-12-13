import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import "./App.css";

/* API */
// https://swapi.co/api/people

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

  // Fetch characters from the star wars api in an effect hook. Remember, anytime you have a
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.

  /* init state */
  const [stateObject, setStateObject] = useState({
    loading: true,
    search: [],
    filter: ""
  });

  /* function for axios get request */
  async function getAxios(url) {
    let response = await axios.get(url);
    let data = response.data;
    console.log(data);
    setStateObject({
      ...stateObject,
      search: data.results,
      loading: false,
      ...data
    });
  }

  /* function for getting info from next page */
  function loadNext(data) {
    if (data.next) {
      getAxios(data.next);
    } else {
      console.log(stateObject);
      setStateObject({
        ...stateObject,
        loading: false
      });
    }
  }

  /* function for getting info from previous page */
  function loadPrev(data) {
    if (data.previous) {
      getAxios(data.previous);
    } else {
      console.log(stateObject);
      setStateObject({
        ...stateObject,
        loading: false
      });
    }
  }

  /*  */
  function handleChange(event) {
    setStateObject({ ...stateObject, filter: event.target.value });
  }

  /* Search Handler */
  function handleSearch(event) {
    event.preventDefault();
    let newSearch = stateObject.search.filter(pokemon => {
      console.log(pokemon.name.includes(event.target.value));
      return pokemon.name.includes(stateObject.filter);
    });
  }

  /* initial get request on page load */
  useEffect(() => {
    getAxios("https://pokeapi.co/api/v2/pokemon");
  }, []);

  /* styled-components */
  const CardWrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
  `;

  const CharCard = styled.div`
    padding: 5px 30px;
    background-color: #fff;
    border-radius: 5px;
    margin: 0 5px 10px;
  `;

  const Button = styled.button`
    padding: 5px 30px;
    background-color: orangered;
    color: #fff;
    border-radius: 5px;
    margin: 10px 5px 10px;
  `;

  return (
    <div className="App">
      <CardWrapper>
        <h1>Pokemon Charecters</h1>
        {/* <form onSubmit={handleSearch}>
          <input
            type="text"
            value={stateObject.filter}
            onChange={handleChange}
          ></input>
          <button type="submit">click</button>
        </form> */}
      </CardWrapper>
      {!stateObject.loading && (
        <CardWrapper>
          {stateObject.search.map(person => {
            return (
              <CharCard key={person.url}>
                <h2>{person.name}</h2>
              </CharCard>
            );
          })}
        </CardWrapper>
      )}
      <CardWrapper>
        <Button
          onClick={() => {
            loadPrev(stateObject);
          }}
        >
          <h2>Previous 20</h2>
        </Button>
        <Button
          onClick={() => {
            loadNext(stateObject);
          }}
        >
          <h2>Next 20</h2>
        </Button>
      </CardWrapper>
    </div>
  );
};

export default App;

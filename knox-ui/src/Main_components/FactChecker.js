import React from "react";
import "../Css/FactChecker.css";
import { useState, useMemo } from "react";
import "../Css/SearchResult.css";
import SearchBar from "../Shared_components/SearchBar";

const FactChecker = (props) => {
  const [triples, setTriples] = useState([]);
  const [showingTriples, setShowingTriples] = useState([]);

  useMemo(() => {
    fetch("http://localhost:8000/gettriples")
      .then((response) => response.json())
      .then((json) => {
        setTriples(json);
        setShowingTriples(json);
      })
      .catch((e) => console.log(e))
      .finally(() => {});
  }, []);

  const search = (terms) => {
    terms = terms.toLowerCase().split(" ");
    let result = [];
    triples.forEach((triple) => {
      terms.forEach((term) => {
        if (
          triple.s.toLowerCase().includes(term) ||
          triple.r.toLowerCase().includes(term) ||
          triple.t.toLowerCase().includes(term)
        ) {
          if (!result.includes(triple)) result.push(triple);
        }
      });
    });
    setShowingTriples(result);
  };

  const onClick = async (triple) => {
    let newArr = [...triples];
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(triple),
    };

    await fetch("http://localhost:8000/getpassage", requestOptions)
      .then((response) => response.json())
      .then((json) => (newArr[newArr.indexOf(triple)].passage = json.passage))
      .catch((e) => console.log(e))
      .finally(() => {});

    setTriples(newArr);
  };

  return (
    <div className="ContentOfPage">
      <div className="SearchBarPlacement">
        <div className="HeaderDiv">
          <h1>Fact Checker</h1>
          <h2>Click on a triple to factcheck it!</h2>
          {showingTriples && (
            <h3>
              A total of {triples.length} triples was found from 60 entities and
              15 Wikipedia articles.
            </h3>
          )}
          <SearchBar
            searchText="Enter your search"
            onClick={search}
            loadingState={false}
          />
        </div>
        {showingTriples &&
          showingTriples.map((triple) => (
            <div
              className="searchResultFactCheckerDiv"
              onClick={() => onClick(triple)}
            >
              <h2>
                {"<" + triple.s + "> <" + triple.r + "> <" + triple.t + ">"}
                {triple.passage != null &&
                  triple.passage.map((passage) => (
                    <>
                      <h3>{passage.passage}</h3>
                      <h4>Score: {passage.score}</h4>
                      <h4>Link: {passage.link} </h4>
                      <br />
                    </>
                  ))}
              </h2>
            </div>
          ))}
      </div>
    </div>
  );
};
FactChecker.propTypes = {};

export default FactChecker;

import React from "react";
import "../Css/FactChecker.css";
import { useState, useMemo, useEffect } from "react";
import "../Css/SearchResult.css";

const FactChecker = (props) => {
  const [triples, setTriples] = useState([]);

  const firstRender = useMemo(() => {
    fetch("http://localhost:8000/gettriples")
      .then((response) => response.json())
      .then((json) => setTriples(json))
      .catch((e) => console.log(e))
      .finally(() => {
        console.log(triples);
      });
  }, []);

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
          {triples && (
            <h3>
              A total of {triples.length} triples was found from 60 entities and
              15 Wikipedia articles.
            </h3>
          )}
        </div>
        {triples &&
          triples.map((triple) => (
            <div
              className="searchResultFactCheckerDiv"
              onClick={() => onClick(triple)}
            >
              <h2>
                {"<" + triple.s + "> <" + triple.r + "> <" + triple.t + ">"}
                {triple.passage != null && <h4>"{triple.passage}"</h4>}
              </h2>
            </div>
          ))}
      </div>
    </div>
  );
};
FactChecker.propTypes = {};

export default FactChecker;

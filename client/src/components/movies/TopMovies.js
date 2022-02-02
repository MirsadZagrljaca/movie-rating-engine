import axios from "axios";
import React, { useState, useEffect, useLayoutEffect } from "react";
import defaultUser from "../../property";
import base from "../../services/config";

export default function TopMovies() {
  const [data, setData] = useState([]);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(async () => {
    axios.post(`${base}/login`, defaultUser).then(async (res) => {
      if (res.data.error) {
        console.log("Unauthorised Access!");
      } else {
        let config = {
          headers: {
            Authorization: `Bearer ${res.data.token}`,
          },
        };
        let response = await axios.get(`${base}/movie`, config);

        if (response.data.error) {
          console.log(response.data.error);
        } else {
          let tempData = response.data;

          let temp = tempData.sort((a, b) =>
            b.averageRating > a.averageRating
              ? 1
              : a.averageRating > b.averageRating
              ? -1
              : 0
          );

          setData(temp);
        }
      }
    });
  }, []);

  const initialData = () => {
    let newData = [];

    for (let i = 0; i < 10; i++) {
      newData.push(data[i]);
    }

    setMovies(newData);
  };

  useEffect(() => {
    if (data.length === 0) return;

    initialData();
  }, [data]);

  const searchByStars = () => {
    if (query.includes("at least ")) {
      if (query.includes("at least ")) {
        let split = query.split("at least ");
        if (split[1] !== "") {
          let number = parseInt(split[1]);
          let newResuluts = [];
          data.map((v, i) => {
            if (v.averageRating >= number) {
              newResuluts.push(v);
            }
          });
          setMovies(newResuluts);
        }
      }
    } else if (query.includes("star")) {
      let split = query.split("star");
      let number = parseInt(split[0]);
      let newResuluts = [];
      data.map((v, i) => {
        if (v.averageRating === number) {
          newResuluts.push(v);
        }
      });
      setMovies(newResuluts);
    }
  };

  const searchByYear = () => {
    if (query.includes("before")) {
      let split = query.split("before");
      if (split[1].length < 4) return;

      let number = parseInt(split[1]);
      let temp = [];

      data.map((v, i) => {
        if (v.year < number) {
          temp.push(v);
        }
      });
      setMovies(temp);
    } else if (query.includes("after")) {
      let split = query.split("after");
      if (split[1].length < 4) return;

      let number = parseInt(split[1]);
      let temp = [];

      data.map((v, i) => {
        if (v.year > number) {
          temp.push(v);
        }
      });
      setMovies(temp);
    } else if (query.includes("older than ")) {
      let split = query.split("older than ");
      if (split[1] !== "") {
        let number = parseInt(split[1]);
        let date = new Date();
        let currentYear = date.getFullYear();
        let temp = [];

        data.map((v, i) => {
          let check = currentYear - v.year;
          if (check > number) {
            temp.push(v);
          }
        });
        setMovies(temp);
      }
    }
  };

  const searchByMovieInfo = () => {
    let temp = [];

    data.map((v, i) => {
      if (
        v.title.toLowerCase().includes(query.toLowerCase()) ||
        v.description.toLowerCase().includes(query.toLowerCase())
      ) {
        temp.push(v);
      }
    });

    setMovies(temp);
  };

  useEffect(() => {
    if (query.length < 2) return;

    searchByMovieInfo();
    searchByStars();
    searchByYear();
  }, [query]);

  const changeHandler = (e) => {
    if (e.target.value === "") {
      initialData();
    }

    setQuery(e.target.value);
  };

  const loadMore = () => {
    if (query === "") {
      let diff = data.length - movies.length;

      if (diff > 10) {
        let newMovies = [];
        for (let i = movies.length; i < movies.length + 10; i++) {
          newMovies.push(data[i]);
        }
        let newData = [];
        for (let i = 0; i < movies.length; i++) {
          newData.push(movies[i]);
        }
        for (let i = 0; i < newMovies.length; i++) {
          newData.push(newMovies[i]);
        }
        setMovies(newData);
      } else {
        let i = movies.length;
        let diff = data.length - movies.length;
        let newMovies = [];
        for (let i = movies.length; i < movies.length + diff; i++) {
          newMovies.push(data[i]);
        }
        let newData = [];
        for (let i = 0; i < movies.length; i++) {
          newData.push(movies[i]);
        }
        for (let i = 0; i < newMovies.length; i++) {
          newData.push(newMovies[i]);
        }
        setMovies(newData);
      }
    }
  };

  return (
    <div className="top">
      <div className="top-title">
        <h2>Top Movies</h2>

        <div className="top-search">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="search..."
              onChange={changeHandler}
            />
          </div>
        </div>
      </div>

      <div className="top-main">
        {movies &&
          movies.map((v, i) => {
            return (
              <div className="top-single" key={i}>
                <img src={v.cover} alt="top-cover" />
                <p>{v.title}</p>
                <p>{v.description}</p>
                <p>{v.averageRating} / 5</p>
              </div>
            );
          })}
      </div>

      {query === "" && (
        <div>
          {data.length > movies.length && (
            <div className="top-button">
              <button
                type="button"
                className="btn btn-outline-primary btn-lg btn-block"
                onClick={loadMore}
              >
                View More Results
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

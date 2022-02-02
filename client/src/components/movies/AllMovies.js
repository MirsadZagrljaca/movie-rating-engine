import axios from "axios";
import React, { useState, useEffect } from "react";
import { Alert, Button, Modal, ModalBody, ModalTitle } from "react-bootstrap";
import base from "../../services/config";
import { Rating } from "react-simple-star-rating";
import defaultUser from "../../property";

export default function AllMovies() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});
  const [modal, setModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

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

  const handleRating = (rate) => {
    setRating(rate / 20);
  };

  const rate = async () => {
    if (rating === 0) {
      return setError("Please Select Rating for this Movie!");
    }

    setError("");

    axios.post(`${base}/login`, defaultUser).then(async (res) => {
      if (res.data.error) {
        console.log("Unathorised Access");
      } else {
        let config = {
          headers: {
            Authorization: `Bearer ${res.data.token}`,
          },
        };

        let body = {
          rating: rating,
        };

        let response = await axios.put(
          `${base}/movie/rate/${selected._id}`,
          body,
          config
        );

        if (response.data.error) {
          console.log(response.data.error);
        } else {
          let newData = data;

          for (let i = 0; i < newData.length; i++) {
            if (newData[i]._id === response.data._id) {
              newData[i] = response.data;
            }
          }

          setData(newData);
          setModal(false);
        }
      }
    });
  };

  return (
    <div className="all-movies">
      <div>
        <h2>All Movies</h2>
      </div>

      <div className="all-mapping">
        {data &&
          data.map((v, i) => {
            return (
              <div className="all-single" key={i}>
                <img src={v.cover} alt="movie-cover" />
                <p>{v.title}</p>
                <p>{v.description}</p>
                <p>{v.averageRating} / 5</p>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    setSelected(v);
                    setModal(true);
                  }}
                >
                  Rate this movie
                </Button>
              </div>
            );
          })}
      </div>

      <Modal show={modal}>
        <ModalTitle>
          <div className="rate-title">
            <h2>Rate {selected.title}</h2>
          </div>
        </ModalTitle>

        <ModalBody>
          <div className="rate-body">
            <div className="rating">
              <Rating onClick={handleRating} ratingValue={rating} />
              <p>{rating} / 5</p>
            </div>

            <div className="rate-buttons">
              {error && <Alert variant="danger">{error}</Alert>}

              <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={rate}
              >
                Rate this movie
              </button>

              <button
                type="button"
                className="btn btn-danger btn-lg btn-block"
                onClick={() => setModal(false)}
              >
                Back
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

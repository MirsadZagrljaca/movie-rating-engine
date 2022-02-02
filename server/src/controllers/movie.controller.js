import _, { join } from "lodash";
import dbErrorHandler from "../helpers/dbErrorHandler";
import movieModel from "../models/movie.model";

const movieById = (req, res, next, id) => {
  movieModel.findById(id).exec((err, movie) => {
    if (err || !movie) {
      return res.json({ error: "Movie not found" });
    }

    req.profile = movie;
    next();
  });
};

const create = (req, res) => {
  const movie = new movieModel(req.body);

  movie.save((err, result) => {
    if (err) {
      return res.json({ error: dbErrorHandler.getErrorMessage(err) });
    }
    res.status(200).json({ message: "Successfully added movie!" });
  });
};

const list = (req, res) => {
  movieModel.find((err, movies) => {
    if (err) {
      return res.json({
        error: dbErrorHandler.getErrorMessage(err),
      });
    }
    res.json(movies);
  });
};

const read = (req, res) => {
  res.status(200).json(req.profile);
};

const rate = (req, res) => {
  let movie = req.profile;
  let data = req.body.rating;

  movie.timesRated.push(data);

  let newAverage = 0;

  for (let i = 0; i < movie.timesRated.length; i++) {
    newAverage += movie.timesRated[i];
  }

  newAverage /= movie.timesRated.length;

  movie.averageRating = parseFloat(newAverage).toFixed(2);

  movie.save((err) => {
    if (err) {
      return res.json({ error: dbErrorHandler.getErrorMessage(err) });
    }

    res.status(200).json(movie);
  });
};

export default { movieById, create, list, read, rate };

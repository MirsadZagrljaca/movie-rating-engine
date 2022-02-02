import express from "express";
import authController from "../controllers/auth.controller";
import movieController from "../controllers/movie.controller";

const movieRouter = express.Router();

movieRouter
  .route("/movie")
  .get(
    authController.requireSignin,
    movieController.list
  );
movieRouter
  .route("/movie/create")
  .post(
    authController.requireSignin,
    movieController.create
  );

movieRouter.param("movieId", movieController.movieById);
movieRouter
  .route("/movie/rate/:movieId")
  .put(
    authController.requireSignin,
    movieController.rate
  );
movieRouter
  .route("/movie/view/:movieId")
  .get(
    authController.requireSignin,
    movieController.read
  );

export default movieRouter;

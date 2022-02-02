import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  cover: {
    type: String,
    trim: true,
    required: "Movie Cover is Required!",
  },
  title: {
    type: String,
    trim: true,
    required: "Movie Title is Required!",
  },
  description: {
    type: String,
    trim: true,
    required: "Movie Description is Required!",
  },
  year: {
    type: Number,
    required: "Movie Year of Release is Required!",
  },
  releaseDate: {
    type: String,
    required: "Movie Release Date is Required!",
  },
  cast: {
    type: Array,
    required: "Movie Cast is Required!",
    minItems: 2,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  timesRated: {
    type: Array,
  },
});

export default mongoose.model("Movie", MovieSchema);

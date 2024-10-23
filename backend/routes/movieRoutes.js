const express = require("express");
const movieController = require("../controllers/moviesController")

const router = express.Router();  //way to manage different routes in the application.

router.get("/movies",movieController.getAllMovies);

router.post("/movies",movieController.createMovie);

router.get("/movies/search",movieController.searchMovies);

router.put("/movies/:id",movieController.updateMovie);

router.delete("/movies/:id",movieController.getAllMovies);

module.exports = router;









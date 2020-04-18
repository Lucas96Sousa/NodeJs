const { Router } = require("express");
const { uuid } = require("uuidv4");
const routes = Router();

const repositories = [];

routes.get("/repositories", (req, res) => {
  return res.json(repositories);
});

routes.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return res.json(repository);
});

routes.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex === -1) {
    return res.status(400).json({ error: "Repository not found" });
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes,
  };

  repositories[repositoryIndex] = repository;

  return res.json(repository);
});

routes.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex >= 0) {
    repositories.splice(repositoryIndex, 1);
  } else {
    return res.status(400).json({ error: "Repository does not exist" });
  }

  return res.status(204).send();
});

routes.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex === -1) {
    return res.status(400).json({ error: "Repository not found" });
  }

  repositories[repositoryIndex].likes++;

  return res.json(repositories[repositoryIndex]);
});

module.exports = routes;

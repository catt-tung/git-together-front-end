import { Octokit } from "@octokit/core"

const octokit = new Octokit()

const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/projects`

async function getRepos() {
  
  const response = await octokit.request('GET /users/{username}/repos', {
    username: "cmilesh"
  })

  const repoData = []

  response.data.forEach(repo => {
    repoData.push(repo.name)
  })

  return repoData
}

function create(goal) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(goal)
  })
  .then(res => res.json())
}

export {
  getRepos,
  create,
}
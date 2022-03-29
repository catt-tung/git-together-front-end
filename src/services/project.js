import { Octokit } from "@octokit/core"

const octokit = new Octokit()

export async function getRepos() {
  
  const response = await octokit.request('GET /users/{username}/repos', {
    username: "cmilesh"
  })

  const repoData = []

  response.data.forEach(repo => {
    repoData.push(repo.name)
  })

  return repoData

}


import { Octokit } from "@octokit/core"
import AddProject from "../pages/AddProject/AddProject"
import * as tokenService from './tokenService'

const octokit = new Octokit()

const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/projects`

async function getRepos(gitUser) {
  
  const response = await octokit.request('GET /users/{username}/repos', {
    username: gitUser
  })

  const repoData = []

  response.data.forEach(repo => {
    repoData.push(repo.name)
  })

  return repoData
}

async function getAvatar(gitUser) {
  
  const response = await octokit.request('GET /users/{username}', {
    username: gitUser
  })

  const avatar = response.data.avatar_url

  return avatar
}

function create(goal, projectid) {
  return fetch(`${BASE_URL}/${projectid}/goals`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(goal)
  })
  .then(res => res.json())
}

function getGoals() {
  return fetch(BASE_URL, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    }
  })
  .then(res => res.json())
}

function createProject(project) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(project)
  })
	.then(res => res.json())
}

function update(project) {
  return fetch(`${BASE_URL}/${project._id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(project)
  })
  .then(res => res.json())
}

function getProjectDetails(id) {
  return fetch(`${BASE_URL}/${id}`)
  .then(res => res.json())
}

function deleteGoal(project, goal){
  return fetch (`${BASE_URL}/${project}/goals/${goal}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    }
  })
  .then(res => res.json())
}

export {
  getRepos,
  create,
  getGoals,
  createProject,
  update,
  getAvatar,
  getProjectDetails,
  deleteGoal,
}
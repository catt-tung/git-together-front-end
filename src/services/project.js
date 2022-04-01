import { Octokit } from "@octokit/core"
import AddProject from "../pages/AddProject/AddProject"
import * as tokenService from './tokenService'

const octokit = new Octokit()

const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/projects`

function getProjects() {
  return fetch(`${BASE_URL}`)
  .then(res => res.json())
}

async function getRepos(gitUser) {
  
  const response = await octokit.request('GET /users/{username}/repos', {
    username: gitUser,
    headers: {
      'Authorization' : "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"
  }
  })

  const repoData = []

  response.data.forEach(repo => {
    repoData.push(repo.name)
  })

  return repoData
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

function updateGoal(goal, project) {
  return fetch(`${BASE_URL}/${project}/goals/${goal}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
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

function deleteOne(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    }
  })
  .then(res => res.json())
}

function calcProgress(goals) {
  const total = goals.length
  const complete = goals.filter(goal =>
    goal.complete === true )

  return complete.length / total * 100
}

export {
  getRepos,
  create,
  getGoals,
  createProject,
  update,
  getProjectDetails,
  deleteGoal,
  getProjects,
  deleteOne,
  updateGoal,
  calcProgress
}
import * as tokenService from '../services/tokenService'

const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/profiles`

async function getAllProfiles() {
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

export function getDetails(id) {
  return fetch(`${BASE_URL}/${id}`)
  .then(res => res.json())
}

export { 
  getAllProfiles}

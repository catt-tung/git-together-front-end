const baseUrl = 'http://localhost:3001/'

function getPosts() {
  return fetch (`${baseUrl}socialFeed`)
  .then(res => res.json())
}

function create(post) {
  return fetch(`${baseUrl}socialFeed`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(post)
  })
  .then(res => res.json())
}

export {
  getPosts,
  create
}
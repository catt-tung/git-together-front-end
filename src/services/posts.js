const baseUrl = 'http://localhost:3001/'

function getPosts() {
  return fetch (`${baseUrl}socialFeed`)
  .then(res => res.json())
}

export {
  getPosts
}
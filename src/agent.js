import _superagent from 'superagent'
import superagentPromise from 'superagent-promise'

const superagent = superagentPromise(_superagent, global.Promise)

const API_ROOT = 'http://localhost:8000/api'

const responseBody = res => res.body

let token
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`)
  }
}

const requests = {
  del: url => superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url => superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) => superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  put: (url, body) => superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
}

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`
const encode = encodeURIComponent
const Articles = {
  all: page => 
    requests.get(`/articles?${limit(10, page)}`),
  byAuthor: (author, page) => 
    requests.get(`/articles?author=${encode(author)}&${limit(10, page)}`),
  byFavorited: (user, page) =>
    requests.get(`/articles?favorited=${encode(user)}&${limit(10, page)}`),
  byTag: (tag, page) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(10, tag)}`),
  feed: page => 
    requests.get(`/articles/feed?${limit(10, page)}`),
  get: slug =>
    requests.get(`/articles/${slug}`),
  del: slug => 
    requests.del(`/articles/${slug}`),
}

const Auth = {
  current: () => requests.get('/user'),
  login: (email, password) => requests.post('/users/login', { user: { email, password }}),
  register: (email, username, password) => requests.post('/users', { user: { email, username, password }}),
  save: user => requests.put('/user', user)
}

const Comments = {
  create: (slug, comment) => requests.post(`/articles/${slug}/comments`, { comment }),
  del: (slug, id) => requests.del(`/articles/${slug}/comments/${id}`),
  forArticle: slug => requests.get(`/articles/${slug}/comments`)
}

const Profile = {
  follow: username => requests.post(`/profiles/${username}/follow`),
  get: username => requests.get(`/profiles/${username}`),
  unfollow: username => requests.del(`/profiles/${username}/follow`)
}

const Tag = {
  getAll: tag =>
    requests.get(`/tags`)
}

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  Tag,
  setToken: _token => token = _token
}

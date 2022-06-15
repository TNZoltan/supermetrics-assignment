import axios from 'axios';

export const fetchPosts = async (token, page) => {
  return await axios(`https://api.supermetrics.com/assignment/posts?sl_token=${token}&page=${page}`).then(res => {
    const posts = res.data?.data?.posts
    const dataByAuthorIds = {}
    posts.forEach(post => {
      if (!dataByAuthorIds[post.from_id]) {
        dataByAuthorIds[post.from_id] = []
      }
      dataByAuthorIds[post.from_id].push({
        ...post,
        created_time: new Date(post.created_time)
      })
    })
    return dataByAuthorIds
  })
}
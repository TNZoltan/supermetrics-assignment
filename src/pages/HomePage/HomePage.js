import React, { useEffect, useState } from 'react';
import Post from '../../components/Post';
import { fetchPosts } from '../../services/postsService';
import { fetchUserToken } from '../../services/userService';

import './HomePage.scss';

const className = 'HomePage';

const HomePage = () => {
  const [authorsPosts, setAuthorsPosts] = useState([])
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [authorSearch, setAuthorSearch] = useState('')
  const [postSearch, setPostSearch] = useState('')
  const [dateOrderAscending, setDateOrderAscending] = useState(true)

  const getUserToken = () => {
    const { name, email } = JSON.parse(localStorage.getItem('user'))
    return fetchUserToken(name, email)
  }

  useEffect(() => {
    // Make API calls
    getUserToken().then(token => {
      fetchPosts(token, 0).then(data => {
        setAuthorsPosts(data)
      })
    })
  }, [])

  const getAuthorIds = () => {
    const getNameOfAuthor = (id) => authorsPosts[id][0].from_name
    return Object.keys(authorsPosts)
      .filter(authorId =>
        getNameOfAuthor(authorId).toLowerCase().includes(authorSearch.toLowerCase())
      )
      .sort((a, b) => getNameOfAuthor(a).localeCompare(getNameOfAuthor(b)))
  }

  const getPosts = () => {
    // Copy obj for re-render @TODO: Better solution
    const posts = [...authorsPosts[selectedAuthor]
      .filter(post =>
        post.message.toLowerCase().includes(postSearch.toLowerCase())
      )
      .sort((a, b) => a[0]?.created_time - b[0]?.created_time)
    ]
    return dateOrderAscending ? posts : posts.reverse()
  }

  return (
    <div className={`${className}`}>
      <div className={`${className}__userSelection`}>
        <input type="text" placeholder="Search" value={authorSearch} onChange={e => setAuthorSearch(e.target.value)} />

        {
          getAuthorIds().map((authorId, index) => (
            <div
              className={`${className}__authorButton ${authorId === selectedAuthor && `${className}__authorButton--selected`}`}
              key={index}
              onClick={() => setSelectedAuthor(authorId)}
            >
              <div>{authorsPosts[authorId][0].from_name}</div>
              <div>{authorsPosts[authorId].length}</div>
            </div>
          ))
        }
      </div>
      <div className={`${className}__posts`}>
        <input type="text" placeholder="Search" value={postSearch} onChange={e => setPostSearch(e.target.value)} />

        <button
          onClick={() => setDateOrderAscending(!dateOrderAscending)}
        >
          {dateOrderAscending ? 'Date ascending' : 'Date descending'}
        </button>
        {selectedAuthor ? (
          <>
            {getPosts().map((post, index) =>
              <Post key={index} content={post} />
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default HomePage;
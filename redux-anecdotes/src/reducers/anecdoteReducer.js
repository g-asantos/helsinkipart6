import anecdoteService from '../services/anecdotes'


const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'ADD_VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }

      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote).sort((a, b) => b.votes - a.votes)

    case 'INIT_ANECDOTES':
      return (action.data).sort((a, b) => b.votes - a.votes)
    default:
      return state

  }

}


const vote = (content) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.addVote(content)
    dispatch({
      type: 'ADD_VOTE',
      data:  updatedAnecdote
    })
  }
}

const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })

  }
}


const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  

  }
}

export {
  reducer,
  vote,
  createAnecdote,
  initializeAnecdotes
} 
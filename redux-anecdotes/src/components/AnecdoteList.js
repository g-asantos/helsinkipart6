import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'



const AnecdoteList = (props) => {
    
    console.log(props)
    
    return (
        <div>
            {props.anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => {
                            props.vote(anecdote)
                            props.setNotification(anecdote.content, 4000)
                        }}>vote</button>
                    </div>
                </div>
            )}
    
        </div>
    )
}

const mapStatetoProps = state => {
    if(state.filter === 'ALL'){
        return {
            anecdotes:  state.anecdotes
        } 
    } else {
        
        const filteredAnecdotes = state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
        return {
            anecdotes: filteredAnecdotes
        }
    }
}

const mapDispatchtoProps = {
    vote,
    setNotification
}

export default connect(
    mapStatetoProps,
    mapDispatchtoProps
)(AnecdoteList)
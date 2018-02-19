import React, { Component } from 'react'
import './App.css'

const list = [
  {
    title:
      'TIL that Viagra can help make flowers stand straight up for a week past their natural lifespan',
    url:
      'https://www.reddit.com/r/todayilearned/comments/7xkrkc/til_that_viagra_can_help_make_flowers_stand/',
    author: 'ProbablyMisinformed',
    votes: 2809,
    num_comments: 58,
    objectID: 0,
  },
  {
    title:
      'TIL that Norway has the won the most gold medals in winter Olympic history and is the only nation to have at least 100 medals of each gold, silver, and bronze',
    url:
      'https://www.reddit.com/r/todayilearned/comments/7xi73j/til_that_norway_has_the_won_the_most_gold_medals/',
    author: 'ohineedascreenname',
    votes: 3034,
    num_comments: 126,
    objectID: 1,
  },
]

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase())

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list,
      searchTerm: '',
    }
  }

  onSearchTextChange = e => {
    this.setState({ searchTerm: e.target.value })
  }

  onDismiss = id => {
    const { list } = this.state
    const updatedList = list.filter(item => item.objectID !== id)

    this.setState({
      list: updatedList,
    })
  }

  render() {
    const { list, searchTerm } = this.state

    return (
      <div className="App">
        <form>
          <input type="text" onChange={this.onSearchTextChange} />
        </form>
        {list.filter(isSearched(searchTerm)).map(item => (
          <div key={item.objectID}>
            <div>
              <a href={item.url} target="_blank">
                {item.title}
              </a>
            </div>
            <div>{item.author}</div>
            <div>{item.votes}</div>
            <div>{item.num_comments}</div>
            <div>
              <button
                onClick={() => this.onDismiss(item.objectID)}
                type="button"
              >
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default App

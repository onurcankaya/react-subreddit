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

// Higher Order Function
// const isSearched = searchTerm => item =>
//   item.title.toLowerCase().includes(searchTerm.toLowerCase())

const Search = ({ value, onChange, children }) => (
  <form>
    {children}
    <input type="text" value={value} onChange={onChange} />
  </form>
)

const Button = ({ onClick, children, className = '' }) => (
  <button type="button" className={className} onClick={onClick}>
    {children}
  </button>
)

const Table = ({ list, searchTerm, onDismiss }) => (
  <div>
    {list
      .filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map(item => (
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
            <Button onClick={() => onDismiss(item.objectID)}>Dismiss</Button>
          </div>
        </div>
      ))}
  </div>
)

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
        <Search value={searchTerm} onChange={this.onSearchTextChange}>
          Search
        </Search>
        <Table list={list} searchTerm={searchTerm} onDismiss={this.onDismiss} />
      </div>
    )
  }
}

export default App

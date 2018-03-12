import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import './App.css'

const PATH_BASE = 'http://www.reddit.com/r/'
const DEFAULT_SUBREDDIT = 'programming'
const PATH_FORMAT = '.json'

// Higher Order Function
// const isSearched = searchTerm => item =>
//   item.title.toLowerCase().includes(searchTerm.toLowerCase())

const Search = ({ value, onChange, children, placeholder, onSearchSubmit }) => (
  <form onClick={onSearchSubmit}>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    <button type="submit">{children}</button>
  </form>
)

const Button = ({ onClick, children, className = '' }) => (
  <button type="button" className={className} onClick={onClick}>
    {children}
  </button>
)

const Table = ({ list, onDismiss }) => (
  <div className="table">
    {list.map(item => (
      <div key={item.data.id} className="table-row">
        <div style={{ width: '70%' }}>
          <a href={item.data.url} target="_blank">
            {item.data.title}
          </a>
        </div>
        <div style={{ width: '20%' }}>{item.data.author}</div>
        <div style={{ width: '10%' }}>{item.data.subreddit}</div>
        <div style={{ width: '10%' }}>
          <Button
            onClick={() => onDismiss(item.data.id)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </div>
      </div>
    ))}
  </div>
)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      result: null,
      searchTerm: DEFAULT_SUBREDDIT,
      error: null,
    }
  }

  onSearchTextChange = e => {
    this.setState({ searchTerm: e.target.value })
  }

  onSearchSubmit = event => {
    const { searchTerm } = this.state
    this.fetchSearchSubreddits(searchTerm)
    this.setState({ error: null })
    event.preventDefault()
  }

  onDismiss = id => {
    const { result } = this.state
    const updatedList = result.filter(item => item.data.id !== id)

    this.setState({
      result: updatedList,
    })
  }

  setSearchSubreddits = result => {
    this.setState({ result: result.data.children })
    console.log(result.data.children)
  }

  fetchSearchSubreddits = searchTerm => {
    fetch(`${PATH_BASE}${searchTerm}${PATH_FORMAT}`)
      .then(response => response.json())
      .then(result => {
        return this.setSearchSubreddits(result)
      })
      .catch(e => this.setState({ error: e }))
  }

  componentDidMount() {
    const { searchTerm } = this.state
    this.fetchSearchSubreddits(searchTerm)
  }

  render() {
    const { result, searchTerm, error } = this.state

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchTextChange}
            placeholder="Search..."
            onSearchSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        {error ? (
          <div className="interactions">
            <p>Something went wrong.</p>
            <p>Try using a different search key.</p>
          </div>
        ) : (
          result && <Table list={result} onDismiss={this.onDismiss} />
        )}
      </div>
    )
  }
}

export default App

export { Button, Search, Table }

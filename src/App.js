import React, { Component } from 'react'
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
        <div style={{ width: '10%' }}>{item.path}</div>
        <div style={{ width: '10%' }}>
          <Button
            onClick={() => onDismiss(item.name)}
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
    }
  }

  onSearchTextChange = e => {
    this.setState({ searchTerm: e.target.value })
  }

  onSearchSubmit = event => {
    const { searchTerm } = this.state
    this.fetchSearchSubreddits(searchTerm)
    event.preventDefault()
  }

  onDismiss = id => {
    const { result } = this.state
    const updatedList = result.filter(item => item.id !== id)

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
        console.log(result.data.children)
        return this.setSearchSubreddits(result)
      })
      .catch(e => e)
  }

  componentDidMount() {
    const { searchTerm } = this.state
    this.fetchSearchSubreddits(searchTerm)
    console.log(searchTerm)
  }

  render() {
    const { result, searchTerm } = this.state

    if (!result) {
      return null
    }

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
        {result && <Table list={result} onDismiss={this.onDismiss} />}
      </div>
    )
  }
}

export default App

import React, { Component } from 'react'
import './App.css'

const DEFAULT_QUERY = 'programming'
const PATH_BASE = 'http://www.reddit.com/api/'
const PATH_SEARCH = 'subreddits_by_topic.json'
const PARAM_SEARCH = 'query='

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
      <div key={item.path} className="table-row">
        <div style={{ width: '70%' }}>
          <a href={item.name} target="_blank">
            {item.name}
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
      searchTerm: DEFAULT_QUERY,
    }
  }

  onSearchTextChange = e => {
    this.setState({ searchTerm: e.target.value })
  }

  onSearchSubmit = () => {
    const { searchTerm } = this.state
    this.fetchSearchSubreddits(searchTerm)
  }

  onDismiss = id => {
    const { result } = this.state
    const updatedList = result.filter(item => item.name !== id)

    this.setState({
      result: updatedList,
    })
  }

  setSearchSubreddits = result => {
    this.setState({ result })
    console.log(result)
  }

  fetchSearchSubreddits = searchTerm => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => {
        console.log(result.data)
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

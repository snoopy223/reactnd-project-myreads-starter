import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './bookShelf'

class SearchPage extends React.Component {
  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim()})
  }

  searchQuery = (bookName) => {
      BooksAPI.search(bookName, 20).then(
        books => {
          this.setState({books})
        }
      ).catch(this.setState({
        books: undefined
      }))
  }

  render () {
    const { query, books } = this.state;
    const { bookInLib } = this.props;

    if(bookInLib && books) {
      for (let book of bookInLib) {
        for (let result of books) {
          if (book.id === result.id) {
            result.shelf = book.shelf;
          }
        }
      }
    }
    // let showingBooks
    // if (this.state.query) {
    //   const match = new RegExp(escapeRegExp(this.state.query), 'i')
    //   showingBooks = this.state.books.filter((book) => match.test(book.title))
    // } else {
    //   showingBooks = this.state.books
    // }
    // const {  } = this.props;


    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event) => {
              this.searchQuery(event.target.value)
              this.updateQuery(event.target.value)
            }}
            />

          </div>
        </div>
        <div className="search-books-results">
          {books !== undefined && (
            <BookShelf
            shelf="Search Results"
            books={books}
            onChangeShelf={(book, shelf) => {
              this.props.updateShelf(book, shelf);
            }}/>
          )}
        </div>
      </div>
    )
  }
}
 export default SearchPage

import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Link,Route } from 'react-router-dom';
import SearchPage from './searchPage';
import BookShelf from './bookShelf'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
      this.setState(state => {
        book.shelf = shelf;
        return {books: state.books.filter((b) => b.id !== book.id).concat([book])
      }})
   })
  }

  render() {
    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <BookShelf books={this.state.books.filter((b) => b.shelf === "currentlyReading")} onChangeShelf={this.updateShelf}/>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                        <BookShelf books={this.state.books.filter((b) => b.shelf === "wantToRead")} onChangeShelf={this.updateShelf}/>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <BookShelf books={this.state.books.filter((b) => b.shelf === "read")} onChangeShelf={this.updateShelf}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}/>

        <Route
          path='/search' render={() => (
            <SearchPage
              bookInLib={this.state.books}
              updateShelf={this.updateShelf}
              />
          )}
        />
      </div>
    )
  }
}

export default BooksApp

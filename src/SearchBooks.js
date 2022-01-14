import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Book from './Book';
import * as BooksAPI from './BooksAPI';

import AwesomeDebouncePromise from 'awesome-debounce-promise';

class SearchBooks extends Component {
  state = {
    query: '',
    books: []
  };

  handleQueryResponse = response => {
    if (Array.isArray(response)) {
      const books = response
        .filter(item => item.imageLinks)
        .map(item => {
          const {classifiedBooks } = this.props;
          const book = classifiedBooks.find(b => b.id === item.id);
          return {
            ...item,
            shelf: book ? book.shelf : 'none'
          }
        });
      this.setState({ books });
    } else {
      this.onQueryError(response);
    }
  };

  executeQuery = AwesomeDebouncePromise(() => {
    return this.state.query ? BooksAPI.search(this.state.query) : [];
  }, 600);

  onQueryError = error => {
    this.setState({ books: [] });
    console.error('Query error', error);
  };

  updateQuery = event => {
    this.setState({ query: event.target.value });
    
    this.executeQuery()
      .then(this.handleQueryResponse)
      .catch(this.onQueryError);
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.updateQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books && this.state.books.map(book => (
              <Book
                key={book.id}
                data={book}
                shelves={this.props.shelves}
                onChangeShelf={shelf =>this.props.onChangeShelfBook(book, shelf)}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
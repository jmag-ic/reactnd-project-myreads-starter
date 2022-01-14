import React from 'react'
import './App.css'
import * as BookAPI from './BooksAPI';

import BookList from './BookList';
import SearchBooks from './SearchBooks';
import { Route, Routes } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    shelves: [
      { key: 'currentlyReading', label: 'Currently Reading' },
      { key: 'wantToRead', label: 'Want to Read' },
      { key: 'read', label: 'Read' }
    ],
    books: []
  };

  componentDidMount = () => {
    BookAPI.getAll().then(books => {
      this.setState({ books })
    });
  };

  changeShelfBook = (book, shelf) => {
    BookAPI.update(book, shelf).then(() => {
      this.setState(currState => {
        const books = currState.books.filter(b => b.id !== book.id);
        if (shelf !== 'none') {
          books.push({ ...book, shelf });
        }
        return { books };
      });
    });
  }

  render() {
    return (
      <div className="app">
        <Routes>
          <Route
            path="/search"
            element={<SearchBooks
              shelves={this.state.shelves}
              classifiedBooks={this.state.books}
              onChangeShelfBook={this.changeShelfBook}
            />}
          />
          <Route
            exact path="/"
            element={<BookList
              shelves={this.state.shelves}
              books={this.state.books}
              onChangeShelfBook={this.changeShelfBook}
            />}
          />
        </Routes>
      </div>
    )
  }
}

export default BooksApp

import React from 'react'
import { Link } from 'react-router-dom';
import './App.css'
import BookShelf from './BookShelf';

class BookList extends React.Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>{this.props.shelves.map(shelf => (
            <BookShelf
              key={shelf.key}
              shelf={shelf}
              books={this.props.books.filter(book => book.shelf === shelf.key)}
              shelves={this.props.shelves}
              onChangeShelfBook={this.props.onChangeShelfBook}
            />
          ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookList;

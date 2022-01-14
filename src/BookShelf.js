import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

function BookShelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelf.label}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map(book => (
            <Book
              key={book.id}
              data={book}
              shelves={props.shelves}
              onChangeShelf={shelf => props.onChangeShelfBook(book, shelf)}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  shelf: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  onChangeShelfBook: PropTypes.func.isRequired
};

export default BookShelf;
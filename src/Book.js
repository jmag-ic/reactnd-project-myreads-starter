import React from 'react';
import PropTypes from 'prop-types';
import ShelfChanger from './ShelfChanger';

function Book(props) {
  const { data: book, shelves, onChangeShelf } = props;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail})`
          }}></div>
          <ShelfChanger
            currentShelf={book.shelf}
            shelves={shelves}
            onChange={onChangeShelf}
          />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </li>
  );
}

Book.propTypes = {
  data: PropTypes.object.isRequired,
  shelves: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
};

export default Book;
import React from 'react';
import PropTypes from 'prop-types';

function ShelfChanger(props) {
  return (
  <div className="book-shelf-changer">
    <select
      value={props.currentShelf}
      onChange={event => props.onChange(event.target.value)}>
      <option value="move" disabled>Move to...</option>
      {props.shelves.map(shelf => (
        <option
          key={shelf.key}
          value={shelf.key}>
          {shelf.label}
        </option>
      ))}
      <option value="none">None</option>
    </select>
  </div>
  );
}

ShelfChanger.propTypes = {
  shelves: PropTypes.array.isRequired,
  currentShelf: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ShelfChanger;
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import  { ListItem } from './listItem/ListItem';
import {
  addOne,
  deleteOne,
  updateOne,
  selectIndex,
  selectList,
} from './listSlice';

import styles from './List.module.css';

export function List() {
  const list = useSelector(selectList);
  const index = useSelector(selectIndex);

  const dispatch = useDispatch();
  const [newIndex, setNewIndex] = useState(index);

  const index_to_edit = Number(newIndex) || 0;

  return (
    <div> 
      
      {list.map(metadata => (
        <ListItem metadata={metadata} key={metadata.uid} />
      ))}

      {/* <div>
        <h1>Edit:</h1>

        <label>Index to change:</label>
        <input
          className={styles.textbox}
          aria-label="Set new name"
          value={index}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label>Name:</label>
        <input
          className={styles.textbox}
          aria-label="Set new name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label>Latitude:</label>
        <input
          className={styles.textbox}
          aria-label="Set new latitude"
          value={latInput}
          onChange={(e) => setLatInput(e.target.value)}
        />

        <label>Longitude:</label>
        <input
          className={styles.textbox}
          aria-label="Set new longitude"
          value={lngInput}
          onChange={(e) => setLngInput(e.target.value)}
        />

        <label>Description:</label>
        <input
          className={styles.textbox}
          aria-label="Set new description"
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
        />

        <label>Time Range:</label>
        <input
          className={styles.textbox}
          aria-label="Set new time range"
          value={timeRangeInput}
          onChange={(e) => setTimeRangeInput(e.target.value)}
        />

        <button
          className={styles.button}
          aria-label="Confirm Data Edit"
          onClick={() => dispatch(editPlace(metadata))}
        >
          Edit
        </button>
      </div> */}

    </div>
  )
}
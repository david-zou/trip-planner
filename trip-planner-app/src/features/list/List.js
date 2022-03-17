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
  const [nameInput, setNameInput] = useState('Insert name here');
  const [latInput, setLatInput] = useState('Insert latitude here');
  const [lngInput, setLngInput] = useState('Insert longitude here');
  const [descriptionInput, setDescriptionInput] = useState('Insert description here');
  const [timeRangeInput, setTimeRangeInput] = useState('Insert time range here');

  const index_to_edit = typeof Number(newIndex) == 'number' ? Number(newIndex) : 0;

  const latLngInput = {
    lat: Number(latInput),
    lng: Number(lngInput),
  }

  const payload = {
    index: index_to_edit,
    metadata: {
      name: nameInput,
      latLng: latLngInput,
      description: descriptionInput,
      timeRange: timeRangeInput,
    }
  }

  return (
    <div> 
      <div>
        {list.map(metadata => (
          <ListItem metadata={metadata} key={metadata.uid} />
        ))}
      </div>

      <div>
        <h1>Edit:</h1>

        <label>Index to change:</label>
        <input
          className={styles.textbox}
          aria-label="Target new index"
          value={newIndex}
          onChange={(e) => setNewIndex(e.target.value)}
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
          onClick={() => dispatch(updateOne(payload))}
        >
          Edit
        </button>
      </div>

    </div>
  )
}
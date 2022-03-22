import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  addOne,
  updateOne,
} from '../list/listSlice';

import {
  selectModalIndex,
  selectModalOperation,
  hideModalView,
} from './listModalSlice'

import styles from '../list/List.module.css';

function ListModal(props) {
  const modalOperation = useSelector(selectModalOperation);
  const modalIndex = useSelector(selectModalIndex);

  const dispatch = useDispatch();

  // Create or Update based on modal operation
  const metadata = props.metadata;
  const [newIndex, setNewIndex] = useState(modalIndex);
  const [nameInput, setNameInput] = useState(modalOperation === 'add' ? 'Insert name here' : metadata.name);
  const [latInput, setLatInput] = useState(modalOperation === 'add' ? 'Insert latitude here' : metadata.latLng.lat);
  const [lngInput, setLngInput] = useState(modalOperation === 'add' ? 'Insert longitude here' : metadata.latLng.lng);
  const [descriptionInput, setDescriptionInput] = useState(modalOperation === 'add' ? 'Insert description here' : metadata.description);
  const [timeRangeInput, setTimeRangeInput] = useState(modalOperation === 'add' ? 'Insert time range here' : metadata.timeRange);

  const index_to_edit = typeof Number(newIndex) == 'number' ? Number(newIndex) : 0;

  // package the latitude and longitude for use in latLng field
  const latLngInput = {
    lat: Number(latInput),
    lng: Number(lngInput),
  }

  // data to send through the modal
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
      <h1>{ modalOperation === 'add' ? 'Add:' : 'Update:'}</h1>
      <label>Name:</label>
      <input
        className={styles.textbox}
        aria-label="Set name"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />

      <label>Latitude:</label>
      <input
        className={styles.textbox}
        aria-label="Set latitude"
        value={latInput}
        onChange={(e) => setLatInput(e.target.value)}
      />

      <label>Longitude:</label>
      <input
        className={styles.textbox}
        aria-label="Set longitude"
        value={lngInput}
        onChange={(e) => setLngInput(e.target.value)}
      />

      <label>Description:</label>
      <input
        className={styles.textbox}
        aria-label="Set description"
        value={descriptionInput}
        onChange={(e) => setDescriptionInput(e.target.value)}
      />

      <label>Time Range:</label>
      <input
        className={styles.textbox}
        aria-label="Set time range"
        value={timeRangeInput}
        onChange={(e) => setTimeRangeInput(e.target.value)}
      />
      <div>
        { modalOperation === 'add' ?
        <button
          className={styles.button}
          aria-label="Confirm Data Addition"
          onClick={() => { dispatch(addOne(payload)) && dispatch(hideModalView()) }}
        >
          Save
        </button> :
        <button
          className={styles.button}
          aria-label="Confirm Data Update"
          onClick={() => { dispatch(updateOne(payload)) && dispatch(hideModalView()) }}
        >
          Update
        </button> }
      </div>
    </div>
  )
}

export default ListModal;
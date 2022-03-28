import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  addOne,
  updateOne,
  selectOperation,
  updateOperation,
  selectSelected,
  updateSelected,
} from '../list/listSlice';

import {
  hideModalView,
} from './listModalSlice'

import styles from './ListModal.module.css';

function ListModal(props) {
  const modalOperation = useSelector(selectOperation);
  const selected = useSelector(selectSelected);
  const dispatch = useDispatch();

  // Create or Update based on modal operation
  const metadata = props.metadata;
  const [nameInput, setNameInput] = useState(modalOperation === 'add' ? 'Insert name here' : metadata.name);
  const [latInput, setLatInput] = useState(modalOperation === 'add' ? 'Insert latitude here' : metadata.latLng.lat);
  const [lngInput, setLngInput] = useState(modalOperation === 'add' ? 'Insert longitude here' : metadata.latLng.lng);
  const [descriptionInput, setDescriptionInput] = useState(modalOperation === 'add' ? 'Insert description here' : metadata.description);
  const [timeRangeInput, setTimeRangeInput] = useState(modalOperation === 'add' ? 'Insert time range here' : metadata.timeRange);

  // package the latitude and longitude for use in latLng field
  const latLngInput = {
    lat: Number(latInput),
    lng: Number(lngInput),
  }

  // data to send through the modal
  const payload = {
    index: props.id,
    metadata: {
      name: nameInput,
      latLng: latLngInput,
      description: descriptionInput,
      timeRange: timeRangeInput,
    }
  }

  return (
    <div>
      <h2>{ modalOperation === 'add' ? 'Add:' : 'Update:'}</h2>
      <div>
        <label>Name:</label>
        <input
          className={selected === props.id ? styles.textbox_selected : styles.textbox}
          aria-label="Set name"
          value={nameInput}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) =>
            setNameInput(e.target.value)
          }
        />
      </div>

      <div>
        <label>Latitude:</label>
        <input
          className={selected === props.id ? styles.textbox_selected : styles.textbox}
          aria-label="Set latitude"
          value={latInput}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) =>
            setLatInput(e.target.value)
          }
        />
      </div>

      <div>
        <label>Longitude:</label>
        <input
          className={selected === props.id ? styles.textbox_selected : styles.textbox}
          aria-label="Set longitude"
          value={lngInput}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setLngInput(e.target.value)}
        />
      </div>

      <div>
        <label>Description:</label>
        <input
          className={selected === props.id ? styles.textbox_selected : styles.textbox}
          aria-label="Set description"
          value={descriptionInput}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setDescriptionInput(e.target.value)}
        />
      </div>

      <div>
        <label>Time Range:</label>
        <input
          className={selected === props.id ? styles.textbox_selected : styles.textbox}
          aria-label="Set time range"
          value={timeRangeInput}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setTimeRangeInput(e.target.value)}
        />
      </div>
      
      <div>
        { modalOperation === 'add' ?
        <button
          className={styles.button}
          aria-label="Confirm Data Addition"
          onClick={(e) => { 
            dispatch(addOne(payload));
            dispatch(updateOperation('save'));
            dispatch(hideModalView());
            e.stopPropagation();
          }}
        >
          Save
        </button> :
        <button
          className={styles.button}
          aria-label="Confirm Data Update"
          onClick={(e) => {
            dispatch(updateOne(payload));
            dispatch(updateOperation('save'));
            dispatch(updateSelected(-1));
            dispatch(hideModalView());
            e.stopPropagation();
          }}
        >
          Save
        </button> }
      </div>
    </div>
  )
}

export default ListModal;
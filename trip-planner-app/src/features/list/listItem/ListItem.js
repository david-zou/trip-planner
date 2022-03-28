import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  showModalView,
  selectModalToggle,
} from '../../listModal/listModalSlice'
import {
  selectIndex,
  deleteOne,
  selectSelected,
  updateSelected,
  selectOperation,
  updateOperation,
} from '../listSlice'
import ListModal from '../../listModal/listModal.js'
import styles from './ListItem.module.css';
import { updateIndex } from '../listSlice';

export function ListItem(props) {
  const dispatch = useDispatch();
  const modalToggle = useSelector(selectModalToggle);
  const index = useSelector(selectIndex);
  const selected = useSelector(selectSelected);
  const updateOperationMode = useSelector(selectOperation) === 'update';
  const modalVisible = useSelector(selectModalToggle);
  const target = props.id
  const metadata = props.metadata;
  const [ clicked, setClicked ] = useState(false);

  const UpdateButton = () => {
    return (
      <button
          className={styles.button}
          aria-label="Open Update Modal"
          onClick={(e) => {
            dispatch(updateIndex(target));
            dispatch(updateOperation('update'))
            dispatch(showModalView());
            e.stopPropagation();
          }}
      >Update</button>
    )
  }

  const DeleteButton = () => {
    return (
      <button
          className={styles.button}
          aria-label="Delete Location"
          onClick={(e) => {
            dispatch(updateOperation('delete'))
            dispatch(deleteOne(target));
            e.stopPropagation();
          }}
      >X</button>
    )
  }

  const handleFlyToCoords = () => {
    dispatch(updateOperation('select'))
    dispatch(updateSelected(target));
    setClicked(true);
  }

  return (
    <div className={(clicked && props.id === selected) ? styles.item_box_selected : styles.item_box} onClick={handleFlyToCoords}>
      <ul>
        <li>Name: {metadata.name}</li>
        <li>Latitude: {metadata.latLng.lat}</li>
        <li>Longitude: {metadata.latLng.lng}</li>
        <li>Description: {metadata.description}</li>
        <li>Time Range: {metadata.timeRange}</li>
      </ul>
      {
        (modalToggle && props.id === index && updateOperationMode && modalVisible) ? < ListModal metadata={metadata} id={index} /> : <></>
      }
      {
        !(modalVisible && updateOperationMode && props.id === index) ? (
          <>
            <UpdateButton />
            <DeleteButton />
          </>
        ) : <></>
      }
      
    </div>
  )
}
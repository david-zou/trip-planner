import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  populateUpdateModal,
  showModalView,
  selectModalToggle,
  selectModalOperation,
} from '../../listModal/listModalSlice'
import {
  selectIndex,
  deleteOne,
} from '../listSlice'
import ListModal from '../../listModal/listModal.js'
import styles from './ListItem.module.css';
import { updateIndex } from '../listSlice';

export function ListItem(props) {
  const dispatch = useDispatch();
  const modalToggle = useSelector(selectModalToggle);
  const selectedIndex = useSelector(selectIndex);
  const updateOperationMode = useSelector(selectModalOperation) === 'update';
  const modalVisible = useSelector(selectModalToggle);
  const metadata = props.metadata;

  const UpdateButton = () => {
    const index = props.id
    return (
      <button
          className={styles.button}
          aria-label="Open Update Modal"
          onClick={() => {
            console.log('Update clicked for index:', index)
            dispatch(updateIndex(index));
            dispatch(populateUpdateModal(index));
            dispatch(showModalView());
          }}
      >Update</button>
    )
  }

  const DeleteButton = () => {
    const index = props.id
    return (
      <button
          className={styles.button}
          aria-label="Delete Location"
          onClick={() => {
            console.log('Delete clicked for index:', index);
            dispatch(deleteOne(index));
          }}
      >X</button>
    )
  }

  return (
    <div className={styles.item_box}>
      <ul>
        <li>Name: {metadata.name}</li>
        <li>Latitude: {metadata.latLng.lat}</li>
        <li>Longitude: {metadata.latLng.lng}</li>
        <li>Description: {metadata.description}</li>
        <li>Time Range: {metadata.timeRange}</li>
      </ul>
      {
        (modalToggle && props.id === selectedIndex && updateOperationMode && modalVisible) ? < ListModal metadata={metadata} id={selectedIndex} /> : <></>
      }
      <UpdateButton />
      <DeleteButton />
    </div>
  )
}
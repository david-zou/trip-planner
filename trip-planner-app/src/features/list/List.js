import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { latLngBounds } from 'leaflet';

import  { ListItem } from './listItem/ListItem';
import ListModal from '../listModal/listModal';

import styles from './List.module.css';

import {
  showModalView,
  selectModalToggle,
} from '../listModal/listModalSlice';

import {
  selectList,
  updateBounds,
  selectOperation,
  updateOperation,
  updateSelected,
} from './listSlice';

export function List() {
  const dispatch = useDispatch();
  const list = useSelector(selectList);
  const addOperationMode = useSelector(selectOperation) === 'add';
  const modalVisible = useSelector(selectModalToggle);

  // update bounds on list changes
  const bounds = useSelector(selectList).map((location) => {
    return [ location.latLng.lat, location.latLng.lng ];
  });
  //  useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined.
  useEffect(() => {
    dispatch(updateBounds(bounds));
  });

  const AddButton = () => {
    return (
      <button
          className={styles.button}
          aria-label="Open Addition Modal"
          onClick={(e) => {
            dispatch(updateOperation('add'))
            dispatch(showModalView());
            e.stopPropagation();
          }}
      >Add New Location</button>
    )
  }

  const ResetViewButton = () => {
    return (
      <button
          className={styles.button}
          aria-label="Reset Map Zoom"
          onClick={(e) => {
            dispatch(updateOperation('init'))
            dispatch(updateSelected(-1));
            e.stopPropagation();
          }}
      >Reset Zoom</button>
    )
  }

  return (
    <div> 
      <div>
        {list.map(function (metadata, index) {
            return (
              <ListItem metadata={metadata} key={index} id={index} />
            );
          })
        }
        
        {
          (addOperationMode && modalVisible) ? 
          <div className={styles.item_box}>
            <ListModal />
          </div> : <></>
        }
        
        <AddButton />
        <ResetViewButton />
      </div>
    </div>
  )
}
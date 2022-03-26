import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { latLngBounds } from 'leaflet';
import { useMap } from 'react-leaflet';

import  { ListItem } from './listItem/ListItem';
import ListModal from '../listModal/listModal';

import styles from './List.module.css';

import {
  populateAddModal,
  showModalView,
  selectModalOperation,
  selectModalToggle,
} from '../listModal/listModalSlice';

import {
  selectBounds,
  selectList,
  updateBounds,
} from './listSlice';

export function List() {
  const dispatch = useDispatch();
  const list = useSelector(selectList);
  const addOperationMode = useSelector(selectModalOperation) === 'add';
  const modalVisible = useSelector(selectModalToggle);

  // update bounds on list changes
  const bounds = latLngBounds(useSelector(selectList).map((location) => {
    return [ location.latLng.lat, location.latLng.lng ];
  }));
  dispatch(updateBounds(bounds));

  const AddButton = () => {
    return (
      <button
          className={styles.button}
          aria-label="Open Addition Modal"
          onClick={() => {
            dispatch(populateAddModal());
            dispatch(showModalView());
          }}
      >Add New Location</button>
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
      </div>
    </div>
  )
}
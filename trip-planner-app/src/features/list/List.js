import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import  { ListItem } from './listItem/ListItem';

import {
  populateAddModal,
  showModalView,
  selectModalOperation,
  selectModalToggle,
} from '../listModal/listModalSlice';

import {
  selectList,
} from './listSlice';

import styles from './List.module.css';
import ListModal from '../listModal/listModal';

export function List() {
  const dispatch = useDispatch();
  const list = useSelector(selectList);
  const addOperationMode = useSelector(selectModalOperation) === 'add';
  const modalVisible = useSelector(selectModalToggle);

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
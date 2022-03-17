import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  editPlace,
  selectName,
  selectLatLng,
  selectDescription,
  selectTimeRange,
} from './listItemSlice'
import styles from './ListItem.module.css';

export function ListItem(props) {
  // const name = useSelector(selectName);
  // const latLng = useSelector(selectLatLng);
  // const description = useSelector(selectDescription);
  // const timeRange = useSelector(selectTimeRange);
  // const dispatch = useDispatch();

  // const [nameInput, setNameInput] = useState(name);
  // const [latInput, setLatInput] = useState(latLng.lat());
  // const [lngInput, setLngInput] = useState(latLng.lng());
  // const [descriptionInput, setDescriptionInput] = useState(description);
  // const [timeRangeInput, setTimeRangeInput] = useState(timeRange);

  // function setCoord(coord) {
  //   return (coord) => Number(coord)
  // }

  // const latLngInput = {
  //   lat: setCoord(latInput),
  //   lng: setCoord(lngInput),
  // }

  // const metadata = {
  //   name: nameInput,
  //   latLng: latLngInput,
  //   description: descriptionInput,
  //   timeRange: timeRangeInput,
  // }

  const metadata = props.metadata;

  return (
    <div className={styles.item_box}>
      <ul>
        <li>Name: {metadata.name}</li>
        <li>Latitude: {metadata.latLng.lat}</li>
        <li>Longitude: {metadata.latLng.lng}</li>
        <li>Description: {metadata.description}</li>
        <li>Time Range: {metadata.timeRange}</li>
      </ul>
    </div>
  )
}
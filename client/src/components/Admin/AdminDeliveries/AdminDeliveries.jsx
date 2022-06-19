import React from 'react';
import '../../../scss/AdminDeliveries.scss';
import { useSelector } from 'react-redux';

const AdminDeliveries = ({ ID }) => {

    const getDeliveries = useSelector(state => state.reducer.storage);

    console.log(getDeliveries);

  return (
    <div className={ID}>

    </div>
  )
}

export default AdminDeliveries;
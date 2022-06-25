import React from 'react';
import '../../../../scss/ToTransitionDeleteItem.scss';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { pullApproveItemFromAdmin } from '../../../../controllers/Actions.js';

const ToTransitionDeleteItem = ({ ID, approveProduct }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [admin, setAdmin] = React.useState(JSON.parse(localStorage.getItem('Administrator')));
  const [text, setText] = React.useState('Approve Delivery....');

  // const _product = useSelector(state => approveProduct ? state.reducer.storage.map(val => val?.delivery?.find(data => data._id === approveProduct )) : null );

  // console.log(admin.result._id);

  React.useEffect(()=> {
    setTimeout(() => {
        setText('Done');
        setText('Redirecting...');
          setTimeout(() => {
            try {
              dispatch(pullApproveItemFromAdmin(admin.result._id,approveProduct));
              setTimeout(() => {
                history.push('/admin/deliveries');
                window.location.reload();
              }, 1000);
            } catch (error) {
              console.log(error)
            }
          }, 2000);
    }, 1000);
  },[])

  return (
    <div className={ID}>
        {text}
    </div>
  )

}

export default ToTransitionDeleteItem;
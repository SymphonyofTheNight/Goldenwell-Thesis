import React from 'react';
import '../../../../scss/ToTransitionDeleteItem.scss';
import { useHistory } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { pullApproveItemFromAdmin } from '../../../../controllers/Actions.js';

const ToTransitionDeleteItem = ({ ID, approveProduct }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [admin, setAdmin] = React.useState(JSON.parse(localStorage.getItem('Administrator')));
  const [text, setText] = React.useState('Approve Delivery....');
  const [show, setShow] = React.useState(false);
  const cover = React.useRef();

  React.useEffect(()=> {
    setTimeout(() => {
        setText('Done');
        setText('Redirecting...');
          setTimeout(() => {
            try {
              dispatch(pullApproveItemFromAdmin(admin.result._id,approveProduct));
              // cover.current.style.background = 'white';
              setText('');
              setShow(state => !state);
            } catch (error) {
              console.log(error)
            }
          }, 2000);
    }, 1000);
  },[])

  return (
    <div className={ID} ref={cover}>
        {text}
        {show && 
          <button className='SuccessBTN'
            onClick={()=> {
              cover.current.style.opacity = '0';
              setTimeout(() => {
                history.push('/admin/home');
                window.location.reload();
              }, 2000);
            }}
          >
              Success <FaCheck className='check'/>
          </button>
        }
    </div>
  )

}

export default ToTransitionDeleteItem;
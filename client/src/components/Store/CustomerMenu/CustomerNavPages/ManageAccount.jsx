import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../../../scss/ManageAccount.scss';

//img
import logo from '../../../../img/logo.png';

const ManageAccount = ({ ID, selectCategory, setSelectCategory, selectContainer }) => {

    const history = useHistory();

    const [Client, setClient] = React.useState(JSON.parse(localStorage.getItem('Client')));
    const [Header, setHeader] = React.useState();

    const _ClientInfo = useSelector(state => Client ? state.CustomerReducer.storage?.find(customer => customer._id === Client.result._id) : Client);

    // const [postcodeFilter, setPostcodeFilter] = React.useState();
    const [submitEdit, setSubmitEdit] = React.useState(
        {
            fullname: ' ',
            email: ' ',
            mobile: ' ',
            birthday: ' ',
            gender: ' '
        }
    );

    React.useEffect(()=>{
        setSubmitEdit({...submitEdit,
            fullname: _ClientInfo?.fullname,
            email: _ClientInfo?.email,
            mobile: _ClientInfo?.number,
            birthday: _ClientInfo ? _ClientInfo?.birthday : null,
            gender: _ClientInfo ? _ClientInfo?.gender : null
        });
    },[_ClientInfo]);

    const customerHeader = <div className='header'>
        <div className='clientNameContainer'>
            <span className='ClientName'>
                {Client ? 'Hello!'+ ' ' + Client.result.fullname : null }
            </span>
        </div>
        <section className='titleContainer'>
            <span className='textTitle'>
                {Header ? Header : 'Manage My Account'}
            </span>
        </section>
    </div>

    const CustomerDetailsContainer = <div className='ManageAccountLandingpage'>
        <div className='PersonalInfoContainer'>
            <div className='Container-1'>
                <div className='textContainer'>
                    <span className='text'>
                        Personal Profile
                    </span>
                </div>
                <div className='btnContainer'>
                    <button className='btnEdit'
                        onClick={()=>{
                            return setSelectCategory(MyProfile)
                        }}
                    >
                        Edit
                    </button>
                </div>
            </div>
            <div className='ClientDetailsContainer'>
                <div className='nameTextContainer'>
                    <span className='text'>
                        {_ClientInfo?.fullname}
                    </span>
                </div>
                <div className='emailTextContainer'>
                    <span className='text'>
                            {_ClientInfo?.email}
                    </span>
                </div>
            </div>
        </div>
        <div className='AddressBookContainer'>
            <div className='Container-1'>
                <div className='textContainer'>
                    <span className='text'>
                        Address Book
                    </span>
                </div>
                <div className='btnContainer'>
                    <button className='btnEdit'>
                        Edit
                    </button>
                </div>
            </div>
            <div className='ClientDetailsContainer'>
                <div className='addressTextContainer'>
                    <div className='addressContainer-1'>
                        <div className='labelContentContainer'>
                            <span className='text'>
                                DEFAULT SHIPPING ADDRESS
                            </span>
                        </div>
                        <div className='nameTextContainer'>
                            <label className='text'>
                                {_ClientInfo?.firstname} {_ClientInfo?.lastname}
                            </label>
                        </div>
                        <div className='contentTextContainer'>
                            <span className='text'>
                                {_ClientInfo?.address} <br/>
                                (+63) 0{_ClientInfo?.number}
                            </span>
                        </div>
                    </div>
                    <div className='addressContainer-2'>
                        <div className='labelContentContainer'>
                            <span className='text'>
                                DEFAULT BILLING ADDRESS
                            </span>
                        </div>
                        <div className='nameTextContainer'>
                            <label className='text'>
                                {_ClientInfo?.firstname} {_ClientInfo?.lastname}
                            </label>
                        </div>
                        <div className='contentTextContainer'>
                            <span className='text'>
                                {_ClientInfo?.address} <br/>
                                (+63) 0{_ClientInfo?.number}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    const MyProfile = <div className='PersonalDetails'>
        <div className='DetailsContainer'>
            <div className='innerContainer'>
                <div className='fullnameContainer'>
                    <span className='text'>
                        Full name
                    </span>
                </div>
                <div className='customerDetailContainer'>
                   <span className='text'>
                        {_ClientInfo?.fullname}
                   </span>
                </div>
                <div className='birthdayContainer'>
                    <span className='text'>
                        Birthday
                    </span>
                </div>
                <div className='customerDetailContainer'>
                   <span className='text'>
                      {_ClientInfo?.birthday ? _ClientInfo?.birthday : 'none'}
                   </span>
                </div>

                {/* btn section */}

                <div className='btnContainer-1'>
                    <button className='editProfile'
                        onClick={()=> {
                            setSelectCategory(editProfile)
                            setHeader('Edit Profile')
                            history.push(`/user/profile/edit=${_ClientInfo?._id}`)
                        }}
                    >
                        EDIT PROFILE
                    </button>
                </div>
                <div className='btnContainer-2'>
                    <button className='changePasswordBtn'>
                        CHANGE PASSWORD
                    </button>
                </div>

            </div>
            <div className='innerContainer'>
                <div className='emailContainer'>
                    <span className='text'>
                        Email Address 
                    </span>
                </div>
                <div className='customerDetailContainer'>
                   <span className='text'>
                        {_ClientInfo?.email}
                   </span>
                </div>
                <div className='genderContainer'>
                    <span className='text'>
                        Gender
                    </span>
                </div>
                <div className='customerDetailContainer'>
                   <span className='text'>
                        {_ClientInfo?.gender ? _ClientInfo?.gender : 'none'}
                   </span>
                </div>
            </div>
            <div className='innerContainer'>
                <div className='mobileContainer'>
                    <span className='text'>
                        Mobile
                    </span>
                </div>
                <div className='customerDetailContainer'>
                   <span className='text'>
                       (+63) 0{_ClientInfo?.number}
                   </span>
                </div>
            </div>
        </div>
    </div>

    const AddressBook = <div className='AddressBook'>
        <div className='innerContainer'>
            <div className='customerDetailContainer'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Fullname</th>
                            <th scope="col">Address</th>
                            <th scope="col">Postcode</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">DEFAULT SHIPPING ADDRESS</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{_ClientInfo?.fullname}</td>
                            <td>{_ClientInfo?.address}</td>
                            <td>{_ClientInfo?.address}</td>
                            <td>(+63) 0{_ClientInfo?.number}</td>
                            <td>{_ClientInfo?.address}</td>
                        </tr>
                    </tbody>
                </table>
                <div className='customerDetailBtnEditContainer'>
                    <button className='editDetailsBtn'> 
                        <span className='text'>
                            EDIT ADDRESS
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    const MyOrders = <div className='MyOrders'>

        <div className='navigationHeader'>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button className="nav-link" aria-current="page">To Pay</button>
                </li>
                <li className="nav-item">
                    <button className="nav-link">To Ship</button>
                </li>
                <li className="nav-item">
                    <button className="nav-link">Received</button>
                </li>
            </ul>
        </div>

        <div className='TabsContentContainer'>

        </div>

    </div>

    const navigation = <div className='contentContainer'>
        <div className='navigationContainer'>
            <button className='ManageAccountBtn'
                onClick={()=> {
                   setSelectCategory(CustomerDetailsContainer)
                   setHeader('Manage My Account')
                   history.push(`/user/profile?=${_ClientInfo?._id}`)
                }}>
                <span className='text'>
                    Manage My Account
                </span>
            </button>
            <button className='myProfileBtn'
                onClick={()=> {
                    setSelectCategory(MyProfile)
                    setHeader('My Profile')
                    history.push(`/user/profile?=${_ClientInfo?._id}`)
                }}
            >
                <span className='text'>
                    My Profile
                </span>
            </button>
            <button className='myAddressBtn'
                onClick={()=> {
                    setSelectCategory(AddressBook)
                    setHeader('Address Book')
                    history.push(`/user/profile/addressbook`)
                }}
            >
                <span className='text'>
                    Address Book
                </span>
            </button>
            <button className='OrderBtn'
                onClick={()=> {
                    setSelectCategory(MyOrders)
                    setHeader('My Orders')
                    history.push(`/user/profile/orders`)
                }}
            >
                <span className='text'>
                    My Orders
                </span>
            </button>
            <button className='myCancellationsBtn'>
                <span className='text'>
                    My Cancellations
                </span>
            </button>
        </div>
        <div className='selectedCategoryContainer'>
            {selectCategory == ' ' ?
                (
                    <div className='ManageAccountLandingpage'>
                        <div className='PersonalInfoContainer'>
                            <div className='Container-1'>
                                <div className='textContainer'>
                                    <span className='text'>
                                        Personal Profile
                                    </span>
                                </div>
                                <div className='btnContainer'>
                                    <button className='btnEdit'
                                        onClick={()=>{
                                            return setSelectCategory(MyProfile)
                                        }}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                            <div className='ClientDetailsContainer'>
                                <div className='nameTextContainer'>
                                    <span className='text'>
                                        {_ClientInfo?.fullname}
                                    </span>
                                </div>
                                <div className='emailTextContainer'>
                                    <span className='text'>
                                        {_ClientInfo?.email}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='AddressBookContainer'>
                            <div className='Container-1'>
                                <div className='textContainer'>
                                    <span className='text'>
                                        Address Book
                                    </span>
                                </div>
                                <div className='btnContainer'>
                                    <button className='btnEdit'>
                                        Edit
                                    </button>
                                </div>
                            </div>
                            <div className='ClientDetailsContainer'>
                                <div className='addressTextContainer'>
                                    <div className='addressContainer-1'>
                                        <div className='labelContentContainer'>
                                            <span className='text'>
                                                DEFAULT SHIPPING ADDRESS
                                            </span>
                                        </div>
                                        <div className='nameTextContainer'>
                                            <label className='text'>
                                                {_ClientInfo?.fullname}
                                            </label>
                                        </div>
                                        <div className='contentTextContainer'>
                                            <span className='text'>
                                                {_ClientInfo?.address} <br/>
                                                (+63) 0{_ClientInfo?.number}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='addressContainer-2'>
                                        <div className='labelContentContainer'>
                                            <span className='text'>
                                                DEFAULT BILLING ADDRESS
                                            </span>
                                        </div>
                                        <div className='nameTextContainer'>
                                            <label className='text'>
                                                {_ClientInfo?.fullname}
                                            </label>
                                        </div>
                                        <div className='contentTextContainer'>
                                            <span className='text'>
                                                {_ClientInfo?.address} <br/>
                                                (+63) 0{_ClientInfo?.number}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : selectCategory
            }
        </div>
    </div>

    // edit func
    const editProfile =  <div className='EditPersonalDetails'>
    <div className='EditDetailsContainer'>
        <div className='innerContainer'>
            <div className='fullnameContainer'>
                <span className='text'>
                    Full name
                </span>
            </div>
            <div className='customerDetailContainer'>
                <input type='text' defaultValue={submitEdit.fullname} className='fullnameTextContainer'
                    onChange={(e)=> {
                        return setSubmitEdit({...submitEdit, fullname: e.target.value})
                    }}
                />
            </div>
            <div className='birthdayContainer'>
                <span className='text'>
                    Birthday
                </span>
            </div>
            <div className='customerDetailContainer'>
                <input type='date' className='datePicker'/>
            </div>

            {/* btn section */}

            <div className='btnContainer-1'>
                <button className='editProfile'
                    onClick={()=> {
                        setSelectCategory(editProfile)
                        setHeader('Edit Profile')
                        history.push(`/user/profile/edit=${_ClientInfo?._id}`)
                    }}
                >
                    SAVE CHANGES
                </button>
            </div>

        </div>
        <div className='innerContainer'>
            <div className='emailContainer'>
                <span className='text'>
                    Email Address 
                </span>
            </div>
            <div className='customerDetailContainer'>
                <input type='text' defaultValue={submitEdit.email} className='emailTextContainer'
                    onChange={(e)=> {
                        return setSubmitEdit({...submitEdit, email: e.target.value })
                    }}
                />
            </div>
            <div className='genderContainer'>
                <span className='text'>
                    Gender
                </span>
            </div>
            <div className='customerDetailContainer'>
                {/* <input type='text' defaultValue={submitEdit.gender} className='genderTextContainer'
                    onChange={(e)=> {
                        return setSubmitEdit({...submitEdit, gender: e.target.value })
                    }}
                /> */}

                <select defaultValue='none' className='genderTextContainer'>
                    <option>MALE</option>
                    <option>FEMALE</option>
                </select>

            </div>
        </div>
        <div className='innerContainer'>
            <div className='mobileContainer'>
                <span className='text'>
                    Mobile
                </span>
            </div>
            <div className='customerDetailContainer'>
                <input type='text' defaultValue={submitEdit.mobile} className='numberTextContainer'/>
            </div>
        </div>
    </div>
    </div>

  return (
    <div className={ID}>
        {customerHeader}
        {navigation}
    </div>
  )

}

export default ManageAccount;


//tommorow finish navigation and implement edit customer details
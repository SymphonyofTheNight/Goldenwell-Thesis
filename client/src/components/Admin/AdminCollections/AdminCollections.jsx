import React from 'react';
import '../../../scss/AdminCollections.scss';
import { Redirect } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { Delete_Product } from '../../../controllers/Actions.js';
import { useHistory } from 'react-router-dom';
// import Modal from 'react-modal';
// import FileBase from 'react-file-base64';

const AdminCollections = ({ ID, setModal, modal, setCollectionID }) => {

    const [admin, setAdmin] = React.useState(JSON.parse(localStorage.getItem('Administrator')));
    const [filter, setFilter] = React.useState(' ');
    const [checkbox, setCheckBox] = React.useState(); // get specific product
    const prod_img = React.useRef();
    const dispatch = useDispatch();

    const history = useHistory();

    const openModal = () => {
        setModal(modal => !modal)
    }

    const removeRequest = (e) => {
        if(checkbox) return dispatch(Delete_Product(admin.result._id,checkbox)) 
    }

    const getItem = useSelector(state => state.reducer.storage);

    if(!localStorage.getItem('Administrator')) return <Redirect to='/admin'/>

    // console.log(getItem[0].store) // store 
    // console.log(filter)
    console.log(getItem)

    return (
        <div className={ID}>

             <div className='innerAdminUserContainer-1'>

                <div className='searchAndfilterContainer'>
                    <div className='searchContainer'>
                        <div className="input-group">
                            <input type="search" className="control rounded" placeholder="Search" aria-label="Search"
                            aria-describedby="search-addon" 
                                onChange={(e)=> {
                                    setFilter(e.target.value)
                                }}
                            />
                            <button type="button" className="outline-primary">search</button>
                        </div>
                    </div>
                    {/* <div className='filterContainer'>
                        <select className="form-select" aria-label="Default select example">
                            <option value='Open this select menu'>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div> */}
                </div>

                <div className='collectionsContainer'>

                    <div className='titleandnavigation'>
                        <div className='titleContainer'>
                            <span className='txt'>Collections</span>
                        </div>
                        <div className='spacing' />
                        <div className='addbtnContainer'>
                            <button className='addFunction' onClick={openModal}> 
                                    ADD 
                            </button>

                            {/* /// modal here */}

                        </div>
                        <div className='removebtnContainer'>
                            <form onSubmit={removeRequest}>
                            <button className='removeFunction' type='submit'>
                                    DELETE
                            </button>
                            </form>
                        </div>
                    </div>

                    <div className='listContainer'>
                        <div className='innerlistContainer'>

                            <div className='tablecategories'>
                                <div className='categories'>
                                    <div className='TitleContainer-1'>
                                       
                                    </div>
                                    <div className='TitleContainer-2'>
                                        <label className='title'>
                                            Product_ID
                                        </label>
                                    </div>
                                    <div className='TitleContainer-3'>
                                        <label className='title'>
                                            Product_Name
                                        </label>
                                    </div>
                                    <div className='TitleContainer-4'>
                                        <label className='title'>
                                            Price
                                        </label>
                                    </div>
                                    <div className='TitleContainer-5'>
                                        <label className='title'>
                                            Parent
                                        </label>
                                    </div>
                                    <div className='TitleContainer-6'>
                                        <label className='title'>
                                            Status
                                        </label>
                                    </div>
                                    <div className='TitleContainer-7'>
                                        <label className='title'>
                                            Edit
                                        </label>
                                    </div>
                                    <div className='TitleContainer-8'>
                                        <label className='title'>
                                            Delete
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className='productContainer'>
                                <div className='product'>
                                    {getItem && Object.keys(getItem).map((key, value) => {
                                        return (
                                            <div className='innerContainer-1' key={key}> 
                                                {getItem[0].store.filter(state => {
                                                        // console.log(state.productname) // object 
                                                        if(filter === ' '){
                                                            return state;
                                                        }else if(state.productname?.toLowerCase().includes(filter?.toLowerCase())){
                                                            return state;
                                                        }
                                                    }).map(item => {
                                                        return (
                                                            <div className='innerContainer-2' key={item._id}>
                                                                <div className='imgContainer'>
                                                                <div className='clipImg' 
                                                                    style={{
                                                                        backgroundImage: item.imageBase64 ? `url(${item.imageBase64})` : 'none'
                                                                    }}
                                                                />
                                                                </div>
                                                                <div className='productIDContainer'>
                                                                    {item.product_identifier}
                                                                </div>
                                                                <div className='productNameContainer'>
                                                                    {item.productname}
                                                                </div>
                                                                <div className='productPriceContainer'>
                                                                    {item.price}
                                                                </div>
                                                                <div className='productParentContainer'>
                                                                    {item.categoryfilter}
                                                                </div>
                                                                <div className='productStatusContainer'>
                                                                    <div className='status'
                                                                    style={{
                                                                        backgroundColor: item.quantity > 0 ? 'black' : 'red'
                                                                    }}
                                                                    >
                                                                        {item.quantity > 0 ? 'In stock' : 'Out of stock'}
                                                                    </div>
                                                                </div>
                                                                <div className='EditContainer'>
                                                                <button className='EditBtn'
                                                                onClick={()=> {
                                                                    setCollectionID(item._id)
                                                                    history.push(`/admin/collections/view/`)
                                                                }}
                                                                >
                                                                        View
                                                                </button>
                                                                </div>
                                                                <div className='checkBoxContainer'>
                                                                        <input type='checkbox' onChange={(e)=>{
                                                                            setCheckBox(item._id)
                                                                        }} />
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* modal */}
           </div>

        </div>
    )
}

export default AdminCollections;

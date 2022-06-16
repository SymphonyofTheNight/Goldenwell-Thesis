import React from 'react';
import '../../../../scss/ViewProduct.scss';
import { useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Update_Item, Testing_Item } from '../../../../controllers/Actions.js';
import FileBase from 'react-file-base64';

const ViewProduct = ({ ID, collectionID }) => {

    const product = useSelector(state => collectionID ? 
        state.reducer.storage.map(data => 
        data.store.find(item => item._id === collectionID))
        : null );

    const dispatch = useDispatch();
    const history = useHistory();

    const [form, setForm] = React.useState({
        _id: '',
        product_identifier: '',
        productname: '',
        price: '',
        quantity: '',
        categoryfilter: '',
        description: '',
        specs: '',
        imageBase64: '',
        timestamp: ''
    })

    const [admin, setAdmin] = React.useState(JSON.parse(localStorage.getItem('Administrator')));
    const [arrayObject, setArrayObject] = React.useState(null);
    const [img, setImg] = React.useState(null);
    const [imageBase64, setImageBase64] = React.useState(); // img here

    React.useEffect(()=> {
        if(!localStorage.getItem('Administrator')) return <Redirect to='/admin'/>
        setArrayObject(product[0]);
    },[product])

    React.useEffect(()=> {
        if(arrayObject !== null){
            setForm({
                _id: arrayObject._id,
                product_identifier: arrayObject.product_identifier,
                productname: arrayObject.productname,
                price: arrayObject.price,
                quantity: arrayObject.quantity,
                categoryfilter: arrayObject.categoryfilter,
                description: arrayObject.description,
                specs: arrayObject.specs,
                imageBase64: arrayObject.imageBase64,
                timestamp: arrayObject.timestamp,
            })
        }
    },[arrayObject])

    React.useEffect(()=> {
        if(img) {
            setForm({...form, imageBase64: '' });
            setImageBase64(img.selectedFile.base64);
        }
    },[img])

    React.useEffect(()=> {
        if(form.imageBase64 == ''){
            setForm({...form, imageBase64: imageBase64})
        }
    },[form.imageBase64 == ''])

    const onHandleSubmit = (event) => {
        event.preventDefault();
        if(admin.result._id && form.product_identifier &&form.productname && form.price && form.quantity && form.categoryfilter && form.description && form.specs && form.imageBase64 && form.timestamp || form) {
            dispatch(Testing_Item(
                admin.result._id,
                form.product_identifier,
                form.productname,
                form.price,
                form.quantity,
                form.categoryfilter,
                form.description,
                form.specs,
                form.imageBase64,
                form.timestamp
            ));

            history.push('/admin/collections/all');
            window.location.reload(false); // temporary solution for status 404 

        }
    }

    if(!localStorage.getItem('Administrator')) return <Redirect to='/admin'/>

    return (

            <div className={ID}>
                <div className='innerContainer'>

                    <div className='labelContainer'>
                        <label className='txt'>
                            View product
                        </label>
                        <div className='saveFunctionContainer'>
                            {/* <div className='cancelbtnContainer'>
                                <button className='cancelbtn' type='button'>
                                    CANCEL
                                </button>
                            </div> */}
                            <form onSubmit={onHandleSubmit}>
                                <div className='savebtnContainer'>
                                    <button type="submit" className='savebtn'>
                                        SAVE
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className='form-container-1'>

                        <div className='tableContainer-1'>

                            <div className='TableTitleContainer'>
                                <label className='txt'>
                                    Basic Information
                                </label>
                            </div>

                            <div className='name-form-container'>
                                <div className='label-container'>
                                    <label className='txt'>
                                        Name
                                    </label>
                                </div>
                                <div className='input-form-container'>
                                    <input type='text' className='input' value={form.productname} onChange={e => {
                                        setForm({...form, productname: e.target.value })
                                    }}/>
                                </div>
                            </div>

                            <div className='identifier-form-container'>
                                <div className='label-container'>
                                    <label className='txt'>
                                        Product identifier
                                    </label>
                                </div>
                                <div className='input-form-container'>
                                    <input type='text' className='input-example' placeholder='Example: 123456-qrstuvwxyz'/>
                                    <input type='text' className='input' value={form.product_identifier} readOnly={true}/>
                                </div>
                                <div className='input-description-container'>
                                    <label className='txt'>
                                        Unique human-readable product identifier. 
                                        No longer than 255 characters.
                                    </label>
                                </div>
                            </div>

                            <div className='description-form-container'>
                                <div className='label-container'>
                                    <label className='txt'>
                                        Description
                                    </label>
                                </div>
                                <div className='input-form-container'>
                                    <textarea type='text' className='input' value={form.description} onChange={e => {
                                        setForm({...form, description: e.target.value })
                                    }}/>
                                </div>
                            </div>

                            <div className='specs-form-container'>
                                <div className='label-container'>
                                    <label className='txt'>
                                        Specs
                                    </label>
                                </div>
                                <div className='input-form-container'>
                                    <textarea type='text' className='input' value={form.specs} onChange={e => {
                                        setForm({...form, specs: e.target.value })
                                    }}/>
                                </div>
                            </div>

                        </div>

                        <div className='tableContainer-2'>

                            <div className='labelContainer'>
                                <label className='txt'>
                                    Pricing
                                </label>
                            </div>

                            <div className='input-form-container'>
                                <div className='label-container'>
                                    <div className='label-inner-1'>
                                        <label className='txt'>
                                            Price
                                        </label>
                                    </div>
                                    <div className='label-inner-2'>
                                        <label className='txt'>
                                            Old price
                                        </label>
                                    </div>
                                </div>
                                <div className='input-form-container'>
                                    <div className='inner-input-container-1'>
                                        <input type='text' className='input' onChange={e => {
                                            setForm({...form, price: e.target.value })
                                        }}/>
                                    </div>
                                    <div className='inner-input-container-2'>
                                        <input type='text' className='input' value={form.price} readOnly={true}/>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='tableContainer-3'>

                            <div className='labelContainer'>
                                <label className='txt'>
                                    Timestamp
                                </label>
                            </div>

                            <div className='input-form-container'>
                                <div className='label-container'>
                                    <div className='label-inner-1'>
                                        <label className='txt'>
                                            Publish date
                                        </label>
                                    </div>
                                </div>
                                <div className='input-form-container'>
                                    <div className='inner-input-container-1'>
                                        <input type='text' className='input' value={form.timestamp} readOnly={true}/>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className='form-container-2'>

                        <div className='id-form-container'>
                            <div className='label-container'>
                                <label className='txt'>
                                    I.D
                                </label>
                            </div>
                            <div className='label-container-2'>
                                <label className='txt'>
                                    Database id
                                </label>
                            </div>
                            <div className='input-form-container'>
                                <input type='text' className='input' value={form._id} readOnly={true}/>
                            </div>
                        </div>

                        <div className='category-form-container'>
                            <div className='label-container'>
                                <label className='txt'>
                                    Parent category
                                </label>
                            </div>
                            <div className='input-form-container'>
                                <select className="form-select" aria-label="Default select example" onChange={(e)=> {
                                    setForm({...form, categoryfilter: e.target.value })
                                }}>
                                <option value='Choose product type'>Choose product type</option>
                                <option value="Monitors">Monitors</option>
                                <option value="CCTV">CCTV</option>
                                <option value="DVR">DVR</option>
                                <option value="CORDS">Cords</option>
                        </select>
                            </div>
                            <div className='input-description-container'>
                                    <label className='txt'>
                                        Select a category that will be the 
                                        parent of the current one.
                                    </label>
                                </div>
                        </div>

                        <div className='img-form-container'>
                            <div className='label-container'>
                                <label className='txt'>
                                   Image
                                </label>
                            </div>
                            <div className='imgContainer' style={{
                                backgroundImage: imageBase64 ? `url(${imageBase64})` : `url(${form.imageBase64})`
                            }}/>
                            <div className='replaceImgContainer'>
                                <FileBase 
                                    type='file'
                                    multiple={false}
                                    onDone={base64 => setImg({selectedFile : base64 })}
                                />
                            </div>
                        </div>

                    </div>

                </div>
            </div>

    )
}

export default ViewProduct;


// tommorow add edit slug slot on view product. and start the second landing page tommorow


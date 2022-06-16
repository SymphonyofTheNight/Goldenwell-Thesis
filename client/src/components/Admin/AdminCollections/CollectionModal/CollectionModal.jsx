import React from 'react';
import FileBase from 'react-file-base64';
import '../../../../scss/CollectionModal.scss';
import uniqid from 'uniqid';
import { Redirect } from 'react-router-dom';
import { Add_Product } from '../../../../controllers/Actions.js';
import { useDispatch } from 'react-redux';
import moment from 'moment';

const CollectionModal = ({ ID, modal, setModal }) => {

    const [admin, setAdmin] = React.useState(JSON.parse(localStorage.getItem('Administrator'))?.result._id);
    const [img, setImg] = React.useState(null);
    const [imageBase64, setImageBase64] = React.useState();
    const dispatch = useDispatch();
    
    const [shuffled_array, setShuffled_Array] = React.useState(uniqid('product-197318').split(''))

    const [product_identifier, setProduct_Identifier] = React.useState();
    const [productname, setProductName] = React.useState();
    const [price, setPrice] = React.useState();
    const [quantity, setQuantity] = React.useState();
    const [categoryfilter, setCategoryFilter] = React.useState();
    const [description, setDescription] = React.useState();
    const [specs, setSpecs] = React.useState();
    const [timestamp, setTimeStamp] = React.useState(moment().format('MMMM Do YYYY, h:mm:ss a'));

    // const getItem = useSelector(state => state.reducer.storage);
    // console.log(admin);

    const shuffle = (char) => {
        for(let i = char.length - 1; i >= 0; i--){
            const randomIndex = Math.floor(Math.random() * (i + 1));
            const temp = char[i];
            char[i] = char[randomIndex];
            char[randomIndex] = temp;
        }
        return char;
    }

    shuffle(shuffled_array);

    React.useEffect(()=> {
        setProduct_Identifier(shuffled_array.join(''));
    },[shuffled_array])

    React.useEffect(()=> {
        if(img) return setImageBase64(img.selectedFile.base64);
    },[img])

    if(!localStorage.getItem('Administrator')) return <Redirect to='/admin'/>

    const addProd = () => {
        if(JSON.parse(localStorage.getItem('Administrator')) || typeof(Storage) !== "undefined"){
            if(admin && product_identifier && productname && price && quantity && categoryfilter && description && specs && timestamp) {
                dispatch(Add_Product(
                    admin,
                    product_identifier,
                    productname,
                    price,
                    quantity,
                    categoryfilter,
                    description,
                    specs,
                    imageBase64,
                    timestamp
                ))
                setModal(toClose => !toClose)
            }
        }
    }

    const cancel = () => {
        
        setModal(toClose => !toClose)
    }

    return (
        <div className={modal ? 'CollectionModal' : 'CollectionModalNone' }>

            <div className='innerModal'>

                <div className='AddItemTitleContainer'>
                    <span className='txt'>
                        Add Item
                    </span>
                </div>

                <div className='ProductIdContainer'>
                    <div className='innerProductIdContainer'>
                        <span className='txt'>Product Identifier:</span>
                    </div>
                    <div className='InputContainer'>
                        <input type='text' value={product_identifier} className='input' id='product_identifier' readOnly={true}/>
                    </div>
                </div>

                <div className='NameContainer'>
                    <div className='innerNameContainer'>
                        <span className='txt'>Product Name:</span>
                    </div>
                    <div className='InputContainer'>
                        <input type='text' className='input' id='productname'
                        onChange={e => setProductName(e.target.value)}
                        />
                    </div>
                </div>

                <div className='PriceContainer'>
                    <div className='innerPriceContainer'>
                        <span className='txt'>Product Price:</span>
                    </div>
                    <div className='InputContainer'>
                        <input type='text' className='input' id='price'
                        onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                </div>

                <div className='QuantityContainer'>
                    <div className='innerQuantityContainer'>
                        <span className='txt'>Product Quantity:</span>
                    </div>
                    <div className='InputContainer'>
                        <input type='number' className='input' id='quantity'
                        onChange={e => setQuantity(e.target.value)}
                        />
                    </div>
                </div>

                <div className='CategoryContainer'>
                    <div className='innerCategoryContainer'>
                        <span className='txt'>Category: </span>
                    </div>
                    <div className='InputContainer'>
                        <select className="form-select" aria-label="Default select example" onChange={
                            (e) => setCategoryFilter(e.target.value)
                        }>
                            <option value='Choose product type'>Choose product type</option>
                            <option value="Monitors">Monitors</option>
                            <option value="CCTV">CCTV</option>
                            <option value="DVR">DVR</option>
                            <option value="CORDS">Cords</option>
                        </select>
                    </div>
                </div>

                <div className='DescriptionContainer'>
                    <div className='innerDescriptionContainer'>
                        <span className='txt'>Description: </span>
                    </div>
                    <div className='InputContainer'>
                        <input type='text' className='input' id='description'
                        onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                </div>

                <div className='SpecsContainer'>
                    <div className='innerSpecsContainer'>
                        <span className='txt'>Specs: </span>
                    </div>
                    <div className='InputContainer'>
                        <input type='text' className='input' id='specs'
                        onChange={e => setSpecs(e.target.value)}
                        />
                    </div>
                </div>

                <div className='UploadContainer'>
                    <div className='innerUploadContainer'>
                        <span className='txt'>Img: </span>
                    </div>
                    <div className='ImgContainer'>
                        <div className='innerImgContainer' 
                        style={{
                            backgroundImage: img ? `url(${img.selectedFile.base64})` : 'none'
                        }}
                        />
                        <FileBase 
                         type='file'
                         multiple={false}
                         onDone={base64 => setImg({selectedFile : base64 })}
                        />
                    </div>
                </div>

                <div className='btnContainer'>
                    <div className='innerBtnContainer'>
                            <div className='cancelContainer'>
                                <button className='cancel'
                                onClick={()=> {
                                    setModal(isModal => !isModal)
                                }}
                                >
                                    Cancel
                                </button>
                            </div>
                        <form onSubmit={addProd}>
                            <div className='submitContainer'>
                                <button type='submit' className='submit'>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
           
        </div>
    )
}

export default CollectionModal;

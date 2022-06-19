import React from 'react';
import './scss/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getDatabase,getCustomer } from './controllers/Actions.js';
import { useSelector, useDispatch } from 'react-redux';
import { gapi } from 'gapi-script';

// admin
import AdminLogin from './components/Admin/AdminLogin/AdminLogin.jsx';
import Navbar from './components/Admin/Navbar/Navbar.jsx';
import ToggleMenu from './components/Admin/ToggleMenu/ToggleMenu.jsx';
import AdminHome from './components/Admin/AdminHome/AdminHome.jsx';
import AdminUsers from './components/Admin/AdminUsers/AdminUsers.jsx';
import AdminSetting from './components/Admin/AdminSettings/AdminSetting';
import AdminDeliveries from './components/Admin/AdminDeliveries/AdminDeliveries';
import AdminCollections from './components/Admin/AdminCollections/AdminCollections.jsx';
import ViewProduct from './components/Admin/AdminCollections/ViewProduct/ViewProduct.jsx';
import CollectionModal from './components/Admin/AdminCollections/CollectionModal/CollectionModal.jsx';
import AdminFooter from './components/Admin/Footer/AdminFooter.jsx';

import AdminSignup from './components/Admin/AdminSignup/AdminSignup';

// client 
import CustomerRegistration from './components/Store/CustomerRegistration/CustomerRegistration';
import CustomerMenu from './components/Store/CustomerMenu/CustomerMenu';
import CustomerLogin from './components/Store/CustomerLogin/CustomerLogin';
import Mission from './components/Store/Mission/Mission';
import About from './components/Store/About/About';
import PerformanaceAndSustainability from './components/Store/PerformanceAndSustainability/PerformanaceAndSustainability';
import WhereToBuy from './components/Store/WhereToBuy/WhereToBuy';
import CustomerCheckout from './components/Store/CustomerCheckout/CustomerCheckout';
import MyCartSlider from './components/Store/MyCartSlider/MyCartSlider';
import Wishlist from './components/Store/Wishlist/Wishlist';
import AddToCart from './components/Store/Wishlist/AddToCart/AddToCart';
import Shop_Navbar from './components/Store/Shop_Navbar/Shop_Navbar';
import Shop_Landing from './components/Store/Shop_Landingpage/Shop_Landing';
import Shop_Collection from './components/Store/Shop_Collection/Shop_Collection';
import Shop_Collection_View from './components/Store/Shop_Collection_View/Shop_Collection_View';
import Shop_Footer from './components/Store/Shop_Footer/Shop_Footer';
import Shop_Toggle from './components/Store/Shop_Toggle/Shop_Toggle';

// transition cover
import Transition from './components/Store/Wishlist/transitionCover/Transition';
import TransitionToCart from './components/Store/Shop_Collection_View/AddToCartTransition/TransitionToCart';
import TransitionToWishlist from './components/Store/Shop_Collection_View/AddToWishlistTransition/TransitionToWishlist';
import TransitionToLogin from './components/Store/TransitionTologin/TransitionToLogin';

// customer account 

import ManageAccount from './components/Store/CustomerMenu/CustomerNavPages/ManageAccount';

const App = () => {

    // gmail login and register
    
    const [gmailname, setGmailname] = React.useState();
    const [gmailId, setGmailId] = React.useState();
    const [gmail, setGmail] = React.useState();

    const [transition, setTransition] = React.useState();
    const [wishtocart, setWishtocart] = React.useState();
    const [openmywishlist, setOpenmywishlist] = React.useState();
    const [openmycart, setOpenmycart] = React.useState(false);
    const [CustomerMenuToggle, setCustomerMenuToggle] = React.useState(false);
    const [selectCategory, setSelectCategory] = React.useState(' ');
    const [loginToggle, setLoginToggle] = React.useState(false);
    const [isTogglemenu, setIsTogglemenu] = React.useState(false);
    const [shopNavToggle, setShopNavToggle] = React.useState(false);
    const [modal, setModal] = React.useState(false);

    const [selectContainer, setSelectContainer] = React.useState(false);

    const [collectionID, setCollectionID] = React.useState();

    const [selectedProdId, setSelectedProdId] = React.useState();

    React.useEffect(()=> {
        window.scrollTo(0,0);
    },[])

    const dispatch = useDispatch();

    React.useEffect(async ()=>{
        dispatch(getDatabase());
        dispatch(getCustomer());
    },[dispatch])

    React.useState(()=> {
        gapi.load("client:auth2", () => {
            gapi.client.init({
              clientId:
                "948073970695-foccnm4ivmf52mgqbvmj629qs0fcub58.apps.googleusercontent.com",
              plugin_name: "chat",
            });
          });
    },[])

    return (
        <div id='application'>

            <Router>

                <Switch>
                     {/* /admin */}
                    <Route path='/admin' exact>
                        <AdminLogin />
                    </Route>

                    <Router path='/admin/signup/'>
                        <AdminSignup />
                    </Router>

                    <Route path='/admin/home'>
                        <Navbar ID='Navbar col-lg-12 m-0 p-0' setIsTogglemenu={setIsTogglemenu}/>
                        <ToggleMenu ID='ToggleMenu col-lg-12 m-0 p-0' isTogglemenu={isTogglemenu} setIsTogglemenu={setIsTogglemenu}/>
                        <AdminHome ID='Adminhome col-lg-12 m-0 p-0'/>
                        <AdminFooter ID='Adminfooter col-lg-12 m-0 p-0'/>
                    </Route>
                    <Route path='/admin/users'>
                        <Navbar ID='Navbar col-lg-12 m-0 p-0' setIsTogglemenu={setIsTogglemenu}/>
                        <ToggleMenu ID='ToggleMenu col-lg-12 m-0 p-0' isTogglemenu={isTogglemenu} setIsTogglemenu={setIsTogglemenu}/>
                        <AdminUsers ID='Adminusers col-lg-12 m-0 p-0'/>
                        <AdminFooter ID='Adminfooter col-lg-12 m-0 p-0'/>
                    </Route>
                    <Route path='/admin/settings'>
                        <Navbar ID='Navbar col-lg-12 m-0 p-0' setIsTogglemenu={setIsTogglemenu}/>
                        <ToggleMenu ID='ToggleMenu col-lg-12 m-0 p-0' isTogglemenu={isTogglemenu} setIsTogglemenu={setIsTogglemenu}/>
                        <AdminSetting ID='AdminSetting col-lg-12 m-0 p-0'/>
                        <AdminFooter ID='Adminfooter col-lg-12 m-0 p-0'/>
                    </Route>
                    <Route path='/admin/collections/all'>
                        <Navbar ID='Navbar col-lg-12 m-0 p-0' setIsTogglemenu={setIsTogglemenu}/>
                        <ToggleMenu ID='ToggleMenu col-lg-12 m-0 p-0' isTogglemenu={isTogglemenu} setIsTogglemenu={setIsTogglemenu}/>
                        <AdminCollections ID='AdminCollections col-lg-12 m-0 p-0' setModal={setModal} modal={modal} setCollectionID={setCollectionID}/>
                        <CollectionModal ID='CollectionModal col-lg-12 m-0 p-0' setModal={setModal} modal={modal}/>
                        <AdminFooter ID='Adminfooter col-lg-12 m-0 p-0'/>
                    </Route>
                    <Route path='/admin/deliveries'>
                        <Navbar ID='Navbar col-lg-12 m-0 p-0' setIsTogglemenu={setIsTogglemenu}/>
                        <ToggleMenu ID='ToggleMenu col-lg-12 m-0 p-0' isTogglemenu={isTogglemenu} setIsTogglemenu={setIsTogglemenu}/>
                        <AdminDeliveries ID='AdminDeliveries col-lg-12 m-0 p-0'/>
                        <AdminFooter ID='Adminfooter col-lg-12 m-0 p-0'/>
                    </Route>
                    <Route path='/admin/collections/view'>
                        <Navbar ID='Navbar col-lg-12 m-0 p-0' setIsTogglemenu={setIsTogglemenu}/>
                        <ToggleMenu ID='ToggleMenu col-lg-12 m-0 p-0' isTogglemenu={isTogglemenu} setIsTogglemenu={setIsTogglemenu}/>
                        <ViewProduct ID='ViewProduct col-lg-12 m-0 p-0' collectionID={collectionID}/>
                        <AdminFooter ID='Adminfooter col-lg-12 m-0 p-0'/>
                    </Route>
                </Switch>

                <Switch>
                     {/* client */}
                    <Route path='/' exact>
                        <CustomerLogin ID='CustomerLogin col-lg-12 m-0 p-0' 
                        loginToggle={loginToggle} 
                        setLoginToggle={setLoginToggle} 
                        setGmailname={setGmailname}
                        setGmailId={setGmailId}
                        setGmail={setGmail}
                        gmailId={gmailId}
                        gmailname={gmailname}
                        setTransition={setTransition}
                        />
                        <CustomerMenu ID='CustomerMenu col-lg-12 m-0 p-0' 
                        CustomerMenuToggle={CustomerMenuToggle} 
                        setCustomerMenuToggle={setCustomerMenuToggle} 
                        selectCategory={selectCategory} 
                        setSelectCategory={setSelectCategory} 
                        setOpenmycart={setOpenmycart} 
                        setSelectContainer={setSelectContainer}
                        setOpenmywishlist={setOpenmywishlist}
                        />
                        <MyCartSlider ID='MyCartSlider' openmycart={openmycart} setOpenmycart={setOpenmycart}/>
                        <Wishlist ID='Wishlist col-lg-12 m-0 p-0' 
                        setOpenmywishlist={setOpenmywishlist} 
                        openmywishlist={openmywishlist} 
                        setWishtocart={setWishtocart} 
                        wishtocart={wishtocart} 
                        setTransition={setTransition}
                        />
                        <Shop_Navbar ID='ShopNavbar col-lg-12 m-0 p-0' setShopNavToggle={setShopNavToggle} selectedProdId={selectedProdId} setLoginToggle={setLoginToggle} setCustomerMenuToggle={setCustomerMenuToggle}/>
                        <Shop_Toggle ID='ShopToggle col-lg-12 m-0 p-0' shopNavToggle={shopNavToggle} setShopNavToggle={setShopNavToggle}/>
        {/* main */}    <Shop_Landing ID='ShopLanding col-lg-12 m-0 p-0' setSelectedProdId={setSelectedProdId}/>
                        <Shop_Footer ID='ShopFooter col-lg-12 m-0 p-0'/>
                        <Transition ID='Transition col-lg-12 m-0 p-0' transition={transition}/>
                    </Route>

                    <Route path='/mission/goldenwell'>
                    <CustomerLogin ID='CustomerLogin col-lg-12 m-0 p-0' loginToggle={loginToggle} setLoginToggle={setLoginToggle} />
                        <CustomerMenu ID='CustomerMenu col-lg-12 m-0 p-0' 
                        CustomerMenuToggle={CustomerMenuToggle} 
                        setCustomerMenuToggle={setCustomerMenuToggle} 
                        selectCategory={selectCategory} 
                        setSelectCategory={setSelectCategory} 
                        setOpenmycart={setOpenmycart} 
                        setSelectContainer={setSelectContainer}
                        setOpenmywishlist={setOpenmywishlist}
                        />
                        <MyCartSlider ID='MyCartSlider' openmycart={openmycart} setOpenmycart={setOpenmycart}/>
                        <Wishlist ID='Wishlist col-lg-12 m-0 p-0' 
                        setOpenmywishlist={setOpenmywishlist} 
                        openmywishlist={openmywishlist} 
                        setWishtocart={setWishtocart} 
                        wishtocart={wishtocart} 
                        setTransition={setTransition}
                        />
                        <Shop_Navbar ID='ShopNavbar col-lg-12 m-0 p-0' setShopNavToggle={setShopNavToggle} selectedProdId={selectedProdId} setLoginToggle={setLoginToggle} setCustomerMenuToggle={setCustomerMenuToggle}/>
                        <Shop_Toggle ID='ShopToggle col-lg-12 m-0 p-0' shopNavToggle={shopNavToggle} setShopNavToggle={setShopNavToggle}/>
        {/* main */}    <Mission ID='Mission col-lg-12 m-0 p-0'/>
                        <Shop_Footer ID='ShopFooter col-lg-12 m-0 p-0'/>
                        <Transition ID='Transition col-lg-12 m-0 p-0' transition={transition} />
                    </Route>

                    <Route path='/about'>
                        <CustomerMenu ID='CustomerMenu col-lg-12 m-0 p-0' 
                        CustomerMenuToggle={CustomerMenuToggle} 
                        setCustomerMenuToggle={setCustomerMenuToggle} 
                        selectCategory={selectCategory} 
                        setSelectCategory={setSelectCategory} 
                        setOpenmycart={setOpenmycart} 
                        setSelectContainer={setSelectContainer}
                        setOpenmywishlist={setOpenmywishlist}
                        />
                        <MyCartSlider ID='MyCartSlider' openmycart={openmycart} setOpenmycart={setOpenmycart}/>
                        <Wishlist ID='Wishlist col-lg-12 m-0 p-0' 
                        setOpenmywishlist={setOpenmywishlist} 
                        openmywishlist={openmywishlist} 
                        setWishtocart={setWishtocart} 
                        wishtocart={wishtocart} 
                        setTransition={setTransition}
                        />
                        <Shop_Navbar ID='ShopNavbar col-lg-12 m-0 p-0' setShopNavToggle={setShopNavToggle} selectedProdId={selectedProdId} setLoginToggle={setLoginToggle} setCustomerMenuToggle={setCustomerMenuToggle}/>
                        <Shop_Toggle ID='ShopToggle col-lg-12 m-0 p-0' shopNavToggle={shopNavToggle} setShopNavToggle={setShopNavToggle}/>
        {/* main */}    <About ID='About col-lg-12 m-0 p-0'/>
                        <Shop_Footer ID='ShopFooter col-lg-12 m-0 p-0'/>
                        <Transition ID='Transition col-lg-12 m-0 p-0' transition={transition} />
                    </Route>
                    
                    <Route path='/performanceandsustainability/september2021'>
                        <CustomerMenu ID='CustomerMenu col-lg-12 m-0 p-0' 
                        CustomerMenuToggle={CustomerMenuToggle} 
                        setCustomerMenuToggle={setCustomerMenuToggle} 
                        selectCategory={selectCategory} 
                        setSelectCategory={setSelectCategory} 
                        setOpenmycart={setOpenmycart} 
                        setSelectContainer={setSelectContainer}
                        setOpenmywishlist={setOpenmywishlist}
                        />
                        <MyCartSlider ID='MyCartSlider' openmycart={openmycart} setOpenmycart={setOpenmycart}/>
                        <Wishlist ID='Wishlist col-lg-12 m-0 p-0' 
                        setOpenmywishlist={setOpenmywishlist} 
                        openmywishlist={openmywishlist} 
                        setWishtocart={setWishtocart} 
                        wishtocart={wishtocart} 
                        setTransition={setTransition}
                        />
                        <Shop_Navbar ID='ShopNavbar col-lg-12 m-0 p-0' setShopNavToggle={setShopNavToggle} selectedProdId={selectedProdId} setLoginToggle={setLoginToggle} setCustomerMenuToggle={setCustomerMenuToggle}/>
                        <Shop_Toggle ID='ShopToggle col-lg-12 m-0 p-0' shopNavToggle={shopNavToggle} setShopNavToggle={setShopNavToggle}/>
        {/* main */}    <PerformanaceAndSustainability ID='Performance col-lg-12 m-0 p-0'/>
                        <Shop_Footer ID='ShopFooter col-lg-12 m-0 p-0'/>
                        <Transition ID='Transition col-lg-12 m-0 p-0' transition={transition} />
                    </Route>

                    <Route path='/wheretobuy'>
                        <CustomerMenu ID='CustomerMenu col-lg-12 m-0 p-0' 
                        CustomerMenuToggle={CustomerMenuToggle} 
                        setCustomerMenuToggle={setCustomerMenuToggle} 
                        selectCategory={selectCategory} 
                        setSelectCategory={setSelectCategory} 
                        setOpenmycart={setOpenmycart} 
                        setSelectContainer={setSelectContainer}
                        setOpenmywishlist={setOpenmywishlist}
                        />
                        <MyCartSlider ID='MyCartSlider' openmycart={openmycart} setOpenmycart={setOpenmycart}/>
                        <Wishlist ID='Wishlist col-lg-12 m-0 p-0' 
                        setOpenmywishlist={setOpenmywishlist} 
                        openmywishlist={openmywishlist} 
                        setWishtocart={setWishtocart} 
                        wishtocart={wishtocart} 
                        setTransition={setTransition}
                        />
                        <Shop_Navbar ID='ShopNavbar col-lg-12 m-0 p-0' setShopNavToggle={setShopNavToggle} selectedProdId={selectedProdId} setLoginToggle={setLoginToggle} setCustomerMenuToggle={setCustomerMenuToggle}/>
                        <Shop_Toggle ID='ShopToggle col-lg-12 m-0 p-0' shopNavToggle={shopNavToggle} setShopNavToggle={setShopNavToggle}/>
        {/* main */}    <WhereToBuy ID='Wheretobuy col-lg-12 m-0 p-0'/>
                        <Shop_Footer ID='ShopFooter col-lg-12 m-0 p-0'/>
                        <Transition ID='Transition col-lg-12 m-0 p-0' transition={transition} />
                    </Route>

                    <Route path='/signup'>
                        <CustomerRegistration ID='CustomerRegistration col-lg-12 m-0 p-0'
                        gmail={gmail}
                        gmailId={gmailId}
                        gmailname={gmailname}
                        />
                    </Route>

                    <Route path='/user/profile/'>
                        <Shop_Navbar ID='ShopNavbar col-lg-12 m-0 p-0' setShopNavToggle={setShopNavToggle} selectedProdId={selectedProdId} setCustomerMenuToggle={setCustomerMenuToggle}/>
                        <ManageAccount ID='ManageAccount col-lg-12 m-0 p-0' selectCategory={selectCategory} setSelectCategory={setSelectCategory} selectContainer={selectContainer}/>
                    </Route>

                    <Route path='/collections/all' >
                        <CustomerMenu ID='CustomerMenu col-lg-12 m-0 p-0' 
                        CustomerMenuToggle={CustomerMenuToggle} 
                        setCustomerMenuToggle={setCustomerMenuToggle} 
                        selectCategory={selectCategory} 
                        setSelectCategory={setSelectCategory} 
                        setOpenmycart={setOpenmycart} 
                        setSelectContainer={setSelectContainer}
                        setOpenmywishlist={setOpenmywishlist}
                        />
                        <MyCartSlider ID='MyCartSlider' openmycart={openmycart} setOpenmycart={setOpenmycart}/>
                        <Wishlist ID='Wishlist col-lg-12 m-0 p-0' 
                        setOpenmywishlist={setOpenmywishlist} 
                        openmywishlist={openmywishlist} 
                        setWishtocart={setWishtocart} 
                        wishtocart={wishtocart} 
                        setTransition={setTransition}
                        />
                        <Shop_Navbar ID='ShopNavbar col-lg-12 m-0 p-0' setShopNavToggle={setShopNavToggle} selectedProdId={selectedProdId} setLoginToggle={setLoginToggle} setCustomerMenuToggle={setCustomerMenuToggle}/>
                        <Shop_Toggle ID='ShopToggle col-lg-12 m-0 p-0' shopNavToggle={shopNavToggle} setShopNavToggle={setShopNavToggle}/>
        {/* main */}    <Shop_Collection ID='ShopCollection col-lg-12 m-0 p-0'/>
                        <Shop_Footer ID='ShopFooter col-lg-12 m-0 p-0'/>
                        <Transition ID='Transition col-lg-12 m-0 p-0' transition={transition} />
                    </Route>

                    <Route path={`/collections/view/`}>
                        <CustomerMenu ID='CustomerMenu col-lg-12 m-0 p-0' 
                        CustomerMenuToggle={CustomerMenuToggle} 
                        setCustomerMenuToggle={setCustomerMenuToggle} 
                        selectCategory={selectCategory} 
                        setSelectCategory={setSelectCategory} 
                        setOpenmycart={setOpenmycart} 
                        setSelectContainer={setSelectContainer}
                        setOpenmywishlist={setOpenmywishlist}
                        />
                        <MyCartSlider ID='MyCartSlider' openmycart={openmycart} setOpenmycart={setOpenmycart}/>
                        <Wishlist ID='Wishlist col-lg-12 m-0 p-0' 
                        setOpenmywishlist={setOpenmywishlist} 
                        openmywishlist={openmywishlist} 
                        setWishtocart={setWishtocart} 
                        wishtocart={wishtocart} 
                        setTransition={setTransition}
                        />
                        <Shop_Navbar ID='ShopNavbar col-lg-12 m-0 p-0' setShopNavToggle={setShopNavToggle} selectedProdId={selectedProdId} setLoginToggle={setLoginToggle} setCustomerMenuToggle={setCustomerMenuToggle}/>
                        <Shop_Toggle ID='ShopToggle col-lg-12 m-0 p-0' shopNavToggle={shopNavToggle} setShopNavToggle={setShopNavToggle}/>
        {/* main */}    <Shop_Collection_View 
                        ID='ShopCollectionView col-lg-12 m-0 p-0' 
                        selectedProdId={selectedProdId}
                        setTransition={setTransition}
                        />
                        <Shop_Footer ID='ShopFooter col-lg-12 m-0 p-0'/>
                        <Transition ID='Transition col-lg-12 m-0 p-0' transition={transition} />
                    </Route>

                    <Route path={`/wishlist/addtocart/`}>
                        <AddToCart ID='AddToCart col-lg-12 m-0 p-0' 
                            wishtocart={wishtocart}
                            setTransition={setTransition}
                            setOpenmywishlist={setOpenmywishlist}
                        />
                    </Route>

                    <Route path='/loggingin'>
                        <TransitionToLogin 
                            ID='TransitionToLogin col-ls-12 m-0 p-0'
                            setTransition={setTransition}
                            setLoginToggle={setLoginToggle}
                        />
                    </Route>

                    <Route path='/addtocart/loading'>
                        <TransitionToCart 
                         setTransition={setTransition}
                        />
                    </Route>

                    <Route path='/wishlist/loading'>
                        <TransitionToWishlist 
                            setTransition={setTransition}
                        />
                    </Route>

                    <Route path='/checkout'>
                        <CustomerCheckout ID='CustomerCheckout col-lg-12 m-0 p-0' />
                    </Route>
                
                </Switch>
                
            </Router>

            {/* modal */}

        </div>
    )
}


export default App;

import React from 'react';
import { Redirect } from 'react-router-dom';
import { Pie, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingBag, FaMoneyCheckAlt, FaPaperPlane, FaTruck, FaReceipt, FaTruckLoading } from 'react-icons/fa';
import '../../../scss/AdminHome.scss';

const AdminHome = ({ ID }) => {

  const getAdmin = useSelector(state => state.reducer.storage);

  // console.log(getAdmin[0].totalOrders)

  const [datas, setData] = React.useState(100);

    const data = {
        labels: ['Orders','Arrived'],
        datasets: [
          {
            label: '# of Votes',
            data: [getAdmin[0]?.totalOrders - 1, getAdmin[0].totalOrders - 1,],
            backgroundColor: [
              'rgba(255, 99, 132, .8)',
              'rgba(54, 162, 235, .8)',
              'rgba(255, 206, 86, .8)',
              'rgba(75, 192, 192, .8)',
              'rgba(153, 102, 255, .8)',
              'rgba(255, 159, 64, .8)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }; 

    const Linedata = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
        datasets: [
          {
            label: 'Annual Sales',
            data: [12, 15, 3, 5, 2, getAdmin[0]?.totalSales, 0, 0, 0, 0, 0, 0],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      };
      
    const options = {
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      };

    if(!localStorage.getItem('Administrator')) return <Redirect to='/admin'/>

    return (
        <div className={ID}>
            <div className='innerContainer'>

              <div className='salesChart'>
                  <div className='titleContainer'>
                      <span className='txt'>Sales Chart</span>
                  </div>
                  <div className='chartContaner'>
                      <Line 
                      data={Linedata}
                      options={options}
                      className='LineChart'
                      />
                  </div>
              </div>

              <div className='channelChart'>
                  <div className='titleContainer'>
                    <span className='txt'>Channels</span>
                  </div>
                  <div className='chartContaner'>
                       <Pie 
                        className='pie'
                        data={data}
                        options={{ maintainAspectRatio: false }}
                        />
                  </div>
              </div>

              <div className='orders'>
                <div className='titleContainer'>
                    <span className='txt'>Orders</span>
                    <FaShoppingBag className='logo'/>
                </div>
                <div className='totalOrderContainer'>
                    <span className='txt'>{getAdmin[0]?.totalOrders - 1}</span>
                </div>
                <div className='orderFooter'>
                  <span className='txt'>Total orders</span>
                </div>
              </div>

              <div className='sales'>
                  <div className='titleContainer'>
                      <span className='txt'>Sales</span>
                      <FaMoneyCheckAlt className='logo'/>
                  </div>
                  <div className='totalSalesContainer'>
                      <span className='txt'>₱ {getAdmin[0]?.totalSales - 1}</span>
                  </div>
                  <div className='salesFooter'>
                    <span className='txt'>Total sales</span>
                  </div>
              </div>

              <div className='arrivedProducts'>
                    <div className='titleContainer'>
                        <span className='txt'>Arrived</span>
                      <FaPaperPlane className='logo'/>
                    </div>
                    <div className='totalArrivedContainer'>
                        <span className='txt'>{getAdmin[0]?.totalOrders - 1}</span>
                    </div>
                    <div className='arrivedFooter'>
                        <span className='txt'>Total items arrived</span>
                    </div>
              </div>

              <div className='ProductStockContainer'>
                  <div className='titleContainer'>
                    <span className='txt'>Recent Products</span>
                  </div>
                  <div className='productsContainer'>
                      {getAdmin && Object.keys(getAdmin).map((key,value) => {
                          return (
                            <div className='innerContainer-1' key={key}>
                                {getAdmin[0]?.store.map(state => {
                                    return (
                                      <div className='innerContainer-2' key={state._id}>
                                          <div className='imgContainer'>
                                                                <div className='clipImg' 
                                                                    style={{
                                                                        backgroundImage: state.imageBase64 ? `url(${state.imageBase64})` : 'none'
                                                                    }}
                                                                />
                                                                </div>
                                                                <div className='productIDContainer'>
                                                                    {state.product_identifier}
                                                                </div>
                                                                <div className='productNameContainer'>
                                                                    {state.productname}
                                                                </div>
                                                                <div className='productPriceContainer'>
                                                                    {state.price}
                                                                </div>
                                                                <div className='productParentContainer'>
                                                                    {state.categoryfilter}
                                                                </div>
                                                                <div className='productStatusContainer'>
                                                                    <div className='status'
                                                                    style={{
                                                                        backgroundColor: state.quantity > 0 ? 'black' : 'red'
                                                                    }}
                                                                    >
                                                                        {state.quantity > 0 ? 'In stock' : 'Out of stock'}
                                                                    </div>
                                                                </div>
                                                                <div className='EditContainer'>
                                                                <button className='EditBtn'
                                                                onClick={()=> {
                                                                    // setCollectionID(state._id)
                                                                    // history.push(`/admin/collections/view/`)
                                                                }}
                                                                >
                                                                        View
                                                                </button>
                                                                </div>
                                                                <div className='checkBoxContainer'>
                                                                        <input type='checkbox' onChange={(e)=>{
                                                                            // setCheckBox(state._id)
                                                                        }} />
                                                                </div>
                                      </div>
                                    )
                                })}
                            </div>
                          )
                      })}
                  </div>
              </div>

            </div>

        </div>
    )
}

export default AdminHome;

import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import '../components/styles.css'


export default function Home() {

  const [foodItem, setFoodItem] = useState([])
  const [foodCategory, setFoodCategory] = useState([])
  const [search, setSearch] = useState('')
  const [cat,setCat]=useState('')

  const loadData = async () => {
    let response = await fetch('https://foodappbackend-zna2.onrender.com/api/foodData', {  //  http://localhost:5000/api/foodData
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    response = await response.json()
    // console.log(response[0],response[1])
    setFoodCategory(response[1])
    setFoodItem(response[0])
  }

  useEffect(() => {
    loadData()
  }, [])


  return (
    <div>
      <div><Navbar /></div>

      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: 'contain !important', "width":"100%"}}>

        <div className="carousel-inner" style={{ "maxHeight": "600px" }}>

          <div className='carousel-caption' style={{ zIndex: '10' }}>
            <div class="container-fluid ">
              <div class="d-flex">
                <input class="form-control me-2" id='bar' type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                
              </div>
            </div>
            
          </div>

          <div className="carousel-item active">
            <img src="https://plus.unsplash.com/premium_photo-1674106347866-8282d8c19f84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D&w=1000&q=80" className="d-block w-100" style={{ filter: 'brightness(50%)' }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://images.squarespace-cdn.com/content/v1/546279fde4b0f79db69be824/1490714401112-8I9VOBWCVGCLR4KU6MC6/Select-0448.JPG?format=1000w" className="d-block w-100" style={{ filter: 'brightness(50%)' }} alt="..." />
          </div>
          <div class="carousel-item">
            <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D&w=1000&q=80" className="d-block w-100" style={{ filter: 'brightness(50%)' }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
        
      </div>
      </div>


      <div>

        

        <select id='filter' className='fs-5' onClick={(e)=>{setCat(e.target.value)}}>
          
          <option key={'all'} value={''}>All</option>
          <option key={'starter'} value={'starter'}>Starter</option>
          <option key={'pizza'} value={'pizza'}>Pizza</option>
          <option key={'rice'} value={'rice'}>Rice</option>
          <option key={'dessert'} value={'dessert'}>Dessert</option>

        </select>

      </div>


      <div className='container'>
        
        {
          foodCategory != [] ? foodCategory.map((data) => {
            return (<div className='row mb-3'>

              <div key={data._id} className='fs-3 m-3'>
                {data.CategoryName}
              </div>
              <hr />

              {
                foodItem != []
                  ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())) && (item.CategoryName.toLowerCase().includes(cat.toLocaleLowerCase())))
                    .map((filterItem) => {
                      return (
                        <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                          <Card foodItems={filterItem} options={filterItem.options} />
                        </div>
                      )
                    })
                  : <>No such data found</>
              }

            </div>)
          }) : <>some error</>
        }
      </div>
      <div><Footer /></div>
        {/* <ToastContainer/> */}
    </div>
  )
}

import React, { useEffect, useState } from 'react';
import './App.css';
import MonthPicker from './MonthPicker';
import { Bar } from "react-chartjs-2";
import useAsyncFetch from './useAsyncFetch';
import Chart from 'chart.js/auto';


function App(){

   const [date, setDate] = useState({month: 4, year: 2022 });

  function yearChange(newYear) {
      let m = date.month;
      setDate({year: newYear, month: m });
    }

  function monthChange(newMonth){
      let y = date.year;
      setDate({month: newMonth, year: y});
    }

  function WaterChart(props){
       // let capacityObj = {data: [4552000,3537577,2447650,2400000,2041000,2030000,1602000], backgroundColor: ['rgb(120,199,227)']}
let capacityObj = {data: [45,35,24,24,20,20,16], backgroundColor: ['rgb(120,199,227)'],barThickness: 30}
  if(props.water){
    let n = props.water.length;
    
    
    let waterObj = {data: [], backgroundColor: ['rgb(66, 145, 152)'],barThickness: 30}
      
    let labels = ['Shasta','Oroville','Trinity Lake','New Melones','San Luis','Don Pedro','Berryessa'];

    for (let i=0; i<n; i++) { 
      let temp = props.water[i].value / 100000;
      waterObj.data.push(temp);
    }
    
  
    let userData = {};
  userData.labels = labels;
  userData.datasets = [waterObj, capacityObj];

  let   options = {
    responsive: true,
    maintainAspectRatio: false,
  plugins: {
         legend: {
            display: false
         }
      },
    scales: {
      x: {
        grid: {
          display: false
        },
        stacked: true,
        
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false
        },
        
        
      },
    }
}
          return (
        <div id="chart-container">
          <Bar options={options} data={userData} />
        </div>
      )
  }
}
    useEffect(() =>{
    console.log("useffect");
      <ChartDisplay />
  }, [date]);

  function ChartDisplay(){
  
 
  
 const [water, setWater] = useState([]);
  useAsyncFetch("query/getCDECData", date, thenFun, catchFun);
  

  function thenFun (result) {
    setWater(result);
    // render the list once we have it
  }

  function catchFun (error) {
    console.log(error);
  }
  // will re-render once state variable schools changes
  if (water) {
  return (
    <main>
      <WaterChart water={water}> </WaterChart>
    </main>
  )
  } else {
    return (<p>
      loading...
    </p>);
  }  
}
  
const[seeMore, setMore] = useState(false);
  


  function DisplayFixed(){
    return (
    <section>
       <div className="stripe">
              <div className="title"> Water Storage in California reservoirs </div>
      </div>

      <div className="paragraph">
        <div className="description">
      California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. 

  <p>
California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage. </p>

     <div>
        <button id="moreButton" onClick={() => setMore(!seeMore)}>{seeMore ? "See less" : "See more"}
      </button>
       </div>
  </div>
    
    <div className="pic">
      <img className="picSize" src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg
"/>
      <figcaption className = "caption">Lake Oroville in the 2012-2014 drought. Image credit: Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.</figcaption>
    </div>
          
  </div>

    </section> )
  }

  function Hidden(){
    return (
      <section>
        <div className="graph">
    <div className="chartSize">
       <ChartDisplay /> 
      
      
    </div>
    
      <div className="dates">
    <div className="dataText">Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs. </div>

        <div className="datePicker">
          <div className="changeM">Change month:</div>
          
          <MonthPicker  
          // props 
          date = {date}
          yearFun = {yearChange}
          monthFun = {monthChange}
          />
        </div>
    </div>  
    </div>
      </section>
    ) //change month/afetr see more 
  }

  if(seeMore){
    return (
    <main>
     <DisplayFixed />
    <Hidden />
    
  </main> )
  }
  else return (
    
    <main>
     <DisplayFixed />
  
    </main>

  );
}

export default App;
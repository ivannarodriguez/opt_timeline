/* Title: Optional Practical Training (OPT) Timeline 
  Created by: Ivanna Rodriguez, Ivan Lainez, and Sarah Samuel
  Created for MATH W82: Data Visualization with D3
  Date: January 2020
 */

const graceDays = 60 //60 days
const earliestApplication = -90 //-90 days
const optDuration = 1 // 1 year
const stemOptDuration = 2 //2 years

let graduationDate = d3.select('#graduation').property('value')

let startingdate = d3.select('#startingdate').property('value')

let qualifyStem = d3.select('#stemExtension').property('value')

// Function that recieves graduation date and calculates the date of the 60 day grace
//period after graduation
//Recieves string in format year-month-day and returns string in same format
function gracePeriodEnd (str){
    var date = new Date(str);
    var newDate = new Date(date.setDate(date.getDate() + graceDays));
    var finalNewDate = newDate.toJSON().slice(0,10);
    return finalNewDate;
}


// Function that recieves graduation date and calculates the date of the earliest
// possible application day
//Recieves string in format year-month-day and returns string in same format
function earlyApplicationDate (str){
    var date = new Date (str);
    var newDate = new Date(date.setDate(date.getDate()+ earliestApplication));
    var finalNewDate = newDate.toJSON().slice(0,10);
    return finalNewDate;
}


// Function that recieves starting date and calculates the end date of OPT
////Recieves string in format year-month-day and returns string in same format
function endOPT (str){
    var date = new Date(str);
    var dateTemp = new Date(date.setFullYear(date.getFullYear()+ optDuration))
    var endDate = dateTemp.toJSON().slice(0,10);
    return endDate;
}


//Function that sets min date and max date on the starting date calendar
function setGracePeriodStartPlusEnd (){
  graduationDate = d3.select('#graduation').property('value')
  let date = gracePeriodEnd(graduationDate)
  d3.select('#startingdate')
  .property('min', graduationDate)
  .property('max',date)
}

// This function will only work if a student qualifies for OPT. It recieves string with end date
// adds 2 years to the end date
function stemEndDate (str) {
    var date = new Date(str)
    var stemEndDateTemp = new Date(date.setFullYear(date.getFullYear() + stemOptDuration))
    var stemEndDate = stemEndDateTemp.toJSON().slice(0,10)
    return stemEndDate
}

d3.select('#graduation').on('input', setGracePeriodStartPlusEnd)
//d3.select('#graduation').on('input', setGracePeriodStart(graduationDate))


/*
*
* G R A P H I C
* S T A R T S  H E R E
*
*/

let circledata = [{ x: 0, y: 300, r: 15, group: 'endpoint', html: "Take about a week before this date to gather all documents related to the application. Your application can arrive at the USCIS office <strong> no earlier </strong> than this date. Prime time for USCIS to receive your application is between now and your program end date."}, //-90
                { x: 350, y: 300, r: 40, group: 'grad', id: 'gradcircle', html: "This is your program end date. Congrats! You're done with school.", label:'GRAD'},      //grad
                { x: 500, y: 300, r: 15, group: 'endpoint', html: 'If you have not applied for OPT and recieved a pending receipt, <strong> NOR </strong> have transferred your SEVIS record to graduate school you must leave the country by this date.'},  //60
                { x: 1000, y: 600, r: 15, group: 'endpoint', html: 'You must terminate all employment by this date (refer to your EAD card). You will have 60 days to leave the country or transfer your SEVIS record to graduate school.'}, //optend
                { x: 1125, y: 600, r: 15, group: 'endpoint', html: 'If you have not transferred your SEVIS record to graduate school you <strong>must</strong> be out of the country by this date'}, //opt60
                { x: 800, y: 900, r: 15, group: 'stem', id: 'stemcircle', html: 'This is the first day your application can arrive at the USCIS office. Please be sure to apply for STEM extension well before your OPT end date.'}, //stemstartapplying
                { x: 1000, y: 900, r: 15, group: 'stem', id: 'stemcircle', html:'This is your STEM start date.'}, //stem starts second circle
                { x: 1590, y: 900, r: 15, group: 'stem', id: 'stemcircle', html: 'You must terminate all employment by this date (refer to your EAD card). You will have 60 days to leave the country or transfer your SEVIS record to graduate school. If you transfer to graduate school, you <strong> must </strong> start classes within 5 months of your STEM opt end date.'},
                { x: 1720, y: 900, r: 15, group: 'stem', id: 'stemcircle', html: 'If you have not transferred your SEVIS record to graduate school you <strong>must</strong> be out of the country by this date.'}
              ]

let linedata = [{x1: circledata[0].x, x2: circledata[2].x, y1:circledata[0].y, y2:circledata[0].y, group: 'blackline', html:''},
                {x1: circledata[2].x, x2: circledata[3].x, y1:circledata[3].y, y2:circledata[3].y, group: 'blackline', html:'During this time, you can: <br/> 1. Work <br/> 2. Transfer SEVIS record to graduate school.'},
                {x1: circledata[3].x, x2: circledata[4].x, y1:circledata[3].y, y2:circledata[3].y, group: 'dottedline', html:''},
                {x1: circledata[1].x, x2: circledata[1].x, y1:circledata[0].y+100, y2:circledata[3].y, group: 'dottedline', html:''},
                {x1: 0, x2: 0, y1:270, y2:330, group: 'blackline', html:''},
                {x1: 500, x2: 500, y1:270, y2:330, group: 'blackline', html:''},
                {x1: circledata[1].x, x2: circledata[1].x, y1:570, y2:630, group: 'blackline', html:''},
                {x1: 500, x2: 500, y1:570, y2:630, group: 'blackline', html:''},
                {x1: 1000, x2: 1000, y1:570, y2:630, group: 'blackline', html:''},
                {x1: circledata[4].x, x2: circledata[4].x, y1:570, y2:630, group: 'blackline', html:''},
                {x1: 800, x2: 1000, y1:900, y2:900, group: 'stem', linetype:'dottedline', html:''}, //first circle to stem start date line
                {x1: 800, x2: 800, y1:870, y2:930, group: 'stem', linetype:'blackline', html:''}, //first circle vertical line
                {x1: 1000, x2: 1000, y1:870, y2:930, group: 'stem', linetype:'blackline', html:''}, // stem start date circle vertical line
                {x1: 1000, x2: 1590, y1:900, y2:900, group: 'stem', linetype:'blackline', html:'During this time, you can: <br/> 1. Work <br/> 2. Transfer SEVIS record to graduate school.'}, // stem horizontal line
                {x1: 1590, x2: 1590, y1:870, y2:930, group: 'stem', linetype:'blackline', html:''}, // end date circle vertical line
                {x1: 1500, x2: 1720, y1:900, y2:900, group: 'stem', linetype:'dottedline', html:''},
                {x1: 1720, x2: 1720, y1:870, y2:930, group: 'stem', linetype:'blackline', html:''},
                {x1: 1000, x2: 1000, y1: 690, y2:820, group:'stem', linetype: 'dottedline', html:''} //opt to stem vertical dotted line 

              ]

let rectdata = [{x: circledata[0].x, y: 0, width: 500, height:300, html:'', group:'dottedline'},
                {x: circledata[1].x, y:585, width:150, height:30, html:'You can request any start date that is within 60 days from your program end date (graduation). You can only start working once you have your EAD card in hand, and on or after the start date your EAD card specifies.', group:'endpoint'}
              ]

let textdata = [{x: 250, y: -30, text:'USCIS can receive your application', group:'USCISLabel'},
                {x: 425, y:570, text:'OPT starts', group:'labels'},
                {x: 1000, y: 550, text:'OPT ends', group:'labels'},
                {x: 318, y: 285, text:'GRAD', group:'gradlabel'},
                {x: 1000, y:850, text:'STEM starts', group:'stemlabels'},
                {x: 1590, y:850, text:'STEM ends', group:'stemlabels'},
                {x: 750, y:580, text:'12 months', group:'labels'},
                {x: 1310, y:880, text:'24 months', group:'stemlabels'},
                {x: 0, y:900, text:'* Figure not drawn to scale', group:'note'}
              ]

//adding a margin to the svg
let margin = { top: 180, right: 25, bottom: 20, left: 40 };
let svgWidth = 1300;
let svgHeight = 500;
let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.bottom;

// create svg for graphic
let canvas = d3.select("body")
                .append("svg")
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                .append("g")
                  .attr('transform', "translate(" + margin.left + "," + margin.top + ")");

//horizontal scale
let xScale = d3.scaleLinear()
  .domain(d3.extent(circledata.map(d => d.x)))
  .range([10,1000])

//vertical scale
let yScale = d3.scaleLinear()
  .domain(d3.extent(circledata.map(d => d.y)))
  .range([10, 250]); //backwards because 0,0 is at top left corner

let lines = canvas.selectAll('line')
  .data(linedata)
    .enter()
    .append('line')
      .attr('x1', d => xScale(d.x1))
      .attr('x2', d=> xScale(d.x2))
      .attr('y1', d => yScale(d.y1))
      .attr('y2', d=> yScale(d.y2))
      .attr('class', d=> d.group)
      .attr('id', d => d.linetype)
      .on('mouseover', showinfo)
      .on('mouseleave', hideinfo);

let circles = canvas.selectAll('circle')
    .data(circledata)
      .enter()
      .append('circle')
        .attr('cx', d => xScale(d.x))
        .attr('cy', d=> yScale(d.y))
        .attr('r', d=> d.r)
        .attr('class', d=> d.group)
        .on('mouseover', showinfo)
        .on('mouseleave', hideinfo);

let rects = canvas.selectAll('rect')
  .data(rectdata)
  .enter()
  .append('rect')
    .attr('x', d => xScale(d.x))
    .attr('y', d=> yScale(d.y))
    .attr('width', d=> xScale(d.x+d.width)-xScale(d.x))
    .attr('height', d=> yScale(d.y+d.height)-yScale(d.y))
    .attr('class', d=> d.group)
    .on('mouseover', showinfo)
    .on('mouseleave', hideinfo);

let text = canvas.selectAll('text')
  .data(textdata)
  .enter()
  .append('text')
    .text(d => d.text)
    .attr('x', d => xScale(d.x))
    .attr('y', d=> yScale(d.y))
    .attr('class', d=> d.group)

//tooltip
let tooltip =  d3.select('body')
      .append('div')
      .html('Hover over an element in the graphic for more information.')
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", 'visible');

function showinfo(d,i){
  d3.select('.tooltip')
    .style("visibility", "visible")
    .html(d.html)
    .style('visibility', d.html.length===0?'hidden':'visible') //only show tooltip when text is available
  d3.select(this)
    .style('fill', d.html.length===0?undefined:'maroon') //only change color when text is available
    .style('stroke', d.html.length===0?undefined:'maroon') //only change color when text is available
    .style('cursor', d.html.length===0?undefined:'help')
}

function hideinfo(d,i){
  d3.select('.tooltip')
  .style("visibility", "hidden")
  d3.select(this)
    .style('fill', undefined)
    .style('stroke', undefined)
}

d3.select('body')
  .append('div')
  .attr('class', 'creds')
  .html('This visualization was created by Sarah Samuel, Ivanna Rodríguez, and Iván Laínez to fulfill the requirements of  <a href="https://rpruim.github.io/D3/projects/project-gallery.html"> Math W82: Data Visualization with D3</a> at Calvin University, January 2020.')

//stem graphic control functions
showStem(d3.select('#stemExtension').property('value') === 'Yes')

//function that takes in the stem extension input and calls showStem function
d3.select('#stemExtension')
  .on('input', function() {
  let show = d3.select(this).property('value') === 'Yes'
  showStem(show)
  })

// function that will decide if stem visual needs to be hidden or shown
function showStem(show) {
    d3.selectAll('svg .stem, svg .stemlabels, svg .stemdatelabels')
      .style('visibility', show? 'visible':'hidden')
}

//Function that gets all important dates and returns important dates object
function importantDates(){
  return{
  earliestApplicationDate : getEarliestApplicationDate(),
  graduationDate : getGraduationDate(),
  gracePeriodEnd : getGraceEndPeriodDate(),
  startingDate : getStartingDate(),
  optEndDate : getOptEndDate(),
  optGraceDaysEnd : getOPTGraceDaysEnd(),
  stemEarly : getEarliestStemApp(),
  stemStartDate : getStemStartDate(),
  stemEndDate : getStemEndDate(),
  stemGraceEndDate : getStemGraceEnd()

}}

//Function that returns the graduation date in correct format
function getGraduationDate (){
  let date = new Date (d3.select('#graduation').property('value'))
  let newDate = date.toUTCString().slice(5,16)
  return newDate
}

//Function that returns the first grace period date in correct format
function getGraceEndPeriodDate (){
  let gradDate = d3.select('#graduation').property('value')
  let date = new Date(gracePeriodEnd(gradDate))
  let newDate = date.toUTCString().slice(5,16)
  return newDate
}

//Function that returns the earliest day to apply in correct format
function getEarliestApplicationDate() {
  let gradDate = d3.select('#graduation').property('value')
  let date = new Date (earlyApplicationDate(gradDate))
  let newDate = date.toUTCString().slice(5,16)
  return newDate
}

//Function that returns the opt end date in correct format
function getOptEndDate (){
  let startDate = d3.select('#startingdate').property('value')
  let date = new Date (endOPT(startDate))
  let newDate = date.toUTCString().slice(5,16)
  return newDate
}

//Function that returns the graduation date in correct format
function getOPTGraceDaysEnd (){
  let startDate = d3.select('#startingdate').property('value')
  let optEnd= endOPT(startDate)
  let optGraceDaysEnd = gracePeriodEnd(optEnd)
  let date = new Date(optGraceDaysEnd)
  let newDate = date.toUTCString().slice(5,16)
  return newDate
}

//Function that returns the starting date in correct format
function getStartingDate(){
  let startDate = d3.select('#startingdate').property('value')
  let date = new Date(startDate)
  let newDate = date.toUTCString().slice(5,16)
  return newDate
}

//Function that returns the stem start date in correct format
function getStemStartDate(){
  let stemDate = getOptEndDate()
  return stemDate
}

//Function that returns the stem end date in correct format
function getStemEndDate (){
  let stemDate = getStemStartDate()
  let stemEndDate1 = stemEndDate(stemDate)
  let date = new Date(stemEndDate1)
  let newDate = date.toUTCString().slice(5,16)
  return newDate
}

//Function that returns the earliest date you can apply for stem in correct format
function getEarliestStemApp (){
  let stemStart = getStemStartDate()
  let earliestApp = earlyApplicationDate(stemStart)
  let date = new Date(earliestApp)
  let newDate = date.toUTCString().slice(5,16)
  return newDate
}

//Function that returns the stem grace period date in correct format
function getStemGraceEnd (){
  let stemEnd = getStemEndDate()
  let graceEnd = gracePeriodEnd(stemEnd)
  let date = new Date(graceEnd)
  let newDate = date.toUTCString().slice(5,16)
  return newDate
}

//Function that creates and important dates object and then writes the date on the 
//correct location
function showImportantDates (){
  clearDateLabels()
  let dates = importantDates()
  circledata[0].date = dates.earliestApplicationDate
  circledata[1].date = dates.graduationDate
  circledata[2].date = dates.gracePeriodEnd
  circledata[3].date = dates.optEndDate
  circledata[4].date = dates.optGraceDaysEnd
  circledata[5].date = dates.stemEarly
  circledata[6].date = dates.stemStartDate
  circledata[7].date = dates.stemEndDate
  circledata[8].date = dates.stemGraceEndDate
  rectdata[1].date = dates.startingDate
  let circleDateLabels = canvas.selectAll('text.datelabels')
    .data(circledata)
      .enter()
      .append('text')
      .attr('class', function(d){
                        if(d.id==='gradcircle'){    
                          return 'graddatelabel'
                        }else if (d.id === 'stemcircle'){
                          return 'stemdatelabels'
                        }else {
                          return 'datelabels'
                        }
                      })
      .attr('x', d => xScale(d.x))
      .attr('y', d => d.id === 'gradcircle' ? yScale(d.y + 45) : yScale(d.y+5*d.r))
      .attr('id', 'cleardates')
      .text(d => d.date)
  d3.selectAll('text.stemdatelabels').style('visibility', d3.select('#stemExtension').property('value') === 'Yes' ? 'visble': 'hidden')
  let rectangleDateLabels = canvas.selectAll('text.dateLabels')
  .data(rectdata)
      .enter()
      .append('text')
      .attr('class', 'datelabels')
      .attr('x', d=> xScale(d.x+d.width/2))
      .attr('y', d=> yScale(d.y+70))
      .attr('id','cleardates')
      .text(d=> d.date)
    }

d3.select('#goButton').on('click', showImportantDates)

function clearDateLabels (){
  d3.selectAll('#cleardates').remove()
}
/* Global Variables */
echo "# FEND_Project_3" >> README.md

// Personal API Key for OpenWeatherMap API
//baseURL =api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const baseURL = 'api.openweathermap.org/data/2.5/forecast?units=imperial&zip=';
//const apiKey = 'in&appid=1fc232b651c2734118f63de0d555156b';

const apiKey = '59d1ce8b078abae790e675e2ecf3c15e';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

//const newZip =
/* Function to GET Web API Data*/
//const url = baseURL + newZip + apiKey;
async function getWeather (baseURL, newZip, apiKey){
   const url = baseURL + newZip + apiKey;
  // res equals to the result of fetch function
  const res = await fetch(url);
  try {
    // userData equals to the result of fetch function
    const userData = await res.json();
    return userData;

  } catch (error) {

    console.log("error", error);

  }
};


///////
// POST Request to store date, temp and user input
const saveData = async (path, data) => {
  try {
    await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  } catch (e) {
    throw e
  }
}

/* Function to POST data */
async function postData (url = '', data = {}){

    const req = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
          date: data.date,
          temp: data.temp,
          content: data.content
        })
    })

    try {
        const newData = await req.json();
        return newData;
    }catch (error) {

        console.log(error);

    }
};

  async function updateUI () {
      const request = await fetch('/all');
      try {
        const allData = await request.json()
        // show icons on the page
        icons.forEach(icon => icon.style.opacity = '1');
        // update new entry values
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
      }
      catch (error) {
        console.log("error", error);
      }
  };




/* Function called by event listener */
function performAction(e) {
  e.preventDefault();
  // get user input values
  const newZip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  getWeather(baseURL, newZip, apiKey)
    .then(function (userData) {
      // add data to POST request
      postData('/add', { date: newDate, temp: userData.main.temp, content })
    }).then(function (newData) {
      // call updateUI to update browser content
      updateUI()
    })
  // reset form
  form.reset();
}
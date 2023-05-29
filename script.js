
const form = document.getElementById('form')

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const apiKey = '4edc44354d03f8797508d8f57527d767';
    const city = document.getElementById('city').value;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
              for(i=0;i<6;i++){
                document.getElementById("day" +(i+1)+"Min").innerHTML = "Min : "+ Number(data.list[i].main.temp_min -273.15).toFixed(1)+" deg";
              }
              for(i=0;i<6;i++){
                document.getElementById("day" +(i+1)+"Max").innerHTML = "Max : "+ Number(data.list[i].main.temp_max -273.15).toFixed(1)+" deg";
              }
              //document.getElementById('loc').innerHTML = data.city.name;
              console.log("working")
              Notification.requestPermission().then(p => {
                if(p==='granted'){
                  new Notification('Notification',{
                    body: "Weather is breezy"
                  });
                }
              })
            console.log(data)
        }).catch(error => console.log(error));
})
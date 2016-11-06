"use strict";

let apiKeys = {};

let localForecast = (zipText) =>{
  return new Promise((resolve, reject) =>{
    $.ajax({
      method: 'GET',
      url: 'apikeys.json'
    }).then(response =>{
      console.log('response', response);
      apiKeys = response;
      //let authHeader = "Client-ID " + apiKeys.client_id;


$.ajax({
  method: 'GET',
  url: `http://api.openweathermap.org/data/2.5/weather?zip=${zipText},us&units=imperial&&APPID=5ab34be0357b9aa13610f7a9816381a4`
}).then( (response2)=>{
  resolve(response2);
}, (errorResponse2)=>{
  console.log('weather fail', errorResponse2);
  reject(errorResponse2);
}, (errorResponse)=>{
      console.log('errorResponse', errorResponse);
    });
  });
});
};

$(document).ready(function(){
  
  $("#clicky-button").on('click', ()=>{
    $("#clicky-button").button("loading");
    $('#output').html("");
    let searchy = $('#weather-search').val();
    localForecast(searchy).then((dataFromApi)=>{
      $("#clicky-button").button("reset");
    console.log('dataFromApi', dataFromApi);
      $('#output').append(`<div style="inline-block">Conditions: ${dataFromApi.weather[0].description}</div>
                           <div style="inline-block">Wind Speed: ${dataFromApi.wind.speed}</div>
                           <div style="inline-block">Pressure: ${dataFromApi.main.pressure}</div>
                           <div style="inline-block">Temperature: ${dataFromApi.main.temp} F</div>`);
  });

  });

  // $("#weather-search").on('keypress === 13', ()=>{
  //   $("#clicky-button").button("loading");
  //   $('#output').html("");
  //   let searchy = $('#weather-search').val();
  //   localForecast(searchy).then((dataFromApi)=>{
  //     $("#clicky-button").button("reset");
  //   console.log('dataFromApi', dataFromApi);
  //     $('#output').append(`<div style="inline-block">Conditions: ${dataFromApi.weather[0].description}</div>
  //                          <div style="inline-block">Wind Speed: ${dataFromApi.wind.speed}</div>
  //                          <div style="inline-block">Pressure: ${dataFromApi.main.pressure}</div>`);
  // });

  // });
});


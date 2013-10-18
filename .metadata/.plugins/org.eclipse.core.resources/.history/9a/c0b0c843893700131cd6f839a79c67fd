/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
    // var contacts = function(){};
    	//Access contacts database.
    	
    // var map = function(){};
    	//Gets map data and displays on page.
    
    // var cam = function(){};
    	//Accesses camera app.
    
    // var InAppBrowser = function(){};
    	//Calls web browser window in app.
    	
    // var storage = function(){};
    	//Access to storage options.
};

$('#home').on('pageinit', function(){

              
              //Instagram
              $(function(){
                var tag= "cars";
                var url= "https://api.instagram.com/v1/media/popular?client_id=56fd6edc02a84b3c8d4af1e3d7f3bbf8";
                $.getJSON(url, screenOutput);
  
                });

              var screenOutput = function(info){
               // alert("screenOutput");
                console.log(info);
    
              $("#instagram-msg").html("<h2>Instagram Results:</h2>")
    
              $.each(info.data, function(index, photo){
                     var pic = "<li><img src='" + photo.images.standard_resolution.url + "' alt+'" + photo.user.id +
                     "' /><h4>" + photo.user.full_name + ", <em>(" +photo.user.username +")</em></h4></li>";
                     $("#instagram").append(pic);
                });
              };
            

});

$('#home').on('pageinit', function(){

              //ESPN
              $(function(){
                var url= "http://api.espn.com/v1/now/top?apikey=ds5dk4pnu2n3jaufgys7yynm";
                $.getJSON(url, screenOutput);
                });
              
              var screenOutput = function(info){
              //alert("screenOutput");
              console.log(info);
              
              $('#espn-msg').html("<h2>ESPN Top Headlines:</h2>")
              
              $.each(info.feed, function(index, item){
                     var head = "<li><img src='" + item.images[0].url + "' /><h3>" + item.headline + "</h3></li>";
                     $("#espn").append(head);
                     
                     });
              }
              
});



// let localStream;  
// let remoteStream;

// // As our application run this fumction will  start first and take some permition from the user like video and microphone; 
// let init =async ()=>{
//     try {
//         localStream= await navigator.mediaDevices.getUserMedia({video: true},{Audio: false}) //this function is responsible for the video and audio  permition from the user and after we get the permition, we will store itside our "localStream" variable.
//         document.getElementById('user-1').srcObject=localStream //now , using "srcObject" we are providing the video tag a source to play video;
//         /* and we require the location , we would have used navigator.geolocation ,"navigator is a windows method" */

//         createOffer(); // call the createOffer() as we start out app.

//     } catch (error) {
//         console.error('sorry bro , you got an error --> '+ error );
        
//     }
   
// }
// init();

// /* creating a function to create offer for our peer */
// let peerConnection;

// let createOffer=async ()=>{
//     peerConnection=new RTCPeerConnection();

//     remoteStream=new MediaStream(); /* this will get the video streem from our remote user and provide the stream to our "remoteStream" variable  */
//     document.getElementById('user-2').srcObject=remoteStream //now , using "srcObject" we are providing the video tag a source to play video;

//     let offer=await peerConnection.createOffer();
//     await peerConnection.setLocalDescription(offer);

//     console.log(offer);
    
// }
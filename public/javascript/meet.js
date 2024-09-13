const socket = io();

// DOM elements
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startCallButton = document.getElementById('startCall');

let localStream;
let remoteStream;
let peerConnection;
const servers = {
  iceServers: [
    { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']} // Public STUN server
  ]
};

// Get user media (camera/microphone)
async function getMedia() {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.srcObject = localStream;
}

// Create peer connection and add media tracks
function createPeerConnection() {
  peerConnection = new RTCPeerConnection(servers);

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit('ice-candidate', event.candidate);
    }
  };

  peerConnection.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
  };

  localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream);
  });
}

// Handle offer creation and send it to the other peer
async function createOffer() {
  createPeerConnection();
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.emit('offer', offer);
}

// Handle answer from the other peer
async function createAnswer(offer) {
  createPeerConnection();
  await peerConnection.setRemoteDescription(offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  socket.emit('answer', answer);
}

// Handle incoming offer, answer, and ICE candidates
socket.on('offer', async (offer) => {
  createAnswer(offer);
});

socket.on('answer', async (answer) => {
  await peerConnection.setRemoteDescription(answer);
});

socket.on('ice-candidate', async (candidate) => {
  try {
    await peerConnection.addIceCandidate(candidate);
  } catch (error) {
    console.error('Error adding received ice candidate', error);
  }
});

// Start the video call
startCallButton.addEventListener('click', async () => {
  await getMedia();
  createOffer();
});




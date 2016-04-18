(function(){
//initialize Global Values.
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(100, 100, 100);
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
var canvas = document.body.appendChild(renderer.domElement);
var controls = new THREE.VRControls(camera);
var effect = new THREE.VREffect(renderer);

init();
function init(){
effect.setSize(window.innerWidth, window.innerHeight);
//-------------//
//initialize values.
scene.add(camera);
//------------//
//Setting up the Display
//create the id for the canvas you want to display the video on.
canvas.id = 'canvas';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
//-----------//
var video = document.createElement('video');//create the video and call the source.
video.src = 'mery.mp4';
video.setAttribute('crossorigin', 'anonymous'), ('webkit-playsinline');
document.getElementById('canvas').appendChild(video);
//after canvas has been created appendChild video element.

function bindPlay() {
	video.play();
	document.body.removeEventListener('click', 'bindPlay');
}
document.body.addEventListener('click', bindPlay, true);
//----------//
//Setting up the sphere.

var sphere = new THREE.SphereGeometry(500, 60, 40);
sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

//load texture.
var videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;
videoMaterial = new THREE.MeshBasicMaterial({
	map: videoTexture
});
var videoMesh = new THREE.Mesh(sphere, videoMaterial);
scene.add(videoMesh);
//Create the VR manager.
var params = {
	hideButton: false,//Default is false.
	isUndistorted: false//default is false.
};
var manager = new WebVRManager(renderer, effect, params);
//Request ainmation frame.
animate();
function render(){
	effect.render(scene, camera);
}
//var lastRender = 0;
function animate(renderer) {
	//var delta = Math.min(renderer - lastRender, 500);
	//Update controls
	controls.update();
	//Render scene through manager
	manager.render(scene, camera, renderer);
	requestAnimationFrame(animate);

	render();
}
//--------//
//Kick off loop.
animate (performance ? performance.now() : Date.now());

//Resize.
function onResize(e) {
	effect.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}

window.addEventListener('resize', onResize, true);
window.addEventListener('vrdisplaypresentchange', onResize, true);
}
})();
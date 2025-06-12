import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

let camera, scene, renderer;
let mesh;

init();
animate();

function getSlugFromPath() {
    const path = window.location.pathname;
    return path === '/' ? 'home' : path.slice(1);
}

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 1;

    scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    
    // Get the slug and try to load a texture
    const slug = getSlugFromPath();
    const textureLoader = new THREE.TextureLoader();
    
    // Try common image extensions
    const extensions = ['png', 'jpg', 'jpeg', 'gif'];
    let material = new THREE.MeshNormalMaterial(); // Default fallback
    
    // Function to try loading texture with different extensions
    function tryLoadTexture(index = 0) {
        if (index >= extensions.length) {
            // No texture found, use default material
            createMesh(material);
            return;
        }
        
        const imagePath = `/images/${slug}.${extensions[index]}`;
        
        textureLoader.load(
            imagePath,
            // Success callback
            function(texture) {
                material = new THREE.MeshBasicMaterial({ map: texture });
                createMesh(material);
            },
            // Progress callback (optional)
            undefined,
            // Error callback - try next extension
            function(error) {
                tryLoadTexture(index + 1);
            }
        );
    }
    
    function createMesh(mat) {
        mesh = new THREE.Mesh( geometry, mat );
        scene.add( mesh );
    }
    
    // Start trying to load texture
    tryLoadTexture();

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;

    renderer.render( scene, camera );

} 
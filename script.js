(() => {
  window.addEventListener('DOMContentLoaded', () => {
    
    window.addEventListener('keydown', (event) => {
      switch(event.key) {
        case 'Escape':
          run = event.key !== 'Escape';
          break;
        case ' ':
          isDown = true;
          break;
        default:
      }
    }, false);

    window.addEventListener('keyup', (event) => {
      isDown = false;
    }, false);

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjecttionMatrix();
    }, false);

    const loader = new THREE.TextureLoader();
    texture = loader.load('./bono.jpeg', init);

  }, false);

  let run = true;
  let isDown = false;

  let scene;
  let camera;
  let renderer;
  let geometry;
  let materialPoint;
  let points;
  let axesHelper;
  let texture;

  const CAMERA_PARAM = {
    fovy: 60,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 30.0,
    x: 0.0,
    y: 5.0,
    z: 10.0,
    lookAt: new THREE.Vector3(0.0, 0.0, 0.0),
  };

  const RENDERER_PARAM = {
    clearColor: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const MATERIAL_PARAM_POINT = {
    color: 0xffffff,
    size: 0.1,
    sizeAttenuation: true
  }

  function init() {
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(RENDERER_PARAM.clearColor));
    renderer.setSize(RENDERER_PARAM.width, RENDERER_PARAM.height);
    const wrapper = document.querySelector('#webgl');
    wrapper.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(
      CAMERA_PARAM.fovy,
      CAMERA_PARAM.aspect,
      CAMERA_PARAM.near,
      CAMERA_PARAM.far
    );
    camera.position.set(CAMERA_PARAM.x, CAMERA_PARAM.y, CAMERA_PARAM.z);
    camera.lookAt(CAMERA_PARAM.lookAt);

    materialPoint = new THREE.PointsMaterial(MATERIAL_PARAM_POINT);
    materialPoint.map = texture;

    geometry = new THREE.Geometry();
    const COUNT = 10000;
    const SIZE = 20.0;
    for (let i = 0; i <= COUNT; ++i) {
      const x = (Math.random() - 0.5) * 2.0 * SIZE;
      const y = (Math.random() - 0.5) * 2.0 * SIZE;
      const z = (Math.random() - 0.5) * 2.0 * SIZE;
      const point = new THREE.Vector3(x, y, z);
      geometry.vertices.push(point);
    }

    points = new THREE.Points(geometry, materialPoint);
    scene.add(points);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    run = true;
    render();
  }

  function render() {
    if(run === true){requestAnimationFrame(render);}
    points.rotation.x += 0.00025;
    points.rotation.y += 0.00075;
    renderer.render(scene, camera);
  }
})();
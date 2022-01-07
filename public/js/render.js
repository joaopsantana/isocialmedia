var animation = bodymovin.loadAnimation({
  container: document.getElementById('lottie1'), 
  path: 'img/image1.json', 
  renderer: 'svg', 
  loop: true, 
  autoplay: true,
  name: "lottie1"
});
var animation2 = bodymovin.loadAnimation({
  container: document.getElementById('lottie2'), 
  path: 'img/image2.json', 
  renderer: 'svg', 
  loop: true, 
  autoplay: true, 
  name: "lottie2"
});
var animation3 = bodymovin.loadAnimation({
  container: document.getElementById('lottie3'), 
  path: 'img/image3.json', 
  renderer: 'svg', 
  loop: true, 
  autoplay: true, 
  name: "lottie3" 
});
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});
window.onload=function(){
  const buttonInstall = document.getElementById('buttonInstall');
  buttonInstall.addEventListener('click', (e) => {
    deferredPrompt.prompt();
  });
}
window.addEventListener('load', () => {
  const alert = document.getElementById('buttonInstall');
  if (navigator.standalone) {
    alert.classList.add('d-none');
  } else if (matchMedia('(display-mode: standalone)').matches) {
    alert.classList.add('d-none');
  } else {
    //console.log('Browser Tab');
  }
});
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
}
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
const alert2 = document.getElementById('buttonInstall');
if (isIos() && !isInStandaloneMode()) {
  this.setState({showInstallMessage:true});
  alert2.classList.add('d-none');
}
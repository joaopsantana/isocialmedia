var button = document.getElementById("trending");
var valnulos = document.getElementById('valnulos');
var ctx = document.getElementById("myChart");
var elemento = document.getElementById("elemento");
var button2 = document.getElementById("consult");
var onloadCallback = function() {
  widgetId1 = grecaptcha.render('html_element1', {
    'sitekey' : '6LdxF4IcAAAAAP9gBfGkbsQTmmThYHg57Ha7aCqX',
    'theme' : 'light'
  });
  widgetId2 = grecaptcha.render('html_element2', {
    'sitekey' : '6LdxF4IcAAAAAP9gBfGkbsQTmmThYHg57Ha7aCqX',
    'theme' : 'light'
  });
};
const input1 = document.querySelector("#Input1");
const version1 = /^[\.a-zA-Z0-9,() ]*$/;
input1.addEventListener("keypress", event => {
  if (!version1.test(event.key)) {
    event.preventDefault();
  }
});
button.addEventListener('click', e => {
  send();
});
function send() {
  firebase.auth().currentUser.getIdToken().then(function(token) {
    var cresolve1 = grecaptcha.getResponse(widgetId1);
    fetch("https://thesocialmediaapi.herokuapp.com/toptwitter", {
      method:'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'recaptcha': cresolve1
      }
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.success = true){
        var refwr = firebase.database().ref('twitter/trending');
        refwr.once('value', function(values) {
          if (values.exists()) {
            grecaptcha.reset(widgetId1);
            elemento.classList.remove("d-none");
            valnulos.innerHTML = "";
            var name = values.val().n
            var hour = values.val().h
            var volume = values.val().v
            var listadosnulos = values.val().a
            addData(myChart, name, volume);
            valnulos.innerHTML = reviewTemplate(listadosnulos);
            var date = new Date(hour);
            var datex = date.getDate();
            var month = date.getMonth();
            var year = date.getFullYear();
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            var time = "" + datex + "/" + month + "/" + year + " às " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            document.getElementById('hour').innerHTML = "";
            document.getElementById('hour').innerHTML += `
              <p class='mt-4 text-center'>As informações foram atualizadas em: ${time}</p>  
            `
          } else {
            grecaptcha.reset(widgetId1);
            alert("Ocorreu um erro, tente novamente mais tarde.");
          }
        });
      } 
    });
  });
};
button2.addEventListener('click', e => {
  send2();
});
function send2() {
  firebase.auth().currentUser.getIdToken().then(function(token) {
    var cresolve2 = grecaptcha.getResponse(widgetId2);
    var text = document.getElementById('Input1').value;
    fetch("https://thesocialmediaapi.herokuapp.com/twittersentim", {
      method:'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'recaptcha': cresolve2,
        'Content-type':'application/json'
      },
      body:JSON.stringify({text:text})
    })
    .then(response => response.json())
    .then((response) => {
      var respon = JSON.parse(response.msg)
      if (response.success == false) {
        grecaptcha.reset(widgetId2);
        alert("Ocorreu um erro, tente novamente mais tarde.");
      } else {
        grecaptcha.reset(widgetId2);
        document.getElementById('respon').innerHTML = "";
        for (i = 0; i < respon.length; i++) {
          document.getElementById('respon').innerHTML += `
            <p class='mt-4'>${respon[i]}</p>  
          `
        }
      }  
    });
  });
};
function reviewTemplate(listadosnulos) {
  return `
    <p class="mt-4 text-wrap text-break">Existem tópicos sem volume de referência definido no momento, esses tópicos não foram inseridos no gráfico acima.</p>
    <p class="mt-4 text-wrap text-break">A lista dos Trending Topics sem volume é: "${listadosnulos}"</p>
  `
}
var myChart = new Chart(ctx, {
  type: 'bar',
  indexAxis: 'y',
  data: {
    datasets: [{
    	label: "Volume dos twittes",
      	backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"]
    }]
  },
  options: {
  	indexAxis: 'y',
  	skipNull: true,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
      	display : true,
        maxTicksLimit: 0,
        gridLines: {
          	drawBorder: true
        },
        ticks: {
        	beginAtZero: true
        }
      }],
      xAxes: [{
        display: true,
        ticks: {
         	beginAtZero: true
        }
      }]
    },
    legend: { display: false },
    title: {
      display: true,
      text: 'Twitters no Trending Topics e o seu volume'
    }
  }
});
function addData(chart, label, data) {
  chart.data.labels = label;
  chart.data.datasets.forEach((dataset) => {
    dataset.data = data
  });
  chart.update();
}
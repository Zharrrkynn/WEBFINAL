
$(document).ready(function(){

  $("#fadeBtn").on("click", function(){ $(".img-grid img").fadeToggle(500); });
  $("#shuffleBtn").on("click", function(){
    var imgs = $(".img-grid").children().toArray();
    for(var i = imgs.length -1;i>0;i--){ var j = Math.floor(Math.random()*(i+1)); [imgs[i],imgs[j]]=[imgs[j],imgs[i]]; }
    $(".img-grid").empty().append(imgs);
    $(".img-grid").children().hide().fadeIn(600);
  });
  $(".click-img").on("click", function(){ $(this).toggleClass("active").animate({width:'toggle'},200).animate({width:'toggle'},200); });


  const themeToggle = document.getElementById("themeToggle");
  function applyTheme(){ if(localStorage.getItem("theme")==="dark"){ document.body.classList.add("dark-mode"); } else { document.body.classList.remove("dark-mode"); } }
  applyTheme();
  if(themeToggle){ themeToggle.addEventListener("click", ()=>{ document.body.classList.toggle("dark-mode"); localStorage.setItem("theme", document.body.classList.contains("dark-mode")?"dark":"light"); }); }


  const form = document.getElementById("contactForm");
  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var valid = true;
      ["name","email","message"].forEach(function(id){
        var el = document.getElementById(id);
        if(!el.value.trim()){ el.classList.add("is-invalid"); valid=false; } else { el.classList.remove("is-invalid"); }
      });
      var email = document.getElementById("email");
      var re = /^\S+@\S+\.\S+$/;
      if(email.value && !re.test(email.value)){ email.classList.add("is-invalid"); valid=false; }
      if(!valid) return;
      var conf = $('<div class="modal fade" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Message sent</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><p>Thank you! Your message was validated locally (demo).</p></div></div></div></div>');
      $("body").append(conf);
      var bs = new bootstrap.Modal(conf[0]); bs.show();
      conf.on('hidden.bs.modal', function(){ conf.remove(); });
      form.reset();
    });
  }


  const quoteEl = document.getElementById("quote");
  if(quoteEl){
    fetch("https://api.quotable.io/random").then(r=>r.json()).then(data=>{ quoteEl.textContent = `"${data.content}" — ${data.author}`; }).catch(()=>{ quoteEl.textContent = "Quote service unavailable."; });
  }


  const weatherEl = document.getElementById("weatherData");
  if(weatherEl){
    const apiKey = "3d8c16be24615dd2436539ac7ae57258"; \
    const city = "Astana";
    fetch(`https:
      if(data && data.main){
        weatherEl.innerHTML = `<p><strong>${city}</strong> — ${data.weather[0].description}, ${data.main.temp}°C</p>`;
      } else {
        weatherEl.textContent = "Unable to load weather data (check API key).";
      }
    }).catch(()=>{ weatherEl.textContent = "Unable to load weather data."; });
  }
});
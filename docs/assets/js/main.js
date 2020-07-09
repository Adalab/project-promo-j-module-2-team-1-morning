"use strict";const fr=new FileReader,uploadBtn=document.querySelector(".js__profile-trigger"),fileField=document.querySelector(".js__profile-upload-btn"),profileImage=document.querySelector(".js__profile-image"),profilePreview=document.querySelector(".js__profile-preview");function getImage(e){const t=e.currentTarget.files[0];fr.addEventListener("load",writeImage),fr.readAsDataURL(t)}function writeImage(){profileImage.style.backgroundImage=`url(${fr.result})`,profilePreview.style.backgroundImage=`url(${fr.result})`,checkPalette(),storeObject()}function fakeFileClick(){fileField.click()}function showCollapsible(e){const t=document.querySelectorAll(".js-collapsibleParent"),a=document.querySelectorAll(".js-collapsibleParent > h3"),n=document.querySelectorAll(".js-collapsibleParent > .arrow"),o=document.querySelectorAll(".js-collapsibleChild");e.target===a[0]||e.target===n[0]||e.target===t[0]?(o[0].classList.toggle("hide-design"),o[1].classList.add("hide-fill"),o[2].classList.add("hide-share"),n[0].classList.toggle("arrow-active"),n[1].classList.remove("arrow-active"),n[2].classList.remove("arrow-active"),card.classList.remove("large")):e.target===a[1]||e.target===n[1]||e.target===t[1]?(o[0].classList.add("hide-design"),o[1].classList.toggle("hide-fill"),o[2].classList.add("hide-share"),n[0].classList.remove("arrow-active"),n[1].classList.toggle("arrow-active"),n[2].classList.remove("arrow-active"),card.classList.toggle("large")):e.target!==a[2]&&e.target!==n[2]&&e.target!==t[2]||(o[0].classList.add("hide-design"),o[1].classList.add("hide-fill"),o[2].classList.toggle("hide-share"),n[0].classList.remove("arrow-active"),n[1].classList.remove("arrow-active"),n[2].classList.toggle("arrow-active"),card.classList.remove("large"))}uploadBtn&&uploadBtn.addEventListener("click",fakeFileClick),fileField&&fileField.addEventListener("change",getImage),document.addEventListener("click",showCollapsible);const form=document.querySelector(".form"),card=document.querySelector(".card__viewer"),background=document.querySelector(".card-background"),cardDone=document.querySelector(".js-carddone");let checkedPalette;const palettes=document.querySelectorAll(".palette");function changeColors(e){background.classList.add("run-animation"),e.target===palettes[0]?(card.classList.add("js-palette1"),card.classList.remove("js-palette2","js-palette3","js-palette4")):e.target===palettes[1]?(card.classList.remove("js-palette3","js-palette1","js-palette4"),card.classList.add("js-palette2")):e.target===palettes[2]?(card.classList.add("js-palette3"),card.classList.remove("js-palette2","js-palette1","js-palette4")):e.target===palettes[3]&&(card.classList.add("js-palette4"),card.classList.remove("js-palette3","js-palette2","js-palette1")),setTimeout((function(){background.classList.remove("run-animation")}),1e3);for(const e of palettes)e.checked&&(checkedPalette=e.value);checkPalette(),checkFormValidity(),storeObject()}for(const e of palettes)e.addEventListener("change",changeColors);const person={name:document.querySelector(".js-personName"),job:document.querySelector(".js-personJob"),email:document.querySelector(".js-email"),phone:document.querySelector(".js-mobile"),linkedin:document.querySelector(".js-linkedin"),github:document.querySelector(".js-github"),photo:document.querySelector(".card--img")},defaultPerson={name:"Nombre Apellido",job:"Front-end Developer"},inputName=document.querySelector("#name"),inputJob=document.querySelector("#job"),inputEmail=document.querySelector("#email"),inputPhone=document.querySelector("#phone"),inputLinkedin=document.querySelector("#linkedin"),inputGithub=document.querySelector("#github"),buttonCard=document.querySelector(".button__card"),socialIcons=document.querySelectorAll(".social-info");function paintCard(e){e.target===inputName?person.name.innerHTML=""!==inputName.value?inputName.value:defaultPerson.name:e.target===inputJob?person.job.innerHTML=""!==inputJob.value?inputJob.value:defaultPerson.job:e.target===inputEmail?""===inputEmail.value||!1===e.target.checkValidity()?person.email.classList.add("hidden"):!0===e.target.checkValidity()&&(person.email.href="mailto:"+inputEmail.value,person.email.classList.remove("hidden")):e.target===inputPhone?""===inputPhone.value||!1===e.target.checkValidity()?person.phone.classList.add("hidden"):!0===e.target.checkValidity()&&(person.phone.href="tel:"+inputPhone.value,person.phone.title=inputPhone.value,person.phone.classList.remove("hidden")):e.target===inputLinkedin?""===inputLinkedin.value||!1===e.target.checkValidity()?person.linkedin.classList.add("hidden"):!0===e.target.checkValidity()&&(person.linkedin.href="https://www.linkedin.com/in/"+inputLinkedin.value,person.linkedin.classList.remove("hidden")):e.target===inputGithub&&(""===inputGithub.value||!1===e.target.checkValidity()?person.github.classList.add("hidden"):!0===e.target.checkValidity()&&(person.github.href="https://github.com/"+inputGithub.value,person.github.classList.remove("hidden"))),checkFormValidity()}const buttonReset=document.querySelector(".btn--reset");function resetForm(){document.querySelector(".form").reset(),person.name.innerHTML=defaultPerson.name,person.job.innerHTML=defaultPerson.job,person.photo.style.backgroundImage="url('./assets/images/imagen-prueba.jpg')",profilePreview.style.backgroundImage="none",!1===person.phone.classList.contains(".hidden")&&person.phone.classList.add("hidden"),person.phone.href="",!1===person.email.classList.contains(".hidden")&&person.email.classList.add("hidden"),person.email.href="",!1===person.linkedin.classList.contains(".hidden")&&person.linkedin.classList.add("hidden"),person.github.href="",!1===person.github.classList.contains(".hidden")&&person.github.classList.add("hidden"),person.github.href="",card.classList.add("js-palette1"),card.classList.remove("js-palette2","js-palette3","js-palette4"),checkFormValidity(),storeObject()}buttonReset&&buttonReset.addEventListener("click",resetForm);let linkTwitter,dataObject={};function createCardObject(){showCardDone(),createDataObject(),sendRequest(dataObject)}function showCardDone(){buttonCard.hasAttribute("disable")||(cardDone.classList.remove("hidden"),buttonCard.classList.add("btn--disable"),buttonCard.setAttribute("disabled",""))}function createDataObject(){dataObject={palette:checkedPalette,name:inputName.value,job:inputJob.value,email:inputEmail.value,phone:inputPhone.value,linkedin:inputLinkedin.value,github:inputGithub.value,photo:fr.result||getPicLocal()}}function sendRequest(e){fetch("https://us-central1-awesome-cards-cf6f0.cloudfunctions.net/card/",{method:"POST",body:JSON.stringify(e),headers:{"content-type":"application/json"}}).then((function(e){return e.json()})).then((function(e){showURL(e)})).catch((function(e){console.log(e)}))}buttonCard&&buttonCard.addEventListener("click",createCardObject);const linkCard=document.querySelector(".link__card");function showURL(e){e.success?(linkTwitter=e.cardURL,twitterShare(linkTwitter),linkCard.innerHTML="<a href="+e.cardURL+' target="_blank">'+e.cardURL+"</a>"):linkCard.innerHTML="Muahaha ¡otro error humano!"+e.error}function twitterShare(e){document.querySelector(".button__twitter").href="http://twitter.com/share?text=Aquí tienes mi Maniac coder's Awesome Profile Cards🖥️&hashtags=adalaber,promoJemison&user_mentions=Adalab_Digital&url="+e}function storeObject(){createDataObject(),localStorage.setItem("userData",JSON.stringify(dataObject))}function getFromLocalStorage(){const e=localStorage.getItem("userData"),t=JSON.parse(e);if(null!==t){for(let e=0;e<palettes.length;e++)palettes[e].value===t.palette&&(palettes[e].checked=!0,card.className="card__viewer",card.classList.add("js-palette"+(parseInt(e)+parseInt(1))));inputName.value=t.name,person.name.innerHTML=inputName.value?t.name:defaultPerson.name,inputJob.value=t.job,person.job.innerHTML=inputJob.value?t.job:defaultPerson.job,inputEmail.value=t.email,person.email.href=t.email,inputPhone.value=t.phone,person.phone.href=t.phone,inputLinkedin.value=t.linkedin,person.linkedin.href=t.linkedin,inputGithub.value=t.github,person.github.href=t.github,person.photo.style.backgroundImage=`url(${t.photo})`,""!==inputEmail.value&&person.email.classList.remove("hidden"),""!==inputPhone.value&&person.phone.classList.remove("hidden"),""!==inputLinkedin.value&&person.linkedin.classList.remove("hidden"),""!==inputGithub.value&&person.github.classList.remove("hidden")}checkFormValidity()}function checkFormValidity(){""!==inputName.value&&""!==inputJob.avlue&&""!==inputEmail.value&&""!==inputPhone.value&&!0===form.checkValidity()?(buttonCard.classList.remove("btn--disable"),buttonCard.classList.add("btn--enable"),buttonCard.removeAttribute("disabled")):(buttonCard.classList.remove("btn--enable"),buttonCard.classList.add("btn--disable"),buttonCard.setAttribute("disabled",""))}if(form&&getFromLocalStorage(),form){function handleForm(){paintCard(event),storeObject()}form.addEventListener("keyup",handleForm)}function checkPalette(){for(const e of palettes)e.checked&&(checkedPalette=e.value)}function getPicLocal(){const e=localStorage.getItem("userData"),t=JSON.parse(e);return null!==t?t.photo:""}let slideIndex=1;function showSlide(e){let t=document.querySelectorAll(".js-slide");e>=t.length?slideIndex=0:e<0&&(slideIndex=t.length-1);for(let e=0;e<t.length;e++)t[e].style.display="none";t[slideIndex].style.display="flex"}const next=document.querySelector(".next"),prev=document.querySelector(".prev");function plusSlide(e){clearInterval(timer),showSlide(slideIndex+=e)}let timer;next&&next.addEventListener("click",(function(){plusSlide(1)})),prev&&prev.addEventListener("click",(function(){plusSlide(-1)})),prev&&(timer=setInterval((function(){showSlide(slideIndex+=1)}),4e3));let evilChat=document.querySelector(".evil-chat"),evilContainer=document.querySelector(".evil-chat__container");const evilBot=document.querySelector(".evil-bot"),greetings=["Diría que me alegro de verte, pero mentiría","Hoy es un gran día para conquistar el mundo","¿¡Es que no sabes llamar a la puerta!?","Lo que vengas a hacer, hazlo rapidito.","¿Necesitas ayuda? Lo siento, pero no me apetece","¡Disfruta de nuestras tarjetas! Creo que no me pagan lo suficiente como para decir esto"],emailReaction=["Pero, ¡revisa luego los correos que te lleguen!","¿Email? ¿Todavía no domináis la telepatía?"];inputEmail&&inputEmail.addEventListener("blur",(function(){evilTalk(emailReaction,4e3)}));const phoneReaction=["Da igual que pongas tu teléfono porque siempre tienes el móvil en silencio","El teléfono no es obligatorio, porque a ti nunca te llama nadie"],linkedinReaction=["Linkedin es el instagram de los trabajos. ¡Todo es potureo!","Actualiza tu foto de Linkedin que la que tienes es de hace 10 años"],githubReaction=["¡Gracias! Así podré robarte tu código","¿Sabes que tener github no te convierte en programadora, verdad?"],createCard=["Ya tienes lo que querías, ¿me puedes dejar en paz?","Estupendo, ahora tus datos están en mi poder ¡muahaha!"];buttonCard&&buttonCard.addEventListener("click",(function(){evilTalk(createCard,5e3)}));const reset=["¡No estás conforme con nada! ¿te apetece destruir el mundo conmigo?","Equivocarse es humano...y los humanos deben ser destruidos"],hooverBoot=["¡ Quita tus sucias manos de encima, humano!","¿Se puede saber que demonios haces?","¡Acabaré contigo y con tu ridículo planeta!"];function updateMessages(){const e=[`<b>${inputName.value}</b>, ¿sabes que he venido a conquistar tu mundo?`,`Encantado, <b>${inputName.value}</b>, me alegra conocer tu nombre antes de acabar contigo`];inputName.addEventListener("blur",(function(){evilTalk(e,4e3)}));const t=[`Vaya, como <b>${inputJob.value}</b> debes tener buen sueldo ¡Qué pena que vaya a destruir el mundo`,"¿Trabajar? Por eso los humanos sois una especie inferior"];inputJob.addEventListener("blur",(function(){evilTalk(t,4e3)}))}form&&form.addEventListener("keyup",(function(){updateMessages()}));let missingInputs=[];function randomN(e){return Math.floor(Math.random()*e)}function evilTalk(e,t){evilBot.classList.add("talk"),evilContainer.classList.add("fadein"),evilChat.innerHTML=e[randomN(e.length)],setTimeout((function(){evilContainer.classList.add("fadeout"),evilContainer.classList.remove("fadein"),evilBot.classList.remove("talk")}),t)}if(form){const e=localStorage.getItem("userData"),t=JSON.parse(e);if(null!==t){const e=t.name;evilTalk([`Vaya, vaya <b>${e}</b> con que de vuelta, ¿eh?`,`Parece que no has tenido un buen día, <b>${e}</b>, se te ven las ojeras.`,`¿Otra vez aquí, <b>${e}</b>? ¿Es que no tienes amigos? Ha, ha, ha.`],5e3)}else evilTalk(greetings,4e3)}evilBot&&evilBot.addEventListener("mouseover",(function(){evilTalk(hooverBoot,4e3)})),buttonReset&&buttonReset.addEventListener("click",(function(){evilTalk(reset,4e3)}));const palettesReaction=["¡Qué color más absurdo!","¡Buuuh, ese color es muy soso!","¿Esos colores? ¿En serio?","¡Ese es perfecto! Buena elección."],imageReaction=["Tienes una belleza muy particular","Bueno, si no tienes otra mejor..."];
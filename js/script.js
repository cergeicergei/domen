
// Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if(iconMenu){
	iconMenu.addEventListener("click", function(e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

// Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink =>{
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e){
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight;

			if(iconMenu.classList.contains('_active')){
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top:gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}

// popup

const popupLinks = document.querySelectorAll('.popup-link');
const lockPadding = document.querySelectorAll('.lock-padding');
const body = document.querySelector('body');

let unlock = true;

const timeout = 800;

if(popupLinks.length > 0 ){
	for(let index = 0; index < popupLinks.length; index++){
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function(e){
			const popupName = popupLink.getAttribute('href').replace('#','');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length > 0){
	for(let index = 0; index < popupCloseIcon.length;index++){
		const el = popupCloseIcon[index];
		el.addEventListener("click", function(e){
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}
function popupOpen (curentPopup){
	if(curentPopup && unlock){
		const popupAtive = document.querySelector('.popup.open');
		if(popupAtive){
			popupClose(popupAtive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function(e){
			if(!e.target.closest('.popup__content')){
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}
function popupClose(popupAtive, doUnlock = true){
	if(unlock){
		popupAtive.classList.remove('open');
		if(doUnlock){
			bodyUnlock();
		}
	}
}
function bodyLock(){
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	if(lockPadding.length > 0){
	for(let index = 0; index < lockPadding.length;index++){
		const el = lockPadding[index];
		el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('_lock');
	
	unlock = false;
	setTimeout(function(){
		unlock = true;
	}, timeout);
}

function bodyUnlock(){
	setTimeout(function(){
		if(lockPadding.length > 0){
		for (let index = 0; index < lockPadding.length;index++){
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}
	}
		body.style.paddingRight = '0px';
		body.classList.remove('_lock');
	}, timeout);
	unlock = false;
	setTimeout(function(){
		unlock = true;
	}, timeout);
}
(function(){
	if(!Element.prototype.closest){
		Element.prototype.closest = function(css){
			var node = this;
			while (node){
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	if(!Element.prototype.matches){
		Element.prototype.matches = Element.prototype.matchesSelector ||
		Element.prototype.webkitMatchesSelector ||
		Element.prototype.mozMatchesSelector ||
		Element.prototype.msMatchesSelector;
	}	
})();
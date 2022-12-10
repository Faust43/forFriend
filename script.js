//--------------------таймер--------------//
const currentHoliday = '2023-01-01 00:00:00' //Дата праздника в формате "гггг-мм-дд чч:мм:сс"
function getTimeRemaining(endtime) {
	const t = Date.parse(endtime) - Date.parse(new Date()),
		days = Math.floor(t / (1000 * 60 * 60 * 24)),
		hours = Math.floor((t / (1000 * 60 * 60)) % 24),
		minutes = Math.floor((t / (1000 * 60)) % 60),
		seconds = Math.floor((t / 1000) % 60)
	return {
		total: t,
		days: days,
		hours: hours,
		minutes: minutes,
		seconds: seconds,
	}
}
function getZero(num) {
	if (num < 10) {
		return `0${num}`
	} else {
		return num
	}
}
function setClock(endtime) {
	let timer = document.querySelector('.timer'),
		timeInterval = setInterval(updateClock, 1000)
	function updateClock() {
		const t = getTimeRemaining(endtime)
		if (t.total <= 0) {
			clearInterval(timeInterval)
			return (timer.innerHTML = `<span>Праздник уже наступил!</span>`)
		}
		return (timer.innerHTML = `<h2><span>Новый Год близко!!!</span></h2>
						<p><span>До праздника осталось:</span></p>
						<div class="timer__elem">
							<span>${getZero(t.days)}</span><br />
							<span>дней</span>
						</div>
						<div class="timer__elem">
							<span>${getZero(t.hours)}</span><br />
							<span>часов</span>
						</div>
						<div class="timer__elem">
							<span>${getZero(t.minutes)}</span><br />
							<span>минут</span>
						</div>
						<div class="timer__elem">
							<span>${getZero(t.seconds)}</span><br />
							<span>секунд</span>
						</div>`)
	}
}
setClock(currentHoliday)

//----------------скрол товаров-----------//
const scrollItems = document.querySelectorAll('.price-list__row	')
document.querySelectorAll('.price-list__button-left').forEach((elem, i) =>
	elem.addEventListener('click', () => {
		let offset = -Number(scrollItems[i].style.left.replace(/[^0-9]/g, '')),
			sizeOfBlock = scrollItems[i].childNodes[1].getBoundingClientRect()
		if (scrollItems[i].childElementCount > 2) {
			offset += sizeOfBlock.width + 20
		}
		if (offset > 20) {
			offset =
				-sizeOfBlock.width -
				20 -
				(sizeOfBlock.width + 20) * (scrollItems[i].childElementCount - 3)
		}
		scrollItems[i].style.left = offset + 'px'
	})
)
document.querySelectorAll('.price-list__button-right').forEach((elem, i) =>
	elem.addEventListener('click', () => {
		let offset = -Number(scrollItems[i].style.left.replace(/[^0-9]/g, '')),
			sizeOfBlock = scrollItems[i].childNodes[1].getBoundingClientRect()
		if (scrollItems[i].childElementCount > 2) {
			offset -= sizeOfBlock.width + 20
		}
		if (
			offset <=
			-sizeOfBlock.width +
				20 -
				(sizeOfBlock.width + 20) * (scrollItems[i].childElementCount - 2)
		) {
			offset = 0
		}
		scrollItems[i].style.left = offset + 'px'
	})
)

//------------------кнопки навигации----------------------//
function goToElement(classOfElement) {
	let positionOnPage = document
		.querySelector('.' + classOfElement)
		.getBoundingClientRect()
	scrollTo({
		top: positionOnPage.top + window.pageYOffset,
		behavior: 'smooth',
	})
}
document.querySelectorAll('.menu__item').forEach((el, i) => {
	el.addEventListener('click', () => {
		if (i === 0 || i === 3) {
			goToElement('main__price-list')
		}
		if (i === 1 || i === 4) {
			goToElement('main__contacts')
		}
		if (i === 2 || i === 5) {
			goToElement('main__about-us')
		}
	})
})
//-------------------кнопки контактов---------------//

const rouletteField = document.querySelector('.roullete-field__spin')
const rouletteItems = document.querySelectorAll('.roullete-field__spin-row')

const winBetBlue = document.querySelector('.roullete-field__wincolor--blue')
const windBetGreen = document.querySelector('.roullete-field__wincolor--green')
const windBetYellow = document.querySelector('.roullete-field__wincolor--yellow')

const betCountGreen = document.querySelector('.counter-last-bet--green')
const betCountBlue = document.querySelector('.counter-last-bet--blue')
const betCountYellow = document.querySelector('.counter-last-bet--yellow')

const userHeaderBalance = document.querySelector('.header__user-item-wallet span')
const actionFieldSelect = document.querySelector('.roullete-field__action-select p')
const roulleteFieldBalance = document.querySelector('.roullete-field__action-balance p')
const selectBtn = document.getElementById('select-btn')
const selectModal = document.querySelector('.select-modal')
const modalSelectBtn = document.querySelector('.select-modal__submit')
const allCloseModalBtns = document.querySelectorAll('.close-modal')
const joinInColumnBtns = document.querySelectorAll('.roullete-field__plyers-btn')
const allColumns = document.querySelectorAll('.roullete-field__plyers-column ')

const timerSecondField = document.querySelector('.counter-last-bet-timer--sec')
const timerMillisecondField = document.querySelector('.counter-last-bet-timer--millisec')
const lastColorsContainer = document.querySelector('.last-bets-list')
const allActionModals = document.querySelectorAll('.action-modal')
const failedModal = document.querySelector('.failed-modal')
const succesModal = document.querySelector('.succes-modal')
const withdrawalModalBtns = document.querySelector('.withdraw-modal__wrapper')
const openWithdrawModal = document.querySelector('#withdraw-btn')
const withdrawModal = document.querySelector('.withdraw-modal')
const withdraForms = document.querySelectorAll('.withdraw-modal__item-form')
const cardWithrowInput = document.querySelector('.withdraw-modal__item--cards-form input')
const depositBtn = document.querySelector('.header__user-deposit-btn')
const depositModal = document.querySelector('.deposit-modal')
const depositModalFormWrapper = document.querySelector('.deposit-modal__form-wrapper')
const depositList = document.querySelector('.deposit-modal__list')
const notificationBtn = document.getElementById('notofication-btn')
const notificationModal = document.querySelector('.notification-modal')

depositModalFormWrapper.addEventListener('input', function (e) {
  const rubInp = this.querySelector('#rub')
  const usdInp = this.querySelector('#usd')

  if (e.target.id === 'rub') usdInp.value = (e.target.value / 100).toFixed(2)
  if (e.target.id === 'usd') rubInp.value = (e.target.value * 100).toFixed(2)
  // if (e.target.id === 'usd') rubInp.value = rubInp.value / 100
})

notificationBtn.addEventListener('click', (e) => {
  notificationModal.classList.toggle('show-modal')
})

depositList.addEventListener('click', function (e) {
  const items = this.querySelectorAll('.deposit-modal__item')
  const item = e.target.closest('.deposit-modal__item')
  if (!item) return

  items.forEach(item => {
    item.classList.remove('deposit-modal__item--active')
  })

  item.classList.add('deposit-modal__item--active')
})

const itemsLength = rouletteItems.length
let currentItem = 0.46
let betAmount = {}
let sound = true
// let currentItem = itemsLength - 1.295

showItem(currentItem)

function playSound() {
  if (sound) {
    const audio = new Audio('./roulettesound.mp3')
    audio.play()
  }
}

const user = {
  nickname: "Gojra",
  betColor: [],
  balance: 1000,
  selected: 0,
  avatar: document.querySelector('.header__user-avatar-img'),

  get avatarUrl() {
    return this.avatar.getAttribute('src')
  },

}

function modalOpen() {
  this.classList.add('show-modal')
}

function modalClose() {
  this.classList.remove('show-modal')
}

function showActionModal(action) {
  allActionModals.forEach(modal => {
    modal.classList.remove('show-modal')

    modal.querySelector('.action-modal_close')
      .addEventListener('click', () => {
        modal.classList.remove('show-modal')
      })
  })

  if (action == 'failed') {
    failedModal.classList.add('show-modal')
    setTimeout(() => {
      failedModal.classList.remove('show-modal')
    }, 5000);
  }

  if (action == 'succes') {
    succesModal.classList.add('show-modal')
    setTimeout(() => {
      succesModal.classList.remove('show-modal')
    }, 5000);
  }
}

function updateUi(user) {
  userHeaderBalance.textContent = user.balance.toFixed(2) + "$"
  roulleteFieldBalance.textContent = user.balance.toFixed(2) + "$"

  actionFieldSelect.textContent = user.selected.toFixed(2) + "$"

  updateColumnInfo()
  updateDoubleInfo()
}

function updateDoubleInfo() {
  const textField = document.querySelector('#double-amount')
  let sum = 0
  allColumns.forEach(column => {
    const header = column.querySelector('.roullete-field__plyers-column-header')

    const priceAmount = header.querySelector('.roullete-field__plyers-win span')
    sum += parseFloat(priceAmount.textContent)
  })
  textField.textContent = sum.toFixed(2) + "$"
}

function updateColumnInfo() {

  allColumns.forEach(column => {
    const playerAmount = column.querySelector('.roullete-field__plyers-count span')
    const columnBody = column.querySelector('.roullete-field__plyers-column-body')
    const playersLength = columnBody.children.length
    const usersBetArray = column.querySelectorAll('.roullete-field__plyer span')
    const totalBetAmount = column.querySelector('.roullete-field__plyers-win span')


    playerAmount.textContent = playersLength

    const result = Array.from(usersBetArray).reduce((acc, item) => {
      return acc + parseFloat(item.textContent)
    }, 0)
    totalBetAmount.textContent = !result ? '0.00$' : `${result.toFixed(2)}$`
  })

}

function showItem(currentItem) {
  rouletteItems.forEach((item, index) => {
    item.style.transform = `translate(${100 * (index - currentItem)}%, -50%)`
  })
}

function generateRandomNum() {
  const values = [1, 1.03, 1.04, 1.08, 1.09, 1.11, 1.12, 1.15, 1.17, 1.185, 1.195, 1.2, 1.21, 1.23, 1.25, 1.295, 1.28, 1.3, 1.31, 1.33, 1.37, 1.4, 1.41, 1.5, 1.65, 1.75, 1.9, 2];
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}
// 1.06
function updateBetInfo() {
  const greenCount = betsInfo.lastBetsArray.reduce((acc, item) => {
    if (item == 'green') acc++
    return acc
  }, 0)
  const blueCount = betsInfo.lastBetsArray.reduce((acc, item) => {
    if (item == 'blue') acc++
    return acc
  }, 0)
  const yellowCount = betsInfo.lastBetsArray.reduce((acc, item) => {
    if (item == 'yellow') acc++
    return acc
  }, 0)

  betCountBlue.textContent = blueCount
  betCountGreen.textContent = greenCount
  betCountYellow.textContent = yellowCount

  addLastColors(lastColorsContainer)
}

function cleanColumns() {
  allColumns.forEach(column => {
    const columnBody = column.querySelector('.roullete-field__plyers-column-body')
    columnBody.innerHTML = ""
    updateUi(user)
  })
  user.betColor = []
}

function startTimer(duration) {
  let durationInSeconds = duration
  let elapsedMilliseconds = 1000

  const timerInterval = setInterval(() => {
    if (durationInSeconds > 0) {

      timerMillisecondField.textContent = String(elapsedMilliseconds).padStart(4, '0')
      elapsedMilliseconds -= 100
      if (elapsedMilliseconds === 0) {
        timerMillisecondField.textContent = String(elapsedMilliseconds).padStart(4, '0')
        elapsedMilliseconds = 1000
        durationInSeconds--
        timerSecondField.textContent = String(durationInSeconds).padStart(2, "0")
      }
    } else {
      clearInterval(timerInterval)
    }
  }, 100);
}

function addBetColor(btn) {
  const currentColor = btn.dataset.color

  if (currentColor === 'blue') {
    user.betColor.push('blue')
  }
  if (currentColor === 'green') {
    user.betColor.push('green')
  }
  if (currentColor === 'yellow') {
    user.betColor.push('yellow')
  }

  return currentColor
}

function checkResults(lastWinBet) {

  if (user.betColor.includes(lastWinBet)) {
    const currenTColor = betAmount[lastWinBet]
    user.balance += currenTColor * betsInfo.factor[lastWinBet]
    updateUi(user)
    betAmount = {}
  }
}

function addLastColors(container) {
  const item = document.createElement('div')
  item.classList.add('last-bets-list__item', `last-bets-list__item--${betsInfo.lastWinBet}`)

  if (container.children.length < 50) {
    container.appendChild(item)
  } else {
    container.appendChild(item)
    container.children[0].remove()
  }
}

function validateWithrawForm(form) {
  if (form.classList.contains('withdraw-modal__item--crypto-form')) {
    if (
      form.querySelector('input').value.split(" ").join("").length != 20
    ) {
      return false
    }
  }

  if (form.classList.contains('withdraw-modal__item--cards-form')) {
    if (
      form.querySelector('input').value.split(" ").join("").length != 16
    ) {
      return false
    }
  }

  return true
}

class Bet {
  constructor(avatar, name, betAmount) {
    this.avatar = avatar
    this.name = name
    this.betAmount = betAmount
  }

  addInColumn(colunm) {
    const player = `
    <div class="roullete-field__plyer" data-self="true">
    <img src="${this.avatar}" alt="">
    <p>${this.name}</p>
    <span>${this.betAmount}$</span>
  </div>
    `
    colunm.insertAdjacentHTML('beforeend', player)
  }

}

const betsInfo = {
  lastBetsArray: [],
  factor: {
    'blue': 2,
    'green': 2,
    'yellow': 14,
  },

  get lastWinBet() {
    return this.lastBetsArray[this.lastBetsArray.length - 1]
  },

  set addLastBet(amount) {
    if (this.lastBetsArray.length === 50) {
      this.lastBetsArray.shift()
      this.lastBetsArray.push(amount)
    } else {
      this.lastBetsArray.push(amount)
    }
  },

}

setInterval(() => {
  const randomNum = generateRandomNum()
  currentItem = itemsLength - randomNum

  const greenNums = [1, 1.08, 1.09, 1.11, 1.12, 1.23, 1.25, 1.28, 1.37, 1.4, 1.41, 2, 1.65]
  const blueNums = [1.2, 1.15, 1.17, 1.185, 1.195, 1.21, 1.295, 1.3, 1.31, 1.33, 1.5, 1.75, 1.9]
  const yellowNums = [1.04, 1.03,]
  // 1.06
  if (greenNums.includes(randomNum)) {
    betsInfo.addLastBet = 'green'
  }
  if (blueNums.includes(randomNum)) {
    betsInfo.addLastBet = 'blue'
  }
  if (yellowNums.includes(randomNum)) {
    betsInfo.addLastBet = 'yellow'
  }

  rouletteItems.forEach(item => item.style.transition = '2s ease')
  // playSound()
  // sound = false
  showItem(currentItem)
  setTimeout(() => {

    setTimeout(() => {
      currentItem = 0.46
      rouletteItems.forEach(item => item.style.transition = '0s')
      showItem(currentItem)
    }, 1000);

    if (betsInfo.lastWinBet == 'blue') {
      winBetBlue.classList.add('color-show')
      updateBetInfo()
    }
    if (betsInfo.lastWinBet == 'green') {
      windBetGreen.classList.add('color-show')
      updateBetInfo()
    }
    if (betsInfo.lastWinBet == 'yellow') {
      windBetYellow.classList.add('color-show')
      updateBetInfo()
    }

    allColumns.forEach(column => {
      column.classList.remove('roullete-field__plyers-column--disabled')
    })

    startTimer(10)
    checkResults(betsInfo.lastWinBet)
    cleanColumns()

  }, 3500);
  windBetGreen.classList.remove('color-show')
  windBetYellow.classList.remove('color-show')
  winBetBlue.classList.remove('color-show')

  allColumns.forEach(column => {
    column.classList.add('roullete-field__plyers-column--disabled')
  })
}, 14000);

startTimer(14)

selectBtn.addEventListener('click', modalOpen.bind(selectModal))
openWithdrawModal.addEventListener('click', modalOpen.bind(withdrawModal))
depositBtn.addEventListener('click', modalOpen.bind(depositModal))

withdraForms.forEach(form => {
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    const parent = this.parentElement
    const modal = parent.parentElement

    if (validateWithrawForm(form)) {
      if (user.selected >= 5) {
        user.selected = 0
        updateUi(user)

        modalClose.call(modal)
        showActionModal('succes')
        cardWithrowInput.value = ""
      } else {
        showActionModal('failed')
        cardWithrowInput.value = ""
      }
    } else {
      cardWithrowInput.value = ""
      showActionModal('failed')
    }

  })
})

cardWithrowInput.addEventListener('keydown', (e) => {
  let value = cardWithrowInput.value.replace(/\s/g, '')
  value = value.replace(/(.{4})/g, '$1 ');

  cardWithrowInput.value = value

  const length = cardWithrowInput.value.replace(/\s/g, '').length;
  if (length >= 16 && e.key !== 'Backspace') {
    e.preventDefault()
  }

})

allCloseModalBtns.forEach(btn => {
  const parent = btn.parentElement
  const modal = parent.parentElement
  btn.addEventListener('click', modalClose.bind(modal))
})

function submitSelectedAmount() {
  const selectAmount = parseFloat(document.querySelector('.select-modal__amount').value)
  const parent = modalSelectBtn.parentElement
  const modal = parent.parentElement

  if (selectAmount >= 0.2 && selectAmount <= user.balance) {
    user.balance -= selectAmount
    user.selected += selectAmount

    document.querySelector('.select-modal__amount').value = ""

    updateUi(user)
    modalClose.call(modal)
    showActionModal('succes')
  } else {
    showActionModal('failed')
  }
}

modalSelectBtn.addEventListener('click', submitSelectedAmount)
selectModal.addEventListener('keydown', (e) => {
  if (e.code === 'Enter') submitSelectedAmount()
})

joinInColumnBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const parent = btn.parentElement
    const column = parent.parentElement
    const columnBody = column.querySelector('.roullete-field__plyers-column-body')
    const self = column.querySelector('[data-self]')

    if (!self) {
      if (user.selected > 0) {
        new Bet(user.avatarUrl, user.nickname, user.selected)
          .addInColumn(columnBody)

        addBetColor(btn)

        const betColor = addBetColor(btn)
        if (betColor == 'green') betAmount.green = user.selected
        if (betColor == 'blue') betAmount.blue = user.selected
        if (betColor == 'yellow') betAmount.yellow = user.selected

        user.selected = 0
        updateUi(user)
        showActionModal('succes')
      } else {
        showActionModal('failed')
      }
    } else {
      self.querySelector('span').textContent = parseFloat(self.querySelector('span').textContent) + user.selected + "$"
    }
  })
})

withdrawalModalBtns.addEventListener('click', function (e) {
  const currentItem = e.target.closest('.withdraw-modal__item')
  const parent = this.parentElement
  const forms = parent.querySelectorAll('.withdraw-modal__item-form')
  const btns = parent.querySelectorAll('.withdraw-modal__item')

  if (currentItem) {

    forms.forEach(form => form.classList.remove('withdraw-modal__item-form-show'))
    btns.forEach(form => form.classList.remove('withdraw-modal__item--active'))

    const currentForm = parent.querySelector(`[data-form="${currentItem.id}"]`)
    currentForm.classList.add('withdraw-modal__item-form-show')
    currentItem.classList.add('withdraw-modal__item--active')
  }
})

updateUi(user)


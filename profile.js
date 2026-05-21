const logoutBtn = document.querySelector('.logout')
const profileName = document.getElementById('profileName')
const profileEmail = document.getElementById('profileEmail')

const userString = localStorage.getItem('user')
let userInfo = null

try {
  userInfo = userString ? JSON.parse(userString) : null
} catch (error) {
  userInfo = null
}

if (!userInfo) {
  window.location.href = './enter.html'
} else {
  if (profileName) {
    const name = userInfo.name ? userInfo.name.trim() : 'друг'
    profileName.textContent = `Привет ${name}!`
  }

  if (profileEmail) {
    profileEmail.textContent = userInfo.email || ''
  }
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user')
    window.location.href = './enter.html'
  })
}

const avatarContainer = document.getElementById('avatarContainer')
const avatarInput = document.getElementById('avatarInput')
const avatarImage = document.getElementById('avatarImage')

const savedAvatar = localStorage.getItem('avatar')
if (savedAvatar && avatarImage) {
  avatarImage.src = savedAvatar
}

if (avatarContainer && avatarInput) {
  avatarContainer.addEventListener('click', () => {
    avatarInput.click()
  })
}

if (avatarInput) {
  avatarInput.addEventListener('change', (event) => {
    const file = event.target.files && event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result === 'string') {
        if (avatarImage) {
          avatarImage.src = result
        }
        localStorage.setItem('avatar', result)
      }
    }
    reader.readAsDataURL(file)
  })
}

const box1 = document.getElementById('box1')
const box2 = document.getElementById('box2')
const box1Input = document.getElementById('box1Input')
const box2Input = document.getElementById('box2Input')
const viewInteriorButton = document.getElementById('viewInteriorButton')

const updateInteriorButton = () => {
  if (!viewInteriorButton) return
  const hasBox1 = Boolean(localStorage.getItem('box1Image'))
  const hasBox2 = Boolean(localStorage.getItem('box2Image'))
  viewInteriorButton.style.display = hasBox1 && hasBox2 ? 'block' : 'none'
}

const applyBoxImage = (box, src) => {
  if (!box) return
  box.style.backgroundImage = `url(${src})`
  box.style.backgroundSize = 'cover'
  box.style.backgroundPosition = 'center'
  box.classList.add('has-image')
  const placeholder = box.querySelector('.upload-placeholder')
  if (placeholder) {
    placeholder.style.display = 'none'
  }
  updateInteriorButton()
}

const clearBoxImage = (box, storageKey) => {
  if (!box) return
  box.style.backgroundImage = ''
  box.classList.remove('has-image')
  const placeholder = box.querySelector('.upload-placeholder')
  if (placeholder) {
    placeholder.style.display = 'flex'
  }
  localStorage.removeItem(storageKey)
  updateInteriorButton()
}

const savedBox1 = localStorage.getItem('box1Image')
const savedBox2 = localStorage.getItem('box2Image')

if (savedBox1) {
  applyBoxImage(box1, savedBox1)
}

if (savedBox2) {
  applyBoxImage(box2, savedBox2)
}

if (box1 && box1Input) {
  box1.addEventListener('click', () => box1Input.click())
}

if (box2 && box2Input) {
  box2.addEventListener('click', () => box2Input.click())
}

const handleBoxChange = (input, box, storageKey) => {
  if (!input || !box) return
  input.addEventListener('change', (event) => {
    const file = event.target.files && event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result === 'string') {
        applyBoxImage(box, result)
        localStorage.setItem(storageKey, result)
      }
    }
    reader.readAsDataURL(file)
  })
}

handleBoxChange(box1Input, box1, 'box1Image')
handleBoxChange(box2Input, box2, 'box2Image')

const box1Remove = box1 && box1.querySelector('.remove-image')
const box2Remove = box2 && box2.querySelector('.remove-image')

updateInteriorButton()

if (box1Remove) {
  box1Remove.addEventListener('click', (event) => {
    event.stopPropagation()
    clearBoxImage(box1, 'box1Image')
    updateInteriorButton()
  })
}

if (box2Remove) {
  box2Remove.addEventListener('click', (event) => {
    event.stopPropagation()
    clearBoxImage(box2, 'box2Image')
    updateInteriorButton()
  })
}

if (viewInteriorButton) {
  viewInteriorButton.addEventListener('click', () => {
    window.location.href = './interior.html'
  })
}

const indexLink = document.querySelector('li.index-link')
if (indexLink) {
  indexLink.style.cursor = 'pointer'
  indexLink.addEventListener('click', () => {
    window.location.href = './index.html'
  })
}

const adviceItems = document.querySelectorAll('.advice-item')
const adviceButton = document.getElementById('adviceButton')

const fallbackAdvices = [
  'Поливайте растения рано утром или вечером, чтобы вода не испарялась слишком быстро.',
  'Проветривайте помещение, но избегайте сквозняков для тропических растений.',
  'Используйте рыхлый, водопроницаемый грунт для лучшего дренажа.',
  'Обрезайте засохшие листья, чтобы растение направляло силы на новый рост.',
  'Подкармливайте растения специальным удобрением раз в 2–4 недели в период вегетации.',
  'Перемещайте горшок с комнатными растениями в разные части комнаты, чтобы выявить оптимальное освещение.',
  'Проверяйте состояние корней при пересадке, чтобы вовремя удалить гниль.',
  'Увлажняйте воздух вокруг растений, если в комнате слишком сухо.'
]

const getRandomAdvices = (advices, count) => {
  const shuffled = [...advices].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, advices.length))
}

const setAdviceItems = (texts) => {
  adviceItems.forEach((item, index) => {
    item.textContent = texts[index] || ''
  })
}

const loadAdvice = async () => {
  if (!adviceItems.length) return
  adviceItems.forEach(item => (item.textContent = 'Загружается совет...'))

  try {
    const response = await fetch('./data/gardening-advice.json', { cache: 'no-store' })
    if (!response.ok) {
      throw new Error('Advice API unavailable')
    }
    const data = await response.json()
    if (data && Array.isArray(data.advices) && data.advices.length > 0) {
      setAdviceItems(getRandomAdvices(data.advices, adviceItems.length))
      return
    }
  } catch (error) {
    console.warn('Advice API failed, using fallback', error)
  }

  setAdviceItems(getRandomAdvices(fallbackAdvices, adviceItems.length))
}

if (adviceButton) {
  adviceButton.addEventListener('click', loadAdvice)
}

loadAdvice()

// EDIT PROFILE MODAL
const editBtn = document.querySelector('.edit')
const editModal = document.getElementById('editModal')
const closeModalBtn = document.getElementById('closeModal')
const cancelBtn = document.getElementById('cancelBtn')
const editForm = document.getElementById('editForm')
const usernameInput = document.getElementById('usernameInput')
const favoriteFlowersInput = document.getElementById('favoriteFlowers')

const openEditModal = () => {
  if (!editModal) return
  const savedName = userInfo?.name || ''
  const savedFlowers = localStorage.getItem('favoriteFlowers') || ''
  
  usernameInput.value = savedName
  favoriteFlowersInput.value = savedFlowers
  
  editModal.style.display = 'flex'
}

const closeEditModal = () => {
  if (!editModal) return
  editModal.style.display = 'none'
}

if (editBtn) {
  editBtn.addEventListener('click', openEditModal)
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeEditModal)
}

if (cancelBtn) {
  cancelBtn.addEventListener('click', closeEditModal)
}

if (editForm) {
  editForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const newUsername = usernameInput.value.trim()
    const newFlowers = favoriteFlowersInput.value.trim()
    
    if (!newUsername) {
      alert('Please enter a username')
      return
    }
    
    if (userInfo) {
      userInfo.name = newUsername
      localStorage.setItem('user', JSON.stringify(userInfo))
    }
    
    if (newFlowers) {
      localStorage.setItem('favoriteFlowers', newFlowers)
    }
    
    if (profileName) {
      profileName.textContent = `Привет ${newUsername}!`
    }
    
    closeEditModal()
  })
}

if (editModal) {
  editModal.addEventListener('click', (e) => {
    if (e.target === editModal) {
      closeEditModal()
    }
  })
}

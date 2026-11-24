(() => {
  const cards = [...document.querySelectorAll('.item')]
  const filter = document.querySelector('#archive-controls')
  const buttons = [...filter.querySelectorAll('[data-choice]')]
  const search = document.querySelector('#search')
  const category = document.querySelector('#category')
  const year = document.querySelector('#year')
  const result = document.querySelector('#results')
  const clear = document.querySelector('#clear')
  const empty = document.querySelector('#empty')
  const dialog = document.querySelector('#image-dialog')
  const preview = document.querySelector('#dialog-image')
  const dialogTitle = document.querySelector('#dialog-title')
  const desc = document.querySelector('#dialog-description')
  let type = 'all'
  let opener = null

  function update() {
    const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean)
    let count = 0
    for (const item of cards) {
      const haystack = (item.textContent + ' ' + item.dataset.group).toLowerCase()
      const visible = (type === 'all' || item.dataset.kind === type)
        && (category.value === 'all' || item.dataset.group === category.value)
        && (year.value === 'all' || item.dataset.year === year.value)
        && terms.every(term => haystack.includes(term))
      item.hidden = !visible
      if (visible) count++
    }
    result.textContent = count + (count === 1 ? ' item' : ' items')
    empty.hidden = count !== 0
    clear.hidden = type === 'all' && category.value === 'all' && year.value === 'all' && !terms.length
  }
  function setType(value) {
    type = value
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.choice === value))
    update()
  }
  function reset() {
    search.value = ''
    category.value = 'all'
    year.value = 'all'
    setType('all')
  }
  function revealHash() {
    const item = cards.find(card => '#' + card.id === location.hash)
    if (item?.hidden) { reset(); item.scrollIntoView({block:'start'}) }
  }
  const initial = new URLSearchParams(location.search).get('type')
  if (initial === 'photo' || initial === 'certificate') setType(initial)
  filter.hidden = false
  for (const btn of buttons) btn.addEventListener('click', () => setType(btn.dataset.choice))
  search.addEventListener('input', update)
  category.addEventListener('change', update)
  year.addEventListener('change', update)
  clear.addEventListener('click', reset)
  window.addEventListener('hashchange', revealHash)
  revealHash()
  if (typeof dialog.showModal !== 'function') return
  for (const link of document.querySelectorAll('.open-proof')) {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
      const item = link.closest('.item')
      event.preventDefault()
      opener = link
      preview.src = link.href
      preview.alt = link.querySelector('img').alt
      dialogTitle.textContent = item.querySelector('h2').textContent
      desc.textContent = item.querySelector('.item-summary').textContent
      dialog.showModal()
    })
  }
  dialog.addEventListener('close', () => {
    preview.removeAttribute('src')
    opener?.focus()
    opener = null
  })
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close() })
})()

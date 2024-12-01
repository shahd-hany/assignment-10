var bname = document.getElementById('bName')
var burl = document.getElementById('bUrl')
var eBox = document.getElementById('ebox')
var infoBox = document.getElementById('infobox')
var socBox = document.getElementById('sobox')
var oBox = document.getElementById('obox')
var alertBox = document.getElementById('alert')
var alertName=document.getElementById('alertName')
var updateList = []
const urlRegex = /^(https?:\/\/)([\w-]+\.)+[\w-]{2,}(\/[\w-._~:/?#[\]@!$&'()*+,;=]*)?$/
const nameValid = /^[\w.]{3,}$/

var elist = JSON.parse(localStorage.getItem('elist')) || []
var infolist = JSON.parse(localStorage.getItem('infolist')) || []
var sociallist = JSON.parse(localStorage.getItem('soclist')) || []
var olist = JSON.parse(localStorage.getItem('olist')) || []
var urlNames = JSON.parse(localStorage.getItem('urlnames')) || []

display(elist, eBox)
display(infolist, infoBox)
display(sociallist, socBox)
display(olist, oBox)

function addUrl(list, targetBox) {
  if (urlValidation() && nameValidation()) {
    var urllist = {
      id: Date.now(),
      name: bname.value,
      url: burl.value
    }
    list.push(urllist)
    if (list === elist) localStorage.setItem('elist', JSON.stringify(elist))
    else if (list === infolist) localStorage.setItem('infolist', JSON.stringify(infolist))
    else if (list === sociallist) localStorage.setItem('soclist', JSON.stringify(sociallist))
    else if (list === olist) localStorage.setItem('olist', JSON.stringify(olist))
    urlNames.push({ id: urllist.id, name: urllist.name })
    localStorage.setItem('urlnames', JSON.stringify(urlNames))

    display(list, targetBox)
  }
}

function display(list, targetBox) {
  var box = ''
  for (var i = 0; i < list.length; i++) {
    box += `
      <div class="mt-4">
        <i class="fa-solid fa-bookmark"></i><p class="fw-bold">${list[i].name}</p>
        <a href="${list[i].url}" target="_blank"><button class="btn btn-outline-success">Visit</button></a>
        <button class="btn btn-outline-danger" onclick="deleteUrl(${list[i].id}, '${targetBox.id}')">Delete</button>
      </div>
    `
  }
  console.log(targetBox.id)
  targetBox.innerHTML = box
}

function deleteUrl(id, boxId) {
  let list
  switch (boxId) {
    case 'ebox': list = elist; break
    case 'infobox': list = infolist; break
    case 'sobox': list = sociallist; break
    case 'obox': list = olist; break
  }
  list = list.filter(function (item) {
    return item.id !== id
  })
  switch (boxId) {
    case 'ebox': elist = list; localStorage.setItem('elist', JSON.stringify(elist)); break
    case 'infobox': infolist = list; localStorage.setItem('infolist', JSON.stringify(infolist)); break
    case 'sobox': sociallist = list; localStorage.setItem('soclist', JSON.stringify(sociallist)); break
    case 'obox': olist = list; localStorage.setItem('olist', JSON.stringify(olist)); break
  }
  urlNames = urlNames.filter(function (url) {return url.id !== id})
  localStorage.setItem('urlnames', JSON.stringify(urlNames))
  display(list, document.getElementById(boxId))
}


function urlValidation() {
  if (urlRegex.test(burl.value)) {
    burl.classList.replace('is-invalid', 'is-valid')
    alertBox.classList.replace('d-block', 'd-none')
    return true
  } else {
    burl.classList.add('is-invalid')
    burl.classList.remove('is-valid')
    alertBox.classList.replace('d-none', 'd-block')
    return false
  }
}

function nameValidation() {
  alertName.classList.remove('d-block')
  alertName.classList.add('d-none')
  if (nameValid.test(bname.value)) {
    bname.classList.remove('is-invalid')
    bname.classList.add('is-valid')
    for (var i = 0; i < urlNames.length; i++) {
      if (urlNames[i].name == bname.value) {
      alertName.classList.replace('d-none', 'd-block')
      return false
    }
  }
    return true
  } else {
    bname.classList.add('is-invalid')
    bname.classList.remove('is-valid')
    return false
  }
}

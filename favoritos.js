// Variables
let favorites = JSON.parse(localStorage.getItem('favorites')) || []
const imageContainer = document.querySelector('.image')


//Eventos
//clicar no botao, pegar imagem externa
document.querySelector('button').onclick = () => updateImage()
// clicar na imagem
imageContainer.onclick = () => updateAll()


//Methods

function getState() {
    const imageSource = document.querySelector('.image img').src

    const index = favorites.indexOf(imageSource)
    const existsInLocalStorage = index != -1

    return { imageSource, index, existsInLocalStorage}
}

function updateAll() {
    updateFavorites()
    updateClasses()
}

function updateFavorites() {
    const { existsInLocalStorage, index, imageSource } = getState()

    if(existsInLocalStorage) {
        favorites.splice(index, 1)
    }
    else {
        favorites.push(imageSource)
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
}

function updateClasses() {
    const {existsInLocalStorage} = getState()

    imageContainer.classList.remove('fav')

    if(existsInLocalStorage) {
        imageContainer.classList.add('fav')
    }
    
}

async function updateImage() {
    await getExternalImage()
    updateClasses()
} 

// pegar imagem externa
async function getExternalImage() {
    const response = await fetch('https://source.unsplash.com/random')

    imageContainer
    .innerHTML = `<img src="${response.url}" >`


}

getExternalImage()









const url = "https://api.nasa.gov/planetary/apod?api_key=L7oEY6qKz8bakbdW7e1AgscrSg3QazwqRta89PG7&start_date=2022-06-21"

const starryBgLoop = document.getElementById("starryBgLoop")
console.log(starryBgLoop.playbackRate)
const searchContainer = document.getElementById("searchContainer")
const particlesJs = document.getElementById("particles-js")
const headerDataPage = document.getElementById("headerDataPage")
const ufo = document.getElementById("ufo")
const ufoImage = document.getElementById("ufoImage")
ufoImage.addEventListener("click", warp)


const getData = async () => {
    const response = await fetch(url)
    console.log("response", response)
    const data = await response.json()
    console.log("data", data)

    return data
}

async function controller() {
    const dataList = await getData()
    console.log("dataList", dataList)

    createDropdownMenu(dataList)
    searchContainerEventListeners(dataList)
}
controller()


const createDropdownMenu = (list) => {
    const dropdownMenu = document.getElementById("dropdownMenu")
    const mediaTypes = list.map(e => e.media_type)
    console.log("mediaTypes", mediaTypes)
    const uniqueMediaTypes = [... new Set(mediaTypes)]
    console.log("uniqueMediaTypes", uniqueMediaTypes)
    uniqueMediaTypes.forEach(mediaType => {
        let option = document.createElement("option")
        option.innerHTML = mediaType
        option.value = mediaType
        dropdownMenu.appendChild(option)
    })
}

const searchContainerEventListeners = (list) => {
    document.getElementById("dropdownMenu")
        .addEventListener("change", (event) => {
            filterByMenu(list)
        }
        )
}

const filterByMenu = (list) => {
    const dropdownMenuValue = document.getElementById("dropdownMenu").value
    console.log("dropdownMenuValue", dropdownMenuValue)

}





function warp() {
    starryBgLoop.playbackRate = 10
    ufo.classList.replace("ufo", "warp")

    function noUfo() {
        ufo.style.display = "none"
        starryBgLoop.playbackRate = 1
        particlesJs.style.display = "none"
        headerDataPage.style.display = "block"
        searchContainer.style.display = "grid"
    }
    setTimeout(noUfo, 6000)
}
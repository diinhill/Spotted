
const url = "https://api.nasa.gov/planetary/apod?api_key=L7oEY6qKz8bakbdW7e1AgscrSg3QazwqRta89PG7&start_date=2022-08-21"

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
    createCards(dataList)
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
        })
    document.getElementById("inputMenu")
        .addEventListener("input", (event) => {
            filterByMenu(list)
        })
}

const filterByMenu = (list) => {
    const dropdownMenuValue = document.getElementById("dropdownMenu").value
    console.log("dropdownMenuValue", dropdownMenuValue)

}

const createCards = (list) => {

    let row = document.getElementById("row")
    let popUpImages = document.getElementById("popUpImages")
    row.innerHTML = ""

    list.forEach(listItem => {

        const col = document.createElement("div")
        col.setAttribute("class", "col-sm-12 col-md-6 col-lg-4")
        row.appendChild(col)

        const card = document.createElement("div")
        card.setAttribute("class", "card embed-responsive position-relative")
        col.appendChild(card)

        const cardBody = document.createElement("div")
        cardBody.setAttribute("class", "card-body embed-responsive position-absolute")
        card.appendChild(cardBody)

        const cardTitle = document.createElement("div")
        cardTitle.setAttribute("class", "card-title position-absolute")
        cardTitle.innerHTML = listItem.title
        cardBody.append(cardTitle)

        const cardButton = document.createElement("btn")
        cardButton.setAttribute("class", "btn")
        cardButton.setAttribute("type", "button")
        cardButton.append(cardTitle)
        cardBody.appendChild(cardButton)

        const cardDate = document.createElement("div")
        cardDate.setAttribute("class", "card-subtitle position-absolute bottom-0 start-98")
        cardBody.appendChild(cardDate)

        const cardCopyright = document.createElement("div")
        cardCopyright.setAttribute("class", "blockquote position-absolute bottom-0 start-98")
        cardCopyright.innerHTML = listItem.date + " by:<br>" + listItem.copyright
        cardBody.appendChild(cardCopyright)

        if (listItem.media_type == "image") {
            const cardImage = document.createElement("img")
            cardImage.setAttribute("src", listItem.url)
            cardImage.setAttribute("class", "card-img embed-responsive-item position-absolute")
            card.appendChild(cardImage)
            card.addEventListener("click", imageEnlarge)

        }
        else if (listItem.media_type == "video") {
            const cardIframe = document.createElement("iframe")
            cardIframe.setAttribute("src", listItem.url)
            cardIframe.setAttribute("class", "card-iframe embed-responsive-item position-absolute")
            card.appendChild(cardIframe)
            card.addEventListener("click", videoEnlarge)
        }

        card.addEventListener("mouseover", mouseOver)
        card.addEventListener("mouseleave", mouseLeave)

        function mouseOver() {
            cardBody.style.visibility = "visible"
        }
        function mouseLeave() {
            cardBody.style.visibility = "hidden"
        }

        function imageEnlarge() {
            const modalImages = document.createElement("div")
            modalImages.setAttribute("class", "modal")
            modalImages.setAttribute("role", "dialog")
            modalImages.setAttribute("aria-labelledby", "modalLabel")
            modalImages.setAttribute("aria-hidden", "true")
            popUpImages.appendChild(modalImages)

            const modalDialog = document.createElement("div")
            modalDialog.setAttribute("class", "modal-dialog modal-fullscreen")
            modalDialog.setAttribute("role", "document")
            modalImages.appendChild(modalDialog)

            const modalContent = document.createElement("div")
            modalContent.setAttribute("class", "modal-content")
            modalDialog.appendChild(modalContent)

            const modalHeader = document.createElement("div")
            modalHeader.setAttribute("class", "modal-header")

            const modalTitle = document.createElement("h5")
            modalTitle.setAttribute("class", "modal-title")
            modalTitle.setAttribute("id", "modalLabel")
            modalTitle.innerHTML = cardTitle.innerHTML
            modalHeader.appendChild(modalTitle)

            const modalCloseButton = document.createElement("btn")
            modalCloseButton.setAttribute("type", "button")
            modalCloseButton.setAttribute("class", "close")
            modalHeader.appendChild(modalCloseButton)

            const modalCloseButtonSpan = document.createElement("span")
            modalCloseButtonSpan.setAttribute("aria-hidden", "true")
            modalCloseButtonSpan.setAttribute("class", "buttonSpan")
            modalCloseButtonSpan.innerHTML = "x"
            modalCloseButton.appendChild(modalCloseButtonSpan)

            const modalBody = document.createElement("div")
            modalBody.setAttribute("class", "modal-body")
            modalContent.appendChild(modalBody)
            modalBody.appendChild(modalHeader)

            const modalImage = document.createElement("img")
            modalImage.setAttribute("src", listItem.url)
            modalImage.setAttribute("class", "modal-image")
            modalBody.appendChild(modalImage)

            modalCloseButton.addEventListener("click", closeModal)

            function closeModal() {
                modalImages.style.display = "none"
            }
        }

        function videoEnlarge() {
            const modalImages = document.createElement("div")
            modalImages.setAttribute("class", "modal")
            modalImages.setAttribute("role", "dialog")
            modalImages.setAttribute("aria-labelledby", "modalLabel")
            modalImages.setAttribute("aria-hidden", "true")
            popUpImages.appendChild(modalImages)

            const modalDialog = document.createElement("div")
            modalDialog.setAttribute("class", "modal-dialog modal-fullscreen")
            modalDialog.setAttribute("role", "document")
            modalImages.appendChild(modalDialog)

            const modalContent = document.createElement("div")
            modalContent.setAttribute("class", "modal-content")
            modalDialog.appendChild(modalContent)

            const modalIframeHeader = document.createElement("div")
            modalIframeHeader.setAttribute("class", "modal-header modal-iframe-header")
            modalContent.appendChild(modalIframeHeader)

            const modalIframeTitle = document.createElement("h5")
            modalIframeTitle.setAttribute("class", "modal-title modal-iframe-title")
            modalIframeTitle.setAttribute("id", "modalLabel")
            modalIframeTitle.innerHTML = cardTitle.innerHTML
            modalIframeHeader.appendChild(modalIframeTitle)

            const modalCloseButton = document.createElement("btn")
            modalCloseButton.setAttribute("type", "button")
            modalCloseButton.setAttribute("class", "close")
            modalIframeHeader.appendChild(modalCloseButton)

            const modalCloseButtonSpan = document.createElement("span")
            modalCloseButtonSpan.setAttribute("aria-hidden", "true")
            modalCloseButtonSpan.setAttribute("class", "buttonSpan")
            modalCloseButtonSpan.innerHTML = "x"
            modalCloseButton.appendChild(modalCloseButtonSpan)

            const modalBodyIframe = document.createElement("div")
            modalBodyIframe.setAttribute("class", "modal-body-iframe")
            modalContent.appendChild(modalBodyIframe)
            modalBodyIframe.appendChild(modalIframeHeader)

            const modalIframe = document.createElement("iframe")
            modalIframe.setAttribute("src", listItem.url)
            modalIframe.setAttribute("class", "airtable-embed")
            modalBodyIframe.appendChild(modalIframe)

            modalCloseButton.addEventListener("click", closeModal)

            function closeModal() {
                modalImages.style.display = "none"
            }
        }
    })
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
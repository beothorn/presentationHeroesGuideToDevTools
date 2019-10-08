let loadToursForDriver = (driverName) => {
    let formElement = document.getElementById("superVisionFormGrid")
    formElement.innerHTML = ""

    fetch(`/api/drivers/${driverName}/tours`).then(r => r.json()).then( tours => {
        for(let t of tours){
            let clientNameElement = document.createElement("div")
            clientNameElement.appendChild(document.createTextNode(t.client))
            formElement.appendChild(clientNameElement)
            
            let clientTourLoadStart = document.createElement("button")
            let tourFinished = t.finished
            if(tourFinished){
                clientTourLoadStart.appendChild(document.createTextNode("Finished"))
                clientTourLoadStart.enabled = false
                clientTourLoadStart.classList.add("startLoadDisabled")
            }else{
                clientTourLoadStart.appendChild(document.createTextNode("Start load"))
                clientTourLoadStart.enabled = true
                clientTourLoadStart.classList.add("startLoadEnabled")
            }
            formElement.appendChild(clientTourLoadStart)
        }
    })
}

let loadArticles = (toursId) => {
    let allLoaded = () => {
        for(article of Array.from(document.querySelectorAll("#superStrengthFormGrid input"))) {
            if(!article.checked) return false
        }
        return true
    }

    let refreshButton = () => (document.getElementById("startTour").style.display = allLoaded() ? "block" : "none")

    let formElement = document.getElementById("superSpeedForm")
    formElement.innerHTML = ""

    let articlesList = document.createElement("div")
    articlesList.id = "superStrengthFormGrid"
    formElement.appendChild(articlesList)

    let startTour = document.createElement("button")
    startTour.id = "startTour"
    startTour.appendChild(document.createTextNode("Start Tour"))

    fetch(`/api/tours/${toursId}/deliveries`).then(r => r.json()).then( ds => {
        articlesList.innerHTML = ""
        for(d of ds){
            let article = d.article
            let loaded = d.loaded
            let deliveryId = d.id

            let newEntry = document.createElement("div")

            let articleElement = document.createElement("div")
            articleElement.appendChild(document.createTextNode(article))


            let loadedElement = document.createElement("input")
            loadedElement.type = "checkbox"
            loadedElement.checked = loaded

            loadedElement.onchange = (el) =>{
                fetch(`/api/deliveries/${deliveryId}/loaded/${el.target.checked}`, { method : "PUT" }).then(() => {
                    refreshButton()
                    loadToursForDriver("Dragan")
                })
            }

            let checkboxColumn = document.createElement("div")
            checkboxColumn.appendChild(loadedElement)

            articlesList.appendChild(articleElement)
            articlesList.appendChild(checkboxColumn)
        }
        refreshButton()
    })

    formElement.appendChild(startTour)
}



loadArticles(1)
loadToursForDriver("Dragan")
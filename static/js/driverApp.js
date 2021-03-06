const loadToursForDriver = (driverName, gridId) => {
    fetch(`/api/drivers/${driverName}/tours`).then(r => r.json()).then( tours => {
        let formElement = document.getElementById(gridId)
        formElement.innerHTML = ""
        let driverNameElementCol1 = document.createElement("div")
        driverNameElementCol1.appendChild(document.createTextNode("Tours for driver:"))
        driverNameElementCol1.classList.add("gridTitle")
        
        formElement.appendChild(driverNameElementCol1)


        let driverNameElementCol2 = document.createElement("div")
        driverNameElementCol2.appendChild(document.createTextNode(driverName))
        driverNameElementCol2.classList.add("gridTitle")
        driverNameElementCol2.classList.add("driversName")
        formElement.appendChild(driverNameElementCol2)

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
                clientTourLoadStart.appendChild(document.createTextNode("Start tour"))
                clientTourLoadStart.enabled = true
                clientTourLoadStart.classList.add("startLoadEnabled")
            }
            formElement.appendChild(clientTourLoadStart)
        }
    })
}

const loadArticles = (toursId, formId) => {
    let allLoaded = () => {
        for(article of Array.from(document.querySelectorAll("#"+formId+"Grid input"))) {
            if(!article.checked) return false
        }
        return true
    }

    let refreshButton = () => (document.getElementById(formId+"startTour").style.display = allLoaded() ? "block" : "none")

    let formElement = document.getElementById(formId)
    formElement.innerHTML = ""

    let articlesList = document.createElement("div")
    articlesList.id = formId+"Grid"
    formElement.appendChild(articlesList)

    let startTour = document.createElement("button")
    startTour.id = formId+"startTour"
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
                    loadToursForDriver("Charlie", "superVisionFormGrid")
                    loadToursForDriver("Charlie", "superVisionFormGrid2")
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



loadArticles(1, "superSpeedForm")
loadArticles(1, "superSpeedForm2")
loadToursForDriver("Charlie", "superVisionFormGrid")
loadToursForDriver("Charlie", "superVisionFormGrid2")
loadToursForDriver("Edna", "superStrengthFormGrid")
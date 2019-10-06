//<a id="superSpeedFill" style="margin-left: 30px" class="btn btn-primary btn-lg" role="button"><span class="glyphicon glyphicon-wrench" aria-hidden="true"></span>Fill Form</a>

let toursId = 1

let allLoaded = () => {
    for(article of Array.from(document.querySelectorAll("#articlesList li input"))) {
        if(!article.checked) return false
    }
    return true
}

let refreshButton = () => (document.getElementById("startTour").style.display = allLoaded() ? "block" : "none")

let loadArticles = (id) => {

    let formElement = document.getElementById("superSpeedForm")
    formElement.innerHTML = ""

    let articlesList = document.createElement("ul")
    articlesList.id = "articlesList"
    formElement.appendChild(articlesList)

    let startTour = document.createElement("button")
    startTour.id = "startTour"
    startTour.appendChild(document.createTextNode("Start Tour"))

    fetch(`/api/tours/${toursId}/deliveries`).then(r => r.json()).then( ds => {
        articlesList.innerHTML = ""
        console.log(ds)
        for(d of ds){
            let article = d.article
            let loaded = d.loaded
            let deliveryId = d.id

            let newEntry = document.createElement("li")

            let articleElement = document.createElement("span")
            articleElement.appendChild(document.createTextNode(article))

            let loadedElement = document.createElement("input")
            loadedElement.type = "checkbox"
            loadedElement.classList.add("custom-control-input")
            loadedElement.checked = loaded

            loadedElement.onchange = (el) =>{
                fetch(`/api/deliveries/${deliveryId}/loaded/${el.target.checked}`, { method : "PUT" }).then(refreshButton)
            }

            newEntry.appendChild(articleElement)
            newEntry.appendChild(loadedElement)
            articlesList.appendChild(newEntry)
        }
        refreshButton()
    })

    formElement.appendChild(startTour)
}

loadArticles(1)
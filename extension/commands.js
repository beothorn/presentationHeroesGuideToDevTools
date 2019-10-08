if(document.body.dataset['presentation']){
    console.log("Extension loaded")
    var HERO = {
        getTours: (date) => fetch("/api/tours/"+date).then(r => r.json()),
        getTour: (id) => fetch("/api/tour/"+id).then(r => r.json()),
        getToursForDriver: (driversName) => fetch(`/api/drivers/${driversName}/tours`).then(r => r.json()),
        setTourToFinished: (id) => 
            fetch("/api/tour/"+id).then(r => r.json()).then( t => {
                t.finished = true
                fetch("/api/tour/"+id, {
                    method: "PUT", 
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(t)
                })
            }
            ),
        deliveries: (tourId) =>{
            console.table(
                backendState.find(c => c.client == clientName).articles
            )
        },
        drawSomething: () => {
            let c = document.createElement("canvas")
            c.style.display = "none"
            c.width = 1000
            var ctx = c.getContext("2d");
            ctx.fillStyle = "white"
            ctx.fillRect(0, 0, 500, 500);
            ctx.moveTo(0, 100);
            ctx.lineTo(100, 50);
            ctx.stroke();
            ctx.lineTo(200, 100);
            ctx.stroke();
            ctx.lineTo(300, 30);
            ctx.stroke();
            ctx.lineTo(400, 10);
            ctx.stroke();
            let pngUrl = c.toDataURL();
            console.log("%c       ", `font-size: 100px; background: url(${pngUrl}) no-repeat`)
        }
    }

    let loadAllButton = document.createElement("button")
    loadAllButton.style.cssText = "width: 100%;background: #F00;width: 100%;font-size: 1em;color: #fff;"
    loadAllButton.appendChild(document.createTextNode("Load All"))


    loadAllButton.addEventListener("click", () =>{
        for(article of Array.from(document.querySelectorAll("#superStrengthFormGrid input"))) {
            if(!article.checked) article.click()
        }
    })

    let superSpeedForm = document.getElementById("superSpeedForm")
    superSpeedForm.insertBefore(loadAllButton, superSpeedForm.firstChild)

    let hideShowButton = document.createElement("button")
    hideShowButton.appendChild(document.createTextNode("Enable Superpowers"))
    hideShowButton.style.cssText = "background: #2196f3;width: 100%;font-size: 1em;color: #fff;margin-top: 22px;"

    let superVisionExtraInfo = document.createElement("div")
    superVisionExtraInfo.id = "superVisionExtraInfo"
    superVisionExtraInfo.appendChild(document.createTextNode("Info"))
    var superVisionForm = document.getElementById('superVisionForm')
    superVisionForm.appendChild(superVisionExtraInfo)
    superVisionExtraInfo.style.display = "none"
    hideShowButton.addEventListener("click", () =>{
        if(superVisionExtraInfo.style.display === "none"){
            superVisionExtraInfo.style.display = "block"
            hideShowButton.innerHTML = "Hide superpowers"
        }else{
            superVisionExtraInfo.style.display = "none"
            hideShowButton.innerHTML = "Enable Superpowers"
        }
    })
    superVisionForm.appendChild(hideShowButton)

    let updateSuperVision = () => {
        superVisionExtraInfo.innerHTML = ""

        //Driver name is hardcoded, in a real situation we would get the driver's
        //name from somewhere else
        HERO.getToursForDriver("Dragan").then( ts => {
            for(let t of ts){
                let extraInfo = document.createElement("p")
                extraInfo.style.fontSize = "24px"
                extraInfo.appendChild(document.createTextNode(`${t.client} : last sync ${t.lastSync} with app version ${t.appVersion} TourId: ${t.id}`))
                superVisionExtraInfo.appendChild(extraInfo)
            }
        })        
    }

    updateSuperVision()

    let targetNode = document.getElementById('superVisionFormGrid');
    /*
    If you want to react to changes in the DOM, you can use
    the mutation observer.
    Imagine that you want to update the tour info every time 
    the tour list changes
    */
    HERO.superVisionObserver = new MutationObserver((mutationsList, observer) => {
        for(let mutation of mutationsList) {
            if (mutation.type == 'childList') {
                updateSuperVision()
            }
        }
    })
    HERO.superVisionObserver.observe(targetNode, { attributes: true, childList: true, subtree: true })


}
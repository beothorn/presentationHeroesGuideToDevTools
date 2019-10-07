if(document.body.dataset['presentation']){
    console.log("Extension loaded")
    var HERO = {
        hello: () => console.log("It works!!"),
        getTours: (date) => fetch("/api/tours/"+date).then(r => r.json()),
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

    /*
    Because our slides are not dynamic, we can just inject our load all button on our form.
    On your app you will probably want to check out the Mutation observer api, so you can
    inject your button only when the form is created
    */
    let superSpeedForm = document.getElementById("superSpeedForm")
    superSpeedForm.insertBefore(loadAllButton, superSpeedForm.firstChild)
}
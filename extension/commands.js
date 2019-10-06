if(document.body.dataset['presentation']){
    console.log("Extension loaded")
    var HERO = {
        hello: () => console.log("It works!!"),
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
    loadAllButton.appendChild(document.createTextNode("Load All"))

    loadAllButton.addEventListener("click", () =>{
        for(article of Array.from(document.querySelectorAll("#articlesList li input"))) {
            if(!article.checked) article.click()
        }
    })

    document.getElementById("superSpeedForm").appendChild(loadAllButton)
}



/*
document.getElementById("enableSuperVision").addEventListener("click", () =>{
    document.getElementById("superVisionMetadata").style.display = "block"
});

document.getElementById("editClientList").addEventListener("click", () =>{
    document.getElementById("clientList").contentEditable = true
    document.getElementById("clientList").spellcheck = false
    document.getElementById("clientList").style.color = "black"
});

document.getElementById("enableSuperStrength").addEventListener("click", () =>{
    document.getElementById("editClientList").style.display = "block"
});
*/
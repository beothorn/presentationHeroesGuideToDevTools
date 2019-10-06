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
}
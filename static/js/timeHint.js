//This code adds a subtle line over the slides
//when the expectedDuration is up, the line changes color
const timeInMinutes = 35

let startTime = 0
let intervalId = -1
const timer = document.getElementById("timer")

Reveal.addEventListener( 'slidechanged', function( event ) {
    //console.log(event)
    if(event.currentSlide.dataset["expectedDuration"]){
        const expectedDurationStr = event.currentSlide.dataset["expectedDuration"]
        let expectedDuration = 0
        if(expectedDurationStr.endsWith("s")){
            expectedDuration = parseInt(expectedDurationStr.split("s")[0])
        } else{
            expectedDuration = parseInt(expectedDurationStr.split("m")[0]) * 60
        }
        timer.style.display = "block"
        timer.style.backgroundColor= "#000000"
        if(intervalId) clearInterval(intervalId)
        startTime = new Date().getTime();

        intervalId = setInterval(() => {
            const now = new Date().getTime();
            const timePassedInSeconds = Math.floor( (now - startTime) / 1000 );
            if(timePassedInSeconds >= expectedDuration) timer.style.backgroundColor= "#aaaaaa"
        }, 500);
    }else{
        timer.style.display = "none"
    }
} );

let expectedTotalTime = Array.from(document.querySelectorAll(".slides section"))
    .map(s => s.dataset["expectedDuration"])
    .filter(d => d != null)
    .map(d => d.endsWith("s") ? parseInt(d.split("s")[0]) : parseInt(d.split("m")[0]) * 60)
    .reduce((a,b) => a + b, 0)

console.log(`Expected duration: ${expectedTotalTime/60} minutes`)
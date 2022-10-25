let headContainer = document.getElementById("headContainer")
let PreviewImg = document.getElementById("img")
let uploadImg = document.getElementById("uploadImg")
let heightInput = document.getElementById("height")
let widthInput = document.getElementById("width")
let ratioInput = document.getElementById("ratioInput")
let qualityInput = document.getElementById("qualityInput")
let downloadBtn = document.getElementById("downloadBtn")
let inputsSection = document.querySelector(".Inputs-section")
let imgRatio 


uploadImg.addEventListener("change" , function(e){

    let file = e.target.files[0]
    console.log(file)
    if(file){
        let prg = document.getElementById("prg")
        let imgContainer = document.querySelector(".img-container")
        imgContainer.style.width = "100%"
        headContainer.style.border = "none"
        prg.style.display = "none"
        
    }
    PreviewImg.src = URL.createObjectURL(file)
    
    PreviewImg.addEventListener("load",function(){
        heightInput.value = PreviewImg.naturalHeight 
        widthInput.value = PreviewImg.naturalWidth
        imgRatio = PreviewImg.naturalWidth / PreviewImg.naturalHeight 
        inputsSection.style.opacity = "1"
        inputsSection.style.height = "auto"
        inputsSection.style.pointerEvents = "painted"
    })
})


widthInput.addEventListener("keyup", function(){
    let height = ratioInput.checked ?  widthInput.value / imgRatio :heightInput.value
    heightInput.value = Math.floor(height) 
    console.log(imgRatio)
})
heightInput.addEventListener("keyup", function(){
    let width = ratioInput.checked ?  heightInput.value * imgRatio :widthInput.value
    widthInput.value = Math.floor(width) 
    
})


headContainer.addEventListener("click", function(){
    uploadImg.click()
})

downloadBtn.addEventListener("click",function(){
    let canvas = document.createElement("canvas")
    let ctx = canvas.getContext("2d")
    let a = document.createElement("a")
    let imgQulaity = qualityInput.checked ? 0.7 : 1.0
    canvas.width = widthInput.value
    canvas.height = heightInput.value
    canvas.style.display = "none"
    

    ctx.drawImage(PreviewImg ,0,0, canvas.width , canvas.height)
    a.href = canvas.toDataURL("image/jpeg", imgQulaity)
    a.download = new Date().getTime()
    a.click()
    document.body.appendChild(canvas )
})
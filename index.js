

const evtDate = document.getElementById("date")
const evtStartMorn = document.getElementById("entradaManha")
const evtExitMorn = document.getElementById("saidaManha")
const evtStartAfter = document.getElementById("entradaTarde")
const evtExitAfter = document.getElementById("saidaTarde")
const btnAddElement = document.getElementById("addElement")
const btnEdit = document.getElementById("btnEdit")
const btnkillEdit = document.getElementById("btnKillEdit")
const input = document.getElementById("getFile")
const employee = document.getElementById("employee")
const extra = document.getElementById("extra")
const delay = document.getElementById("delay")
const saturday = document.getElementById("check-Saturday")
const divSat = document.getElementById("sat")
const hourWeek = document.getElementById("hour-week")
const hourSaturday = document.getElementById("hour-sat")

const typesOperation = {
    SHOW: "show",
    HIDE: "hide"
}

const week = [
    'Domingo', 
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado'
]


let register = []
let table = document.getElementById('table')
let rIndex
let count
let saturdeyWorked = false

setElements(evtStartMorn,"entradaManha",evtExitMorn)
setElements(evtExitMorn,"saidaManha",evtStartAfter)
setElements(evtStartAfter,"entradaTarde",evtExitAfter)
setElements(evtExitAfter,"saidaTarde",evtExitAfter)



saturday.addEventListener('change', function(){
    if(this.checked){
        divSat.style.display = 'block'
        saturdeyWorked = true
    }else{
        divSat.style.display = 'none'
        saturdeyWorked = false
    }
})

//setando valor horas 

$(function(){
    let hourW = 8
    let hourS = 4
    // $("#hour-week").val(hourWeek)
    hourWeek.value = hourW
    // $("#hour-sat").val(hourSaturday)
    hourSaturday.value = hourS
})

function selectElements(){

    for (let index = 1; index < table.rows.length; index++){

        table.rows[index].onclick = function(){
            rIndex = this.rowIndex
            evtDate.value = this.cells[1].innerHTML
            evtStartMorn.value = this.cells[3].innerHTML
            evtExitMorn.value = this.cells[4].innerHTML
            evtStartAfter.value = this.cells[5].innerHTML
            evtExitAfter.value = this.cells[6].innerHTML
            showEdit(typesOperation.SHOW)
        }
        
    }

}

function showEdit(typesOperation){

    if(typesOperation == 'show'){
        btnEdit.style.display = 'block'
        btnkillEdit.style.display = 'block'
        btnAddElement.style.display = 'none'
    }else{
        btnEdit.style.display = 'none'
        btnkillEdit.style.display = 'none'
        btnAddElement.style.display = 'block'
    }

}

function checkData(){

   

    if((evtDate.value.length == 10 &&
        evtStartMorn.value.length == 5 &&
        evtExitMorn.value.length == 5 &&
        evtStartAfter.value.length == 5 &&
        evtExitAfter.value.length == 5)|| (
        evtDate.value.length == 10 &&
        evtStartMorn.value.length == 5 &&
        evtExitMorn.value.length == 5 && 
        saturdeyWorked &&
        isSaturday()))
    {

        return true

    }else{

        return false

    }

}

function deleteElement(){

    register.splice(rIndex-1,1)
    showEdit(typesOperation.HIDE)
    setDateAfterEdit()
    clearElements()
    ShowElements()

}



function setDateAfterEdit(){

    let tableSize = table.rows.length
    evtDate.value = table.rows[tableSize-1].cells[1].innerHTML
   setNewDate()
}

function setElements(event,id,nextElement){

    event.addEventListener("keyup", (event) => {
        let el = document.getElementById(id).value
        
        if(el.length == 5){
           if(id == 'saidaTarde'){
               
           }else{
            nextElement.focus()
           }
        }
    
    })
    
}

function clearElements(){
    
    rIndex = undefined
    evtStartMorn.value = ''
    evtExitMorn.value = ''
    evtStartAfter.value = ''
    evtExitAfter.value = ''
    evtStartMorn.focus()
}

function addElements(){

    if(checkData()){
        register.push(
             [
                getCount(), 
                evtDate.value,
                getDayOfWeek(),
                evtStartMorn.value,
                evtExitMorn.value,
                evtStartAfter.value,
                evtExitAfter.value,
                getExtraHour().substring(0,1) != '-'?getExtraHour():'00:00',
                getExtraHour().substring(0,1) == '-'?getExtraHour().substring(1):'00:00'
            ]
        )
        
        ShowElements()
        setNewDate()
        clearElements()
    }else{
        alert('Peencha todos horários')
    }

}

function editSelectedElement(){

    if(rIndex != undefined && checkData()){

       register[rIndex-1] =
           [
            rIndex,
           evtDate.value,
           getDayOfWeek(),
           evtStartMorn.value,
           evtExitMorn.value,
           evtStartAfter.value,
           evtExitAfter.value,
           getExtraHour().substring(0,1) != '-'?getExtraHour():'00:00',
           getExtraHour().substring(0,1) == '-'?getExtraHour().substring(1):'00:00'
           ]
        
        showEdit(typesOperation.HIDE)
        setDateAfterEdit()
        ShowElements()
        clearElements()
        
    }

}

function getDayOfWeek(){
    let day = evtDate.value.substring(0,2)
    let month = evtDate.value.substring(3,5)
    let year = evtDate.value.substring(6)

    let currentDate = new Date(`${month}/${day}/${year}`)
    return week[currentDate.getDay()]
}

function getCount(){

    if(register.length == 0){
        count = 1
        return count
    }else{
        return ++count
    }

}

function ShowElements(){
    
    let positiveHour = 0
    let positiveMinuts = 0
    let negativeHour = 0
    let negativeMinuts = 0

    table.innerHTML = "<tr><th>Qtde</th><th>Data</th><th>Dia semana</th><th>Ent Manha</th><th>Sai Manha</th><th>Ent Tarde</th><th>Sai Tarde</th><th>Saldo</th><th>Atraso</th></tr>"
    
    for(let x = 0; x < register.length; x++){
        let tr = table.insertRow()
        for(let y = 0; y < 9; y++){
                    
          let cell = tr.insertCell()   
          let item = document.createTextNode(register[x][y])      
          cell.appendChild(item)
          
          if(y == 8){
              if(register[x][7] == '00:00'){
                const {hours, minuts} = sumHour(register[x][1],register[x][8])
                negativeHour = negativeHour + hours
                negativeMinuts = negativeMinuts + minuts
            }else{
                const {hours, minuts} = sumHour(register[x][1],register[x][7])
                positiveHour = positiveHour + hours
                positiveMinuts = positiveMinuts + minuts
            }
          }
          
        }
                        
    }

    extra.innerHTML = asempleData(positiveHour,positiveMinuts)
    delay.innerHTML = asempleData(negativeHour,negativeMinuts)

    selectElements()
   
}

function sumHour(currentDate,hour){

    let day = currentDate.substring(0,2)
    let month = currentDate.substring(3,5)
    let year = currentDate.substring(6)

    let newDate = new Date(`${month}/${day}/${year}`);
    newDate.setHours(hour.substring(0,2),hour.substring(3,5),00)

    const hours = newDate.getHours()
    const minuts = newDate.getMinutes()

    return data = {
        hours,minuts
    }

  }

  function asempleData(hData,mData){

    let hour = hData
    let min = mData
    let modMin
    
    if(min > 60){

        hour = hour + Math.trunc(min/60)
        modMin = min%60
    }


    return `${fillnumber(hour)}:${fillnumber(modMin == undefined?min:modMin)}`


    
  }

$("#btnExport").click(function(e) {

    let nameEmployee = document.getElementById('employee').value
    let a = document.createElement('a');
    let data_type = 'data:application/vnd.ms-excel';
    let table_div = document.getElementById('dvData');
    let table_html = table_div.outerHTML.replace(/ /g, '%20');
    a.href = data_type + ', ' + table_html;
    if(nameEmployee != ''){
        a.download = `${nameEmployee}.xls`;
    }else{
        a.download = 'filename.xls';
    }
    a.click();
    e.preventDefault();
  }
  )

 
  
function readTextFile(files){

         const file = files[0]
  
            let reader = new FileReader()
  
            reader.onload = (e) =>{
                const file = e.target.result
                filterDataFiles(file)
            }
  
            reader.onerror = (e) => alert(e.target.error.name)
  
            reader.readAsText(file)

}

function filterDataFiles(data){

    register = []
    let dataObject = data.split(',')

    for(let i = 1; i < dataObject.length; i=i+8){


        register.push([
            getCount(),
            dataObject[i],
            dataObject[i+1],
            dataObject[i+2],
            dataObject[i+3],
            dataObject[i+4],
            dataObject[i+5],
            dataObject[i+6],
            dataObject[i+7].substring(0,5)

        ])

    }

    ShowElements()
    setDateAfterEdit()
    clearElements()
}

  $("#save-txt").click(function(){
      if(register.length != 0){
        let blob = new Blob(register,{
            type: "text/plain;charset=utf-8"
        })
        saveAs(blob, employee.value == ''?`Arquivo - ${getCurrentHour()}`:`${employee.value} - ${getCurrentHour()}`)
      }else{
          alert("Para salvar deve ter dados na tabela!!")
      }
  })

  function getCurrentHour(){
      let date = new Date()
      let currentDay = date.getDate()
      let month = date.getMonth()
      let hour = date.getHours()
      let min = date.getMinutes()
      let sec = date.getSeconds()
      return `${fillnumber(currentDay)}/${fillnumber(month+1)} @ ${fillnumber(hour)}-${fillnumber(min)}-${fillnumber(sec)}`
  }



  function setBackgroud(id){
      let body = document.getElementById("body")
      body.style.backgroundColor = `${id}`
      
  }

  function setNewDate(){

    let currentDate = new Date(getDateWorked())
    // let newdate = new Date(currentDate.setDate(currentDate.getDate()+2))
    let newdate = new Date()

    if(isFriday() && !saturdeyWorked){
        newdate = new Date(currentDate.setDate(currentDate.getDate()+3))
    }else if(isSaturday()){
        newdate = new Date(currentDate.setDate(currentDate.getDate()+2))
    }else{
        newdate = new Date(currentDate.setDate(currentDate.getDate()+1))
    }


    evtDate.value = getBrFormat(newdate)

  }
  
  function getBrFormat(dateUs){

    let date = new Date(dateUs)
    let year = date.getFullYear()
    let month = date.getMonth()+1
    let day = date.getDate()
    let newDate = `${fillnumber(day)}/${fillnumber(month)}/${year}`

    return newDate

  }

  function fillnumber(number){

    return number < 10 ? `0${number}`: number

  }

 function getExtraHour(){

    let defaultJorney = 0
    
    if(saturdeyWorked && isSaturday()){
        defaultJorney = hourSaturday.value
    }else{
        defaultJorney = hourWeek.value
    }


    let morningPeriod = calculateThePeriod(evtStartMorn.value,evtExitMorn.value)
    let afterPeriod = calculateThePeriod(evtStartAfter.value,evtExitAfter.value)
    let currentJorney = morningPeriod+afterPeriod
    let hours = Math.floor((currentJorney / (1000 * 60 * 60)) % 24)
    let minutes = Math.floor((currentJorney / (1000 * 60)) % 60)
      
    if(hours > defaultJorney){

        return `${fillnumber(hours-defaultJorney)}:${fillnumber(minutes)}`

    }else if(hours == defaultJorney && minutes != 0){

        return `00:${fillnumber(minutes)}`

    }else if(defaultJorney - hours == 1 && minutes != 0){

       
        let min = 60 - minutes
 
        return `-00:${fillnumber(min)}`

    }else if(defaultJorney - hours == 1 && minutes == 0){

        return `-${fillnumber(defaultJorney-hours)}:${fillnumber(minutes)}`

    }else if(defaultJorney - hours > 1){

       

        let min = 60 - minutes
        let hour = defaultJorney - hours

        if(minutes != 0){
            
            hour = hour-1

        }

        return `-${fillnumber(hour)}:${fillnumber(min == 60?0:min)}`
    }else{
        return `00:00`
    }
    
 }

  function calculateThePeriod(init,fin) {
    
    let hrIni = new Date(getDateWorked());
    hrIni.setHours(init.substring(0,2),init.substring(3,5),00);
    let hrF = new Date(getDateWorked());
    hrF.setHours(fin.substring(0,2),fin.substring(3,5),00);
    let res = hrF-hrIni
    
    return res    

  }


  function isSaturday(){

    let current = getDateWorked()

    if(current.getDay() == 6){
        return true
    }else{
        return false
    }
    

  }
  
  function isFriday(){

    let current = getDateWorked()

    if(current.getDay() == 5){
        return true
    }else{
        return false
    }
    
  }
  



  function getDateWorked(){

    let day = evtDate.value.substring(0,2)
    let month = evtDate.value.substring(3,5)
    let year = evtDate.value.substring(6)

    return new Date(`${fillnumber(month)}/${fillnumber(day)}/${year}`)

  }
  
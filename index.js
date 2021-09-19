

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

const typesOperation = {
    SHOW: "show",
    HIDE: "hide"
}


let register = []
let table = document.getElementById('table')
let rIndex
let count

setElements(evtStartMorn,"entradaManha",evtExitMorn)
setElements(evtExitMorn,"saidaManha",evtStartAfter)
setElements(evtStartAfter,"entradaTarde",evtExitAfter)
setElements(evtExitAfter,"saidaTarde",evtExitAfter)
// readTxt()



function selectElements(){

    for (let index = 1; index < table.rows.length; index++){

        table.rows[index].onclick = function(){
            rIndex = this.rowIndex
            console.log('index da linha: ',rIndex)
            evtDate.value = this.cells[1].innerHTML
            evtStartMorn.value = this.cells[2].innerHTML
            evtExitMorn.value = this.cells[3].innerHTML
            evtStartAfter.value = this.cells[4].innerHTML
            evtExitAfter.value = this.cells[5].innerHTML
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

    if(evtDate.value.length == 10 &&
        evtStartMorn.value.length == 5 &&
        evtExitMorn.value.length == 5 &&
        evtStartAfter.value.length == 5 &&
        evtExitAfter.value.length == 5)
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

function editSelectedElement(){

    if(rIndex != undefined && checkData){

        table.rows[rIndex].cells[1].innerHTML = evtDate.value
        table.rows[rIndex].cells[2].innerHTML = evtStartMorn.value
        table.rows[rIndex].cells[3].innerHTML = evtExitMorn.value
        table.rows[rIndex].cells[4].innerHTML = evtStartAfter.value
        table.rows[rIndex].cells[5].innerHTML = evtExitAfter.value
        table.rows[rIndex].cells[6].innerHTML = getExtraHour()
        showEdit(typesOperation.HIDE)
        setDateAfterEdit()
        clearElements()
        
    }

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

    if(checkData){
        register.push(
             [
                getCount(), 
                evtDate.value,
                evtStartMorn.value,
                evtExitMorn.value,
                evtStartAfter.value,
                evtExitAfter.value,
                getExtraHour()
            ]
        )
        
        console.log(register)
        ShowElements()
        setNewDate()
        clearElements()
    }else{
        alert('Peencha todos horários')
    }

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
    
    table.innerHTML = "<tr><th>Qtde</th><th>Data</th><th>Ent Manha</th><th>Sai Manha</th><th>Ent Tarde</th><th>Sai Tarde</th><th>Saldo hora</th></tr>"
    
    for(let x = 0; x < register.length; x++){
        let tr = table.insertRow()
        for(let y = 0; y < 7; y++){
                    
          let cell = tr.insertCell()   
          let item = document.createTextNode(register[x][y])      
          cell.appendChild(item)                              
        }
                        
    }

    selectElements()
   
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

  //ler txt

  
//  function readTxt(){
 
//     input.addEventListener('change',()=>{
//         let files = input.files
  
//        if(files.length == 0) return
       
//             const file = files[0]
  
//             let reader = new FileReader()
  
//             reader.onload = (e) =>{
//                 const file2 = e.target.result
//                 console.log('file read: ',file2)
//             }
  
//             reader.onerror = (e) => alert(e.target.error.name)
  
//             reader.readAsText(file)
        
//     })

//     console.log('passou')

//  }
  
function readTextFile(files){

         const file = files[0]
  
            let reader = new FileReader()
  
            reader.onload = (e) =>{
                const file = e.target.result
                // console.log('file read: ',file2)
                filterDataFiles(file)
            }
  
            reader.onerror = (e) => alert(e.target.error.name)
  
            reader.readAsText(file)

}

function filterDataFiles(data){

    register = []
    let dataObject = data.split(',')
    console.log(dataObject.length)

    for(let i = 1; i < dataObject.length; i=i+6){

        // console.log(dataObject[i])

        register.push([
            getCount(),
            dataObject[i],
            dataObject[i+1],
            dataObject[i+2],
            dataObject[i+3],
            dataObject[i+4],
            dataObject[i+5].substring(0,5)

        ])

    }

    console.log(register)
    ShowElements()
}




  //escrever txt




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
      console.log(id)
      let body = document.getElementById("body")
      body.style.backgroundColor = `${id}`
      
  }

  function setNewDate(){

    let currentDate = new Date(getUsFormat(evtDate.value))
    let newdate = new Date(currentDate.setDate(currentDate.getDate()+2))
    evtDate.value = getBrFormat(newdate)

  }

  function getUsFormat(dateBr){

    let day = dateBr.substring(0,2)
    let month = dateBr.substring(3,5)
    let year = dateBr.substring(6)
    let newDate = `${year}-${month}-${day}`

    return newDate

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

    const defaultJorney = 8
    let morningPeriod = calculateThePeriod(evtStartMorn.value,evtExitMorn.value)
    let afterPeriod = calculateThePeriod(evtStartAfter.value,evtExitAfter.value)
    let currentJorney = morningPeriod+afterPeriod
    let hours = Math.floor((currentJorney / (1000 * 60 * 60)) % 24)
    let minutes = Math.floor((currentJorney / (1000 * 60)) % 60)
      
    console.log('hours: ',hours)
    console.log('minuts: ',minutes)

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
    
    let hrIni = new Date(getUsFormat(evtDate.value));
    hrIni.setHours(init.substring(0,2),init.substring(3,5),00);
    let hrF = new Date(getUsFormat(evtDate.value));
    hrF.setHours(fin.substring(0,2),fin.substring(3,5),00);
    let res = hrF-hrIni
    
    return res    

  }
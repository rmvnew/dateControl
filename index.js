

const evtDate = document.getElementById("date")
const evtStartMorn = document.getElementById("entradaManha")
const evtExitMorn = document.getElementById("saidaManha")
const evtStartAfter = document.getElementById("entradaTarde")
const evtExitAfter = document.getElementById("saidaTarde")
let register = []


setElements(evtStartMorn,"entradaManha",evtExitMorn)
setElements(evtExitMorn,"saidaManha",evtStartAfter)
setElements(evtStartAfter,"entradaTarde",evtExitAfter)
setElements(evtExitAfter,"saidaTarde",evtExitAfter)


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
    
    evtStartMorn.value = ''
    evtExitMorn.value = ''
    evtStartAfter.value = ''
    evtExitAfter.value = ''
    evtStartMorn.focus()
}

function addElements(){

    if(
        evtDate.value.length == 10 &&
        evtStartMorn.value.length == 5 &&
        evtExitMorn.value.length == 5 &&
        evtStartAfter.value.length == 5 &&
        evtExitAfter.value.length == 5
    ){
        register.push(
             [
                register.length+1, 
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


function ShowElements(){

    let table = document.getElementById('table')
    table.innerHTML = "<tr><th>Qtde</th><th>Data</th><th>Ent Manha</th><th>Sai Manha</th><th>Ent Tarde</th><th>Sai Tarde</th><th>Saldo hora</th></tr>"
    
    for(let x = 0; x < register.length; x++){
        let tr = table.insertRow()
        for(let y = 0; y < 7; y++){
                    
          let cell = tr.insertCell()   
          let item = document.createTextNode(register[x][y])      
          cell.appendChild(item)                              
        }
                        
    }

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
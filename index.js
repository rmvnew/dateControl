

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
    
    });
    
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
                evtExitAfter.value
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
    table.innerHTML = "<tr><th>Qtde</th><th>Data</th><th>Ent Manha</th><th>Sai Manha</th><th>Ent Tarde</th><th>Sai Tarde</th></tr>"
    
    for(let x = 0; x < register.length; x++){
        let tr = table.insertRow()
        for(let y = 0; y < 6; y++){
                    
          let cell = tr.insertCell()   
          let item = document.createTextNode(register[x][y])      
          cell.appendChild(item)                              
        }
                        
    }

}



$("#btnExport").click(function(e) {
    console.log('teste')
    let nameEmployee = document.getElementById('employee').value
    let a = document.createElement('a');
    let data_type = 'data:application/vnd.ms-excel';
    let table_div = document.getElementById('dvData');
    let table_html = table_div.outerHTML.replace(/ /g, '%20');
    a.href = data_type + ', ' + table_html;
    console.log('name: ',nameEmployee)
    if(nameEmployee != ''){
        a.download = `${nameEmployee}.xls`;
    }else{
        a.download = 'filename.xls';
    }
    a.click();
    e.preventDefault();
  });


  function setBackgroud(id){
      console.log(id)
      let body = document.getElementById("body")
      body.style.backgroundColor = `${id}`
      
  }


  function setNewDate(){

    
    let currentDate = new Date(getUsFormat(evtDate.value))

    let newdate = new Date(currentDate.setDate(currentDate.getDate()+2))
    console.log(newdate)
    evtDate.value = getBrFormat(newdate)

  }

  function getUsFormat(dateBr){

    let day = dateBr.substring(0,2)
    let month = dateBr.substring(3,5)
    let year = dateBr.substring(6)
    let newDate = `${year}-${month}-${day}`
    console.log('Us format: ', newDate)

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
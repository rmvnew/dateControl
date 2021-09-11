

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
    evtDate.value = ''
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
        clearElements()
        console.log(register)
        ShowElements()
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

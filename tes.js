var starwars_planets = {
    count: null,
    planets: []
}

var i = 1;
var pages;
var page_current;
var error404 = false;
while(i>0){
    $.ajax({ 
        type: 'GET', 
        url: 'https://swapi.co/api/planets/?format=json&page='+i, 
        async: false,
        data: { get_param: 'value' }, 
        dataType: 'json',
        success: function (data) {          
            // console.log(data.detail);
            starwars_planets.count = data.count;
            pages = Math.floor(data.count / 10);
            data.results.forEach(result => {
                starwars_planets.planets.push(result);

                //  I Dont Know Why Break Doesnt Work Inside Ajax
                // if(starwars_planets.planets.length >= data.count){
                //     break;
                // } 
            });
                                
        },
        error:function (xhr, ajaxOptions, thrownError){
            if(xhr.status==404) {
                error404 = true;
            }
        }
    });
    
    if(error404){
        break;
    }

    i++;
}

console.log(pages);

var planetsdatatable = document.getElementById("planets-datatable");
var paging = document.getElementById("paging");



function readDataTable(order, page){
    if(typeof order !== 'undefined') {
        starwars_planets.planets.sort(function(a, b){
            if(order.is_asc){
                if(a[order.by] < b[order.by]) { return -1; }
                if(a[order.by] > b[order.by]) { return 1; }
                return 0;
            }else{
                if(a[order.by] < b[order.by]) { return 1; }
                if(a[order.by] > b[order.by]) { return -1; }
                return 0;
            }
        });
    }

    var start;
    if(page == 1){
        start = 0;
    }else{
        start = page*10;
    }

    paging.innerHTML = "";
    var p = 1;
    while(p<=pages){
        if(page == p){
            paging.insertAdjacentHTML('beforeend', '<button class="btn btn-primary btn-sm" style="margin-left:10px;" onclick="goToPage(this.value)" value="'+p+'">'+p+'</button>');
        }else{
            paging.insertAdjacentHTML('beforeend', '<button class="btn btn-light btn-sm" style="margin-left:10px;" onclick="goToPage(this.value)" value="'+p+'">'+p+'</button>');
        }
        p++;
    }

    planetsdatatable.innerHTML = "";

    for(i = start; i<start+10; i++){
        planetsdatatable.insertAdjacentHTML('beforeend','<tr>'+
                                                            '<td>'+starwars_planets.planets[i].name+'</td>'+
                                                            '<td>'+starwars_planets.planets[i].rotation_period+'</td>'+    
                                                            '<td>'+starwars_planets.planets[i].orbital_period+'</td>'+    
                                                            '<td>'+starwars_planets.planets[i].diameter+'</td>'+    
                                                            '<td>'+starwars_planets.planets[i].climate+'</td>'+    
                                                            '<td>'+starwars_planets.planets[i].gravity+'</td>'+    
                                                            '<td>'+starwars_planets.planets[i].terrain+'</td>'+    
                                                            '<td>'+starwars_planets.planets[i].surface_water+'</td>'+    
                                                            '<td>'+starwars_planets.planets[i].population+'</td>'+    
                                                        '</tr>');
    }

    
}


var order = {
    by: 'name',
    is_asc: 'true'
};

readDataTable(order, 1);


function doOrder(value){
    // alert(value);
    order.by = value;
    if(order.is_asc==null){
        order.is_asc=true;
    }else{
        if(order.is_asc == true){
            order.is_asc = false;
        }else{
            order.is_asc = true;
        }
    }
    planetsdatatable.innerHTML = "";
    readDataTable(order, 1);

    // console.log(order);
}

function goToPage(value){
    readDataTable(order, value);
}


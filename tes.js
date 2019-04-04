var starwars_planets = {
    count: null,
    planets: []
}

var i = 1;
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

console.log(starwars_planets);

var planetsdatatable = document.getElementById("planets-datatable");



function readDataTable(order){
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

    starwars_planets.planets.forEach(planet => {
        // console.log(planet);
        planetsdatatable.insertAdjacentHTML('beforeend','<tr>'+
                                                            '<td>'+planet.name+'</td>'+
                                                            '<td>'+planet.rotation_period+'</td>'+    
                                                            '<td>'+planet.orbital_period+'</td>'+    
                                                            '<td>'+planet.diameter+'</td>'+    
                                                            '<td>'+planet.climate+'</td>'+    
                                                            '<td>'+planet.gravity+'</td>'+    
                                                            '<td>'+planet.terrain+'</td>'+    
                                                            '<td>'+planet.surface_water+'</td>'+    
                                                            '<td>'+planet.population+'</td>'+    
                                                        '</tr>');
    });
}

readDataTable();

var order = {
    by: null,
    is_asc: null
};

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
    readDataTable(order);

    console.log(order);
}


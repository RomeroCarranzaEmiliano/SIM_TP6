/*
    index.js

    Lógica para el cliente

    !IMPORTANTE! todos los eventos que se envian se deben enviar en un vector donde la posición
    cero corresponde al nombre del evento, el siguiente debe contener una tupla de parametros
    o ser inexistente
    ["nombre_evento", (param1, param2, param3, paramN)]
*/


// Se carga el script
$(document).ready(function(){
    // Para chequear por consola que el script se ejecutó
    console.log("Hola Mundo")

    let socket = new WebSocket("ws://localhost:8080");

    // Cuando se conecta al servidor webscocket
    socket.onopen = function(e) {

        // -----------------------------------------------------------
        console.log("[CALCULAR] Calcular simulacion");

        params = new URLSearchParams(document.location.search);
        y = params.get("y")

        event = `{"event_name": "rk", "parameters": [${y}]}`;
        socket.send(event);
        // -----------------------------------------------------------

    }

    // Cuando se pierde la conexión al servidor websocket
    socket.onclose = function(e) {

    }

    // Manejo de eventos
    socket.onmessage = function(event) {
        var data = JSON.parse(event.data);
        // ws-test
        if (data == "OK") {
            show_connected();
            console.log("conectado!!!")
        } else {
            // Obtener datos
            //data = JSON.stringify(data)

            //var result = data[0].toFixed(2);
            var tabla = data[1];
            var resultados = data[0]
            console.log(event.data);

            // Resetear la tabla
            empty_table = `<table id="result_table">
             <tr id="table_header">
                 <th colspan="1" rowspan="1">x</th>
                 <th colspan="1" rowspan="1">y</th>
                 <th colspan="1" rowspan="1">k1</th>
                 <th colspan="1" rowspan="1">y+k1*h/2</th>
                 <th colspan="1" rowspan="1">k2</th>
                 <th colspan="1" rowspan="1">x+h/2</th>
                 <th colspan="1" rowspan="1">y+k2*h/2</th>
                 <th colspan="1" rowspan="1">k3</th>
                 <th colspan="1" rowspan="1">x+h</th>
                 <th colspan="1" rowspan="1">y+k3*h</th>
                 <th colspan="1" rowspan="1">k4</th>
                 <th colspan="1" rowspan="1">x(i+1)</th>
                 <th colspan="1" rowspan="1">y(i+1)</th>
                 <th colspan="1" rowspan="1">L(i-1) - L(i)</th>
                 <th colspan="1" rowspan="1">L(i-1) - L(i) < 2</th>
             </tr>
        </table>`
            $("#result_table").html(empty_table);

            //$("#result_tag").text("Resultado: "+result+"%");

            // Dibujar tabla
            var i;
            for(i=0; i<data.length; i++) {

                new_row = `<tr>
                         <td>${data[i][0]}</td>
                         <td>${data[i][1]}</td>
                         <td>${data[i][2]}</td>
                         <td>${data[i][3]}</td>
                         <td>${data[i][4]}</td>
                         <td>${data[i][5]}</td>
                         <td>${data[i][6]}</td>
                         <td>${data[i][7]}</td>
                         <td>${data[i][8]}</td>
                         <td>${data[i][9]}</td>
                         <td>${data[i][10]}</td>
                         <td>${data[i][11]}</td>
                         <td>${data[i][12]}</td>
                         <td>${data[i][13]}</td>
                         <td>${data[i][14]}</td>
                </tr>`;

                $("#result_table").append(new_row);

                // Destacar ultima linea
                if(i == data.length - 2) {
                    html = '<tr><td colspan="45" id="last_line">-- ULTIMA LINEA --</td></tr>'
                    $("#result_table").append(html);
                    $("#last_line").css({"background-color":"green", "color":"white"});
                }

                $("#r").text("Resultado: "+String(data[data.length-1][12]))
                $("#y0").text("y0: "+String(y))
            }

        }

    }


    // Para mostrar la sombra al escrollear
    $(".display").scroll(function(){
        if ($(".display").scrollTop() == 0){
            $(".options").css("box-shadow","0px 10px 15px -8px transparent");
        } else {
            $(".options").css("box-shadow","0px 10px 15px -8px black");
        }
    });

});

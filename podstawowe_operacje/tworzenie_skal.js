// Tworzymy skalę liniową
var scale = d3.scaleLinear()
  .domain([0, 10])  // dane wejściowe
  .range([0, 100]);  // dane wyjściowe

var point = 6

// Obliczamy wartość dla point przy użyciu skali i wyświetlamy wynik na stronie
var output = scale(point);  
d3.select('#input').text("Wynik: " + point);
d3.select("#output").text("Wynik: " + output);

// Tworzymy skalę liniową
var scale = d3.scaleLinear()
  .domain([0, 10])  // dane wejściowe
  .range([0, 100]);  // dane wyjściowe

var point = 3

// Obliczamy wartość 5 przy użyciu skali i wyświetlamy wynik na stronie
var output = scale(point);  // powinno zwrócić 50
d3.select('#input').text("Wynik: " + point);
d3.select("#output").text("Wynik: " + output);

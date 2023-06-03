// Ustalamy wymiary i marginesy wykresu
var margin = {top: 10, right: 130, bottom: 30, left: 60}, // Zwiększamy prawy margines, aby pomieścić legendę
    width = 560 - margin.left - margin.right, // Zwiększamy szerokość, aby pomieścić legendę
    height = 400 - margin.top - margin.bottom;

// Dodajemy obiekt SVG do div o id 'my_dataviz'
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right) // Zwiększamy szerokość SVG, aby pomieścić legendę
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Wybieramy div o id 'my_dataviz', dodajemy do niego element SVG i ustawiamy jego szerokość i wysokość
// Następnie dodajemy do SVG grupę elementów 'g' i przesuwamy ją o margines
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Dodajemy legendę
var legend = svg.append("g")
  .attr("class", "legend")
  .attr("transform", "translate(" + (width + 20) + ",0)"); // Przesuwamy legendę bardziej w prawo, ale nie na tyle, aby wyjść poza obszar SVG

legend.append("rect") // Dodajemy prostokąt symbolizujący kolor linii
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", "steelblue"); // Kolor prostokąta jest taki sam jak kolor linii

legend.append("text") // Dodajemy tekst do legendy
  .attr("x", 24)
  .attr("y", 9)
  .attr("dy", ".35em")
  .text("Wartość"); // Tekst legendy

// Wczytujemy dane z pliku CSV
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

  // Podczas wczytywania pliku CSV, musimy sformatować zmienne:
  function(d){
    return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
  },

  // Teraz możemy używać tych danych:
  function(data) {

    // Dodajemy oś X --> jest to format daty
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; })) // Określa zakres danych na osi X
      .range([ 0, width ]); // Określa zakres wartości na osi X
    svg.append("g")
      .attr("transform", "translate(0," + height + ")") // Przesuwa oś X na dół wykresu
      .call(d3.axisBottom(x)); // Rysuje oś X na dole wykresu

    // Dodajemy oś Y
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })]) // Określa zakres danych na osi Y
      .range([ height, 0 ]); // Określa zakres wartości na osi Y
    svg.append("g")
      .call(d3.axisLeft(y)); // Rysuje oś Y po lewej stronie wykresu

    // Dodajemy linię
    svg.append("path")
      .datum(data) // Przypisujemy dane do elementu path
      .attr("fill", "none") // Usuwamy wypełnienie
      .attr("stroke", "steelblue") // Ustalamy kolor linii
      .attr("stroke-width", 1.5) // Ustalamy szerokość linii
      .attr("d", d3.line() // Rysujemy linię
        .x(function(d) { return x(d.date) }) // Ustala wartość x na podstawie daty
        .y(function(d) { return y(d.value) }) // Ustala wartość y na podstawie wartości
        )
})
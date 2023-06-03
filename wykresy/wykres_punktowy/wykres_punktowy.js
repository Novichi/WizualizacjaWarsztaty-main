// Ustalamy wymiary i marginesy wykresu
var margin = {top: 10, right: 130, bottom: 30, left: 60}, // Zwiększamy prawy margines, aby pomieścić całą legendę
    width = 590 - margin.left - margin.right, // Zwiększamy szerokość, aby pomieścić całą legendę
    height = 400 - margin.top - margin.bottom;

// Dodajemy obiekt SVG do div o id 'my_dataviz'
var svg = d3.select("#my_dataviz") // Wybieramy div o id 'my_dataviz'
  .append("svg") // Dodajemy do niego element SVG
    .attr("width", width + margin.left + margin.right) // Ustawiamy szerokość SVG (szerokość wykresu + marginesy)
    .attr("height", height + margin.top + margin.bottom) // Ustawiamy wysokość SVG (wysokość wykresu + marginesy)
  .append("g") // Dodajemy grupę, która będzie zawierać wykres
    .attr("transform", // Przesuwamy grupę o wartość marginesów, aby utworzyć odpowiedni odstęp od krawędzi SVG
          "translate(" + margin.left + "," + margin.top + ")");
          
// Czytamy dane
// Czytamy dane
//d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv", function(data) {
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv", function(data) {


  // Dodajemy os X
  var x = d3.scaleLinear() // Tworzymy skalę liniową dla osi X
    .domain([0, 4000]) // Zakres danych, które chcemy przedstawić na osi X
    .range([ 0, width ]); // Zakres pikseli, którymi chcemy przedstawić dane
  svg.append("g") // Dodajemy grupę, która będzie zawierać oś X
    .attr("transform", "translate(0," + height + ")") // Przesuwamy grupę na dół SVG
    .call(d3.axisBottom(x)); // Generujemy oś X na dole grupy

  // Dodajemy os Y
  var y = d3.scaleLinear() // Tworzymy skalę liniową dla osi Y
    .domain([0, 500000]) // Zakres danych, które chcemy przedstawić na osi Y
    .range([ height, 0]); // Zakres pikseli, którymi chcemy przedstawić dane (odwrócone, aby wykres był poprawny)
  svg.append("g") // Dodajemy grupę, która będzie zawierać oś Y
    .call(d3.axisLeft(y)); // Generujemy oś Y na lewej stronie grupy

  // Dodajemy kropki
  svg.append('g') // Dodajemy grupę, która będzie zawierać kropki
    .selectAll("dot") // Wybieramy wszystkie przyszłe elementy 'dot'
    .data(data) // Łączymy dane z wykresu
    .enter() // Dla każdego elementu danych tworzymy jeden element 'dot'
    .append("circle") // Dodajemy do wykresu kółko
      .attr("cx", function (d) { return x(d.GrLivArea); } ) // Pozycja X kółka jest zależna od wartości 'GrLivArea' elementu danych
      .attr("cy", function (d) { return y(d.SalePrice); } ) // Pozycja Y kółka jest zależna od wartości 'SalePrice' elementu danych
      .attr("r", 1.5) // Radius kółka
      .style("fill", "#69b3a2") // Kolor kółka
})

// Dodajemy legendę
var legend = svg.append("g") // Dodajemy grupę, która będzie zawierać legendę
  .attr("class", "legend") // Nadajemy jej klasę 'legend'
  .attr("transform", "translate(" + (width + 20) + ",0)"); // Przesuwamy legendę bardziej w prawo, ale nie na tyle, aby wyjść poza obszar SVG

legend.append("rect") // Dodajemy do legendy prostokąt
  .attr("width", 18) // Szerokość prostokąta
  .attr("height", 18) // Wysokość prostokąta
  .style("fill", "#69b3a2"); // Kolor prostokąta jest taki sam jak kolor kropek

legend.append("text") // Dodajemy do legendy tekst
  .attr("x", 24) // Pozycja X tekstu (trochę na prawo od prostokąta)
  .attr("y", 9) // Pozycja Y tekstu (na środku prostokąta)
  .attr("dy", ".35em") // Drobne przesunięcie tekstu, aby był dokładnie na środku prostokąta
  .text("Cena sprzedaży"); // Treść tekstu
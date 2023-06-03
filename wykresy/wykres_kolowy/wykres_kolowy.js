// Ustalamy wymiary i marginesy dla wykresu
var width = 600  // Szerokość zwiększona, aby pomieścić legendę
var height = 450 // Wysokość
var margin = 40  // Margines (nie używany w tym przykładzie)

// Obliczamy promień wykresu kołowego - to połowa mniejszego wymiaru (szerokości lub wysokości), minus trochę marginesu
var radius = Math.min(width, height) / 2 - margin

// Wybieramy div o id 'my_dataviz', dodajemy do niego element SVG i ustawiamy jego szerokość i wysokość
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width)
    .attr("height", height)

// Dodajemy element 'g' do SVG (element 'g' służy do grupowania kształtów SVG)
// i przesuwamy go do środka SVG.
// Wykres kołowy będzie rysowany w tym elemencie 'g'
var g = svg.append("g")
    .attr("transform", "translate(" + (width / 2 - 70) + "," + height / 2 + ")");  // Centruje element 'g'

// Tworzymy dane dla wykresu kołowego - tutaj są one zaszyte na stałe, ale w prawdziwym przypadku mogłyby pochodzić z API lub formularza
var data = {a: 40, b: 20, c:30}

// Ustalamy skalę kolorów dla segmentów wykresu
// Jest to skala porządkowa, czyli mapuje dyskretne wartości domeny (w tym przypadku klucze obiektu data) na zakres kolorów
var color = d3.scaleOrdinal()
  .domain(data)
  .range(["#10e838", "#f20505", "#0525f2"])

// Tworzymy funkcję układu pie (kołowego) - obliczy ona położenie każdej grupy na wykresie kołowym
var pie = d3.pie()
  .value(function(d) {return d.value; }) // Określa wartość dla każdego segmentu kołowego
var data_ready = pie(d3.entries(data)) // Przekształca dane wejściowe na odpowiedni format dla wykresu kołowego

// Budujemy wykres kołowy: każda część wykresu to ścieżka, którą budujemy za pomocą funkcji arc (łuk)
g
  .selectAll('whatever') // Wybiera wszystkie elementy pasujące do selektora (w tym przypadku nie ma żadnych, więc tworzy nowe dla każdego elementu danych)
  .data(data_ready) // Łączy dane z elementami
  .enter() // Zwraca "placeholder" dla każdego brakującego elementu dla elementu danych
  .append('path') // Dodaje element ścieżki dla każdego brakującego elementu
  .attr('d', d3.arc() // Ustala atrybut 'd' (ścieżkę rysowania) dla elementu ścieżki
    .innerRadius(100) // Ustala wewnętrzny promień dla łuku, tworząc wykres "donut"
    .outerRadius(radius) // Ustala zewnętrzny promień dla łuku
  )
  .attr('fill', function(d){ return(color(d.data.key)) }) // Wypełnia segment kolorem odpowiadającym kluczowi danych
  .attr("stroke", "black") // Ustala kolor obrysu na czarny
  .style("stroke-width", "4px") // Ustala szerokość obrysu na 4px
  .style("opacity", 0.7) // Ustala przeźroczystość na 0.7

// Tworzymy legendę
var legend = svg.selectAll(".legend") // Wybiera wszystkie elementy o klasie 'legend'
  .data(color.domain()) // Łączy dane (klucze z obiektu data) z elementami
  .enter() // Zwraca "placeholder" dla każdego brakującego elementu dla elementu danych
  .append("g") // Dodaje element 'g' dla każdego brakującego elementu
  .attr("class", "legend") // Nadaje mu klasę 'legend'
  .attr('transform', function(d,i){ return "translate(" + (width - 100) + "," + (20 + i * 20) + ")"; }) // Przesuwa go w prawo

// Dodajemy prostokąt reprezentujący kolor na legendzie
legend.append("rect")
  .attr("width", 18) // Szerokość prostokąta
  .attr("height", 18) // Wysokość prostokąta
  .style("fill", color); // Wypełnia prostokąt kolorem odpowiadającym danym

// Dodajemy tekst do legendy
legend.append("text")
  .attr("x", 24) // Pozycja x tekstu
  .attr("y", 9) // Pozycja y tekstu
  .attr("dy", ".35em") // Przesunięcie y tekstu
  .text(function(d) { return d; }); // Tekst to klucz danych



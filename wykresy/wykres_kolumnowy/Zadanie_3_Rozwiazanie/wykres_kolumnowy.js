// Definiujemy szerokość, wysokość i marginesy wykresu
const width = 900;
const height = 450;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };

// Definiujemy kolory
const colors = d3.scaleOrdinal().range(d3.schemeSet2);

// Tworzymy obiekt SVG 
const svgRect = d3.select('#d3-container') // Wybieramy kontener dla wykresu 
.append('svg') // Dodajemy element SVG
.attr('width', width - margin.left - margin.right) // Ustalamy szerokość SVG
.attr('height', height - margin.top - margin.bottom) // Ustalamy wysokość SVG
.attr("viewBox", [0, 0, width, height]); // Ustalamy obszar widzenia SVG

// Tworzymy skalę dla osi X
const x = d3.scaleBand() // Skala pasmowa, używana dla zmiennych kategorialnych
.range([margin.left, width - margin.right]) // Zakres pikseli (od lewego do prawego marginesu)
.padding(0.1); // Dodajemy odstęp między słupkami wykresu

// Tworzymy skalę dla osi Y
const y = d3.scaleLinear() // Skala liniowa, używana dla zmiennych liczbowych
.domain([0, 100]) // Zakres danych (od 0 do 100)
.range([height - margin.bottom, margin.top]); // Zakres pikseli (od dolnego do górnego marginesu)

// Wczytanie danych z pliku CSV
d3.csv('data.csv').then(data => {
  console.log(data);
  // Przekształcenie danych
  data.forEach(d => {
    d.score = +d.score; // Zmieniamy 'score' z tekstu na liczbę
  });

  // Aktualizacja domen
  x.domain(data.map((d,i) => i));
  colors.domain(data.map(d => d.name));

  // Dodajemy słupki do wykresu
  svgRect.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d.score))
    .attr("width", x.bandwidth())
    .attr("height", d => height - margin.bottom - y(d.score))
    .attr("fill", d => colors(d.name));

  // Dodajemy osi do wykresu
  svgRect.append("g")
    .attr("transform", "translate(0," + (height - margin.bottom) + ")")
    .call(d3.axisBottom(x).tickFormat(i => data[i].name));

  svgRect.append("g")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(d3.axisLeft(y));
});
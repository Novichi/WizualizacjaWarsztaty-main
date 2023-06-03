//Dodanie skali dla osi x y i wyswietlenie wykresu 

// Definiujemy dane
const data = [
    { name: 'Łukasz', score: 90 },
    { name: 'Kuba', score: 9 },
    { name: 'Olo', score: 10 },
    { name: 'Filip', score: 11 }
  ];

  
// Definiujemy szerokość, wysokość i marginesy wykresu
const width = 900;
const height = 450;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };


// Tworzymy obiekt SVG 
const svgRect = d3.select('#d3-container') // Wybieramy kontener dla wykresu 
.append('svg') // Dodajemy element SVG
.attr('width', width - margin.left - margin.right) // Ustalamy szerokość SVG
.attr('height', height - margin.top - margin.bottom) // Ustalamy wysokość SVG
.attr("viewBox", [0, 0, width, height]); // Ustalamy obszar widzenia SVG

// Tworzymy skalę dla osi X
const x = d3.scaleBand() // Skala pasmowa, używana dla zmiennych kategorialnych
.domain(d3.range(data.length)) // Zakres danych (tyle ile jest elementów w danych)
.range([margin.left, width - margin.right]) // Zakres pikseli (od lewego do prawego marginesu)
.padding(0.1) // Dodajemy odstęp między słupkami wykresu

// Tworzymy skalę dla osi Y
const y = d3.scaleLinear() // Skala liniowa, używana dla zmiennych liczbowych
.domain([0, 100]) // Zakres danych (od 0 do 100)
.range([height - margin.bottom, margin.top]) // Zakres pikseli (od dolnego do górnego marginesu)

// Dodajemy słupki do wykresu
svgRect
.append("g") // Dodajemy grupę, która będzie zawierać słupki
.attr("fill", 'royalblue') // Nadajemy kolor słupkom
.selectAll("rect") // Wybieramy wszystkie przyszłe elementy 'rect'
.data(data.sort((a, b) => d3.descending(a.score, b.score))) // Łączymy dane z wykresem, sortując je malejąco
.join("rect") // Dla każdego elementu danych tworzymy jeden element 'rect'
  .attr("x", (d, i) => x(i)) // Pozycja X słupka jest zależna od indeksu elementu danych
  .attr("y", d => y(d.score)) // Pozycja Y słupka jest zależna od wartości 'score' elementu danych
  .attr('title', (d) => d.score) // Tytuł słupka (po najechaniu myszką) to wartość 'score' elementu danych
  .attr("class", "rect") // Nadajemy klasę 'rect' każdemu słupek
  .attr("height", d => y(0) - y(d.score)) // Wysokość słupka jest zależna od wartości 'score' elementu danych
  .attr("width", x.bandwidth()); // Szerokość słupka jest zależna od szerokości pasma

  
svgRect.node(); // Generujemy wykres
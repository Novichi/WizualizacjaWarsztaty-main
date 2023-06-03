//Tworzenie obiektu SVG (wykresu)

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
const svgRect = d3.select('#d3-container') // Wybieramy kontener dla wykresu <!--!!!-->
.append('svg') // Dodajemy element SVG
.attr('width', width - margin.left - margin.right) // Ustalamy szerokość SVG
.attr('height', height - margin.top - margin.bottom) // Ustalamy wysokość SVG
.attr("viewBox", [0, 0, width, height]); // Ustalamy obszar widzenia SVG


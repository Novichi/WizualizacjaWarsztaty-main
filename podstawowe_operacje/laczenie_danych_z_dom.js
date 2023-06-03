// Definiujemy dane do połączenia z paragrafami
var data = ["jeden", "dwa", "trzy"];

// Łączymy dane z paragrafami i ustawiamy tekst paragrafów na odpowiadające im dane
d3.selectAll("p")
  .data(data)
  .text(function(d) { return d; });

  //------------------------------------------->miejsce na twój kod<-------------------------------------------
  //stworz nowe dane i połacz je z h1



 
function convert() {
    var institution = document.getElementById('institution').value;
    var cgpa = parseFloat(document.getElementById('cgpa').value);
    var result = document.getElementById('result');
    var note = document.getElementById('note');
  
    if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
      result.innerText = "Please enter a valid CGPA between 0 and 10.";
      note.innerText = "";
      return;
    }
  
    var percentage;
    if (institution === "private") {
      if (cgpa >= 7) {
        percentage = (cgpa * 7.4 + 12).toFixed(2);
        note.innerText = "Formula used: (CGPA × 7.4) + 12";
      } else {
        percentage = (7.1 * cgpa + 12).toFixed(2);
        note.innerText = "Formula used: (7.1 × CGPA) + 12";
      }
    } else if (institution === "mumbai") {
      percentage = (7.1 * cgpa + 11).toFixed(2);
      note.innerText = "Formula used: (7.1 × CGPA) + 11";
    }
  
    result.innerText = "Your Percentage: " + percentage + "%";
  }
  
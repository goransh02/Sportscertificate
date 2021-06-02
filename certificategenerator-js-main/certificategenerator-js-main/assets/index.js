const userName = document.getElementById("name");

const submitBtn = document.getElementById("submitBtn");
const { PDFDocument, rgb, degrees } = PDFLib;
var str = "Rubrix_200_230_45";
var res = str.split("_");
var x1= parseInt(res[1]);
var y1= parseInt(res[2]);
var s1= parseInt(res[3]);
console.log(x1+" "+y1+" "+s1+" "+res[0])
submitBtn.addEventListener("click", () => {
    const val =userName.value;
    if (val.trim() !== "" && userName.checkValidity()) {
        // console.log(val);
        generatePDF(val);
      } else {
        userName.reportValidity();
      }
});

const generatePDF = async (name) => {
    const existingPdfBytes = await fetch("./assets/Rubrix_200_230_45.pdf").then((res) =>
      res.arrayBuffer()
    );

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    const fontBytes = await fetch("./assets/Montserrat-ExtraLight.ttf").then((res) =>
    res.arrayBuffer()
  );
    // Embed our custom font in the document
    const Montserrat  = await pdfDoc.embedFont(fontBytes);
     // Get the first page of the document
     const pages = pdfDoc.getPages();
     const firstPage = pages[0];
   
     // Draw a string of text diagonally across the first page
     firstPage.drawText(name, {
       x: x1,
       y: y1,
       size: s1,
       font:  Montserrat,
       
       color: rgb(0.0, 0.0, 0.0),
     });
   
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    var t=res[0];
    saveAs(pdfDataUri,(t+"_"+name))
  };
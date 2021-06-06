const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");
const { PDFDocument, rgb, degrees } = PDFLib;
var str = "Rubrix_250_230_45";
var res = str.split("_");
var x1= parseInt(res[1]);
var y1= parseInt(res[2]);
var s1= parseInt(res[3]);
submitBtn.addEventListener("click", () => {
    const val =userName.value;
    if (val.trim() !== "" && userName.checkValidity()) {
        // console.log(val);
        generatePDF(val,"./assets/Rubrix_250_230_45.pdf");
      } else {
        userName.reportValidity();
      }
});
const generatePDF = async (name,loc) => {
    

    const existingPdfBytes = await fetch(loc).then((res) =>
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
     
    
    let t2=name;
    const { width, height } = firstPage.getSize();
    console.log(width);
    w=t2.length;
    // Draw a string of text diagonally across the first page

     firstPage.drawText(name, {
       
       x: (width-27*w)/2,
       y: y1,
       size: s1,
       font:  Montserrat,
       
     
    //(PAGE_WIDTH - getStringWidth('Centered', 48)) / 2,
    
    colorRgb: [1, 0, 0],
       
     });
     console.log(t2.length);
     
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    var t=res[0];
    saveAs(pdfDataUri,(t+"_"+name))
  };

function loadFonts() {
    return new Promise((resolve) => {
        WebFont.load({
            google: {
                families: ['Titillium Web']
            },
            active: resolve, // Resolve the promise when the font is loaded
            inactive: resolve // Resolve even if the font fails to load
        });
    });
}

async function exportRecipeAsPDF() {
    const { jsPDF } = window.jspdf;
    const dishName = document.querySelector("h1").innerText;
    const fileName = `${dishName} - FlavourSync.pdf`;
    const logoPath = '../Assets/logo.jpg';

    // Create a new jsPDF instance
    const pdf = new jsPDF("p", "pt", "a4");

    // Wait for the font to be loaded
    await loadFonts();

    // Set the font to Titillium
    pdf.setFont("Titillium", "normal");

    // Add the dish name centered at the top
    pdf.setFontSize(32);
    pdf.text(dishName, pdf.internal.pageSize.getWidth() / 2, 40, { align: "center" });

    // Add the logo at the top right corner
    const logoWidth = 50; // Set the desired width of the logo
    const logoHeight = 50; // Set the desired height of the logo
    pdf.addImage(logoPath, "JPEG", pdf.internal.pageSize.getWidth() - logoWidth - 20, 20, logoWidth, logoHeight);

    // Extract and add the recipe content as text
    const content = document.getElementById("recipe-content");
    const textLines = content.innerText.split('\n');

    let verticalOffset = 100; // Start below the title and logo
    textLines.forEach(line => {
        pdf.setFontSize(12); // Set your desired font size
        pdf.text(line, 40, verticalOffset);
        verticalOffset += 30; // Adjust line height
    });

    // Save the PDF
    pdf.save(fileName);
}

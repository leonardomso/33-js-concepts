function generateQRCode() {
  var text = document.getElementById("text-input").value;
  var qrCodeDiv = document.getElementById("qrcode");

  // Clear previous QR code if exists
  qrCodeDiv.innerHTML = "";

  // Generate QR code using QRCode.js library
  var qrcode = new QRCode(qrCodeDiv, {
    text: text,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}

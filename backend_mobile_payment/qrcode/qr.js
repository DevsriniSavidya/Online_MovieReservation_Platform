import QRCode from 'qrcode'

const generateQR = async text => {
	try {
		await QRCode.toFile('./-qr-code.png', text);
	} catch(err){
		console.log(err);
	}
}

generateQR("http://localhost:3000/")
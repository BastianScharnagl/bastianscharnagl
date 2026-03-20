const { RestliClient } = require('linkedin-api-client');

const restliClient = new RestliClient();

restliClient.get({
  resourcePath: '/me',
  accessToken: "AQUf_enInYsnI5oEyMEIPhJy2UZ4EcPVz3kKgYkLZLQHhImzwpcoVSay1U0GtaHrzCdzgjY7-IXBsliaMnbpMElOYUK4-t7cq7v5kjPGC7SHF4dXpxDrL10OB4qq5tS8lMdJznMeu7fFT11axPlMVyV6Kc-P1erHoEhAlYFCR4FW6F2Zu0LgYIRungv-gMmz3xEDwAU0Ixq1AHPRR0LW3DgXzftpo9XDeUV6hOIc-JrxytOCw-4jcQMkGCNV3_UJS4RK5prXNqUIldYiSKv1ot8mO5wc0l6GG5nNsrLJuZfbuSNGPOJoEAi2-rPvuhu_OHAbcz9OGgnRnXdTnYM5eV5S6EoOdg"
}).then(response => {
  const profile = response.data;
  console.log(profile);
});


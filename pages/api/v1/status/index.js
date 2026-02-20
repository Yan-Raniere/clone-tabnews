function status(request, response) {
  response.status(200).json({ "Minha chave": "Meu valor" });
}

export default status;

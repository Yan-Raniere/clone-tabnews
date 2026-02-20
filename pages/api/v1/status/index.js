function status(request, response) {
  response.status(200).json({ "Minha chave": "Meu valor mikael novo" });
}

export default status;

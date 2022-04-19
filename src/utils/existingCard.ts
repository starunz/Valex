import * as cardRepository from "../repositories/cardRepository.js";
import * as errorTypes from "../error/errorTypes.js";

export async function checkingCardExistence(cardId: number) {
  const card = await cardRepository.findById(cardId);
  
  if (!card)
    throw errorTypes.notFound("Cartão não encontrado");

  return card;
}
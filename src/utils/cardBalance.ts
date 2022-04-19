import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

export async function getBalance(cardId: number) {
  const recharges = await rechargeRepository.findByCardId(cardId);

  let totalrecharges = 0;
  recharges.forEach((item) => {
    totalrecharges += item.amount;
  });

  const transactions = await paymentRepository.findByCardId(cardId);

  let totaltransactions = 0;
  transactions.forEach((item) => {
    totaltransactions += item.amount;
  });

  const finalBalance = totalrecharges - totaltransactions;

  return {
    balance: finalBalance,
    transactions,
    recharges
  };
}
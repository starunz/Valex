import * as employeeRepository from "../repositories/employeeRepository.js";
import * as errorTypes from "../error/errorTypes.js";

export async function checkingEmployee( employeeId: number, companyId: number ) {
  const employee = await employeeRepository.findById(employeeId);
  
  if (!employee)
    throw errorTypes.notFound("Este funcionário não foi encontrado");

  if (employee.companyId !== companyId)
    throw errorTypes.forbidden("Este funcionário não foi encontrado na empresa");

  return employee;
}
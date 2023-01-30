import { AddressEnrollment } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { TicketStatus } from "@prisma/client";
import { notFoundError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository.ts';

async function getTicketTypes() {
  const tickets = await ticketsRepository.getAllTickets();
  if (!tickets) {
    throw notFoundError();
  }
  return tickets;
};

async function getTicketTypesById(userId: number) {
    // pegar enrollment pra poder pegar o ticket, SEMPRE VALIDAR
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
      // pegar o ticket e lá no repositori juntar com ticketType, SEMPRE VALIDA
    const ticketsUser = await ticketsRepository.getTicketUserByEnrollment(enrollment.id);
    if (!ticketsUser || !enrollment) {
      throw notFoundError();
    }
    return ticketsUser;
  };


  async function postTicketTypes(userId:number, ticketTypeId:number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    /*preciso de id do tickettype, enrollment e tipo de status para 
    conseguir fazer um ticket, Nâo esquecer!
    "payments" é facultativo!!
    */
    const postTickets = await ticketsRepository.postTickets({
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollment.id,
      status: TicketStatus.RESERVED
    });
    if(!enrollment) throw notFoundError();
/*agora que eu tenho as informações do ticket, eu retorno ele pelo 
id do enrollment que é uma informação da tabela que tenho
*/
const result = await ticketsRepository.getTicketUserByEnrollment(enrollment.id)
    return result;
  };

const ticketsService = {
  getTicketTypes,
  getTicketTypesById,
  postTicketTypes
};

export default ticketsService;

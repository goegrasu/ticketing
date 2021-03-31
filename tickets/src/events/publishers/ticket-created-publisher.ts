import { Publisher, Subjects, TicketCreatedEvent } from '@goegrasutickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}
import { Publisher, Subjects, TicketUpdatedEvent } from '@goegrasutickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}
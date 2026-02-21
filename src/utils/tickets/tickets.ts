type TicketConfig = {
    channelId: string;
    category: string;
    status: boolean;
    userId: string;
};

interface ITicket {
    ticketConfig: TicketConfig;
    open(): Promise<boolean>;
    close(): Promise<boolean>;
    reOpen(): Promise<boolean>;
    claim(): Promise<boolean>;
    transcript(): Promise<string>;
}
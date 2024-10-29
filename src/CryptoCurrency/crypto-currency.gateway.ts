import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import { CryptoCurrencyService } from './crypto-currency.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class CryptoCurrencyGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private interval: NodeJS.Timeout;

  constructor(private readonly cryptoCurrencyService: CryptoCurrencyService) {}

  async handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
    this.broadcastData();
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
    clearInterval(this.interval);
  }

  async broadcastData() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(async () => {
      const data = await this.cryptoCurrencyService.getResultsArray();
      this.server.emit('cryptoCurrencies', data);
    }, 5000);
  }
}

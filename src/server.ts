import { Application } from "express";
import { Server as HttpServer } from "http";

export default class Server {
  private server: HttpServer | null = null;
  private app: Application;
  private port: number;

  public constructor(app: Application, port: number) {
    this.app = app;
    this.port = port;
  }

  async start(cb?: () => void) {
    this.server = this.app.listen(this.port, cb);
  }

  async stop(cb?: () => void) {
    if (!this.server) return;
    this.server.close(cb);
  }
}

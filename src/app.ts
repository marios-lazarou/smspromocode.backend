import express = require('express');
import * as bodyParser from 'body-parser';
import { MessagingController } from './api/controllers/MessagingController';
import * as cors from "cors";

class App {
  public app: express.Application;
  public router: express.Router;

  private messagingController: MessagingController;

  private cors: any;

  constructor() {
    this.app = express();
    this.app.set('port', process.env.PORT || 4000);

    this.cors = require('cors');
    this.router = express.Router();

    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    this.app.use(cors());

    this.messagingController = new MessagingController();

    this.config();
  }

  private config(): void {

    this.app.use(bodyParser.json());

    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.router.get("/",
      (req: express.Request, res: express.Response) => {
        res.status(200).send({ message: "Welcome!!" });
      });

    this.router.post("/api/sms-promocode",
      (req: express.Request, res: express.Response) => {
        this.messagingController.sendSMS(req.body)
          .then(
            (res) => {
              console.log('results:::', res);
              res.status(200).send(res);
            },
            (err) => {
              console.log('error:::', err);
              res.status(200).send(err);
            }
          );
      });

    this.app.use("/", this.router);
  }
}

export default new App().app;
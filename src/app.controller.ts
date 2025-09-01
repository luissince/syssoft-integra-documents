import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { SizePaper, SizePrint } from './common/enums/size.enum';
import { generatePDFFromHTML } from './helper/pdf.helper';
import { PdfOptions } from './common/interfaces/pdf-options.inteface';
import PdfDto from './common/class/dto/pdf.class.dto';
import { sendPdfResponse } from './handlers/pdf-response.handler';

@ApiTags('Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/pdf')
  async htmlToPdf(@Res() res: Response, @Body() body: PdfDto) {
    try {
      let width: SizePaper | SizePrint | string = SizePaper.A4;
      const height = body.height || null;

      if (body.size) {
        if (body.size === SizePaper.A4) {
          width = SizePrint.A4;
        } else if (body.size === SizePaper.mm80) {
          width = SizePrint.mm72;
        } else if (body.size === SizePaper.mm58) {
          width = SizePrint.mm48;
        }
      } else {
        width = body.width;
      }

      const params: PdfOptions = {
        htmlContent: body.html,
        width: width,
        height: height,
        margin: body.margin,
      };

      const buffer: Uint8Array = await generatePDFFromHTML(params);
      return sendPdfResponse(res, buffer, body.title);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message || 'Error al generar el PDF',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('pdf/test')
  async test(@Res() res: Response) {
    try {
      const width: SizePaper | SizePrint = SizePaper.A4;

      const template = `
      
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
        @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');
        body {
            font-family: "Lato", serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 0px 20px;
        }
        h1 {
            color: #2c3e50;
            font-size: 32px;
            margin-bottom: 20px;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
        }
        h2 {
            color: #34495e;
            font-size: 24px;
            margin-top: 20px;
            margin-bottom: 15px;
        }
        h3 {
            color: #445566;
            font-size: 20px;
            margin-top: 15px;
        }
        p {
            margin-bottom: 15px;
            color: #333;
        }
        ul, ol {
            margin-bottom: 15px;
            padding-left: 25px;
        }
        li {
            margin-bottom: 5px;
        }
        code {
            background-color: #f7f9fa;
            padding: 2px 5px;
            border-radius: 3px;
            font-family: monospace;
        }
        pre {
            background-color: #f7f9fa;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }
        blockquote {
            border-left: 4px solid #ccc;
            margin: 15px 0;
            padding-left: 15px;
            font-style: italic;
            color: #666;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 15px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f5f5f5;
        }
        
            </style>
            <title>Document</title>
        </head>
        <body>
            <h1>Luis Alexander Lara Serna</h1>
            <h2>Contatto</h2>
            <ul>
            <li>Email: xanderlsdev@gmail.com</li>
            <li>GitHub: https://github.com/luissince</li>
            <li>LinkedIn: https://www.linkedin.com/feed/</li>
            <li>X (Twitter): https://x.com/xanderlsdev</li>
            <li>NPM: https://www.npmjs.com/~luisls</li>
            <li>Portfolio: https://xanderls.dev/</li>
            <li>Cellulare: +51 966750883</li>
            </ul>
            <h2>Lingue</h2>
            <ul>
            <li>Spagnolo: Madrelingua</li>
            <li>Italiano: Parlante</li>
            <li>Inglese: Intermedio</li>
            </ul>
            <h2>Riepilogo Professionale</h2>
            <p>Ingegnere in Sistemi e Informatica peruviano con esperienza nello sviluppo software, specializzato in applicazioni web e mobili. Sono appassionato della cultura italiana, motivo per cui desidero lavorare in Italia e offrire le mie competenze con entusiasmo e impegno. Inoltre, ho la possibilità di trasferirmi in Italia poiché mia madre risiede lì. Fondatore e sviluppatore principale di SysSoftIntegra, un sistema di punto vendita e fatturazione elettronica. Esperienza nello sviluppo di soluzioni aziendali e contributi alla comunità open source.</p>
            <h2>Prodotti Proprietari</h2>
            <h3>SysSoftIntegra - Sistema di Punto Vendita e Fatturazione Elettronica</h3>
            <ul>
            <li>Sito web: https://www.syssoftintegra.com/</li>
            <li>Sviluppo e commercializzazione di software aziendali</li>
            <li>Caratteristiche principali:</li>
            <li>Fatturazione elettronica integrata con SUNAT</li>
            <li>Sistema di punto vendita</li>
            <li>Gestione dei preventivi</li>
            <li>Vendita di attrezzature complementari</li>
            <li>App mobile (in sviluppo)</li>
            <li>Tecnologie: Java, JavaFX, SQL Server, Laravel, React.js, Google Cloud</li>
            </ul>
            <h2>Pacchetti NPM Pubblicati</h2>
            <ul>
            <li>pdf-visualizer: Visualizzatore PDF modulare per framework JavaScript</li>
            <li>toast-kit: Libreria per messaggi toast nei browser</li>
            <li>alert-kit: Libreria per messaggi di avviso nei browser</li>
            </ul>
            <h2>Formazione Accademica</h2>
            <ul>
            <li>Ingegneria dei Sistemi e Informatica<br />
              Laurea di primo livello (2021), Prossimo titolo: Ingegnere in Sistemi e Informatica</li>
            </ul>
            <h2>Esperienza Professionale</h2>
            <h3>Progetto Freelance per l'Azienda Clínica la Luz</h3>
            <p><strong>Date:</strong> 01/2023 - Attuale<br />
            - Compiti: Analisi e sviluppo<br />
            - Tecnologie: Next.js con TypeScript (frontend)</p>
            <h3>Progetto Freelance per Azienda Immobiliare</h3>
            <p><strong>Date:</strong> 01/2022 - Attuale<br />
            - Compiti: Analisi e sviluppo<br />
            - Tecnologie: React con TypeScript (frontend), Node.js con MySQL (backend)</p>
            <h3>Sviluppatore presso Universidad Peruana Los Andes</h3>
            <p><strong>Date:</strong> 01/2022 - 06/2023 (Contratto)<br />
            - Progetto: Applicazione mobile per studenti<br />
            - Compiti: Analista programmatore<br />
            - Tecnologie: Scrum, Jira, Figma, Trello, Flutter, Firebase, Open Pay (BBVA), ASP.NET Core Web API, Golang</p>
            <h3>Sviluppatore presso Esitic</h3>
            <p><strong>Date:</strong> 05/2020 - 12/2021 (Contratto)<br />
            - Progetto: Applicazione web e mobile per il Collegio degli Ingegneri del Perù<br />
            - Compiti: Analista programmatore<br />
            - Tecnologie: PHP, Laravel, SQL Server, React Native, Firebase, Qulqi, Docker</p>
            <h3>Tecnico Informatico presso Collegio degli Ingegneri del Perù</h3>
            <p><strong>Date:</strong> 04/2019 - 08/2019 (Contratto)<br />
            - Compiti: Supporto tecnico, manutenzione delle apparecchiature, controllo dell'inventario</p>
            <h3>Sviluppatore presso SIGESA CORP</h3>
            <p><strong>Date:</strong> 05/2018 - 03/2019 (Contratto)<br />
            - Progetto: Software di punto vendita per la Clinica Bilbao<br />
            - Compiti: Analista programmatore<br />
            - Tecnologie: Java, JavaFX, SQL Server, Hibernate</p>
            <h3>Sviluppatore presso SIGESA CORP</h3>
            <p><strong>Date:</strong> 02/2018 - 12/2018 (Contratto)<br />
            - Progetto: Centri Preuniversitari dell'Università del Centro del Perù<br />
            - Compiti: Analista e programmatore con metodologia Scrum<br />
            - Tecnologie: PHP, Laravel, MySQL, Apache, Git, Bitbucket, Trello</p>
            <h2>Competenze Tecniche</h2>
            <h3>Sviluppo Backend (Livello Alto)</h3>
            <ul>
            <li>Java e Spring Ecosystem</li>
            <li>Spring Framework</li>
            <li>Spring Boot</li>
            <li>JUnit e Mockito (Testing)</li>
            <li>API e Protocolli</li>
            <li>REST</li>
            <li>SOAP</li>
            <li>Swagger Hub (Livello Medio)</li>
            </ul>
            <h3>Database e Cache</h3>
            <ul>
            <li>SQL (Livello Alto)</li>
            <li>MySQL</li>
            <li>PostgreSQL</li>
            <li>SQL Server</li>
            <li>NoSQL (Livello Alto)</li>
            <li>MongoDB</li>
            <li>Redis</li>
            </ul>
            <h3>Architettura e Microservizi</h3>
            <ul>
            <li>Microservizi (Livello Alto)</li>
            <li>Progettazione e Sviluppo</li>
            <li>Pattern di Microservizi (Livello Medio)</li>
            <li>Architetture Distribuite (Livello Medio)</li>
            </ul>
            <h3>DevOps e Controllo di Versione</h3>
            <ul>
            <li>Git (Livello Alto)</li>
            <li>GitFlow (Livello Medio)</li>
            <li>CI/CD</li>
            <li>Jenkins (Livello Medio)</li>
            <li>GitHub Actions (Livello Medio)</li>
            <li>Contenitori</li>
            <li>Docker</li>
            <li>Kubernetes</li>
            <li>Monitoraggio</li>
            <li>Prometheus</li>
            <li>Grafana</li>
            </ul>
            <h3>Metodologie e Strumenti</h3>
            <ul>
            <li>Metodologie Agile (Livello Medio)</li>
            <li>Scrum</li>
            <li>Strumenti di Sviluppo</li>
            <li>Jira</li>
            <li>Postman (Livello Alto)</li>
            <li>Trello</li>
            <li>Figma</li>
            </ul>
            <h3>Sviluppo Frontend</h3>
            <ul>
            <li>JavaScript/TypeScript</li>
            <li>Framework</li>
            <li>React</li>
            <li>React Native</li>
            <li>Angular</li>
            <li>Flutter</li>
            <li>Node.js</li>
            </ul>
            <h3>Altri Linguaggi e Tecnologie</h3>
            <ul>
            <li>C#</li>
            <li>PHP</li>
            <li>Go</li>
            <li>Laravel</li>
            </ul>
        </body>
        </html>
        
      `;

      const params: PdfOptions = {
        htmlContent: template,
        width: width,
      };

      const buffer: Uint8Array = await generatePDFFromHTML(params);

      sendPdfResponse(res, buffer, 'Test PDF');
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al generar el PDF',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

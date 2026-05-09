import CreditNoteDetail from './credit-note-detail.model';
import CreditNoteReasons from './credit-note-reasons.model';
import Currency from './currency.model';
import Person from './person.model';
import Receipt from './receipt.model';
import Sale from './sale.model';
import User from './user.model';

class CreditNote {
  public idNotaCredito: string;
  public idCliente: string;
  public idUsuario: string;
  public idMoneda: string;
  public idSucursal: string;
  public idComprobante: string;
  public idMotivo: string;
  public idVenta: string;
  public serie: string;
  public numeracion: number;
  public observaciones: string;
  public estado: boolean;
  public fecha: string;
  public hora: string;
  public xmlSunat: string;
  public xmlDescripcion: string;
  public codigoHash: string;
  public correlativo: number;
  public fechaCorrelativo: string;
  public xmlGenerado: string;
  public xmlRespuesta: string;
  public ticketConsultaSunat: string;

  public cliente: Person;
  public comprobante: Receipt;
  public moneda: Currency;
  public motivo: CreditNoteReasons;
  public usuario: User;
  public venta: Sale;
  public notaCreditoDetalles: CreditNoteDetail[];


}

export default CreditNote;

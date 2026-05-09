import { SizePaper } from "src/common/enums/size.enum";
import Branch from "src/model/branch.model";
import Company from "src/model/company.mode";
import CreditNote from "src/model/credit-note.model";

export class CreateCreditNoteDto {
    size: SizePaper;
    company: Company;
    branch: Branch;
    creditNote: CreditNote;
    outputType: 'pdf' | 'jpeg' | 'png' | 'jpg' = 'pdf';
}

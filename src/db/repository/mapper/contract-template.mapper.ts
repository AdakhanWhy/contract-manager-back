import {
  InsertContractTemplateData,
  SelectContractTemplateData,
} from 'src/db/schema';
import { ContractTemplateEntity } from 'src/services/contract-template/entities/contract-template.entity';

export class ContractTemplateMapper {
  static toInsertData(
    data: ContractTemplateEntity,
  ): InsertContractTemplateData {
    return {
      name: data.name,
      content: data.content,
    };
  }

  static toEntity(data: SelectContractTemplateData): ContractTemplateEntity {
    return {
      id: data.id,
      name: data.name,
      content: data.content,
    };
  }
}

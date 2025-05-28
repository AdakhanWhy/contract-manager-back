import { ContractStatus } from 'src/common/constans';
import { ContractEntity } from 'src/services/contract/entities/contract.entity';
import { InsertContractData, SelectContractData } from 'src/db/schema';

export class ContractMapper {
  static toInsertData(data: ContractEntity): InsertContractData {
    return {
      title: data.title,
      templateId: data.templateId,
      status: data.status,
      isSigned: data.isSigned,
      userId: data.userId,
    };
  }

  static toEntity(data: SelectContractData): ContractEntity {
    return {
      id: data.id,
      title: data.title,
      templateId: data.templateId,
      status: data.status as ContractStatus,
      isSigned: data.isSigned ?? false,
      userId: data.userId,
    };
  }
}

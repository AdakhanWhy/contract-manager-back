import { ContractStatus } from 'src/common/constans';
import { ContractEntity } from 'src/services/contract/entities/contract.entity';
import { InsertContractData, SelectContractData } from 'src/db/schema';

export class ContractMapper {
  static toInsertData(data: ContractEntity): InsertContractData {
    return {
      title: data.title,
      templateId: data.templateId,
      status: data.status,
      startDate: data.startDate,
      endDate: data.endDate,
      isSigned: data.isSigned,
    };
  }

  static toEntity(data: SelectContractData): ContractEntity {
    return {
      id: data.id,
      title: data.title,
      templateId: data.templateId,
      status: data.status as ContractStatus,
      startDate: data.startDate as Date,
      endDate: data.endDate as Date,
      isSigned: data.isSigned ?? false,
    };
  }
}

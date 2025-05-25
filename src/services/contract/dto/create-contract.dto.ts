import { ApiProperty } from '@nestjs/swagger';
import { ContractStatus } from 'src/common/constans';

export class CreateContractDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  templateId: string;
  @ApiProperty()
  status: ContractStatus;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  endDate: Date;
  @ApiProperty()
  isSigned: boolean;
}

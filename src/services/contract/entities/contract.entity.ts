import { ApiProperty } from '@nestjs/swagger';
import { ContractStatus } from 'src/common/constans';

export class ContractEntity {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  templateId: string;
  @ApiProperty()
  status: ContractStatus;
  @ApiProperty()
  isSigned: boolean;
  @ApiProperty()
  userId: string;
}

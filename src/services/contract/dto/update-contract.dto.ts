import { ApiPropertyOptional } from '@nestjs/swagger';
import { ContractStatus } from 'src/common/constans';

export class UpdateContractDto {
  @ApiPropertyOptional()
  title?: string;
  @ApiPropertyOptional()
  templateId?: string;
  @ApiPropertyOptional()
  status?: ContractStatus;
  @ApiPropertyOptional()
  isSigned?: boolean;
}

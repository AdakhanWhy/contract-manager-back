import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateContractTemplateDto {
  @ApiPropertyOptional()
  name?: string;
  @ApiPropertyOptional()
  content?: string;
}

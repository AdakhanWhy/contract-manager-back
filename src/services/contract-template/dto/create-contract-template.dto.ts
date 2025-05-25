import { ApiProperty } from '@nestjs/swagger';

export class CreateContractTemplateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  content: string;
}

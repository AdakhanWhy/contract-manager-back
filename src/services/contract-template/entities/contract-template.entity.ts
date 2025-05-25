import { ApiProperty } from '@nestjs/swagger';

export class ContractTemplateEntity {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  content: string;
}

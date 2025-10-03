import { IsBoolean, IsInt, IsOptional, IsString, IsUrl, Min } from 'class-validator';
export class CreateProductDto {
  @IsString() name!: string;
  @IsOptional() @IsString() description?: string;
  @IsInt() @Min(0) priceCents!: number;
  @IsInt() @Min(0) stock!: number;
  @IsOptional() @IsUrl() imageUrl?: string;
  @IsOptional() @IsBoolean() isActive: boolean = true;
}
export class UpdateProductDto extends CreateProductDto {}
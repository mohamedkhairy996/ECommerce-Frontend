// Based on the provided 'variant' entity model
export interface VariantDto {
  id: number; // C# uint mapped to TS number
  localId?: number; // C# int? mapped to TS number | undefined
  code: string;
  name: string;
  measurement: number; // C# double mapped to TS number
  status: number; // C# sbyte mapped to TS number (0 or 1 typically)
}
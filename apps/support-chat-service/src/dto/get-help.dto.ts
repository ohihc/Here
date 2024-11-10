export class GetHelpDto {
  question: string;
  htmlContext: string;
  mode?: 'tip' | 'summary' = 'tip';
}

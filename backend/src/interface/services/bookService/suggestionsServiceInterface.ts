export interface ISuggestionService {
  execute(search: string): Promise<string[]>;
};

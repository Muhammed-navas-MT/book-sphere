import { ISuggestionService } from "../../interface/services/bookService/suggestionsServiceInterface.js";
import { IBookElasticService } from "../../interface/services/elasticsearch/bookElasticServiceInterface.js";

export class SuggestionService implements ISuggestionService {
  constructor(private _bookElasticService: IBookElasticService) {}

  async execute(search: string): Promise<string[]> {
    if (!search || !search.trim()) {
      return [];
    }

    const suggestions = await this._bookElasticService.getSuggestions(
      search.trim(),
    );
    console.log(suggestions);

    return [...new Set(suggestions)];
  }
}

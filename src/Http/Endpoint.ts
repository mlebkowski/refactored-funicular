export class Endpoint {
  constructor(
    private readonly baseUrl: string,
    private status: string = null,
    private page: number = null,
  ) {}

  withStatus(status: string): Endpoint {
    return new Endpoint(this.baseUrl, status, this.page);
  }

  withPage(page: number): Endpoint {
    return new Endpoint(this.baseUrl, this.status, page);
  }

  toString() {
    const query = new URLSearchParams({
      ...this.statusParams,
      ...this.queryParams,
    }).toString();

    return `${this.baseUrl}?${query}`;
  }

  private get queryParams() {
    if (!this.page) {
      return {};
    }
    return {
      page: `${this.page}`,
    };
  }

  private get statusParams() {
    if (!this.status) {
      return {};
    }
    return {
      status: this.status,
    };
  }
}

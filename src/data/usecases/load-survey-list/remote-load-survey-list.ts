import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { SurveyModel } from '@/domain/models'

export class RemoteLoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<SurveyModel[]>
  ) {}

  async loadAll (): Promise<void> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break
      default: throw new UnexpectedError()
    }
  }
}

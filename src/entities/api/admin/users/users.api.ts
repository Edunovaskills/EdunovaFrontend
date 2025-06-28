import { getClient, type IClient } from 'shared/data-providers/model/fetcher'
import type { PaginationParams, UsersResponse } from 'entities/model'

export class AdminUserApi {
  client: IClient

  constructor(client: IClient) {
    this.client = client
  }

  async getAllUsers(params: PaginationParams) {
    const response = await this.client.get<UsersResponse>('get-all-users', {
      params,
    })
    return response.data
  }
}

export const adminUserApi = new AdminUserApi(getClient('admin/users'))

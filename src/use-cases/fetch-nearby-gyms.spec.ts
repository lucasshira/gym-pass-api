// teste do service para buscar academias proximas

import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: 38.755416,
      longitude: -9.211548,
    })

    // forcando o erro aqui
    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: 38.9418304,
      longitude: -9.3211807,
    })

    const { gyms } = await sut.execute({
      userLatitude: 38.755416,
      userLongitude: -9.1883485,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})

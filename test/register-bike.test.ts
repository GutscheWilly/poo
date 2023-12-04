import request from 'supertest'
import server from '../src/server'
import prisma from '../src/external/database/db'
import { Bike } from '../src/bike'

describe('Register bike route', () => {
    beforeEach(async () => {
        await prisma.bike.deleteMany({})
    })

    afterAll(async () => {
        await prisma.bike.deleteMany({})
    })

    it('register a bike successful', async () => {
        const bike = new Bike(
          'mountain bike',
          'caloi',
          32,
          10,
          8,
          '...',
          6,
          ['...', '???'],
        )

        await request(server)
            .post('/api/bikes')
            .send(bike)
            .expect(201)
            .then((res) => {
                expect(res.body.id).toBeDefined()
            })
    })
})
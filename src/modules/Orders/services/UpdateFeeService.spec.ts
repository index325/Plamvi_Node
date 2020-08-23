import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';

import UpdateFeeService from './UpdateFeeService';

import AppError from '@shared/errors/AppError';

let fakeOrdersRepository: FakeOrdersRepository;

let updateFeeService: UpdateFeeService;


describe('UpdateFee', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();

    updateFeeService = new UpdateFeeService(
      fakeOrdersRepository,
    );
  });

  it('should be able to update an order fee', async () => {
    const order = await fakeOrdersRepository.create({
      total: 0,
    });

    const updatedOrder = await updateFeeService.execute({
      daysToDeliver: 3,
      fee: 300,
      order_id: order.id,
    })

    expect(updatedOrder?.daysToDeliver).toBe(3);
    expect(updatedOrder?.fee).toBe(300);
  });
})
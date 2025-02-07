import { Test, TestingModule } from '@nestjs/testing';
import { NotificationheaderController } from './notificationheader.controller';
import { NotificationheaderService } from './notificationheader.service';

describe('NotificationheaderController', () => {
  let controller: NotificationheaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationheaderController],
      providers: [NotificationheaderService],
    }).compile();

    controller = module.get<NotificationheaderController>(NotificationheaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

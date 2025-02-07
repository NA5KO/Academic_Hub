import { Test, TestingModule } from '@nestjs/testing';
import { NotificationheaderService } from './notificationheader.service';

describe('NotificationheaderService', () => {
  let service: NotificationheaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationheaderService],
    }).compile();

    service = module.get<NotificationheaderService>(NotificationheaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

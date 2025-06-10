import { Test, TestingModule } from '@nestjs/testing';
import { TalixoService } from './talixo.service';

describe('TalixoService', () => {
  let service: TalixoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TalixoService],
    }).compile();

    service = module.get<TalixoService>(TalixoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

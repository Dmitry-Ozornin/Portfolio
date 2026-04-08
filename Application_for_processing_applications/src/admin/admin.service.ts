import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
    createUser(): string{
        
        return "user создан"
    }
}
